#!/bin/bash

if [ "$SKIP_HOOKS" = "1" ]; then
  echo "Skipping postinstall hooks (SKIP_HOOKS=1)"
  exit 0
fi

# Your original postinstall commands go here
echo "Running postinstall tasks..."
npx lefthook install