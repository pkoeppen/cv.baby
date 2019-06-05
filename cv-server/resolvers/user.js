import * as _ from 'lodash';
import { DynamoDB } from '../util';

_.mixin({
  deep: function(map) {
    return function(obj, fn) {
      return map(
        _.mapValues(obj, function(value) {
          if (_.isPlainObject(value)) {
            return _.deep(map)(value, fn);
          } else if (_.isArray(value)) {
            return value.map(v => {
              if (_.isPlainObject(v)) {
                return _.deep(map)(v, fn);
              } else {
                return v;
              }
            });
          } else {
            return value;
          }
        }),
        fn
      );
    };
  }
});

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
    console.log(resumes);
    return resumes;
  });
}

export function saveResume(principalId, index, resume) {
  const resumeSaveable = _.deep(_.mapValues)(resume, value => {
    console.log('value:', value);
    return value === '' ? null : value;
  });
  console.log('final:', JSON.stringify(resumeSaveable, null, 2));
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
    }
  })
    .promise()
    .then(() => resumeSaveable);
}
