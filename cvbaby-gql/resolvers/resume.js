import * as axios from 'axios';
import * as uuid from 'uuid/v1';
import { _, invokeLambda, DynamoDB } from '../util';
import { createSlug, deleteSlug, getSlug } from './slug';
import { getAnalytics, submitAnalyticsEvent } from './analytics';

const IS_OFFLINE = process.env.IS_OFFLINE;
const CVBABY_ENV = process.env.CVBABY_ENV === 'prod' ? 'prod' : 'dev';
const CVBABY_TABLE_RESUMES = process.env.CVBABY_TABLE_RESUMES;

export async function getResume(slug, analyticsData) {
  const { userID, resumeID } = await getSlug(slug);
  const resume = await DynamoDB.get({
    TableName: CVBABY_TABLE_RESUMES,
    Key: {
      userID,
      resumeID
    }
  })
    .promise()
    .then(({ Item }) => Item);
  if (!resume || !resume.live) {
    throw new Error('![404] Not found');
  }
  if (analyticsData.submitAnalyticsEvent && analyticsData.userID !== userID) {
    // Don't submit an event if user is viewing their own resume.
    submitAnalyticsEvent(resumeID, analyticsData.ipAddress);
  }
  return resume;
}

export async function getResumeByID(userID, resumeID) {
  const resume = await DynamoDB.get({
    TableName: CVBABY_TABLE_RESUMES,
    Key: {
      userID,
      resumeID
    }
  })
    .promise()
    .then(({ Item }) => Item);
  if (!resume) {
    throw new Error('![404] Not found');
  }
  return resume;
}

export async function getResumes(userID, fetchAnalytics = false) {
  const resumes = await DynamoDB.query({
    TableName: CVBABY_TABLE_RESUMES,
    KeyConditionExpression: 'userID = :userID',
    ExpressionAttributeValues: { ':userID': userID }
  })
    .promise()
    .then(({ Items }) => Items);
  if (fetchAnalytics) {
    for (const resume of resumes) {
      const dates = await getAnalytics(resume.resumeID);
      const analytics = new Array(14).fill(0).map((_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - index);
        return {
          date: date.toLocaleDateString(),
          events: dates[date.toLocaleDateString()] || []
        };
      });
      resume.analytics = analytics;
    }
  }
  return resumes;
}

export async function saveResume(userID, resume, base64Image) {
  // Save the resume.
  const savedResume = resume.resumeID
    ? await updateResume(userID, resume, base64Image)
    : await createResume(userID, resume, base64Image);
  // Render the new resume to a downloadable PDF.
  const payload = JSON.stringify({
    slug: resume.slug,
    path: `users/${userID}/${savedResume.resumeID}`
  });
  if (IS_OFFLINE) {
    axios.post('http://127.0.0.1:3003/renderPDF', payload);
  } else {
    invokeLambda(
      `cvbaby-pdf-${CVBABY_ENV === 'prod' ? '' : CVBABY_ENV + '-'}renderPDF`,
      JSON.stringify(payload)
    );
  }
  // Return the updated resumes array.
  return savedResume;
}

async function createResume(userID, resume, base64Image) {
  // Convert all empty strings to null for DynamoDB.
  const resumeSaveable = _.deep(_.mapValues)(resume, value => {
    return value === '' ? null : value;
  });
  const resumeID = uuid();
  resumeSaveable.resumeID = resumeID;
  resumeSaveable.userID = userID;
  // Create a new slug.
  await createSlug(resume.slug, userID, resumeID);
  // Append the resume to the user document.
  await DynamoDB.put({
    TableName: CVBABY_TABLE_RESUMES,
    Item: resumeSaveable
  }).promise();

  // If there's an image to process, process it.
  if (base64Image) {
    await uploadImage(userID, resumeID, base64Image);
  }

  return resumeSaveable;
}

async function updateResume(userID, resume, base64Image) {
  // Get the resume.
  const oldResume = await getResumeByID(userID, resume.resumeID);
  // If slug has changed, create a new slug and delete the old.
  if (oldResume.slug !== resume.slug) {
    await createSlug(resume.slug, userID, resume.resumeID);
    oldResume.slug && (await deleteSlug(oldResume.slug, userID));
  }
  // Convert all empty strings to null for DynamoDB.
  const resumeSaveable = _.deep(_.mapValues)(resume, value => {
    return value === '' ? null : value;
  });
  resumeSaveable.userID = userID;
  // Update the resume on the user document.
  await DynamoDB.put({
    TableName: CVBABY_TABLE_RESUMES,
    Item: resumeSaveable
  }).promise();

  // If there's an image to process, process it.
  if (base64Image) {
    await uploadImage(userID, resumeSaveable.resumeID, base64Image);
  }

  return resumeSaveable;
}

export async function removeResume(userID, resumeID) {
  // Get the resume.
  const resume = await getResumeByID(userID, resumeID);
  // Delete the slug.
  resume.slug && (await deleteSlug(resume.slug, userID));
  // Delete the resume.
  await DynamoDB.delete({
    TableName: CVBABY_TABLE_RESUMES,
    Key: { userID, resumeID }
  }).promise();

  // TODO: Delete resume profile image and PDF files
  //   await S3.deleteObject({
  //     Bucket: CVBABY_HOST_DATA,
  //     Key: `users/${userID}/${resumeID}/profile.jpeg`
  //   }).promise();

  return resume;
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
      `cvbaby-images-${
        CVBABY_ENV === 'prod' ? '' : CVBABY_ENV + '-'
      }processImage`,
      JSON.stringify(payload)
    );
  }
}
