# 🎵 Music Player

A music player created as part of a series of exercises for a course in Web Information Systems.

| Technology    |                     Description                    |
|:-------------:|:--------------------------------------------------:|
|  `Babel`      | Transpiler for next generation JavaScript (ES6)    |
|  `Express`    | Web application framework for NodeJS               |
|  `NodeJS`     | Server-side JavaScript runtime environment         |
|  `Sequelize`  | Object-Relational Mapping for NodeJS               |
|  `Sass`       | CSS preprocessor to add a little sass              |
|  `Webpack`    | Dependency manager                                 |


**NOTE:** Bootstrap 3.0 is included solely for the icons -- Any other source of icons will work. Grid/layout built using flex-box.

## Getting Started

### Requirements

In order to compile the files to obtain distribution-ready `.css` and `.js` files, you need a few things:

1. Node 6.X.X
1. NPM 3.X.X
1. Sass

### Running

If you want to run the app, then execute the following command in your terminal at the project ROOT:
```
npm install && node populateDb.js && npm start
```

If you are running the app for the first time, and the distribution files `.css` and `.js` files have not been built yet, you may be required to run:
```
npm install-dep && npm run build
```

Head over to your browser and open up `localhost:3000` to view the app.

### Developing

You can enable hot loading style changes with the following command:
```
npm run watch-style
```
