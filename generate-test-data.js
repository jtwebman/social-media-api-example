'use strict';

/*
This is a node script to generate test data. You need to pass two arguments.
First argument is the total user accoutns to generate defaults to 2000
Second argument is the max friends a user can have and defaults to 500
*/

const faker = require('faker');
const {range} = require('lodash');

const args = process.argv.slice(2);

function sqlDataRow(row) {
  return row.map(item => {
    switch (typeof item) {
    case 'string':
      return `'${item.replace('\'', '\'\'')}'`;
    default:
      return `${item}`;
    }
  });
}

function generateInserts(table, columns, values) {
  return `INSERT INTO ${table} (${columns.join(', ')})
VALUES
  ${values.map(i => `(${sqlDataRow(i).join(', ')})`).join(',\n  ')};`;
}

const userCount = args[0] || 2000;
const maxFriends = args[1] || 500;

const users = range(userCount).map(i => [i + 1, faker.name.firstName(), faker.name.lastName()]);

const friendMap = users.reduce((newFriends, user) => {
  const numberOfFriends = Math.floor(Math.random() * maxFriends) + 1;
  const userFriends = users.slice().sort(() => .5 - Math.random()).slice(0, numberOfFriends);
  userFriends.forEach(friend => {
    if (!newFriends[user[0]][friend[0]] &&
      Object.keys(newFriends[friend[0]]).length < maxFriends &&
      Object.keys(newFriends[user[0]]).length < maxFriends) {
      newFriends[user[0]][friend[0]] = true;
      newFriends[friend[0]][user[0]] = true;
    }
  });
  return newFriends;
}, users.reduce((map, user) => {
  map[user[0]] = {};
  return map;
}, {}));

const friends = Object.keys(friendMap).reduce((newFriends, userId) => {
  Object.keys(friendMap[userId]).forEach(friendId => {
    newFriends.push([userId, friendId]);
  });
  return newFriends;
}, []).map((friend, index) => [index, parseInt(friend[0], 10), parseInt(friend[1], 10)]);

console.log('TRUNCATE TABLE users RESTART IDENTITY CASCADE;');
console.log(generateInserts('users', ['id', 'first_name', 'last_name'], users));
console.log(generateInserts('friends', ['id', 'user_id', 'friend_user_id'], friends));
