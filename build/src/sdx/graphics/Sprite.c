/* Sprite.c generated by valac 0.34.8, the Vala compiler
 * generated from Sprite.vala, do not modify */


#include <glib.h>
#include <glib-object.h>
#include <float.h>
#include <math.h>
#include <string.h>
#include <SDL2/SDL_render.h>
#include <SDL2/SDL_pixels.h>
#include <stdlib.h>
#include <SDL2/SDL_rect.h>
#include <SDL2/SDL_surface.h>
#include <SDL2/SDL_video.h>


#define SDX_GRAPHICS_TYPE_SCALE (sdx_graphics_scale_get_type ())
typedef struct _sdxgraphicsScale sdxgraphicsScale;
typedef struct _sdxgraphicsSprite sdxgraphicsSprite;

#define SDX_GRAPHICS_SPRITE_TYPE_KIND (sdx_graphics_sprite_kind_get_type ())
#define _SDL_DestroyTexture0(var) ((var == NULL) ? NULL : (var = (SDL_DestroyTexture (var), NULL)))
#define _g_free0(var) (var = (g_free (var), NULL))
typedef sdxgraphicsSprite sdxgraphicsSpriteAnimatedSprite;
typedef struct _sdxgraphicsSurface sdxgraphicsSurface;
#define _SDL_FreeSurface0(var) ((var == NULL) ? NULL : (var = (SDL_FreeSurface (var), NULL)))
typedef sdxgraphicsSprite sdxgraphicsSpriteTextureSprite;
typedef sdxgraphicsSprite sdxgraphicsSpriteAtlasSprite;
typedef struct _sdxgraphicsAtlasRegion sdxgraphicsAtlasRegion;
typedef struct _sdxgraphicsTextureRegion sdxgraphicsTextureRegion;
typedef sdxgraphicsSurface sdxgraphicsSurfaceTextureSurface;
typedef sdxgraphicsSprite sdxgraphicsSpriteCompositeSprite;

#define SDX_GRAPHICS_TYPE_BLIT (sdx_graphics_blit_get_type ())
typedef struct _sdxgraphicsBlit sdxgraphicsBlit;
typedef sdxgraphicsSprite sdxgraphicsSpriteTextSprite;
typedef struct _sdxFont sdxFont;

struct _sdxgraphicsScale {
	gfloat x;
	gfloat y;
};

typedef enum  {
	SDX_GRAPHICS_SPRITE_KIND_AnimatedSprite,
	SDX_GRAPHICS_SPRITE_KIND_TextureSprite,
	SDX_GRAPHICS_SPRITE_KIND_AtlasSprite,
	SDX_GRAPHICS_SPRITE_KIND_CompositeSprite,
	SDX_GRAPHICS_SPRITE_KIND_TextSprite
} sdxgraphicsSpriteKind;

struct _sdxgraphicsSprite {
	gint _retainCount;
	gint id;
	SDL_Texture* texture;
	gint width;
	gint height;
	gint x;
	gint y;
	gint index;
	gint frame;
	sdxgraphicsScale scale;
	SDL_Color color;
	gboolean centered;
	gint layer;
	gchar* path;
	sdxgraphicsSpriteKind kind;
};

struct _sdxgraphicsSurface {
	gint _retainCount;
	SDL_Surface* surface;
	gint id;
	gchar* path;
};

typedef enum  {
	SDX_SDL_EXCEPTION_Initialization,
	SDX_SDL_EXCEPTION_ImageInitialization,
	SDX_SDL_EXCEPTION_TtfInitialization,
	SDX_SDL_EXCEPTION_TextureFilteringNotEnabled,
	SDX_SDL_EXCEPTION_OpenWindow,
	SDX_SDL_EXCEPTION_CreateRenderer,
	SDX_SDL_EXCEPTION_InvalidForPlatform,
	SDX_SDL_EXCEPTION_UnableToLoadResource,
	SDX_SDL_EXCEPTION_UnableToLoadSurface,
	SDX_SDL_EXCEPTION_UnableToLoadTexture,
	SDX_SDL_EXCEPTION_NullPointer,
	SDX_SDL_EXCEPTION_NoSuchElement,
	SDX_SDL_EXCEPTION_IllegalStateException,
	SDX_SDL_EXCEPTION_RuntimeException,
	SDX_SDL_EXCEPTION_NotReached
} sdxSdlException;
#define SDX_SDL_EXCEPTION sdx_sdl_exception_quark ()
struct _sdxgraphicsAtlasRegion {
	gint _retainCount;
	sdxgraphicsTextureRegion* rg;
	gint index;
	gchar* name;
	gint offsetX;
	gint offsetY;
	gint packedWidth;
	gint packedHeight;
	gint originalWidth;
	gint originalHeight;
	gboolean rotate;
	gint* splits;
	gint splits_length1;
	gint* pads;
	gint pads_length1;
};

struct _sdxgraphicsTextureRegion {
	gint _retainCount;
	sdxgraphicsSurfaceTextureSurface* texture;
	gint top;
	gint left;
	gint width;
	gint height;
	gint regionWidth;
	gint regionHeight;
	gfloat u;
	gfloat v;
	gfloat u2;
	gfloat v2;
};

struct _sdxgraphicsBlit {
	SDL_Rect source;
	SDL_Rect dest;
	SDL_RendererFlip flip;
};

typedef sdxgraphicsBlit* (*sdxgraphicsCompositor) (gint x, gint y, int* result_length1, void* user_data);

extern gint sdx_graphics_sprite_uniqueId;
gint sdx_graphics_sprite_uniqueId = 0;
extern SDL_Renderer* sdx_renderer;
extern sdxgraphicsSurface** sdx_graphics_surface_cached_surface_cache;
extern gint sdx_graphics_surface_cached_surface_cache_length1;

