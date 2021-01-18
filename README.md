# Node Express Postgres Docker Social Media Example Project

This is just a simple Node.js Express Docker app that starts and shows off a basic social media api.

## Test Data

I created a script `generate-test-data.js` that can generate test data like I used in the repo with this command: `node generate-test-data.js 2000 200 > db/patches/2021-01-12-11-11-add-test-data.sql`. You can use it to load new data but thought it would be nice if the API started with some data.

# To start Everything up

To run locally or run the tests you will need to run `docker-compose up -d` to start the containers including postgres. So you will need to have docker setup. This also starts with some test data. 

# Try out the API

You can curl users like this if you have curl and jq installed. 

```
curl "0.0.0.0:3000/api/users?page=2&size=50" | jq
```

You can also get any users friend with the `/api/users/:userId/friends` get route like this:

```
curl "0.0.0.0:3000/api/users/10/friends?page=2&size=50" | jq
```

# Run tests

I wrote just some simple tests. You can run them with the command below. They do depend on the test data loaded in `db/patches/2021-01-12-11-11-add-test-data.sql` which isn't ideal but good enough for the coding assignment vs writing more test code to load data each test into the db and wiping at the end of the tests which is what I like to do most of the time in Node.js projects.

```
npm test
```

# Shut everything down.

To stop all the docker containers just run the following

```
docker-compose down
```