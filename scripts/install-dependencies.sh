#!/bin/bash
ROOT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
VENDOR_DIR="${ROOT_DIR}/src/app/js/vendor/"

# Make vendor directory if it doesn't exist
echo $VENDOR_DIR
[ -d $VENDOR_DIR ] || mkdir $VENDOR_DIR
#
echo "[ 💿  ] Copying dependencies to $VENDOR_DIR"
echo "[ .. ] Working..."
cp $ROOT_DIR/node_modules/jquery/dist/jquery.min.js $VENDOR_DIR
echo "[ OK ] Dependencies successfully installed 🍻!"
