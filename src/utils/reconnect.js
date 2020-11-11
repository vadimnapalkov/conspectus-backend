import { createConnection } from 'typeorm';

import { reconnectTimeout, reconnectAttemptsNumber } from '../constants';

export async function reconnect(attemptsCount = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reconnectAttempt(attemptsCount, resolve, reject), reconnectTimeout);
  });
}

function reconnectAttempt(attemptsCount, resolve, reject) {
  console.log(`Attempt to reconnect ${++attemptsCount}.`);
  createConnection()
    .then(() => {
      console.log('Connection to postgresql database established.');
      resolve();
    })
    .catch(async error => {
      console.log(error);
      if (attemptsCount === reconnectAttemptsNumber) {
        console.log('Failed to establish connection with postgresql database.');
        return reject();
      }
      setTimeout(() => reconnectAttempt(attemptsCount, resolve, reject), reconnectTimeout);
    });
}