GType sdx_graphics_scale_get_type (void) G_GNUC_CONST;
sdxgraphicsScale* sdx_graphics_scale_dup (const sdxgraphicsScale* self);
void sdx_graphics_scale_free (sdxgraphicsScale* self);
void sdx_graphics_sprite_free (sdxgraphicsSprite* self);
GType sdx_graphics_sprite_kind_get_type (void) G_GNUC_CONST;
static void sdx_graphics_sprite_instance_init (sdxgraphicsSprite * self);
sdxgraphicsSprite* sdx_graphics_sprite_retain (sdxgraphicsSprite* self);
void sdx_graphics_sprite_release (sdxgraphicsSprite* self);
void sdx_graphics_sprite_free (sdxgraphicsSprite* self);
void sdx_graphics_sprite_render (sdxgraphicsSprite* self, gint x, gint y, SDL_Rect* clip);
void sdx_graphics_sprite_copy (sdxgraphicsSprite* self, SDL_Rect* src, SDL_Rect* dest);
sdxgraphicsSprite* sdx_graphics_sprite_new (void);
sdxgraphicsSpriteAnimatedSprite* sdx_graphics_sprite_animated_sprite_new (const gchar* path, gint width, gint height);
gint sdx_graphics_surface_cached_surface_indexOfPath (const gchar* path);
void sdx_graphics_sprite_animated_sprite_setFrame (sdxgraphicsSpriteAnimatedSprite* self, gint frame);
void sdx_graphics_surface_free (sdxgraphicsSurface* self);
sdxgraphicsSpriteTextureSprite* sdx_graphics_sprite_texture_sprite_new (const gchar* path);
GQuark sdx_sdl_exception_quark (void);
gint sdx_graphics_surface_get_width (sdxgraphicsSurface* self);
gint sdx_graphics_surface_get_height (sdxgraphicsSurface* self);
void sdx_graphics_atlas_region_free (sdxgraphicsAtlasRegion* self);
sdxgraphicsSpriteAtlasSprite* sdx_graphics_sprite_atlas_sprite_new (sdxgraphicsAtlasRegion* region);
void sdx_graphics_texture_region_free (sdxgraphicsTextureRegion* self);
GType sdx_graphics_blit_get_type (void) G_GNUC_CONST;
sdxgraphicsBlit* sdx_graphics_blit_dup (const sdxgraphicsBlit* self);
void sdx_graphics_blit_free (sdxgraphicsBlit* self);
sdxgraphicsSpriteCompositeSprite* sdx_graphics_sprite_composite_sprite_new (const gchar* path, sdxgraphicsCompositor builder, void* builder_target);
void sdx_font_free (sdxFont* self);
sdxgraphicsSpriteTextSprite* sdx_graphics_sprite_text_sprite_new (const gchar* text, sdxFont* font, SDL_Color color);
void sdx_graphics_sprite_text_sprite_setText (sdxgraphicsSpriteTextSprite* self, const gchar* text, sdxFont* font, SDL_Color color);
SDL_Surface* sdx_font_render (sdxFont* self, const gchar* text, SDL_Color color);

extern const SDL_Color SDX_COLOR_White;

sdxgraphicsScale* sdx_graphics_scale_dup (const sdxgraphicsScale* self) {
	sdxgraphicsScale* dup;
	dup = g_new0 (sdxgraphicsScale, 1);
	memcpy (dup, self, sizeof (sdxgraphicsScale));
	return dup;
}


void sdx_graphics_scale_free (sdxgraphicsScale* self) {
	g_free (self);
}


GType sdx_graphics_scale_get_type (void) {
	static volatile gsize sdx_graphics_scale_type_id__volatile = 0;
	if (g_once_init_enter (&sdx_graphics_scale_type_id__volatile)) {
		GType sdx_graphics_scale_type_id;
		sdx_graphics_scale_type_id = g_boxed_type_register_static ("sdxgraphicsScale", (GBoxedCopyFunc) sdx_graphics_scale_dup, (GBoxedFreeFunc) sdx_graphics_scale_free);
		g_once_init_leave (&sdx_graphics_scale_type_id__volatile, sdx_graphics_scale_type_id);
	}
	return sdx_graphics_scale_type_id__volatile;
}


GType sdx_graphics_sprite_kind_get_type (void) {
	static volatile gsize sdx_graphics_sprite_kind_type_id__volatile = 0;
	if (g_once_init_enter (&sdx_graphics_sprite_kind_type_id__volatile)) {
		static const GEnumValue values[] = {{SDX_GRAPHICS_SPRITE_KIND_AnimatedSprite, "SDX_GRAPHICS_SPRITE_KIND_AnimatedSprite", "animatedsprite"}, {SDX_GRAPHICS_SPRITE_KIND_TextureSprite, "SDX_GRAPHICS_SPRITE_KIND_TextureSprite", "texturesprite"}, {SDX_GRAPHICS_SPRITE_KIND_AtlasSprite, "SDX_GRAPHICS_SPRITE_KIND_AtlasSprite", "atlassprite"}, {SDX_GRAPHICS_SPRITE_KIND_CompositeSprite, "SDX_GRAPHICS_SPRITE_KIND_CompositeSprite", "compositesprite"}, {SDX_GRAPHICS_SPRITE_KIND_TextSprite, "SDX_GRAPHICS_SPRITE_KIND_TextSprite", "textsprite"}, {0, NULL, NULL}};
		GType sdx_graphics_sprite_kind_type_id;
		sdx_graphics_sprite_kind_type_id = g_enum_register_static ("sdxgraphicsSpriteKind", values);
		g_once_init_leave (&sdx_graphics_sprite_kind_type_id__volatile, sdx_graphics_sprite_kind_type_id);
	}
	return sdx_graphics_sprite_kind_type_id__volatile;
}


sdxgraphicsSprite* sdx_graphics_sprite_retain (sdxgraphicsSprite* self) {
	sdxgraphicsSprite* result = NULL;
	g_return_val_if_fail (self != NULL, NULL);
	g_atomic_int_add ((volatile gint *) (&self->_retainCount), 1);
	result = self;
	return result;
}


void sdx_graphics_sprite_release (sdxgraphicsSprite* self) {
	gboolean _tmp0_ = FALSE;
	g_return_if_fail (self != NULL);
	_tmp0_ = g_atomic_int_dec_and_test ((volatile gint *) (&self->_retainCount));
	if (_tmp0_) {
		sdx_graphics_sprite_free (self);
	}
}


/**
 *  Render the sprite on the Video.Renderer context
 *
 * @param renderer video context
 * @param x display coordinate
 * @param y display coordinate
 * @param clip optional clipping rectangle
 */
