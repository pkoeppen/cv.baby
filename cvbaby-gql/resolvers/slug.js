import { createLogger, DynamoDB } from '../../cvbaby-common';

const CVBABY_TABLE_SLUGS = process.env.CVBABY_TABLE_SLUGS;
const logger = createLogger('cvbaby-gql');

export async function getSlug(slug) {
  const _slug = await DynamoDB.get({
    TableName: CVBABY_TABLE_SLUGS,
    Key: { slug }
  })
    .promise()
    .then(({ Item }) => Item);
  if (!_slug) {
    throw new Error('![404] Not found');
  }
  return _slug;
}

export async function checkSlugAvailable(slug) {
  return DynamoDB.get({
    TableName: CVBABY_TABLE_SLUGS,
    Key: { slug }
  })
    .promise()
    .then(({ Item }) => !Item);
}

export async function createSlug(slug, userID, resumeID) {
  if (!(await checkSlugAvailable(slug))) {
    throw new Error('![409] Slug is taken');
  }
  logger.info(`Creating slug '${slug}' for user '${userID}'`, {
    fn: 'createSlug'
  });
  return DynamoDB.put({
    TableName: CVBABY_TABLE_SLUGS,
    Item: {
      slug,
      userID,
      resumeID
    },
    ReturnValues: 'ALL_OLD'
  })
    .promise()
    .then(({ Attributes }) => Attributes);
}

export function deleteSlug(slug, userID) {
  logger.info(`Deleting slug '${slug}' for user '${userID}'`, {
    fn: 'deleteSlug'
  });
  return DynamoDB.delete({
    TableName: CVBABY_TABLE_SLUGS,
    Key: { slug },
    // Only delete if the request came from the owner.
    ConditionExpression: 'userID = :userID',
    ExpressionAttributeValues: {
      ':userID': userID
    },
    ReturnValues: 'ALL_OLD'
  })
    .promise()
    .then(({ Attributes }) => Attributes)
    .catch(error => {
      logger.error(error, { fn: 'deleteSlug' });
      throw error;
    });
}
