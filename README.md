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

### Running

You can run this project locally or through a provisioned environment using `Vagrant`.

#### Locally

In order to compile the files to obtain distribution-ready `.css` and `.js` files, you need a few things:

1. Node 6.X.X
1. NPM 3.X.X
1. [Sass](http://sass-lang.com/install)

If you are running the app for the first time and the client `.css` and `.js` files have not been built yet, you may be required to run:
```
npm install && npm run install-dep && npm run build && node populateDb.js
```

To run the app, execute the following command in your terminal at the project ROOT:
```
npm start
```

Head over to your browser and open up `localhost:3000` to view the app.

#### Provisioned Environment

In order to set up your environment, you will need:

1. [Vagrant](https://www.vagrantup.com/downloads.html)
1. [VirtualBox](https://www.virtualbox.org/wiki/Downloads)

To boot up the virtual machine, run the following at the ROOT of the project folder:
```
vagrant up
```

Head over to your browser and open up `localhost:8080` to view the app.

**NOTE:** To shut down your provisioned environment, use the following command:
```
vagrant halt
```

### Developing
You can enable hot loading style changes with the following command:
```
npm run watch-style
```
