'use strict';

const fetchUserPageSql = `
SELECT
  u.id,
  u.first_name as "firstName",
  u.last_name as "lastName"
FROM users AS u
ORDER BY u.id
LIMIT $[limit] OFFSET $[offset]
`;

function fetchUsersPage(db, offset, limit) {
  return db.any(fetchUserPageSql, {offset, limit});
}

const fetchUserFriendsPageSql = `
SELECT
  u.id,
  u.first_name as "firstName",
  u.last_name as "lastName"
FROM friends AS f
INNER JOIN users AS u ON f.friend_user_id = u.id
WHERE f.user_id = $[userId]
ORDER BY u.id
LIMIT $[limit] OFFSET $[offset]
`;

function fetchUserFriendsPage(db, userId, offset, limit) {
  return db.any(fetchUserFriendsPageSql, {userId, offset, limit});
}

module.exports = {
  fetchUsersPage,
  fetchUserFriendsPage,
};
