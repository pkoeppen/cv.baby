import { _, DynamoDB, S3 } from '../util';
import { createSlug, deleteSlug, getSlug } from './slug';

const CVBABY_TABLE_USERS = process.env.CVBABY_TABLE_USERS;
const CVBABY_BUCKET_PRE = process.env.CVBABY_BUCKET_PRE;

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
    } else {
      return { userID, ...resume };
    }
  });
}

export function getResumes(userID) {
  return getUser(userID).then(({ resumes }) => {
    return resumes;
  });
}

export async function saveResume(userID, index, resume) {
  if (index === -1) {
    // If new resume, create new slug.
    await createSlug(resume.slug, userID);
  } else {
    // Else, check if slug changed.
    const { resumes } = await getUser(userID);
    const { slug } = resumes[index];
    if (slug !== resume.slug) {
      // Update slug and delete old slug.
      await createSlug(resume.slug, userID);
      slug && (await deleteSlug(slug, userID));
    }
  }
  // Convert all empty strings to null for DynamoDB.
  const resumeSaveable = _.deep(_.mapValues)(resume, value => {
    return value === '' ? null : value;
  });
  const updateExpression =
    index === -1
      ? `SET resumes = list_append(resumes, :resume)`
      : `SET resumes[${index}] = :resume`;
  return DynamoDB.update({
    TableName: CVBABY_TABLE_USERS,
    Key: {
      userID: userID
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: {
      // Wrap resume in an array for list_append.
      ':resume': index === -1 ? [resumeSaveable] : resumeSaveable
    },
    ReturnValues: 'ALL_NEW'
  })
    .promise()
    .then(({ Attributes: { resumes } }) =>
      index === -1 ? resumes.pop() : resumes[index]
    );
}

export async function removeResume(userID, index) {
  // Delete the slug.
  const { resumes } = await getUser(userID);
  const { slug } = resumes[index];
  slug && (await deleteSlug(slug, userID));
  // Update the user's resumes array.
  const updateExpression = `REMOVE resumes[${index}]`;
  return DynamoDB.update({
    TableName: CVBABY_TABLE_USERS,
    Key: {
      userID: userID
    },
    UpdateExpression: updateExpression,
    ReturnValues: 'ALL_OLD'
  })
    .promise()
    .then(({ Attributes }) => Attributes.resumes[index]);
}

export async function getUploadURL(userID, index, contentType) {
  // TODO:
  // Validate that index is within bounds of user.resumes
  // Get resumes.length for when index === -1

  // const ALLOWED_CONTENT_TYPES = ['image/jpeg', 'image/png'];
  // if (ALLOWED_CONTENT_TYPES.includes(contentType)) {
  //   throw new Error('![400] Invalid content type');
  // }
  const extension = contentType.split('/')[1];
  const uploadKey = `users/${userID}/${index}/profile.${extension}`;
  const params = {
    Bucket: CVBABY_BUCKET_PRE,
    Key: uploadKey,
    ContentType: contentType
  };
  return new Promise((resolve, reject) => {
    S3.getSignedUrl('putObject', params, (error, URL) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(URL);
      }
    });
  });
}
