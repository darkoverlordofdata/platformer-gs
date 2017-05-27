#!/usr/bin/env bash
#    -X "-s ALLOW_MEMORY_GROWTH=1" \


emvalac  \
    --builddir build \
    --cc=emcc \
    --define PROFILING \
    --vapidir src/vapis \
    --pkg sdl2 \
    --pkg SDL2_image \
    --pkg SDL2_ttf \
    --pkg posix \
    --pkg mt19937ar \
    --pkg emscripten \
    -X -O2 \
    -o web/platformer.html  \
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
