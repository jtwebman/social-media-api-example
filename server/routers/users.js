'use strict';

const express = require('express');
const {StatusCodes} = require('http-status-codes');
const validate = require('validate.js');

const {getUserPage, getUserFriendsPage} = require('../managers/users');

const pagingQueryConstraints = {
  page: {
    type: 'string',
    numericality: {
      strict: true,
      onlyInteger: true,
      greaterThanOrEqualTo: 1,
    },
  },
  size: {
    type: 'string',
    numericality: {
      strict: true,
      onlyInteger: true,
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 100,
    },
  },
};


function getUsersRouter(context) {
  // eslint-disable-next-line new-cap
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const validationResults = validate(req.query, pagingQueryConstraints, {format: 'flat'});
      if (validationResults) {
        return res.status(StatusCodes.BAD_REQUEST).json(validationResults);
      }
      let page = parseInt(req.query.page, 10);
      if (isNaN(page) ) {
        page = 1;
      }
      let size = parseInt(req.query.size, 10);
      if (isNaN(size)) {
        size = 10;
      }
      const data = await getUserPage(context.db, page, size);
      res.json(data);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.stack});
    }
  });

  router.get('/:userId(\\d+)/friends', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const validationResults = validate(req.query, pagingQueryConstraints, {format: 'flat'});
      if (validationResults) {
        return res.status(StatusCodes.BAD_REQUEST).json(validationResults);
      }
      let page = parseInt(req.query.page, 10);
      if (isNaN(page) ) {
        page = 1;
      }
      let size = parseInt(req.query.size, 10);
      if (isNaN(size)) {
        size = 10;
      }
      const data = await getUserFriendsPage(context.db, userId, page, size);
      res.json(data);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.stack});
    }
  });

  return router;
}

module.exports = getUsersRouter;
