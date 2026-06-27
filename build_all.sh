#!/usr/bin/env bash

set -euo pipefail

dstDir=./dist
rm -rf "$dstDir"
mkdir -p "$dstDir"
cd ./threejs-audio-reactive-visual && pnpm install && pnpm run build && cd ..
cp -r threejs-audio-reactive-visual/dist "$dstDir/threejs-audio-reactive-visual"
cp -r additive/web "$dstDir/additive"
cp -r wasyn-1/web "$dstDir/wasyn-1"
cp -r webaudio-synth-v2/web "$dstDir/webaudio-synth-v2"
cp -r webaudio-tinysynth-simple/web "$dstDir/webaudio-tinysynth-simple"
cp -r vissonance/web "$dstDir/vissonance"
echo "copy done."
