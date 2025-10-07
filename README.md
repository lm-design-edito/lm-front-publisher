# LM Front Publisher
This repository provides a front app for the LM Publisher API.

It is based on the [React + Typescript + Vite template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts)

# Pre-requisites
- Node 20x
- npm (included with Node.js)
- Git

## To run the project:

- Make you sure to copy your .env.example to your local .env with the variables you need.
```
cp .env.example .env 
```

- Make sure you either targets towards the distant API or your local API (in your .env) and that is properly installed and started.

- Make you sure dependencies are installed :
```
npm i
```

- Start the dev project : 
```
npm run dev
```

## To build the project:
- Build the project : 
```
npm run build
```
- Launch project on port 5001 : 
```
npm run start
```