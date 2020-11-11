import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import pick from 'lodash/pick';

import { User } from '../../entities/User';
import { userSerializer } from '../../serializers/user';

const requestParams = {
  email: 'Email',
  nickname: 'Nickname',
  password: 'Password'
};

const signInRequiredParams = Object.freeze(['login', 'password']);

function checkRequiredParams({ params, requiredParams }) {
  return requiredParams.map(key => (!params[key] ? `${requestParams[key]} is required` : null)).filter(error => error);
}

export async function loginUser(request: Request, response: Response) {
  const clearParams = pick(request.body, signInRequiredParams);
  const errors = checkRequiredParams({ params: clearParams, requiredParams: signInRequiredParams });
  if (errors.length) return response.json({ error: errors });
  const { login, password } = clearParams;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ login });
  if (!user) return response.json({ error: 'There is no user with this email address!' });

  const { password: userPass } = user;

  const isValidPass = userPass === password;
  if (!isValidPass) return response.json({ error: 'The password is incorrect!' });

  request.session.userId = user.id;
  return response.json({ user: userSerializer(user) });
}

export async function authUser(request: Request, response: Response) {
  if (request.session.userId || (request.user && request.user.id)) {
    if (!request.session.userId) request.session.userId = request.user.id;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(request.session.userId);
    if (!user) return response.json({ error: 'There is no user with this email address!' });

    return response.json({ user: userSerializer(user) });
  } else return response.json({ user: null });
}

export async function logoutUser(request: Request, response: Response) {
  request.session.destroy();
  if (request.logout) request.logout();
  response.json({ success: true });
}
