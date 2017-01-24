#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"

echo 'Copying dependencies to ${ROOT_DIR}/src/js/vendor'
cp $ROOT_DIR/node_modules/jquery/dist/jquery.min.js $ROOT_DIR/src/app/js/vendor/

echo '🍻 Dependencies successfully installed'
