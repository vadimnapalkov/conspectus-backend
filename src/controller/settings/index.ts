import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Settings } from '../../entities/Settings';
import { Task } from '../../entities/Task';
import { settingsSerializer } from '../../serializers/settings';
import { nextMonday } from '../../utils/nextMonday';

export async function updateSettings(request: Request, response: Response) {
  const settingsRepository = getRepository(Settings);

  const { settings: newParams } = request.body;

  const currentUserId = request.session.userId;
  if (!currentUserId) return response.json({ error: "You don't have access, log in first" });

  const settings = await settingsRepository.findOne();

  const updatedSettings = await settingsRepository.save({ ...settings, ...newParams });

  return response.json({ settings: settingsSerializer(updatedSettings) });
}

export async function completeMeeting(request: Request, response: Response) {
  const settingsRepository = getRepository(Settings);
  const tasksRepository = getRepository(Task);

  const currentUserId = request.session.userId;
  if (!currentUserId) return response.json({ error: "You don't have access, log in first" });

  const settings = await settingsRepository.findOne();
  const completedMeetings = await tasksRepository.find({ completed: true, discarded: false });
  const updatedMeetings = completedMeetings.map(meeting => ({ ...meeting, discarded: true }));

  await tasksRepository.save(updatedMeetings);
  settings.dateOfMeeting = nextMonday();
  await settingsRepository.save(settings);

  return response.json({ settings: settingsSerializer(settings) });
}
