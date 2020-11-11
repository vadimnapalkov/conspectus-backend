import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Task } from '../../entities/Task';
import { taskSerializer } from '../../serializers/task';

export async function createTask(request: Request, response: Response) {
  const taskRepository = getRepository(Task);

  const {
    task: { uuid, body, completed, discarded, comment, parentUuid }
  } = request.body;

  const currentUserId = request.session.userId;
  if (!currentUserId) return response.json({ error: "You don't have access, log in first" });

  const newTask = new Task();
  newTask.uuid = uuid;
  newTask.body = body;
  newTask.completed = completed;
  newTask.discarded = discarded;
  newTask.comment = comment;
  newTask.parentUuid = parentUuid;

  await taskRepository.save(newTask);

  return response.json({ task: taskSerializer(newTask) });
}

export async function updateTask(request: Request, response: Response) {
  const taskRepository = getRepository(Task);

  const uuid = request.params.uuid;

  const { task: newParams } = request.body;

  const currentUserId = request.session.userId;
  if (!currentUserId) return response.json({ error: "You don't have access, log in first" });

  if (!uuid) return response.json({ error: "We couldn't find this task!" });

  const task = await taskRepository.findOne({ uuid });

  if (!task) return response.json({ error: "We couldn't find this task!" });

  const updatedTask = await taskRepository.save({ ...task, ...newParams });

  return response.json({ task: taskSerializer(updatedTask) });
}

export async function deleteTask(request: Request, response: Response) {
  const taskRepository = getRepository(Task);

  const uuid = request.params.uuid;

  const currentUserId = request.session.userId;
  if (!currentUserId) return response.json({ error: "You don't have access, log in first" });

  if (!uuid) return response.json({ error: "We couldn't find this task!" });

  const task = await taskRepository.findOne({ uuid });

  if (!task) return response.json({ error: "We couldn't find this task!" });

  await taskRepository.remove(task);

  return response.json({ success: true });
}
