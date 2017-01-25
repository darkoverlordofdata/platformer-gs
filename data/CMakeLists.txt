### CMakeLists automatically created with AutoVala
### Do not edit

EXECUTE_PROCESS( COMMAND glib-compile-resources --sourcedir=${CMAKE_CURRENT_SOURCE_DIR} --generate-source --target=${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.c ${CMAKE_CURRENT_SOURCE_DIR}/resources.gresource.xml)
EXECUTE_PROCESS( COMMAND glib-compile-resources --sourcedir=${CMAKE_CURRENT_SOURCE_DIR} --generate-header --target=${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.h ${CMAKE_CURRENT_SOURCE_DIR}/resources.gresource.xml)
ADD_CUSTOM_COMMAND (
	OUTPUT ${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.c
	DEPENDS ${CMAKE_CURRENT_SOURCE_DIR}/resources.gresource.xml ${CMAKE_CURRENT_SOURCE_DIR}/res/default.map ${CMAKE_CURRENT_SOURCE_DIR}/res/grass.bmp ${CMAKE_CURRENT_SOURCE_DIR}/res/player.bmp
	COMMAND glib-compile-resources --sourcedir=${CMAKE_CURRENT_SOURCE_DIR} --generate-source --target=${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.c ${CMAKE_CURRENT_SOURCE_DIR}/resources.gresource.xml

	COMMAND glib-compile-resources --sourcedir=${CMAKE_CURRENT_SOURCE_DIR} --generate-header --target=${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.h ${CMAKE_CURRENT_SOURCE_DIR}/resources.gresource.xml
)

add_custom_target(resources_gresource_xml DEPENDS ${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.c)
SET (resources_gresource_xml_C_FILE ${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.c PARENT_SCOPE)
SET (resources_gresource_xml_H_FILE ${CMAKE_CURRENT_BINARY_DIR}/resources.gresource.xml.h PARENT_SCOPE)
