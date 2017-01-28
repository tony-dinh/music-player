# Music Player

A music player created as part of a series of exercises for a course in Web Information Systems.

| Technology |                     Description                    |
|:----------:|:--------------------------------------------------:|
|  `NodeJS`  | A server-side JavaScript runtime environment.      |
|  `Babel`   | A transpiler for next generation JavaScript (ES6). |
|  `Webpack` | A dependency manager.                              |
|   `Sass`   | A CSS preprocessor to add a little sass.           |

**NOTE:** Bootstrap 3.0 is included solely for the icons -- Any other source of icons will work. Grid/layout built using flex-box.

## Getting Started
In order to compile the files to obtain distribution-ready `.css` and `.js` files, you need a few things:

1. Node 6.X.X
1. NPM 3.X.X
1. Sass

At the project ROOT, run the following command in the terminal to install dependencies:
```
npm run install-dep
```

Then run the following command to obtain distribution-ready files:
```
npm run build
```

Finally, run the following command to start up the node server:
```
npm start
```

Head over to your browser and open up `localhost:3000` to view the app.

## Developing

Run the following command in the terminal to enable hot loading stylistic changes:
```
npm run watch-style
```
