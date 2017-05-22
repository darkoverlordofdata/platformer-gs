### CMakeLists automatically created with AutoVala
### Do not edit

set (DATADIR "${CMAKE_INSTALL_PREFIX}/${CMAKE_INSTALL_DATAROOTDIR}")
set (PKGDATADIR "${DATADIR}/platformer")
set (GETTEXT_PACKAGE "platformer")
set (RELEASE_NAME "platformer")
set (CMAKE_C_FLAGS "")
set (PREFIX ${CMAKE_INSTALL_PREFIX})
set (VERSION "1.0.0")
set (TESTSRCDIR "${CMAKE_SOURCE_DIR}")
set (DOLLAR "$")

configure_file (${CMAKE_SOURCE_DIR}/src/Config.vala.base ${CMAKE_BINARY_DIR}/src/Config.vala)
add_definitions(-DGETTEXT_PACKAGE=\"${GETTEXT_PACKAGE}\")
set (VERSION "1.0.0")
add_definitions (${DEPS_CFLAGS})
link_libraries ( ${DEPS_LIBRARIES} )
link_directories ( ${DEPS_LIBRARY_DIRS} )
find_package (Vala REQUIRED)
include (ValaVersion)
ensure_vala_version ("0.34" MINIMUM)
include (ValaPrecompile)

set (VALA_PACKAGES ${VALA_PACKAGES} SDL2_image)
set (VALA_PACKAGES ${VALA_PACKAGES} SDL2_mixer)
set (VALA_PACKAGES ${VALA_PACKAGES} SDL2_ttf)
set (VALA_PACKAGES ${VALA_PACKAGES} sdl2)
set (VALA_PACKAGES ${VALA_PACKAGES} glib-2.0)
set (VALA_PACKAGES ${VALA_PACKAGES} gobject-2.0)

set (APP_SOURCES ${APP_SOURCES} ${CMAKE_CURRENT_BINARY_DIR}/Config.vala)
set (APP_SOURCES ${APP_SOURCES} Components.gs)
set (APP_SOURCES ${APP_SOURCES} Entities.gs)
set (APP_SOURCES ${APP_SOURCES} Game.gs)
set (APP_SOURCES ${APP_SOURCES} Hud.gs)
set (APP_SOURCES ${APP_SOURCES} Main.gs)
set (APP_SOURCES ${APP_SOURCES} Map.gs)
set (APP_SOURCES ${APP_SOURCES} Systems.gs)
set (APP_SOURCES ${APP_SOURCES} platformer.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/Color.gs)
set (APP_SOURCES ${APP_SOURCES} sdx/Files.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/Font.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/files/FileHandle.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/Sprite.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/Surface.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/sdx.vala)
set (APP_SOURCES ${APP_SOURCES} util/Cache.vala)
set (APP_SOURCES ${APP_SOURCES} util/File.vala)
set (APP_SOURCES ${APP_SOURCES} util/JsVariant.vala)
set (APP_SOURCES ${APP_SOURCES} util/Json.vala)
set (APP_SOURCES ${APP_SOURCES} util/String.vala)

set (CUSTOM_VAPIS_LIST ${CUSTOM_VAPIS_LIST} ${CMAKE_SOURCE_DIR}/src/vapis/emscripten.vapi)
set (CUSTOM_VAPIS_LIST ${CUSTOM_VAPIS_LIST} ${CMAKE_SOURCE_DIR}/src/vapis/mt19937ar.vapi)
set (CUSTOM_VAPIS_LIST ${CUSTOM_VAPIS_LIST} ${CMAKE_SOURCE_DIR}/src/vapis/posix.vapi)

if (DESKTOP)
	set (COMPILE_OPTIONS ${COMPILE_OPTIONS} -D DESKTOP)
	set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -DDESKTOP " )
	set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DDESKTOP " )
endif ()
set (COMPILE_OPTIONS ${COMPILE_OPTIONS} --vapidir=${CMAKE_SOURCE_DIR}/src/vapis )

if ((${CMAKE_BUILD_TYPE} STREQUAL "Debug") OR (${CMAKE_BUILD_TYPE} STREQUAL "RelWithDebInfo"))
	set(COMPILE_OPTIONS ${COMPILE_OPTIONS} "-g")
endif()

set (COMPILE_OPTIONS ${COMPILE_OPTIONS} --cc=clang )

set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O3" )

vala_precompile(VALA_C platformer
	${APP_SOURCES}
PACKAGES
	${VALA_PACKAGES}
CUSTOM_VAPIS
	${CUSTOM_VAPIS_LIST}
OPTIONS
	${COMPILE_OPTIONS}
)

add_executable(platformer ${VALA_C})
target_link_libraries( platformer m )


install(TARGETS
	platformer
RUNTIME DESTINATION
	${CMAKE_INSTALL_BINDIR}
)
if(HAVE_VALADOC)
	valadoc(platformer
		${CMAKE_BINARY_DIR}/valadoc/platformer
		${APP_SOURCES}
	PACKAGES
		${VALA_PACKAGES}
	CUSTOM_VAPIS
		${CUSTOM_VAPIS_LIST}
	)
	install(DIRECTORY
		${CMAKE_BINARY_DIR}/valadoc
	DESTINATION
		${CMAKE_INSTALL_DATAROOTDIR}/doc/platformer
	)
endif()
