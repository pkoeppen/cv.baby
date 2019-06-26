import { DynamoDB } from '../util';

const CVBABY_TABLE_SLUGS = process.env.CVBABY_TABLE_SLUGS;

export function getSlug(slug) {
  return DynamoDB.get({
    TableName: CVBABY_TABLE_SLUGS,
    Key: { slug }
  })
    .promise()
    .then(({ Item }) => Item);
}

export async function checkSlugAvailable(slug) {
  return !(await getSlug(slug));
}

export async function createSlug(slug, userID, resumeID) {
  if (!(await checkSlugAvailable(slug))) {
    throw new Error('![409] Slug is taken');
  }
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
    .then(({ Attributes }) => Attributes);
}
