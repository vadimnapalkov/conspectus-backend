import wrap from 'express-async-wrap';
import { loginUser, authUser, logoutUser } from './controller/user';
import { getInitialData } from './controller/initialData';
import { createTask, deleteTask, updateTask } from './controller/task';
import { updateSettings, completeMeeting } from './controller/settings';

export const AppRoutes = [
  {
    path: '/api/user/signin',
    method: 'post',
    action: wrap(loginUser)
  },
  {
    path: '/api/user/auth',
    method: 'get',
    action: wrap(authUser)
  },
  {
    path: '/api/user/logout',
    method: 'post',
    action: wrap(logoutUser)
  },
  {
    path: '/api/initial_data',
    method: 'get',
    action: wrap(getInitialData)
  },
  {
    path: '/api/task',
    method: 'post',
    action: wrap(createTask)
  },
  {
    path: '/api/task/:uuid',
    method: 'delete',
    action: wrap(deleteTask)
  },
  {
    path: '/api/task/:uuid',
    method: 'put',
    action: wrap(updateTask)
  },
  {
    path: '/api/settings',
    method: 'put',
    action: wrap(updateSettings)
  },
  {
    path: '/api/settings/complete_meeting',
    method: 'post',
    action: wrap(completeMeeting)
  }
];
