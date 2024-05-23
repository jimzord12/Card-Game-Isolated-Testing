# GENERA's Serious Online Multiplayer Blockchain Game

## Run Project Locally

There are 2 ways of running the code locally

### Docker 🐳

1. Make sure you have Docker installed and running.
2. Go to the project directory.
3. IMPORTANT! Inside the directory should be a folder named "card-game-isolated-testing", you need to cd into it.

```shell
cd card-game-isolated-testing
```

4. Now, run the following command:

```shell
docker-compose -f docker-compose.dev.yml up
```

5. Open a Browser and go here http://localhost:5173/

6. It might take a little (5-10s) but afterwards you should see the Game's Home Page.

### Without Docker

1. Git clone or download the project's files
2. IMPORTANT! Inside the directory should be a folder named "card-game-isolated-testing", you need to cd into it.

```shell
cd card-game-isolated-testing
```

3. Open the terminal at that location (.../YOUR-PATH/Card-Game-Isolated-Testing/card-game-isolated-testing) and run:

```
npm run i
```

4. Once all the dependencies are download and installed, by running the following command you should be able to start the app:

```
npm run dev
```

## About the Project

This project is a Serious Web Game developed as part of the European project GENERA-LIFE.

It's goal is to inform citizens and municipalities about the importance of Transitioning to Renewable EnergySolutions.
