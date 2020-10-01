# Zot Planner

Drag n Drop UC Irvine degree planner. It is currently under development.

## Features

* Browse courses by departments and course level (Ex, lower division, graduate, etc.)
* Search courses by specifying departments and course
* Add school year such as 20-21, which includes 4 quarters in it
* Drag n Drop courses on the planner

## Getting Started

This instruction is for setting up the project locally.

Zot Planner is composed of two different parts. The root directory contains a React project, and the sub directory `backend` contains a Node.js/Express.js project. The React project at the root was created by `npx create-react-app` and the backend Node.js project was created by `npm init`. Additionally, the `course` directory contains the `Python` scripts for web scrapping the UCI course data and populating the `Mongodb Atlas DB`.

### Prerequisites

You will need `npm` command to run both frontend React project and the backend Node.js Project. This requires [Node.js](https://nodejs.org/en/) installation in your local machine.

### The React Frontend Project

The react app will by default run on `localhost:3000`

1. Clone the repository and change directory to the root.

``` shell
git clone git@github.com:anthopark/Zot-Planner.git
cd Zot-Planner
```

2. Install npm dependencies.
 
``` shell
npm install
```

3. Run the app locally.

``` shell
npm start
```

### The Node.js Backend Project

This backend project will try to establish connection to MongoDB Atlas using the `ATLAS_URI` environment variable in `.env`, which isn't currently shared in this repository. As in an early development stage, the frontend project can be run with dummy course data.  
