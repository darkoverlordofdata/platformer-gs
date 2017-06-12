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
set (VALA_PACKAGES ${VALA_PACKAGES} gio-2.0)
set (VALA_PACKAGES ${VALA_PACKAGES} glib-2.0)
set (VALA_PACKAGES ${VALA_PACKAGES} gobject-2.0)
set (VALA_PACKAGES ${VALA_PACKAGES} sdl2)

set (APP_SOURCES ${APP_SOURCES} ${CMAKE_CURRENT_BINARY_DIR}/Config.vala)
set (APP_SOURCES ${APP_SOURCES} Components.gs)
set (APP_SOURCES ${APP_SOURCES} Entities.gs)
set (APP_SOURCES ${APP_SOURCES} Game.gs)
set (APP_SOURCES ${APP_SOURCES} Hud.gs)
set (APP_SOURCES ${APP_SOURCES} Map.gs)
set (APP_SOURCES ${APP_SOURCES} main.gs)
set (APP_SOURCES ${APP_SOURCES} platformer.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/Color.gs)
set (APP_SOURCES ${APP_SOURCES} sdx/Files.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/Font.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/audio/Sound.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/audio/audio.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/exceptions.gs)
set (APP_SOURCES ${APP_SOURCES} sdx/files/FileHandle.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/files/files.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/BitmapFont.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/Camera.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/Sprite.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/Surface.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/TextureAtlas.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/TextureEnums.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/TextureRegion.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/graphics/graphics.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/sdx.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/utils/Cache.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/utils/File.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/utils/Json.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/utils/StringTokenizer.vala)
set (APP_SOURCES ${APP_SOURCES} sdx/utils/utils.vala)
set (APP_SOURCES ${APP_SOURCES} systems/LogicSystem.vala)
set (APP_SOURCES ${APP_SOURCES} systems/PhysicsSystem.vala)
set (APP_SOURCES ${APP_SOURCES} systems/System.vala)

set (CUSTOM_VAPIS_LIST ${CUSTOM_VAPIS_LIST} ${CMAKE_SOURCE_DIR}/src/vapis/chipmunk.vapi)
set (CUSTOM_VAPIS_LIST ${CUSTOM_VAPIS_LIST} ${CMAKE_SOURCE_DIR}/src/vapis/emscripten.vapi)
set (CUSTOM_VAPIS_LIST ${CUSTOM_VAPIS_LIST} ${CMAKE_SOURCE_DIR}/src/vapis/mt19937ar.vapi)
set (CUSTOM_VAPIS_LIST ${CUSTOM_VAPIS_LIST} ${CMAKE_SOURCE_DIR}/src/vapis/posix.vapi)

if (ANDROID)
	set (COMPILE_OPTIONS ${COMPILE_OPTIONS} -D ANDROID)
	set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -DANDROID " )
	set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DANDROID " )
endif ()
if (DESKTOP)
	set (COMPILE_OPTIONS ${COMPILE_OPTIONS} -D DESKTOP)
	set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -DDESKTOP " )
	set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DDESKTOP " )
endif ()
if (EMSCRIPTEN)
	set (COMPILE_OPTIONS ${COMPILE_OPTIONS} -D EMSCRIPTEN)
	set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -DEMSCRIPTEN " )
	set (CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -DEMSCRIPTEN " )
endif ()
set (COMPILE_OPTIONS ${COMPILE_OPTIONS} --vapidir=${CMAKE_SOURCE_DIR}/src/vapis )

if ((${CMAKE_BUILD_TYPE} STREQUAL "Debug") OR (${CMAKE_BUILD_TYPE} STREQUAL "RelWithDebInfo"))
	set(COMPILE_OPTIONS ${COMPILE_OPTIONS} "-g")
endif()

set (COMPILE_OPTIONS ${COMPILE_OPTIONS} --cc=clang )
set (COMPILE_OPTIONS ${COMPILE_OPTIONS} --gresources=${CMAKE_SOURCE_DIR}/data/resources.gresource.xml )

set (CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -O3" )
include_directories (AFTER . )
include_directories (AFTER chipmunk )

vala_precompile(VALA_C platformer
	${APP_SOURCES}
PACKAGES
	${VALA_PACKAGES}
CUSTOM_VAPIS
	${CUSTOM_VAPIS_LIST}
OPTIONS
	${COMPILE_OPTIONS}
)

set (VALA_C ${VALA_C} chipmunk/chipmunk.c)
set (VALA_C ${VALA_C} chipmunk/cpArbiter.c)
set (VALA_C ${VALA_C} chipmunk/cpArray.c)
set (VALA_C ${VALA_C} chipmunk/cpBBTree.c)
set (VALA_C ${VALA_C} chipmunk/cpBody.c)
set (VALA_C ${VALA_C} chipmunk/cpCollision.c)
set (VALA_C ${VALA_C} chipmunk/cpConstraint.c)
set (VALA_C ${VALA_C} chipmunk/cpDampedRotarySpring.c)
set (VALA_C ${VALA_C} chipmunk/cpDampedSpring.c)
set (VALA_C ${VALA_C} chipmunk/cpGearJoint.c)
set (VALA_C ${VALA_C} chipmunk/cpGrooveJoint.c)
set (VALA_C ${VALA_C} chipmunk/cpHashSet.c)
set (VALA_C ${VALA_C} chipmunk/cpMarch.c)
set (VALA_C ${VALA_C} chipmunk/cpPinJoint.c)
set (VALA_C ${VALA_C} chipmunk/cpPivotJoint.c)
set (VALA_C ${VALA_C} chipmunk/cpPolyShape.c)
set (VALA_C ${VALA_C} chipmunk/cpPolyline.c)
set (VALA_C ${VALA_C} chipmunk/cpRatchetJoint.c)
set (VALA_C ${VALA_C} chipmunk/cpRobust.c)
set (VALA_C ${VALA_C} chipmunk/cpRotaryLimitJoint.c)
set (VALA_C ${VALA_C} chipmunk/cpShape.c)
set (VALA_C ${VALA_C} chipmunk/cpSimpleMotor.c)
set (VALA_C ${VALA_C} chipmunk/cpSlideJoint.c)
set (VALA_C ${VALA_C} chipmunk/cpSpace.c)
set (VALA_C ${VALA_C} chipmunk/cpSpaceComponent.c)
set (VALA_C ${VALA_C} chipmunk/cpSpaceDebug.c)
set (VALA_C ${VALA_C} chipmunk/cpSpaceHash.c)
set (VALA_C ${VALA_C} chipmunk/cpSpaceQuery.c)
set (VALA_C ${VALA_C} chipmunk/cpSpaceStep.c)
set (VALA_C ${VALA_C} chipmunk/cpSpatialIndex.c)
set (VALA_C ${VALA_C} chipmunk/cpSweep1D.c)
set (VALA_C ${VALA_C} mt19937ar.c)

SET (VALA_C ${VALA_C} ${resources_gresource_xml_C_FILE})
add_executable(platformer ${VALA_C})
add_dependencies (platformer resources_gresource_xml)
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
