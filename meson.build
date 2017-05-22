project('platformer',['c','vala'])

DESKTOP = (get_option('DESKTOP') != '')

add_global_arguments('-DGETTEXT_PACKAGE="platformer"',language: 'c')

SDL2_image_dep = dependency('SDL2_image')
SDL2_mixer_dep = dependency('SDL2_mixer')
SDL2_ttf_dep = dependency('SDL2_ttf')
sdl2_dep = dependency('sdl2')
gee_0_8_dep = dependency('gee-0.8')
gio_2_0_dep = dependency('gio-2.0')
glib_2_0_dep = dependency('glib-2.0')
gobject_2_0_dep = dependency('gobject-2.0')
json_glib_1_0_dep = dependency('json-glib-1.0')
sdx_dep = dependency('sdx')

resources_gresource_xml_generator = generator(find_program('glib-compile-resources'), arguments: [ '--sourcedir=@SOURCE_DIR@/data' , '--generate-source', '--target=@BUILD_DIR@/resources.gresource.xml.c', '@INPUT@'], output: '@PLAINNAME@.c')

resources_gresource_xml_file_c = resources_gresource_xml_generator.process(['data/resources.gresource.xml'])

meson.add_install_script(join_paths(meson.current_source_dir(),'meson_scripts','install_data.sh'),join_paths(get_option('prefix'),get_option('datadir'),'platformer'),join_paths(meson.current_source_dir(),'data/local','','*'))

meson.add_install_script(join_paths(meson.current_source_dir(),'meson_scripts','install_data.sh'),join_paths(get_option('prefix'),get_option('datadir'),'doc'),join_paths(meson.current_source_dir(),'doc','','*'))

cfg_platformer = configuration_data()
cfg_platformer.set('DATADIR', join_paths(get_option('prefix'),get_option('datadir')))
cfg_platformer.set('PKGDATADIR', join_paths(get_option('prefix'),get_option('datadir'),'platformer'))
cfg_platformer.set('GETTEXT_PACKAGE', 'platformer')
cfg_platformer.set('RELEASE_NAME', 'platformer')
cfg_platformer.set('PREFIX', get_option('prefix'))
cfg_platformer.set('VERSION', '1.0.0')
cfg_platformer.set('TESTSRCDIR', meson.current_source_dir())

cfgfile_1 = configure_file(input: 'src/Config.vala.base',output: 'Config_1.vala',configuration: cfg_platformer)

platformer_deps = [SDL2_image_dep]
platformer_deps += [SDL2_mixer_dep]
platformer_deps += [SDL2_ttf_dep]
platformer_deps += [sdl2_dep]
platformer_deps += [gee_0_8_dep]
platformer_deps += [gio_2_0_dep]
platformer_deps += [glib_2_0_dep]
platformer_deps += [gobject_2_0_dep]
platformer_deps += [json_glib_1_0_dep]
platformer_deps += [sdx_dep]
platformer_sources = [cfgfile_1]
platformer_sources += ['src/Components.gs']
platformer_sources += ['src/Entities.gs']
platformer_sources += ['src/Game.gs']
platformer_sources += ['src/Hud.gs']
platformer_sources += ['src/Main.gs']
platformer_sources += ['src/Map.gs']
platformer_sources += ['src/Systems.gs']
platformer_sources += ['src/platformer.vala']
platformer_sources += ['src/sdx/Color.gs']
platformer_sources += ['src/sdx/Files.vala']
platformer_sources += ['src/sdx/Font.vala']
platformer_sources += ['src/sdx/files/FileHandle.vala']
platformer_sources += ['src/sdx/graphics/Sprite.vala']
platformer_sources += ['src/sdx/graphics/Surface.vala']
platformer_sources += ['src/sdx/sdx.vala']
platformer_sources += ['src/util/Cache.vala']
platformer_sources += ['src/util/File.vala']
platformer_sources += ['src/util/JsVariant.vala']
platformer_sources += ['src/util/Json.vala']
platformer_sources += ['src/util/String.vala']
platformer_sources += [resources_gresource_xml_file_c]
platformer_sources += [join_paths(meson.current_source_dir(),'src/vapis/emscripten.vapi')]
platformer_sources += [join_paths(meson.current_source_dir(),'src/vapis/mt19937ar.vapi')]
platformer_sources += [join_paths(meson.current_source_dir(),'src/vapis/posix.vapi')]
platformer_vala_args = ['--vapidir='+join_paths(meson.current_source_dir(),'src/vapis')]
platformer_vala_args += ['--cc=clang']
platformer_c_args = ['-O3']
if DESKTOP
  platformer_vala_args += ['-D', 'DESKTOP']
  platformer_c_args += ['-DDESKTOP']
endif
platformer_deps += [meson.get_compiler('c').find_library('m', required : false)]

executable('platformer',platformer_sources,dependencies: platformer_deps,vala_args: platformer_vala_args,c_args: platformer_c_args,install: true)

