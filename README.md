# react-app-template

The react-app-template repository is a subjective boilerplate for quickly getting started with a [React](https://reactjs.org/) application. It contains both an [Express](https://www.npmjs.com/package/express) server and [Socket.io](https://www.npmjs.com/package/socket.io) web socket server to serve web content and enable seamless client-server communication respectively. [EJS](https://www.npmjs.com/package/ejs) has been used as a templating language to embed the React code and styles. I have implemented a small template client application that implements [Material-UI](https://material-ui.com/) components. Material-UI is a package which contains a wide range of reusable react components and is based off of Google's [Material Design](https://material.io/design/introduction/#principles) specification.

## Getting Started

To get started, simply click 'Use this template' or fork this repository and following the steps below.

## Installation

First, clone the repository, cd into the new folder and run an 'npm install'.

```
$ git clone https://github.com/you/react-app-template.git
$ cd react-app-template
$ npm install
```

## Starting Dev Environment

To start the development environment, run the following from the root of the repository.

```
$ npm start
```

Upon saving a client or server-side file, HMR will kick in, no need for a restart.

If you do need to restart the development environment at any point, then simply run the following.

```
$ rs
```

## Starting Production Environment

To compile and start the production build of the React application, run the following.

```
$ npm run build
$ npm run prod-start
```

To reload or stop the production building.

```
$ npm run prod-reload
$ npm run prod-stop
```

## What's in it?

### Razzle

At the centre of this boilerplate is the [Razzle](https://www.npmjs.com/package/razzle) package. Razzle provides a set of configurations, including [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/), that allow for the following:

- Client and Server-side [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) (HMR)
- ES6 Syntax compatibility
- [Jest](https://www.npmjs.com/package/jest) testing setup

Razzles' configurations can be easily customized to suit your needs through the razzle.congig.js file. I have added one of these to the root of the project and have implemented my own custom plugin. Although simple, this plugin allows you to specify the server and client entry points within your project using a set of environment variables. By default, Razzle uses ./src/index.js and ./src/client.js as the server and client entry points respectively, however, within this boilerplate, I have configured the client entry point to be ./src/common/renderers/domRenderer.js. This can be easily changed from within the 'start' script within package.json using the RAZZLE_SERVER_ENTRY_POINT & RAZZLE_CLIENT_ENTRY_POINT environment variables.

### PM2

[PM2](https://www.npmjs.com/package/pm2) is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

I have added a set of production scripts within package.json to start, stop and reload the production build of the application.

### Eslint & Prettier

To ensure code quality and consistency, [Eslint](https://eslint.org/) & [Prettier](https://prettier.io/) work alongside one another to enforce a set of predefined code rules which can be configured from the .eslintrc.js and .prettierrc.js files. To make the most out of these packages, I recommend installing the Eslint and Prettier VSCode extentions and enabling "editor.formatOnSave" within settings.json.

I have also provided an Eslint script within package.json which will scan and fix, where possible, all .js files within the ./src folder.

### cross-env

Prefixing several scripts within package.json, the [cross-env](https://www.npmjs.com/package/cross-env) command provides a solution for passing environment variables into your scripts without the worry of what platform you are running it from - whether that be Linux, Windows, MacOS, etc.

## Authors

- [Olly Rowe](https://github.com/ollyrowe/)
