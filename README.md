<p align="center">
    <a href="https://anteaterpathway.com">
        <img alt="anteater-pathway-logo" src="nextjs-client/public/logo.svg" width="50" />
    </a>
</p>

<h1 align="center">Anteater Pathway</h1>

<p align="center">
    <a href="https://anteaterpathway.com">
        www.anteaterpathway.com
    </a>
</p>

<p align="center">Drag n Drop UCI Degree Planner</p>

<p align="center">
    <a href="https://anteaterpathway.com">
        <img alt="demo-animation" src="demo.gif" width="795"/>
    </a>
</p>

## How to use

1. Search and browse all courses at UC Irvine.
2. Drag and drop courses to plan academic years.
3. Load and save your planner.
4. View course information on the right hand card.

## Features

- Drag & drop course items to visually plan out path to graduation
- Browse and search courses and view their information including
- Add multiple school years to complete entire degree plan
- Input custom unit value for research credit courses
- Display previous quarters a course had been offered
- Responsive Design for Desktops and Tablets

## How to Contribute

### What do I need to know to contribute?

- **Absolutely Critical**: Javascript
- **Helps a lot**: Git/Github, React.js, Node.js, MongoDB, JSON Web APIs

### Project Structure

Anteater Pathway is a Javascript full-stack web application. The frontend is written with **Next.js** (a React framework) and the server-side logic is written with **Node.js**. The backend **MongoDB** is deployed with MongoDB Atlas, a cloud database service by MongoDB. Note that the frontend and backend are two different NPM projects. The frontend Next.js app is created by `npx create-next-app` and the backend Node.js app was initialized with `npm init`.

### How is it deployed?

The frontend Next.js app is deployed through **Netlify** with Github CI/CD integration. Push to the master branch will automatically trigger a build and deployment on Netlify.

The backend Node.js app is deployed using **Heroku**. The master branch of the backend directory is linked to Heroku CLI ‘heroku’ branch so push to the remote 'heroku' branch will automatically build and run the app on Heroku.

### Setting up locally

#### Frontend

frontend directory contains the Next.js project for the client-facing app. The app will run at `localhost:3000`

- Clone the repository and go to the `frontend/`.

```shell
git clone git@github.com:anthopark/Anteater-Pathway.git
cd Anteater-Pathway/frontend
```

- Install NPM dependencies

```shell
npm install
```

- Run the app

```shell
npm start
```

- If Nodemon is installed globally,

```shell
npm run dev
```

#### Backend

backend directory contains the Node.js project for the webserver that interacts with MongoDB Atlas.

- Change to the backend/ directory.

```shell
cd Anteater-Pathway/backend
```

- Install NPM dependencies

```shell
npm install
```

- Run the app

```shell
npm start
```

- If Nodemon is installed globally,

```shell
npm run dev
```

**Important**: You need `.env` file present right under the backend directory along with `server.js`. The `.env` should include a MongoDB URI as the server.js tries to connect to the MongoDB Atlas upon running. This is not shared with the public for obvious reasons and only shared with the team members of contributors.

### Git/Github Workflow

As mentioned above, the **master** branch is linked to the Netlify deployment pipeline. Please do not push directly to the master branch. You should create a new branch off of the **dev** branch and make PR to the dev branch. Once approved, the team will once again test the app in the dev branch before pushing it to the master.

For example, you want to implement RateMyProfessor Integration for a new feature.

- Check out the dev branch.

```shell
git checkout dev
```

- Pull the latest changes from the dev branch

```shell
git pull origin dev
```

- Create a new branch off of the dev branch

```shell
git checkout -b feature-RMP-Integration
```

- After finishing implementations, add the changes to the stage and commit

```shell
git add . && git commit -m "Implement RMP integration"
```

- Push to the remote repository

```shell
git push origin feature-RMP-Integration
```

- Go to the GitHub repository and create a Pull Request to the dev branch.

- Other members will review the change and merge to the dev branch once approved.

## License

MIT License

See [LICENSE](/LICENSE) for the full text.
