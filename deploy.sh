#!/bin/bash

function run_clean() {
  cd $BASE_DIR/cvbaby-users && npm run remove:$STAGE
  cd $BASE_DIR/cvbaby-gql && npm run remove:$STAGE
  cd $BASE_DIR/cvbaby-images && npm run remove:$STAGE
  cd $BASE_DIR/cvbaby-pdf && npm run remove:$STAGE
}

BASE_DIR=$(pwd)

while [ ! $# -eq 0 ]
do
  case "$1" in
    --dev)
      STAGE=dev
      ;;
    --prod)
      STAGE=prod
      ;;
    --clean)
      CLEAN=true
      ;;
  esac
  shift
done

if [ -z "${STAGE}" ]; then
  echo "Please provide a stage flag (--dev || --prod)" >&2
  exit 1
fi

if [ -n "${CLEAN}" ]; then
  echo "Running clean..." >&2
  run_clean
fi

cd $BASE_DIR/cvbaby-users && npm run deploy:$STAGE
cd $BASE_DIR/cvbaby-gql && npm run deploy:$STAGE
cd $BASE_DIR/cvbaby-images && npm run deploy:$STAGE
cd $BASE_DIR/cvbaby-pdf && npm run deploy:$STAGE
