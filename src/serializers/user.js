import pick from 'lodash/pick';

const whiteListUserFields = Object.freeze(['login', 'id']);

export function userSerializer(user) {
  return pick(user, whiteListUserFields);
}
