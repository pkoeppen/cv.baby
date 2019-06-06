import { _, DynamoDB } from '../util';

const CVBABY_TABLE_USERS = process.env.CVBABY_TABLE_USERS;

export function getUser(principalId) {
  return DynamoDB.get({
    TableName: CVBABY_TABLE_USERS,
    Key: {
      userId: principalId
    }
  })
    .promise()
    .then(({ Item }) => Item);
}

export function getResumes(principalId) {
  return getUser(principalId).then(({ resumes }) => {
    return resumes;
  });
}

export function saveResume(principalId, index, resume) {
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
      userId: principalId
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: {
      // Wrap resume in an array for list_append.
      ':resume': index === -1 ? [resumeSaveable] : resumeSaveable
    },
    ReturnValues: 'ALL_NEW'
  })
    .promise()
    .then(({ Attributes }) => Attributes.resumes.pop());
}

export function removeResume(principalId, index) {
  const updateExpression = `REMOVE resumes[${index}]`;
  return DynamoDB.update({
    TableName: CVBABY_TABLE_USERS,
    Key: {
      userId: principalId
    },
    UpdateExpression: updateExpression,
    ReturnValues: 'ALL_OLD'
  })
    .promise()
    .then(({ Attributes }) => Attributes.resumes[index]);
}
