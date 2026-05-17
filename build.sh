dstDir=./dist
rm -rf $dstDir
mkdir -p $dstDir
cd ./koodori && npm run build && cd ..
cp -r koodori/dist $dstDir/koodori
cp -r additive/web $dstDir/additive
cp -r drum-machine/web $dstDir/drum-machine
cp -r wasyn-1/web $dstDir/wasyn-1
cp -r webaudio-synth-v2/web $dstDir/webaudio-synth-v2
cp -r webaudio-tinysynth-simple/web $dstDir/webaudio-tinysynth-simple
echo "copying done."
