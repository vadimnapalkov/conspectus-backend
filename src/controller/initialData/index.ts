import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import dayjs from 'dayjs';

import { Settings } from '../../entities/Settings';
import { Task } from '../../entities/Task';
import { settingsSerializer } from '../../serializers/settings';
import { taskSerializer } from '../../serializers/task';
import { nextMonday } from '../../utils/nextMonday';

export async function getInitialData(request: Request, response: Response) {
  const settingsRepository = getRepository(Settings);
  const tasksRepository = getRepository(Task);
  const settings = await settingsRepository.findOne();
  const tasks = await tasksRepository.find({ where: { discarded: false }, order: { createdAt: 'ASC' } });

  if (
    dayjs()
      .startOf('day')
      .diff(dayjs(settings.dateOfMeeting)) > 0
  ) {
    settings.dateOfMeeting = nextMonday();
    await settingsRepository.save(settings);
  }
  response.json({ settings: settingsSerializer(settings), tasks: taskSerializer(tasks) });
}
