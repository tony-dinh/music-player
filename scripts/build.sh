#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

pushd $ROOT_DIR
webpack --config webpack.config.js
sass $ROOT_DIR/src/app/styles/styles.scss:$ROOT_DIR/src/client/style.css
popd
