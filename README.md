# BlockApps-WebApi

## Live Resources:

The React frontend is available at http://blockapps-server-alb-566453451.us-east-1.elb.amazonaws.com.

The api endpoint is available at http://blockapps-server-alb-566453451.us-east-1.elb.amazonaws.com/release?tagName=9.0.0.

## Introduction:

This repo contains 3 separate projects within the src directory:

- server - this contains a simple Express.js server that returns the time and date that a release was created for https://github.com/blockapps/strato-getting-started based on the tag name.
- client - this contains a simple React frontend that consumes the API.
- terraform - this contains an IAC setup for deploying this server and client to AWS.

## Contributing:

This repository utilizes semantic release (https://github.com/semantic-release/semantic-release). Semantic release automatically versions releases based on commit history.
In order to indicate a change has been created that should generate a release, commit messages should be prefixed with either 'fix: ', 'feat: ', 'perf: ', or 'BREAKING CHANGE: '.

**If a branch push/pull request is merged into main with no commits indicating a release should be released, the CI will fail and no versions will be released.**

The table belows show what type of release each commit message indicates.

| Commit message                                                                                                                                                                           | Release type                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `fix: stop graphite breaking when too much pressure applied`                                                                                                                             | ~~Patch~~ Fix Release                                                                                           |
| `feat: add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release                                                                                       |
| `perf: remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release <br /> (Note that the `BREAKING CHANGE: ` token must be in the footer of the commit) |

## Running Projects Locally:

### Prereqs:

- Node and npm must be installed on your machine. Installation instructions can be found here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

### Express.js Server:

In order to run the server, you must have node and npm installed.

To run the Express.js server, cd into the `/src/server` directory and run the following commands:

```
npm install
node index.js
```

### React Client:

To run the frontend as separate project (disconnected from the backend), cd into the `/src/client` and run the following commands:

```
npm install
npm start
```

To run the frontend attached to the Express server, first build the react app by cding into `/src/client` and run the following commands:

```
npm install
npm run build
```

Then, start the server. The frontend will be published at http://localhost:3000/.

## Testing Locally:

### Prereqs:

- Cypress should be installed. Instructions can be found here: https://www.cypress.io.

### Run Cypress Tests:

This project uses Cypress to perform testing for both the React frontend and the Express server. The tests can be ran two ways: one printing the output directly into the command line and the other using an automated browser.

- To run the Cypress tests on the command line, cd into the `src/test/` and run the following commands:

```
npm install
npx cypress run

```

- To run the Cypress tests using an automated browser, cd into the `src/test/` and run the following commands:

```
npm install
npx cypress open

```
