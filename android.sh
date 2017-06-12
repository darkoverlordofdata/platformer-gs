emvalac --builddir build --cc=jni --define ANDROID --vapidir src/vapis --fast-vapi project.vapi --pkg android --pkg chipmunk --pkg emscripten --pkg mt19937ar --pkg posix --pkg SDL2_image --pkg SDL2_mixer --pkg SDL2_ttf --pkg gio-2.0 --pkg sdl2 -X -O2 build/src/Components.gs build/src/Entities.gs build/src/Game.gs build/src/Hud.gs build/src/Map.gs build/src/main.gs build/src/platformer.vala build/src/sdx/Color.gs build/src/sdx/Files.vala build/src/sdx/Font.vala build/src/sdx/audio/Sound.vala build/src/sdx/audio/audio.vala build/src/sdx/exceptions.gs build/src/sdx/files/FileHandle.vala build/src/sdx/files/files.vala build/src/sdx/graphics/BitmapFont.vala build/src/sdx/graphics/Camera.vala build/src/sdx/graphics/Sprite.vala build/src/sdx/graphics/Surface.vala build/src/sdx/graphics/TextureAtlas.vala build/src/sdx/graphics/TextureEnums.vala build/src/sdx/graphics/TextureRegion.vala build/src/sdx/graphics/graphics.vala build/src/sdx/sdx.vala build/src/sdx/utils/Cache.vala build/src/sdx/utils/File.vala build/src/sdx/utils/Json.vala build/src/sdx/utils/StringTokenizer.vala build/src/sdx/utils/utils.vala build/src/systems/LogicSystem.vala build/src/systems/PhysicsSystem.vala build/src/systems/System.vala


sed  "s/#include <SDL2/#include <SDL2\/SDL.h>\n#include <SDL2/g"  ./build/src/main.c >  ./android/jni/src/main.c
cp -f ./build/src/Components.c ./android/jni/src/Components.c
cp -f ./build/src/Entities.c ./android/jni/src/Entities.c
cp -f ./build/src/Game.c ./android/jni/src/Game.c
cp -f ./build/src/Hud.c ./android/jni/src/Hud.c
cp -f ./build/src/Map.c ./android/jni/src/Map.c
cp -f ./build/src/platformer.c ./android/jni/src/platformer.c
cp -f ./build/src/sdx/Color.c ./android/jni/src/sdx/Color.c
cp -f ./build/src/sdx/Files.c ./android/jni/src/sdx/Files.c
cp -f ./build/src/sdx/Font.c ./android/jni/src/sdx/Font.c
cp -f ./build/src/sdx/audio/Sound.c ./android/jni/src/sdx/audio/Sound.c
cp -f ./build/src/sdx/audio/audio.c ./android/jni/src/sdx/audio/audio.c
cp -f ./build/src/sdx/exceptions.c ./android/jni/src/sdx/exceptions.c
cp -f ./build/src/sdx/files/FileHandle.c ./android/jni/src/sdx/files/FileHandle.c
cp -f ./build/src/sdx/files/files.c ./android/jni/src/sdx/files/files.c
cp -f ./build/src/sdx/graphics/BitmapFont.c ./android/jni/src/sdx/graphics/BitmapFont.c
cp -f ./build/src/sdx/graphics/Camera.c ./android/jni/src/sdx/graphics/Camera.c
cp -f ./build/src/sdx/graphics/Sprite.c ./android/jni/src/sdx/graphics/Sprite.c
cp -f ./build/src/sdx/graphics/Surface.c ./android/jni/src/sdx/graphics/Surface.c
cp -f ./build/src/sdx/graphics/TextureAtlas.c ./android/jni/src/sdx/graphics/TextureAtlas.c
cp -f ./build/src/sdx/graphics/TextureEnums.c ./android/jni/src/sdx/graphics/TextureEnums.c
cp -f ./build/src/sdx/graphics/TextureRegion.c ./android/jni/src/sdx/graphics/TextureRegion.c
cp -f ./build/src/sdx/graphics/graphics.c ./android/jni/src/sdx/graphics/graphics.c
cp -f ./build/src/sdx/sdx.c ./android/jni/src/sdx/sdx.c
cp -f ./build/src/sdx/utils/Cache.c ./android/jni/src/sdx/utils/Cache.c
cp -f ./build/src/sdx/utils/File.c ./android/jni/src/sdx/utils/File.c
cp -f ./build/src/sdx/utils/Json.c ./android/jni/src/sdx/utils/Json.c
cp -f ./build/src/sdx/utils/StringTokenizer.c ./android/jni/src/sdx/utils/StringTokenizer.c
cp -f ./build/src/sdx/utils/utils.c ./android/jni/src/sdx/utils/utils.c
cp -f ./build/src/systems/LogicSystem.c ./android/jni/src/systems/LogicSystem.c
cp -f ./build/src/systems/PhysicsSystem.c ./android/jni/src/systems/PhysicsSystem.c
cp -f ./build/src/systems/System.c ./android/jni/src/systems/System.c
cd ./android/jni && ndk-build
cd ./android && ant debug 