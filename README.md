<p align="center">
    <a href="https://anteaterpathway.com">
        <img alt="anteater-pathway-logo" src="https://raw.githubusercontent.com/anthopark/Anteater-Pathway/master/frontend/public/favicon.svg" width="100" />
    </a>
</p>

<h1 align="center">Anteater Pathway</h1>

<p align="center">Drag n Drop UCI Degree Plan Helper</p>


## How it works

1. Search and browse all UCI courses.
2. Drag and drop courses to plan academic years.
3. Load and save your planner.
4. View course information on the right hand card.

## Features

* Drag & drop course items to visually plan out path to graduation
* Browse and search courses and view their information including  
* Add multiple school years to complete entire degree plan
* Responsive Design for Desktops and Tablets

## Getting Started

This instruction is for setting up the project locally.

Anteater Pathway is composed of two different parts. The `frondend` directory contains a Next.js (a React.js framework) for client application, and the directory `backend` contains a Node.js  server to handle requests from the client app for connection to MongoDB Atlas. The Next.js project at the root was created by `npx create-next-app` and the backend Node.js project was created by `npm init`.

### Prerequisites

You need `npm` command to run both frontend Next.js project and the backend Node.js Project. This requires [Node.js](https://nodejs.org/en/) installation in your local machine.

### The Next.js Frontend Project

The Next.js app will by default run on `localhost:3000`

1. Clone the repository and change directory to the root.

``` shell
git clone git@github.com:anthopark/Anteater-Pathway.git
cd Anteater-Pathway/frontend
```

2. Install npm dependencies.
 
``` shell
npm install
```

3. Run the app locally.

``` shell
npm start
```
* If Nodemon is installed globally,
``` shell
npm run dev
```

### The Node.js Backend Project Deployed on Heroku

This backend project will try to establish connection to MongoDB Atlas with the `ATLAS_URI` environment variable in `.env`, which isn't shared in this repository. However, the Node.js server is currently deployed on the Heroku, listening to HTTP requests [here](https://anteater-pathway.herokuapp.com/). Note that the development environment for Next.js app is configured to make requests to this deployment.