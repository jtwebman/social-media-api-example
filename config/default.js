'use strict';

module.exports = {
  PORT: process.env.PORT || 3000,
  STATUS_PORT: 2368,
  DB_CONNECTION: process.env.DB_CONNECTION || 'postgres://social-media-user:password123!@db:5432/social-media',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'info',
};
