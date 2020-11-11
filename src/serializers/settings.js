import pick from 'lodash/pick';

const whiteSettingsFields = Object.freeze(['dateOfMeeting']);

export function settingsSerializer(settings) {
  return pick(settings, whiteSettingsFields);
}
