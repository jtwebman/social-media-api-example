'use strict';

const supertest = require('supertest');
const {StatusCodes} = require('http-status-codes');
const assert = require('chai').assert;

const getApp = require('../../../server/app');
const getTestContext = require('../../lib/get-test-context');

describe('users', () => {
  let app;

  before(async () => {
    const context = await getTestContext();
    app = getApp(context);
  });

  it('returns users default to page 1 size 10', () =>
    supertest(app)
      .get('/api/users')
      .then(res => {
        assert.equal(res.status, StatusCodes.OK);
        assert.equal(res.body.page, 1);
        assert.equal(res.body.size, 10);
        assert.equal(res.body.users.length, 10);
      }));

  it('returns bad request when page is not a integer >= 1', () =>
    supertest(app)
      .get('/api/users?page=-1')
      .then(res => {
        assert.equal(res.status, StatusCodes.BAD_REQUEST);
        assert.deepEqual(res.body, ['Page must be greater than or equal to 1']);
      }));

  it('returns bad request when size is not a integer between 1 and 100', () =>
    supertest(app)
      .get('/api/users?size=1000')
      .then(res => {
        assert.equal(res.status, StatusCodes.BAD_REQUEST);
        assert.deepEqual(res.body, ['Size must be less than or equal to 100']);
      }));

  it('returns bad request when page and size are not integer', () =>
    supertest(app)
      .get('/api/users?page=bad&size=break')
      .then(res => {
        assert.equal(res.status, StatusCodes.BAD_REQUEST);
        assert.deepEqual(res.body, [
          'Page must be a valid number',
          'Size must be a valid number',
        ]);
      }));

  it('returns empty if past last page', () =>
    supertest(app)
      .get('/api/users?page=201&size=10')
      .then(res => {
        assert.equal(res.status, StatusCodes.OK);
        assert.equal(res.body.users.length, 0);
      }));

  describe('user friends', () => {
    it('returns users friends default to page 1 size 10', () =>
      supertest(app)
        .get('/api/users/1/friends')
        .then(res => {
          assert.equal(res.status, StatusCodes.OK);
          assert.equal(res.body.page, 1);
          assert.equal(res.body.size, 10);
          assert.equal(res.body.friends.length, 10);
        }));

    it('returns bad request when page is not a integer >= 1', () =>
      supertest(app)
        .get('/api/users/1/friends?page=-1')
        .then(res => {
          assert.equal(res.status, StatusCodes.BAD_REQUEST);
          assert.deepEqual(res.body, ['Page must be greater than or equal to 1']);
        }));

    it('returns bad request when size is not a integer between 1 and 100', () =>
      supertest(app)
        .get('/api/users/1/friends?size=1000')
        .then(res => {
          assert.equal(res.status, StatusCodes.BAD_REQUEST);
          assert.deepEqual(res.body, ['Size must be less than or equal to 100']);
        }));

    it('returns bad request when page and size are not integer', () =>
      supertest(app)
        .get('/api/users/1/friends?page=bad&size=break')
        .then(res => {
          assert.equal(res.status, StatusCodes.BAD_REQUEST);
          assert.deepEqual(res.body, [
            'Page must be a valid number',
            'Size must be a valid number',
          ]);
        }));

    it('returns empty if past last page', () =>
      supertest(app)
        .get('/api/users/1/friends?page=201&size=10')
        .then(res => {
          assert.equal(res.status, StatusCodes.OK);
          assert.equal(res.body.friends.length, 0);
        }));
  });
});