void sdx_graphics_sprite_render (sdxgraphicsSprite* self, gint x, gint y, SDL_Rect* clip) {
	guint _tmp0_ = 0U;
	SDL_Rect* _tmp1_ = NULL;
	gint w = 0;
	sdxgraphicsScale _tmp5_ = {0};
	gfloat _tmp6_ = 0.0F;
	guint _tmp7_ = 0U;
	SDL_Rect* _tmp8_ = NULL;
	gint h = 0;
	sdxgraphicsScale _tmp12_ = {0};
	gfloat _tmp13_ = 0.0F;
	gint _tmp14_ = 0;
	gboolean _tmp15_ = FALSE;
	gint _tmp19_ = 0;
	gboolean _tmp20_ = FALSE;
	SDL_Texture* _tmp24_ = NULL;
	SDL_Color _tmp25_ = {0};
	guint8 _tmp26_ = 0U;
	SDL_Color _tmp27_ = {0};
	guint8 _tmp28_ = 0U;
	SDL_Color _tmp29_ = {0};
	guint8 _tmp30_ = 0U;
	SDL_Renderer* _tmp31_ = NULL;
	SDL_Texture* _tmp32_ = NULL;
	SDL_Rect* _tmp33_ = NULL;
	gint _tmp34_ = 0;
	gint _tmp35_ = 0;
	gint _tmp36_ = 0;
	gint _tmp37_ = 0;
	SDL_Rect _tmp38_ = {0};
	g_return_if_fail (self != NULL);
	_tmp1_ = clip;
	if (_tmp1_ == NULL) {
		gint _tmp2_ = 0;
		_tmp2_ = self->width;
		_tmp0_ = (guint) _tmp2_;
	} else {
		SDL_Rect* _tmp3_ = NULL;
		guint _tmp4_ = 0U;
		_tmp3_ = clip;
		_tmp4_ = (*_tmp3_).w;
		_tmp0_ = _tmp4_;
	}
	_tmp5_ = self->scale;
	_tmp6_ = _tmp5_.x;
	w = (gint) (_tmp0_ * _tmp6_);
	_tmp8_ = clip;
	if (_tmp8_ == NULL) {
		gint _tmp9_ = 0;
		_tmp9_ = self->height;
		_tmp7_ = (guint) _tmp9_;
	} else {
		SDL_Rect* _tmp10_ = NULL;
		guint _tmp11_ = 0U;
		_tmp10_ = clip;
		_tmp11_ = (*_tmp10_).h;
		_tmp7_ = _tmp11_;
	}
	_tmp12_ = self->scale;
	_tmp13_ = _tmp12_.y;
	h = (gint) (_tmp7_ * _tmp13_);
	_tmp15_ = self->centered;
	if (_tmp15_) {
		gint _tmp16_ = 0;
		gint _tmp17_ = 0;
		_tmp16_ = x;
		_tmp17_ = w;
		_tmp14_ = _tmp16_ - (_tmp17_ / 2);
	} else {
		gint _tmp18_ = 0;
		_tmp18_ = x;
		_tmp14_ = _tmp18_;
	}
	x = _tmp14_;
	_tmp20_ = self->centered;
	if (_tmp20_) {
		gint _tmp21_ = 0;
		gint _tmp22_ = 0;
		_tmp21_ = y;
		_tmp22_ = h;
		_tmp19_ = _tmp21_ - (_tmp22_ / 2);
	} else {
		gint _tmp23_ = 0;
		_tmp23_ = y;
		_tmp19_ = _tmp23_;
	}
	y = _tmp19_;
	_tmp24_ = self->texture;
	_tmp25_ = self->color;
	_tmp26_ = _tmp25_.r;
	_tmp27_ = self->color;
	_tmp28_ = _tmp27_.g;
	_tmp29_ = self->color;
	_tmp30_ = _tmp29_.b;
	SDL_SetTextureColorMod (_tmp24_, _tmp26_, _tmp28_, _tmp30_);
	_tmp31_ = sdx_renderer;
	_tmp32_ = self->texture;
	_tmp33_ = clip;
	_tmp34_ = x;
	_tmp35_ = y;
	_tmp36_ = w;
	_tmp37_ = h;
	_tmp38_.x = _tmp34_;
	_tmp38_.y = _tmp35_;
	_tmp38_.w = (guint) _tmp36_;
	_tmp38_.h = (guint) _tmp37_;
	SDL_RenderCopy (_tmp31_, _tmp32_, _tmp33_, &_tmp38_);
}


void sdx_graphics_sprite_copy (sdxgraphicsSprite* self, SDL_Rect* src, SDL_Rect* dest) {
	SDL_Renderer* _tmp0_ = NULL;
	SDL_Texture* _tmp1_ = NULL;
	SDL_Rect* _tmp2_ = NULL;
	SDL_Rect* _tmp3_ = NULL;
	g_return_if_fail (self != NULL);
	_tmp0_ = sdx_renderer;
	_tmp1_ = self->texture;
	_tmp2_ = src;
	_tmp3_ = dest;
	SDL_RenderCopy (_tmp0_, _tmp1_, _tmp2_, _tmp3_);
}


sdxgraphicsSprite* sdx_graphics_sprite_new (void) {
	sdxgraphicsSprite* self;
	self = g_slice_new0 (sdxgraphicsSprite);
	sdx_graphics_sprite_instance_init (self);
	return self;
}


/**
 * Animated Sprite
 * 
 * @param path to sprite sheet
 * @param width count of sprites horizontally on sheet
 * @param height count of sprites vertially on sheet
 * 
 * For each cell in spritesheet, draw the image from a cell
 */
