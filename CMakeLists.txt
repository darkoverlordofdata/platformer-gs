### CMakeLists automatically created with AutoVala
### Do not edit

project (platformer)
cmake_minimum_required (VERSION 2.6)
cmake_policy (VERSION 2.8)
list (APPEND CMAKE_MODULE_PATH ${CMAKE_SOURCE_DIR}/cmake)
enable_testing ()
option(ICON_UPDATE "Update the icon cache after installing" ON)
option(BUILD_VALADOC "Build API documentation if Valadoc is available" OFF)
option(ANDROID "ANDROID" OFF)
option(DESKTOP "DESKTOP" OFF)
option(EMSCRIPTEN "EMSCRIPTEN" OFF)

if( NOT CMAKE_BUILD_TYPE )
	set(CMAKE_BUILD_TYPE Release)
endif()

include(GNUInstallDirs)
if( ( ${CMAKE_INSTALL_PREFIX} MATCHES "^/usr/local" ) )
	# A workaround to ensure that works 'out of the box' in Debian-based systems
	set(CMAKE_INSTALL_LIBDIR lib)
endif()

set(HAVE_VALADOC OFF)
if(BUILD_VALADOC)
	find_package(Valadoc)
	if(VALADOC_FOUND)
		set(HAVE_VALADOC ON)
		include(Valadoc)
	else()
		message("Valadoc not found, will not build documentation")
	endif()
endif()

find_package(PkgConfig)

set(MODULES_TO_CHECK ${MODULES_TO_CHECK} SDL2_image)
set(MODULES_TO_CHECK ${MODULES_TO_CHECK} SDL2_mixer)
set(MODULES_TO_CHECK ${MODULES_TO_CHECK} SDL2_ttf)
set(MODULES_TO_CHECK ${MODULES_TO_CHECK} gio-2.0)
set(MODULES_TO_CHECK ${MODULES_TO_CHECK} glib-2.0)
set(MODULES_TO_CHECK ${MODULES_TO_CHECK} gobject-2.0)
set(MODULES_TO_CHECK ${MODULES_TO_CHECK} sdl2)

pkg_check_modules(DEPS REQUIRED ${MODULES_TO_CHECK})


find_program ( WHERE_GRESOURCE glib-compile-resources )
if ( NOT WHERE_GRESOURCE )
	MESSAGE(FATAL_ERROR "Error! GLIB-COMPILE-RESOURCES is not installed.")
endif()

add_subdirectory(src/vapis)
add_subdirectory(src/systems)
add_subdirectory(po)
add_subdirectory(src/sdx/graphics)
add_subdirectory(src/chipmunk)
add_subdirectory(data)
add_subdirectory(src/sdx/audio)
add_subdirectory(src/sdx)
add_subdirectory(src/sdx/files)
add_subdirectory(src/sdx/utils)
add_subdirectory(src/sdx/math)
add_subdirectory(src)

