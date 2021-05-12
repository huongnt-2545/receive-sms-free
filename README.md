# Installation
Clone the repo:
```sh
git clone git@github.com:tham-1781/receive-sms-free.git
cd receive-sms-free
```
Install the dependencies:
```sh
yarn install # or npm install
```
Set the environment variables:
```sh
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

# Commands
Running locally:
```sh
yarn dev # or npm run dev
```

Running in production:
```sh
yarn build # npm run build
yarn start # or npm start
```

# Linting:
```sh
# run ESLint
yarn lint
```

# Project Structure
```sh
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--index.ts        # App entry point

```