sdxgraphicsSpriteAnimatedSprite* sdx_graphics_sprite_animated_sprite_new (const gchar* path, gint width, gint height) {
	sdxgraphicsSpriteAnimatedSprite* self;
	const gchar* _tmp0_ = NULL;
	gint _tmp1_ = 0;
	gint _tmp2_ = 0;
	gint _tmp3_ = 0;
	const gchar* _tmp4_ = NULL;
	gchar* _tmp5_ = NULL;
	g_return_val_if_fail (path != NULL, NULL);
	self = (sdxgraphicsSpriteAnimatedSprite*) sdx_graphics_sprite_new ();
	_tmp0_ = path;
	_tmp1_ = sdx_graphics_surface_cached_surface_indexOfPath (_tmp0_);
	((sdxgraphicsSprite*) self)->index = _tmp1_;
	_tmp2_ = height;
	((sdxgraphicsSprite*) self)->height = _tmp2_;
	_tmp3_ = width;
	((sdxgraphicsSprite*) self)->width = _tmp3_;
	_tmp4_ = path;
	_tmp5_ = g_strdup (_tmp4_);
	_g_free0 (((sdxgraphicsSprite*) self)->path);
	((sdxgraphicsSprite*) self)->path = _tmp5_;
	((sdxgraphicsSprite*) self)->kind = SDX_GRAPHICS_SPRITE_KIND_AnimatedSprite;
	sdx_graphics_sprite_animated_sprite_setFrame (self, 0);
	return self;
}


/**
 * setFrame
 * 
 * @param frame index of frame to draw
 */
void sdx_graphics_sprite_animated_sprite_setFrame (sdxgraphicsSpriteAnimatedSprite* self, gint frame) {
	gint _tmp0_ = 0;
	gint _tmp1_ = 0;
	gint _tmp2_ = 0;
	guint32 rmask = 0U;
	guint32 gmask = 0U;
	guint32 bmask = 0U;
	guint32 amask = 0U;
	gint wf = 0;
	sdxgraphicsSurface** _tmp3_ = NULL;
	gint _tmp3__length1 = 0;
	gint _tmp4_ = 0;
	sdxgraphicsSurface* _tmp5_ = NULL;
	SDL_Surface* _tmp6_ = NULL;
	gint _tmp7_ = 0;
	gint _tmp8_ = 0;
	gint hf = 0;
	sdxgraphicsSurface** _tmp9_ = NULL;
	gint _tmp9__length1 = 0;
	gint _tmp10_ = 0;
	sdxgraphicsSurface* _tmp11_ = NULL;
	SDL_Surface* _tmp12_ = NULL;
	gint _tmp13_ = 0;
	gint _tmp14_ = 0;
	gint _tmp15_ = 0;
	gint _tmp16_ = 0;
	gint _tmp17_ = 0;
	gint _tmp18_ = 0;
	gint _tmp19_ = 0;
	gint _tmp20_ = 0;
	SDL_Surface* surface = NULL;
	gint _tmp21_ = 0;
	gint _tmp22_ = 0;
	guint32 _tmp23_ = 0U;
	guint32 _tmp24_ = 0U;
	guint32 _tmp25_ = 0U;
	guint32 _tmp26_ = 0U;
	SDL_Surface* _tmp27_ = NULL;
	sdxgraphicsSurface** _tmp28_ = NULL;
	gint _tmp28__length1 = 0;
	gint _tmp29_ = 0;
	sdxgraphicsSurface* _tmp30_ = NULL;
	SDL_Surface* _tmp31_ = NULL;
	gint _tmp32_ = 0;
	gint _tmp33_ = 0;
	gint _tmp34_ = 0;
	gint _tmp35_ = 0;
	SDL_Rect _tmp36_ = {0};
	SDL_Surface* _tmp37_ = NULL;
	gint _tmp38_ = 0;
	gint _tmp39_ = 0;
	SDL_Rect _tmp40_ = {0};
	SDL_Renderer* _tmp41_ = NULL;
	SDL_Surface* _tmp42_ = NULL;
	SDL_Texture* _tmp43_ = NULL;
	g_return_if_fail (self != NULL);
	_tmp0_ = frame;
	_tmp1_ = ((sdxgraphicsSprite*) self)->frame;
	if (_tmp0_ == _tmp1_) {
		return;
	}
	_tmp2_ = frame;
	((sdxgraphicsSprite*) self)->frame = _tmp2_;
	rmask = (guint32) 0x000000ff;
	gmask = (guint32) 0x0000ff00;
	bmask = (guint32) 0x00ff0000;
	amask = (guint32) 0xff000000LL;
	_tmp3_ = sdx_graphics_surface_cached_surface_cache;
	_tmp3__length1 = sdx_graphics_surface_cached_surface_cache_length1;
	_tmp4_ = ((sdxgraphicsSprite*) self)->index;
	_tmp5_ = _tmp3_[_tmp4_];
	_tmp6_ = _tmp5_->surface;
	_tmp7_ = _tmp6_->w;
	_tmp8_ = ((sdxgraphicsSprite*) self)->width;
	wf = _tmp7_ / _tmp8_;
	_tmp9_ = sdx_graphics_surface_cached_surface_cache;
	_tmp9__length1 = sdx_graphics_surface_cached_surface_cache_length1;
	_tmp10_ = ((sdxgraphicsSprite*) self)->index;
	_tmp11_ = _tmp9_[_tmp10_];
	_tmp12_ = _tmp11_->surface;
	_tmp13_ = _tmp12_->h;
	_tmp14_ = ((sdxgraphicsSprite*) self)->height;
	hf = _tmp13_ / _tmp14_;
	_tmp15_ = frame;
	_tmp16_ = wf;
	_tmp17_ = ((sdxgraphicsSprite*) self)->width;
	((sdxgraphicsSprite*) self)->x = (_tmp15_ % _tmp16_) * _tmp17_;
	_tmp18_ = frame;
	_tmp19_ = wf;
	_tmp20_ = ((sdxgraphicsSprite*) self)->height;
	((sdxgraphicsSprite*) self)->y = ((gint) (_tmp18_ / _tmp19_)) * _tmp20_;
	_tmp21_ = ((sdxgraphicsSprite*) self)->width;
	_tmp22_ = ((sdxgraphicsSprite*) self)->height;
	_tmp23_ = rmask;
	_tmp24_ = gmask;
	_tmp25_ = bmask;
	_tmp26_ = amask;
	_tmp27_ = SDL_CreateRGBSurface ((guint32) 0, _tmp21_, _tmp22_, 32, _tmp23_, _tmp24_, _tmp25_, _tmp26_);
	surface = _tmp27_;
	_tmp28_ = sdx_graphics_surface_cached_surface_cache;
	_tmp28__length1 = sdx_graphics_surface_cached_surface_cache_length1;
	_tmp29_ = ((sdxgraphicsSprite*) self)->index;
	_tmp30_ = _tmp28_[_tmp29_];
	_tmp31_ = _tmp30_->surface;
	_tmp32_ = ((sdxgraphicsSprite*) self)->x;
	_tmp33_ = ((sdxgraphicsSprite*) self)->y;
	_tmp34_ = ((sdxgraphicsSprite*) self)->width;
	_tmp35_ = ((sdxgraphicsSprite*) self)->height;
	_tmp36_.x = _tmp32_;
	_tmp36_.y = _tmp33_;
	_tmp36_.w = (guint) _tmp34_;
	_tmp36_.h = (guint) _tmp35_;
	_tmp37_ = surface;
	_tmp38_ = ((sdxgraphicsSprite*) self)->width;
	_tmp39_ = ((sdxgraphicsSprite*) self)->height;
	_tmp40_.x = 0;
	_tmp40_.y = 0;
	_tmp40_.w = (guint) _tmp38_;
	_tmp40_.h = (guint) _tmp39_;
	SDL_BlitScaled (_tmp31_, &_tmp36_, _tmp37_, &_tmp40_);
	_tmp41_ = sdx_renderer;
	_tmp42_ = surface;
	_tmp43_ = SDL_CreateTextureFromSurface (_tmp41_, _tmp42_);
	_SDL_DestroyTexture0 (((sdxgraphicsSprite*) self)->texture);
	((sdxgraphicsSprite*) self)->texture = _tmp43_;
	_SDL_FreeSurface0 (surface);
}


