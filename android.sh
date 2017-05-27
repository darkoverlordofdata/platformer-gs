#!/usr/bin/env bash

## build vala

emvalac --builddir build \
    --cc=jni \
    --define ANDROID \
    --define PROFILING \
    --vapidir src/vapis \
    --pkg sdl2 \
    --pkg SDL2_image \
    --pkg SDL2_mixer \
    --pkg SDL2_ttf \
    --pkg android \
    --pkg posix \
    --pkg mt19937ar \
    -X -O2 \
    build/src/Components.gs \
    build/src/Entities.gs \
    build/src/Game.gs \
    build/src/Hud.gs \
    build/src/main.gs \
    build/src/Map.gs \
    build/src/Systems.gs \
    build/src/platformer.vala \
    build/src/sdx/Color.gs \
    build/src/sdx/Files.vala \
    build/src/sdx/Font.vala \
    build/src/sdx/audio/Sound.vala \
    build/src/sdx/audio/audio.vala \
    build/src/sdx/exceptions.gs \
    build/src/sdx/files/FileHandle.vala \
    build/src/sdx/files/files.vala \
    build/src/sdx/graphics/Sprite.vala \
    build/src/sdx/graphics/Surface.vala \
    build/src/sdx/graphics/TextureAtlas.vala \
    build/src/sdx/graphics/graphics.vala \
    build/src/sdx/sdx.vala \
    build/src/sdx/utils/Cache.vala \
    build/src/sdx/utils/File.vala \
    build/src/sdx/utils/Json.vala \
    build/src/sdx/utils/StringTokenizer.vala \
    build/src/sdx/utils/utils.vala



###
## copy ir output to jni folder
## makes sure main.c includes sdl.h
###

sed  "s/#include <SDL2/#include <SDL2\/SDL.h>\n#include <SDL2/g"  ./build/src/main.c >  ./android/jni/src/main.c

cp -f ./build/src/Components.c ./android/jni/src
cp -f ./build/src/Entities.c ./android/jni/src
cp -f ./build/src/Game.c ./android/jni/src
cp -f ./build/src/Hud.c ./android/jni/src
cp -f ./build/src/main.c ./android/jni/src
cp -f ./build/src/Map.c ./android/jni/src
cp -f ./build/src/Systems.c ./android/jni/src
cp -f ./build/src/platformer.c ./android/jni/src
cp -f ./build/src/sdx/Color.c ./android/jni/src
cp -f ./build/src/sdx/Files.c ./android/jni/src/sdx
cp -f ./build/src/sdx/Font.c ./android/jni/src/sdx
cp -f ./build/src/sdx/audio/Sound.c ./android/jni/src/sdx/audio
cp -f ./build/src/sdx/audio/audio.c ./android/jni/src/sdx/audio
cp -f ./build/src/sdx/exceptions.c ./android/jni/src/sdx
cp -f ./build/src/sdx/files/FileHandle.c ./android/jni/src/sdx/files
cp -f ./build/src/sdx/files/files.c ./android/jni/src/sdx/files
cp -f ./build/src/sdx/graphics/Sprite.c ./android/jni/src/sdx/graphics
cp -f ./build/src/sdx/graphics/Surface.c ./android/jni/src/sdx/graphics
cp -f ./build/src/sdx/graphics/TextureAtlas.c ./android/jni/src/sdx/graphics
cp -f ./build/src/sdx/graphics/graphics.c ./android/jni/src/sdx/graphics
cp -f ./build/src/sdx/sdx.c ./android/jni/src/sdx
cp -f ./build/src/sdx/utils/Cache.c ./android/jni/src/sdx/utils
cp -f ./build/src/sdx/utils/File.c ./android/jni/src/sdx/utils
cp -f ./build/src/sdx/utils/Json.c ./android/jni/src/sdx/utils
cp -f ./build/src/sdx/utils/StringTokenizer.c ./android/jni/src/sdx/utils
cp -f ./build/src/sdx/utils/utils.c ./android/jni/src/sdx/utils



cd ./android/jni

## build jni code
ndk-build

cd ..

## build the apk
ant debug install

