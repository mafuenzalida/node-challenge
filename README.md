# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. Be sure to have the project running. |


Happy hacking 😁!


## Thought Process

Before doing anything with the project I started reviewing this Readme and the repo to get a good grasp of what were the objectives to accomplish and how the app worked.
With all the information processed, I came up with a list of stuff to be done for the challenge:

- Setup the work environment
- Setup the backbone of the new expense module
- Add kinex as a querybuilder to ease up query development (for the task and hipotetic next features)
- Build a simple route getting the expenses out of the db
- Add pagination, filtering and sorting to the route
- Add an input validator
- Add swagger to document routes
- *Always add and update tests throught all development

Everything was built using the previous list as a guide. Always mantaining and extending the current  project's structure (important to mantain conventions in existing projects).
Some decisions made:
- The focus for the challenge was on building the new route using best practices, adding all kind of features to it, use of good typing, and adding good test coverage.
- Some tweaks to the existing domain were made, but just enough to keep it similar with the new one
- Models, inputs, and ouputs were based on existing data given in the project
- Everything new was built thinking in extensibility (in the hipotetic case that this was going to be continued)

Finally, as mentioned there are a lot of more things that could be done, but as time is not infinite, I leave some of them here as ideas:
- Move pagination definitions to a more general place so it can be reused in a simpler way
- Add more routes as getting all expenses, or getting all the expenses for users in a same company, to give some examples.
- Add authentication (e.g. using jwt)
- Resolve some problems with dependencies
- Update user routes to use knex too
- ...