/**
 * TextureSprite
 * 
 * @param path to single surface
 * 
 * Simple sprite, 1 image per file
 */
sdxgraphicsSpriteTextureSprite* sdx_graphics_sprite_texture_sprite_new (const gchar* path) {
	sdxgraphicsSpriteTextureSprite* self;
	gint index = 0;
	const gchar* _tmp0_ = NULL;
	gint _tmp1_ = 0;
	SDL_Renderer* _tmp2_ = NULL;
	sdxgraphicsSurface** _tmp3_ = NULL;
	gint _tmp3__length1 = 0;
	gint _tmp4_ = 0;
	sdxgraphicsSurface* _tmp5_ = NULL;
	SDL_Surface* _tmp6_ = NULL;
	SDL_Texture* _tmp7_ = NULL;
	SDL_Texture* _tmp8_ = NULL;
	SDL_Texture* _tmp11_ = NULL;
	sdxgraphicsSurface** _tmp12_ = NULL;
	gint _tmp12__length1 = 0;
	gint _tmp13_ = 0;
	sdxgraphicsSurface* _tmp14_ = NULL;
	gint _tmp15_ = 0;
	gint _tmp16_ = 0;
	sdxgraphicsSurface** _tmp17_ = NULL;
	gint _tmp17__length1 = 0;
	gint _tmp18_ = 0;
	sdxgraphicsSurface* _tmp19_ = NULL;
	gint _tmp20_ = 0;
	gint _tmp21_ = 0;
	const gchar* _tmp22_ = NULL;
	gchar* _tmp23_ = NULL;
	GError * _inner_error_ = NULL;
	g_return_val_if_fail (path != NULL, NULL);
	self = (sdxgraphicsSpriteTextureSprite*) sdx_graphics_sprite_new ();
	_tmp0_ = path;
	_tmp1_ = sdx_graphics_surface_cached_surface_indexOfPath (_tmp0_);
	index = _tmp1_;
	_tmp2_ = sdx_renderer;
	_tmp3_ = sdx_graphics_surface_cached_surface_cache;
	_tmp3__length1 = sdx_graphics_surface_cached_surface_cache_length1;
	_tmp4_ = index;
	_tmp5_ = _tmp3_[_tmp4_];
	_tmp6_ = _tmp5_->surface;
	_tmp7_ = SDL_CreateTextureFromSurface (_tmp2_, _tmp6_);
	_SDL_DestroyTexture0 (((sdxgraphicsSprite*) self)->texture);
	((sdxgraphicsSprite*) self)->texture = _tmp7_;
	_tmp8_ = ((sdxgraphicsSprite*) self)->texture;
	if (_tmp8_ == NULL) {
		const gchar* _tmp9_ = NULL;
		GError* _tmp10_ = NULL;
		_tmp9_ = path;
		_tmp10_ = g_error_new_literal (SDX_SDL_EXCEPTION, SDX_SDL_EXCEPTION_UnableToLoadTexture, _tmp9_);
		_inner_error_ = _tmp10_;
		g_critical ("file %s: line %d: uncaught error: %s (%s, %d)", __FILE__, __LINE__, _inner_error_->message, g_quark_to_string (_inner_error_->domain), _inner_error_->code);
		g_clear_error (&_inner_error_);
		return NULL;
	}
	_tmp11_ = ((sdxgraphicsSprite*) self)->texture;
	SDL_SetTextureBlendMode (_tmp11_, SDL_BLENDMODE_BLEND);
	_tmp12_ = sdx_graphics_surface_cached_surface_cache;
	_tmp12__length1 = sdx_graphics_surface_cached_surface_cache_length1;
	_tmp13_ = index;
	_tmp14_ = _tmp12_[_tmp13_];
	_tmp15_ = sdx_graphics_surface_get_width (_tmp14_);
	_tmp16_ = _tmp15_;
	((sdxgraphicsSprite*) self)->width = _tmp16_;
	_tmp17_ = sdx_graphics_surface_cached_surface_cache;
	_tmp17__length1 = sdx_graphics_surface_cached_surface_cache_length1;
	_tmp18_ = index;
	_tmp19_ = _tmp17_[_tmp18_];
	_tmp20_ = sdx_graphics_surface_get_height (_tmp19_);
	_tmp21_ = _tmp20_;
	((sdxgraphicsSprite*) self)->height = _tmp21_;
	_tmp22_ = path;
	_tmp23_ = g_strdup (_tmp22_);
	_g_free0 (((sdxgraphicsSprite*) self)->path);
	((sdxgraphicsSprite*) self)->path = _tmp23_;
	((sdxgraphicsSprite*) self)->kind = SDX_GRAPHICS_SPRITE_KIND_TextureSprite;
	return self;
}


