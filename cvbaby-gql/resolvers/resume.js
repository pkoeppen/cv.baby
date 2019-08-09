import {
  _,
  createLogger,
  invokeLambda,
  getDatabaseItem,
  queryDatabaseItems,
  putDatabaseItem,
  deleteDatabaseItem,
  getCognitoUser
} from '../../cvbaby-common';
import * as axios from 'axios';
import * as uuid from 'uuid/v1';
import { createSlug, deleteSlug, getSlug } from './slug';
import { getAnalytics, submitAnalyticsEvent } from './analytics';

const CVBABY_ENV = process.env.CVBABY_ENV;
const CVBABY_TABLE_RESUMES = process.env.CVBABY_TABLE_RESUMES;
const logger = createLogger('cvbaby-gql');

export async function getResume(slug, analyticsData) {
  logger.debug(`Getting resume with slug '${slug}'`, {
    fn: 'getResume'
  });
  try {
    const { userID, resumeID } = await getSlug(slug);
    const resume = await getDatabaseItem(CVBABY_TABLE_RESUMES, {
      userID,
      resumeID
    });
    if (!resume || !resume.live) {
      return new Error('![404] Not found');
    }
    if (analyticsData.submitAnalyticsEvent && analyticsData.userID !== userID) {
      // Don't submit an event if user is viewing their own resume.
      submitAnalyticsEvent(resumeID, analyticsData.ipAddress);
    }
    return resume;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

export async function getResumeByID(userID, resumeID) {
  logger.debug(`Getting resume with ID '${resumeID}' for owner '${userID}'`, {
    fn: 'getResume'
  });
  try {
    const resume = await getDatabaseItem(CVBABY_TABLE_RESUMES, {
      userID,
      resumeID
    });
    if (!resume) {
      return new Error('![404] Not found');
    }
    return resume;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

export async function getResumes(userID, fetchAnalytics = false) {
  logger.debug(`Getting resumes for owner '${userID}'`, {
    fn: 'getResumes'
  });
  try {
    const resumes = await queryDatabaseItems(
      CVBABY_TABLE_RESUMES,
      'userID = :userID',
      { ':userID': userID }
    );
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
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

export async function saveResume(email, userID, resume, base64Image) {
  // Verify subscription status.
  const authorized = await hasActiveSubscription(email);
  if (!authorized) {
    return new Error(
      '![403] Active subscription is required to perform this action'
    );
  }

  try {
    // Save the resume.
    const savedResume = resume.resumeID
      ? await updateResume(userID, resume, base64Image)
      : await createResume(userID, resume, base64Image);
    // Render the new resume to a downloadable PDF.
    const payload = JSON.stringify({
      slug: resume.slug,
      path: `users/${userID}/${savedResume.resumeID}`
    });
    if (CVBABY_ENV === 'local') {
      axios.post('http://127.0.0.1:3003/renderPDF', payload).catch(error => {
        logger.error(error, { fn: 'saveResume' });
      });
    } else {
      // Invoke lambda to render PDF of resume.
      invokeLambda(
        `cvbaby-pdf-${CVBABY_ENV === 'prod' ? '' : CVBABY_ENV + '-'}renderPDF`,
        JSON.stringify(payload)
      );
    }
    // Return the updated resume.
    return savedResume;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

export async function removeResume(email, userID, resumeID) {
  // Verify subscription status.
  const authorized = await hasActiveSubscription(email);
  if (!authorized) {
    return new Error(
      '![403] Active subscription is required to perform this action'
    );
  }

  logger.info(`Removing resume '${resumeID}' for owner '${userID}'`, {
    fn: 'updateResume'
  });
  try {
    // Get the resume.
    const resume = await getResumeByID(userID, resumeID);
    // Delete the slug.
    resume.slug && (await deleteSlug(resume.slug, userID));
    // Delete the resume.
    await deleteDatabaseItem(CVBABY_TABLE_RESUMES, {
      userID,
      resumeID
    });

    // TODO: Delete resume profile image and PDF files
    //   await S3.deleteObject({
    //     Bucket: CVBABY_HOST_DATA,
    //     Key: `users/${userID}/${resumeID}/profile.jpeg`
    //   }).promise();

    return resume;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

async function createResume(userID, resume, base64Image) {
  logger.info(`Creating resume for owner '${userID}'`, {
    fn: 'createResume'
  });
  try {
    // Convert all empty strings to null for DynamoDB.
    const resumeSaveable = _.deep(_.mapValues)(resume, value => {
      return value === '' ? null : value;
    });
    // Create a new UUID.
    const resumeID = uuid();
    resumeSaveable.resumeID = resumeID;
    resumeSaveable.userID = userID;
    // Create a new slug.
    await createSlug(resume.slug, userID, resumeID);
    // Save resume to the database.
    await putDatabaseItem(CVBABY_TABLE_RESUMES, resumeSaveable);
    // If there's an image to process, process it.
    if (base64Image) {
      await uploadImage(userID, resumeID, base64Image);
    }
    return resumeSaveable;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

async function updateResume(userID, resume, base64Image) {
  logger.info(`Updating resume for owner '${userID}'`, {
    fn: 'updateResume'
  });
  try {
    // Get the old resume.
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
    // Update resume in the database.
    await putDatabaseItem(CVBABY_TABLE_RESUMES, resumeSaveable);
    // If there's an image to process, process it.
    if (base64Image) {
      await uploadImage(userID, resumeSaveable.resumeID, base64Image);
    }
    return resumeSaveable;
  } catch (error) {
    const message = '![500] Internal server error.';
    return new Error(message);
  }
}

function uploadImage(userID, resumeID, base64Image) {
  const payload = {
    userID,
    resumeID,
    base64Image
  };
  if (CVBABY_ENV === 'local') {
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

async function hasActiveSubscription(email) {
  logger.info(`Verifying subscription state for user with email '${email}'`, {
    fn: 'hasActiveSubscription'
  });
  const cognitoUser = await getCognitoUser(email);
  const subscriptionState = cognitoUser.getSubscriptionState();
  return subscriptionState === '1';
}
