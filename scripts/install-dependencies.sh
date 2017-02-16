#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
VENDOR_DIR="${ROOT_DIR}/src/app/js/vendor/"

# Make vendor directory if it doesn't exist
[ -d $VENDOR_DIR ] || mkdir $VENDOR_DIR

echo ""
echo ""
echo "[ 💿  ] Copying dependencies to $VENDOR_DIR"
echo "[ .. ] Working..."

cp $ROOT_DIR/node_modules/jquery/dist/jquery.min.js $VENDOR_DIR
if [ "$?" -ne "0" ]; then
  exit 1
fi

cp $ROOT_DIR/node_modules/bluebird/js/browser/bluebird.min.js $VENDOR_DIR
if [ "$?" -ne "0" ]; then
  exit 1
fi

echo "[ OK ] Dependencies successfully installed 🍻!"
echo ""
echo ""