/**
 * AtlasSprite
 * 
 * @param path to LibGDX TexturePacker Atlas
 * 
 */
sdxgraphicsSpriteAtlasSprite* sdx_graphics_sprite_atlas_sprite_new (sdxgraphicsAtlasRegion* region) {
	sdxgraphicsSpriteAtlasSprite* self;
	gchar* path = NULL;
	sdxgraphicsAtlasRegion* _tmp0_ = NULL;
	sdxgraphicsTextureRegion* _tmp1_ = NULL;
	sdxgraphicsSurfaceTextureSurface* _tmp2_ = NULL;
	const gchar* _tmp3_ = NULL;
	gchar* _tmp4_ = NULL;
	gint index = 0;
	sdxgraphicsAtlasRegion* _tmp5_ = NULL;
	sdxgraphicsTextureRegion* _tmp6_ = NULL;
	sdxgraphicsSurfaceTextureSurface* _tmp7_ = NULL;
	const gchar* _tmp8_ = NULL;
	gint _tmp9_ = 0;
	guint32 rmask = 0U;
	guint32 gmask = 0U;
	guint32 bmask = 0U;
	guint32 amask = 0U;
	gint x = 0;
	sdxgraphicsAtlasRegion* _tmp10_ = NULL;
	sdxgraphicsTextureRegion* _tmp11_ = NULL;
	gint _tmp12_ = 0;
	gint y = 0;
	sdxgraphicsAtlasRegion* _tmp13_ = NULL;
	sdxgraphicsTextureRegion* _tmp14_ = NULL;
	gint _tmp15_ = 0;
	gint w = 0;
	sdxgraphicsAtlasRegion* _tmp16_ = NULL;
	sdxgraphicsTextureRegion* _tmp17_ = NULL;
	gint _tmp18_ = 0;
	gint h = 0;
	sdxgraphicsAtlasRegion* _tmp19_ = NULL;
	sdxgraphicsTextureRegion* _tmp20_ = NULL;
	gint _tmp21_ = 0;
	SDL_Surface* surface = NULL;
	SDL_Surface* _tmp22_ = NULL;
	sdxgraphicsSurface** _tmp23_ = NULL;
	gint _tmp23__length1 = 0;
	sdxgraphicsSurface* _tmp24_ = NULL;
	SDL_Surface* _tmp25_ = NULL;
	SDL_Rect _tmp26_ = {0};
	SDL_Rect _tmp27_ = {0};
	SDL_Renderer* _tmp28_ = NULL;
	SDL_Texture* _tmp29_ = NULL;
	sdxgraphicsAtlasRegion* _tmp30_ = NULL;
	const gchar* _tmp31_ = NULL;
	gchar* _tmp32_ = NULL;
	g_return_val_if_fail (region != NULL, NULL);
	self = (sdxgraphicsSpriteAtlasSprite*) sdx_graphics_sprite_new ();
	_tmp0_ = region;
	_tmp1_ = _tmp0_->rg;
	_tmp2_ = _tmp1_->texture;
	_tmp3_ = ((sdxgraphicsSurface*) _tmp2_)->path;
	_tmp4_ = g_strdup (_tmp3_);
	path = _tmp4_;
	_tmp5_ = region;
	_tmp6_ = _tmp5_->rg;
	_tmp7_ = _tmp6_->texture;
	_tmp8_ = ((sdxgraphicsSurface*) _tmp7_)->path;
	_tmp9_ = sdx_graphics_surface_cached_surface_indexOfPath (_tmp8_);
	index = _tmp9_;
	rmask = (guint32) 0x000000ff;
	gmask = (guint32) 0x0000ff00;
	bmask = (guint32) 0x00ff0000;
	amask = (guint32) 0xff000000LL;
	_tmp10_ = region;
	_tmp11_ = _tmp10_->rg;
	_tmp12_ = _tmp11_->top;
	x = _tmp12_;
	_tmp13_ = region;
	_tmp14_ = _tmp13_->rg;
	_tmp15_ = _tmp14_->left;
	y = _tmp15_;
	_tmp16_ = region;
	_tmp17_ = _tmp16_->rg;
	_tmp18_ = _tmp17_->width;
	w = _tmp18_;
	_tmp19_ = region;
	_tmp20_ = _tmp19_->rg;
	_tmp21_ = _tmp20_->height;
	h = _tmp21_;
	_tmp22_ = SDL_CreateRGBSurface ((guint32) 0, w, h, 32, rmask, gmask, bmask, amask);
	surface = _tmp22_;
	_tmp23_ = sdx_graphics_surface_cached_surface_cache;
	_tmp23__length1 = sdx_graphics_surface_cached_surface_cache_length1;
	_tmp24_ = _tmp23_[index];
	_tmp25_ = _tmp24_->surface;
	_tmp26_.x = x;
	_tmp26_.y = y;
	_tmp26_.w = (guint) w;
	_tmp26_.h = (guint) h;
	_tmp27_.x = 0;
	_tmp27_.y = 0;
	_tmp27_.w = (guint) w;
	_tmp27_.h = (guint) h;
	SDL_BlitScaled (_tmp25_, &_tmp26_, surface, &_tmp27_);
	_tmp28_ = sdx_renderer;
	_tmp29_ = SDL_CreateTextureFromSurface (_tmp28_, surface);
	_SDL_DestroyTexture0 (((sdxgraphicsSprite*) self)->texture);
	((sdxgraphicsSprite*) self)->texture = _tmp29_;
	((sdxgraphicsSprite*) self)->width = w;
	((sdxgraphicsSprite*) self)->height = h;
	_tmp30_ = region;
	_tmp31_ = _tmp30_->name;
	_tmp32_ = g_strdup (_tmp31_);
	_g_free0 (((sdxgraphicsSprite*) self)->path);
	((sdxgraphicsSprite*) self)->path = _tmp32_;
	((sdxgraphicsSprite*) self)->kind = SDX_GRAPHICS_SPRITE_KIND_AtlasSprite;
	_SDL_FreeSurface0 (surface);
	_g_free0 (path);
	return self;
}


