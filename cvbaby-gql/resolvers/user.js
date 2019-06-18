import * as axios from 'axios';
import * as uuid from 'uuid/v1';
import { _, invokeLambda, DynamoDB, S3 } from '../util';
import { createSlug, deleteSlug, getSlug } from './slug';

const IS_OFFLINE = process.env.IS_OFFLINE;
const CVBABY_ENV = process.env.CVBABY_ENV;
const CVBABY_TABLE_USERS = process.env.CVBABY_TABLE_USERS;
const CVBABY_BUCKET_POST = process.env.CVBABY_BUCKET_POST;

export function getUser(userID) {
  // Fetch a user from the database.
  return DynamoDB.get({
    TableName: CVBABY_TABLE_USERS,
    Key: { userID }
  })
    .promise()
    .then(({ Item }) => Item);
}

export async function getResume(slug) {
  // Fetch a slug from the database and extract the attached userID.
  const { userID } = { ...(await getSlug(slug)) };
  if (!userID) {
    throw new Error('![404] Not found');
  }
  // Fetch the resume associated with the given slug.
  return getUser(userID).then(({ resumes }) => {
    const resume = _.find(resumes, ['slug', slug]);
    if (!resume) {
      throw new Error('![404] Not found');
    } else if (!resume.live) {
      throw new Error('![404] Not found');
    } else {
      return { userID, ...resume };
    }
  });
}

export function getResumes(userID) {
  return getUser(userID).then(({ resumes }) => resumes);
}

export async function saveResume(userID, resume, base64Image) {
  // Save the resume.
  const [savedResume] = resume.resumeID
    ? await updateResume(userID, resume, base64Image)
    : await createResume(userID, resume, base64Image);
  // Render the new resume to a downloadable PDF.
  const payload = JSON.stringify({
    slug: resume.slug,
    alias: resume.alias,
    path: `users/${userID}/${savedResume.resumeID}`
  });
  if (IS_OFFLINE) {
    axios.post('http://localhost:3003/renderPDF', payload);
  } else {
    invokeLambda(`cvbaby-pdf-${CVBABY_ENV}-renderPDF`, JSON.stringify(payload));
  }
  // Return the updated resumes array.
  return savedResume;
}

async function createResume(userID, resume, base64Image) {
  // Create a new slug.
  await createSlug(resume.slug, userID);
  // Convert all empty strings to null for DynamoDB.
  const resumeSaveable = _.deep(_.mapValues)(resume, value => {
    return value === '' ? null : value;
  });
  resumeSaveable.resumeID = uuid();
  // Append the resume to the user document.
  const resumes = await DynamoDB.update({
    TableName: CVBABY_TABLE_USERS,
    Key: { userID },
    UpdateExpression: 'SET resumes = list_append(resumes, :resume)',
    ExpressionAttributeValues: {
      // Wrap resume in an array for list_append.
      ':resume': [resumeSaveable]
    },
    ReturnValues: 'ALL_NEW'
  })
    .promise()
    .then(({ Attributes: { resumes } }) => resumes);

  const index = resumes.length - 1;
  const savedResume = resumes[index];
  // If there's an image to process, process it.
  if (base64Image) {
    await uploadImage(userID, savedResume.resumeID, base64Image);
  }

  return [savedResume, resumes];
}

async function updateResume(userID, resume, base64Image) {
  // Get the user.
  const user = await getUser(userID);
  // Assert the resume exists.
  const index = _.findIndex(user.resumes, ['resumeID', resume.resumeID]);
  if (index === -1) {
    throw new Error('![404] Resume not found');
  }
  // If slug has changed, create a new slug and delete the old.
  const { slug } = user.resumes[index];
  if (slug !== resume.slug) {
    await createSlug(resume.slug, userID);
    slug && (await deleteSlug(slug, userID));
  }
  // Convert all empty strings to null for DynamoDB.
  const resumeSaveable = _.deep(_.mapValues)(resume, value => {
    return value === '' ? null : value;
  });
  // Update the resume on the user document.
  const resumes = await DynamoDB.update({
    TableName: CVBABY_TABLE_USERS,
    Key: { userID },
    UpdateExpression: `SET resumes[${index}] = :resume`,
    ExpressionAttributeValues: { ':resume': resumeSaveable },
    ReturnValues: 'ALL_NEW'
  })
    .promise()
    .then(({ Attributes: { resumes } }) => resumes);

  const savedResume = resumes[index];

  // If there's an image to process, process it.
  if (base64Image) {
    await uploadImage(userID, savedResume.resumeID, base64Image);
  }

  return [savedResume, resumes];
}

export async function removeResume(userID, resumeID) {
  // Get the user.
  const user = await getUser(userID);
  // Assert the resume exists.
  const index = _.findIndex(user.resumes, ['resumeID', resumeID]);
  if (index === -1) {
    throw new Error('![404] Resume not found');
  }
  // Delete the slug.
  const { slug } = user.resumes[index];
  slug && (await deleteSlug(slug, userID));
  // Update the resumes array on the user document.
  const deletedResume = await DynamoDB.update({
    TableName: CVBABY_TABLE_USERS,
    Key: { userID },
    UpdateExpression: `REMOVE resumes[${index}]`,
    ReturnValues: 'ALL_OLD'
  })
    .promise()
    .then(({ Attributes }) => Attributes.resumes[index]);
  // Delete the resume image.
  await S3.deleteObject({
    Bucket: CVBABY_BUCKET_POST,
    Key: `users/${userID}/${resumeID}/profile.jpeg`
  }).promise();

  return deletedResume;
}

function uploadImage(userID, resumeID, base64Image) {
  const payload = {
    userID,
    resumeID,
    base64Image
  };
  if (IS_OFFLINE) {
    return axios.post('http://localhost:3002/processImage', payload);
  } else {
    return invokeLambda(
      `cvbaby-images-${CVBABY_ENV}-processImage`,
      JSON.stringify(payload)
    );
  }
}
