import { createConnection, getRepository } from 'typeorm';

import { nextMonday } from '../utils/nextMonday';
import { Settings } from '../entities/Settings';

createConnection()
  .then(async () => {
    const settingsRepository = getRepository(Settings);
    const settings = await settingsRepository.findOne();
    if (!settings)
      await settingsRepository.insert({
        dateOfMeeting: nextMonday()
      });
    console.log('Table settings successfully filled');
    process.exit();
  })
  .catch(error => console.error(error));
