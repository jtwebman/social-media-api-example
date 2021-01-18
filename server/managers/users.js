'use strict';

const {fetchUsersPage, fetchUserFriendsPage} = require('../data/users');

async function getUserPage(db, page, size) {
  const usersPage = await fetchUsersPage(db, (page - 1) * size, size);
  return {
    page,
    size,
    users: usersPage,
  };
}

async function getUserFriendsPage(db, userId, page, size) {
  const userFriendsPage = await fetchUserFriendsPage(db, userId, (page - 1) * size, size);
  return {
    userId,
    page,
    size,
    friends: userFriendsPage,
  };
}

module.exports = {
  getUserPage,
  getUserFriendsPage,
};
