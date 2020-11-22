import { createConnection, getRepository } from 'typeorm';

import { nextMonday } from '../utils/nextMonday';
import { Settings } from '../entities/Settings';
import { User } from '../entities/User';

createConnection()
  .then(async () => {
    const settingsRepository = getRepository(Settings);
    const userRepository = getRepository(User);
    const settings = await settingsRepository.findOne();
    if (!settings)
      await settingsRepository.insert({
        dateOfMeeting: nextMonday()
      });
    const user = await userRepository.findOne();
    if (!user)
      await userRepository.insert({
        login: 'Vadim',
        password: '12345'
      });
    console.log('Table settings successfully filled');
    process.exit();
  })
  .catch(error => console.error(error));