/**
 * CompositeSprite
 * 
 * @param path to custom atlas
 * @param function that returns a list of rectangles
 * 
 */
sdxgraphicsSpriteCompositeSprite* sdx_graphics_sprite_composite_sprite_new (const gchar* path, sdxgraphicsCompositor builder, void* builder_target) {
	sdxgraphicsSpriteCompositeSprite* self;
	gint h = 0;
	gint w = 0;
	sdxgraphicsCompositor _tmp0_ = NULL;
	void* _tmp0__target = NULL;
	gint _tmp1_ = 0;
	sdxgraphicsBlit* _tmp2_ = NULL;
	gint index = 0;
	const gchar* _tmp17_ = NULL;
	gint _tmp18_ = 0;
	guint32 rmask = 0U;
	guint32 gmask = 0U;
	guint32 bmask = 0U;
	guint32 amask = 0U;
	SDL_Surface* surface = NULL;
	gint _tmp19_ = 0;
	gint _tmp20_ = 0;
	guint32 _tmp21_ = 0U;
	guint32 _tmp22_ = 0U;
	guint32 _tmp23_ = 0U;
	guint32 _tmp24_ = 0U;
	SDL_Surface* _tmp25_ = NULL;
	sdxgraphicsCompositor _tmp26_ = NULL;
	void* _tmp26__target = NULL;
	gint _tmp27_ = 0;
	gint _tmp28_ = 0;
	gint _tmp29_ = 0;
	sdxgraphicsBlit* _tmp30_ = NULL;
	SDL_Renderer* _tmp40_ = NULL;
	SDL_Surface* _tmp41_ = NULL;
	SDL_Texture* _tmp42_ = NULL;
	gint _tmp43_ = 0;
	gint _tmp44_ = 0;
	const gchar* _tmp45_ = NULL;
	gchar* _tmp46_ = NULL;
	g_return_val_if_fail (path != NULL, NULL);
	self = (sdxgraphicsSpriteCompositeSprite*) sdx_graphics_sprite_new ();
	h = 0;
	w = 0;
	_tmp0_ = builder;
	_tmp0__target = builder_target;
	_tmp2_ = _tmp0_ (0, 0, &_tmp1_, _tmp0__target);
	{
		sdxgraphicsBlit* segment_collection = NULL;
		gint segment_collection_length1 = 0;
		gint _segment_collection_size_ = 0;
		gint segment_it = 0;
		segment_collection = _tmp2_;
		segment_collection_length1 = _tmp1_;
		for (segment_it = 0; segment_it < _tmp1_; segment_it = segment_it + 1) {
			sdxgraphicsBlit segment = {0};
			segment = segment_collection[segment_it];
			{
				sdxgraphicsBlit _tmp3_ = {0};
				SDL_Rect _tmp4_ = {0};
				guint _tmp5_ = 0U;
				gint _tmp6_ = 0;
				sdxgraphicsBlit _tmp10_ = {0};
				SDL_Rect _tmp11_ = {0};
				guint _tmp12_ = 0U;
				gint _tmp13_ = 0;
				_tmp3_ = segment;
				_tmp4_ = _tmp3_.dest;
				_tmp5_ = _tmp4_.h;
				_tmp6_ = h;
				if (_tmp5_ > ((guint) _tmp6_)) {
					sdxgraphicsBlit _tmp7_ = {0};
					SDL_Rect _tmp8_ = {0};
					guint _tmp9_ = 0U;
					_tmp7_ = segment;
					_tmp8_ = _tmp7_.dest;
					_tmp9_ = _tmp8_.h;
					h = (gint) _tmp9_;
				}
				_tmp10_ = segment;
				_tmp11_ = _tmp10_.dest;
				_tmp12_ = _tmp11_.w;
				_tmp13_ = w;
				if (_tmp12_ > ((guint) _tmp13_)) {
					sdxgraphicsBlit _tmp14_ = {0};
					SDL_Rect _tmp15_ = {0};
					guint _tmp16_ = 0U;
					_tmp14_ = segment;
					_tmp15_ = _tmp14_.dest;
					_tmp16_ = _tmp15_.w;
					w = (gint) _tmp16_;
				}
			}
		}
		segment_collection = (g_free (segment_collection), NULL);
	}
	_tmp17_ = path;
	_tmp18_ = sdx_graphics_surface_cached_surface_indexOfPath (_tmp17_);
	index = _tmp18_;
	rmask = (guint32) 0x000000ff;
	gmask = (guint32) 0x0000ff00;
	bmask = (guint32) 0x00ff0000;
	amask = (guint32) 0xff000000LL;
	_tmp19_ = h;
	_tmp20_ = w;
	_tmp21_ = rmask;
	_tmp22_ = gmask;
	_tmp23_ = bmask;
	_tmp24_ = amask;
	_tmp25_ = SDL_CreateRGBSurface ((guint32) 0, _tmp19_, _tmp20_, 32, _tmp21_, _tmp22_, _tmp23_, _tmp24_);
	surface = _tmp25_;
	_tmp26_ = builder;
	_tmp26__target = builder_target;
	_tmp27_ = h;
	_tmp28_ = w;
	_tmp30_ = _tmp26_ (_tmp27_ / 2, _tmp28_ / 2, &_tmp29_, _tmp26__target);
	{
		sdxgraphicsBlit* segment_collection = NULL;
		gint segment_collection_length1 = 0;
		gint _segment_collection_size_ = 0;
		gint segment_it = 0;
		segment_collection = _tmp30_;
		segment_collection_length1 = _tmp29_;
		for (segment_it = 0; segment_it < _tmp29_; segment_it = segment_it + 1) {
			sdxgraphicsBlit segment = {0};
			segment = segment_collection[segment_it];
			{
				sdxgraphicsSurface** _tmp31_ = NULL;
				gint _tmp31__length1 = 0;
				gint _tmp32_ = 0;
				sdxgraphicsSurface* _tmp33_ = NULL;
				SDL_Surface* _tmp34_ = NULL;
				sdxgraphicsBlit _tmp35_ = {0};
				SDL_Rect _tmp36_ = {0};
				SDL_Surface* _tmp37_ = NULL;
				sdxgraphicsBlit _tmp38_ = {0};
				SDL_Rect _tmp39_ = {0};
				_tmp31_ = sdx_graphics_surface_cached_surface_cache;
				_tmp31__length1 = sdx_graphics_surface_cached_surface_cache_length1;
				_tmp32_ = index;
				_tmp33_ = _tmp31_[_tmp32_];
				_tmp34_ = _tmp33_->surface;
				_tmp35_ = segment;
				_tmp36_ = _tmp35_.source;
				_tmp37_ = surface;
				_tmp38_ = segment;
				_tmp39_ = _tmp38_.dest;
				SDL_BlitScaled (_tmp34_, &_tmp36_, _tmp37_, &_tmp39_);
			}
		}
		segment_collection = (g_free (segment_collection), NULL);
	}
	_tmp40_ = sdx_renderer;
	_tmp41_ = surface;
	_tmp42_ = SDL_CreateTextureFromSurface (_tmp40_, _tmp41_);
	_SDL_DestroyTexture0 (((sdxgraphicsSprite*) self)->texture);
	((sdxgraphicsSprite*) self)->texture = _tmp42_;
	_tmp43_ = w;
	((sdxgraphicsSprite*) self)->width = _tmp43_;
	_tmp44_ = h;
	((sdxgraphicsSprite*) self)->height = _tmp44_;
	_tmp45_ = path;
	_tmp46_ = g_strdup (_tmp45_);
	_g_free0 (((sdxgraphicsSprite*) self)->path);
	((sdxgraphicsSprite*) self)->path = _tmp46_;
	((sdxgraphicsSprite*) self)->kind = SDX_GRAPHICS_SPRITE_KIND_CompositeSprite;
	_SDL_FreeSurface0 (surface);
	return self;
}


