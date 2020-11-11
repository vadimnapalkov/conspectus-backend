import pick from 'lodash/pick';

const whiteTaskFields = Object.freeze(['id', 'uuid', 'body', 'completed', 'discarded', 'comment', 'parentUuid']);

export function taskSerializer(tasks) {
  return Array.isArray(tasks) ? tasks.map(task => pick(task, whiteTaskFields)) : pick(tasks, whiteTaskFields);
}
