# Running Next JS Application


## Prerequisite


### .env.local

The `.env.local` includes some credentials for Firebase Auth and other configuration values that are necessary for the application at run time. It should be place under `Anteater-Pathway/nextjs-client`. This file will be provided through Slack, and should be kept in safely. 

### Install Node.js

You can install LTS version of Node.js [here](https://nodejs.org/en/).

Check the installation by running:
``` Bash
$ node -v
v16.14.2

$ npm -v
8.5.0
```

### Install Yarn

[Yarn](https://yarnpkg.com/) is a software packaging system for Node.js runtime environment. This will help install the dependencies for the Next.js application.

``` Bash
$ npm install --global yarn
```

### Install Dependencies

``` Bash
$ cd nextjs-client
$ yarn install
```

## Running in Dev Mode

Running the application in dev mode allows the runtime to detect changes in the source files and render the up-to-date UI on a browser.

``` Bash
$ yarn dev
```

You should be able to access the UI at `localhost:3000`.

If you run into `FirebaseError`, make sure the `.env.local` file is placed under `Anteater-Pathway/nextjs-client`.