/**
 * TextSprite
 * 
 * @param text string of text to generate
 * @param font used to generate text
 * @param color foregound text color (background transparent)
 * 
 */
sdxgraphicsSpriteTextSprite* sdx_graphics_sprite_text_sprite_new (const gchar* text, sdxFont* font, SDL_Color color) {
	sdxgraphicsSpriteTextSprite* self;
	const gchar* _tmp0_ = NULL;
	sdxFont* _tmp1_ = NULL;
	SDL_Color _tmp2_ = {0};
	g_return_val_if_fail (text != NULL, NULL);
	g_return_val_if_fail (font != NULL, NULL);
	self = (sdxgraphicsSpriteTextSprite*) sdx_graphics_sprite_new ();
	_tmp0_ = text;
	_tmp1_ = font;
	_tmp2_ = color;
	sdx_graphics_sprite_text_sprite_setText (self, _tmp0_, _tmp1_, _tmp2_);
	((sdxgraphicsSprite*) self)->centered = FALSE;
	((sdxgraphicsSprite*) self)->kind = SDX_GRAPHICS_SPRITE_KIND_TextSprite;
	return self;
}


/**
 *  Change the text value of a Sprite.fromRenderedText
 *
 * @param text string of text to generate
 * @param font used to generate text
 * @param color foregound text color (background transparent)
 */
void sdx_graphics_sprite_text_sprite_setText (sdxgraphicsSpriteTextSprite* self, const gchar* text, sdxFont* font, SDL_Color color) {
	SDL_Surface* surface = NULL;
	sdxFont* _tmp0_ = NULL;
	const gchar* _tmp1_ = NULL;
	SDL_Color _tmp2_ = {0};
	SDL_Surface* _tmp3_ = NULL;
	SDL_Renderer* _tmp4_ = NULL;
	SDL_Texture* _tmp5_ = NULL;
	SDL_Texture* _tmp6_ = NULL;
	gint _tmp7_ = 0;
	gint _tmp8_ = 0;
	const gchar* _tmp9_ = NULL;
	gchar* _tmp10_ = NULL;
	g_return_if_fail (self != NULL);
	g_return_if_fail (text != NULL);
	g_return_if_fail (font != NULL);
	_tmp0_ = font;
	_tmp1_ = text;
	_tmp2_ = color;
	_tmp3_ = sdx_font_render (_tmp0_, _tmp1_, _tmp2_);
	surface = _tmp3_;
	_tmp4_ = sdx_renderer;
	_tmp5_ = SDL_CreateTextureFromSurface (_tmp4_, surface);
	_SDL_DestroyTexture0 (((sdxgraphicsSprite*) self)->texture);
	((sdxgraphicsSprite*) self)->texture = _tmp5_;
	_tmp6_ = ((sdxgraphicsSprite*) self)->texture;
	SDL_SetTextureBlendMode (_tmp6_, SDL_BLENDMODE_BLEND);
	_tmp7_ = surface->w;
	((sdxgraphicsSprite*) self)->width = _tmp7_;
	_tmp8_ = surface->h;
	((sdxgraphicsSprite*) self)->height = _tmp8_;
	_tmp9_ = text;
	_tmp10_ = g_strdup (_tmp9_);
	_g_free0 (((sdxgraphicsSprite*) self)->path);
	((sdxgraphicsSprite*) self)->path = _tmp10_;
	_SDL_FreeSurface0 (surface);
}


static void sdx_graphics_sprite_instance_init (sdxgraphicsSprite * self) {
	gint _tmp0_ = 0;
	gint _tmp1_ = 0;
	sdxgraphicsScale _tmp2_ = {0};
	self->_retainCount = 1;
	_tmp0_ = sdx_graphics_sprite_uniqueId;
	sdx_graphics_sprite_uniqueId = _tmp0_ + 1;
	_tmp1_ = sdx_graphics_sprite_uniqueId;
	self->id = _tmp1_;
	self->frame = -1;
	memset (&_tmp2_, 0, sizeof (sdxgraphicsScale));
	_tmp2_.x = (gfloat) 1;
	_tmp2_.y = (gfloat) 1;
	self->scale = _tmp2_;
	self->color = SDX_COLOR_White;
	self->centered = TRUE;
	self->layer = 0;
}


void sdx_graphics_sprite_free (sdxgraphicsSprite* self) {
	_SDL_DestroyTexture0 (self->texture);
	_g_free0 (self->path);
	g_slice_free (sdxgraphicsSprite, self);
}



