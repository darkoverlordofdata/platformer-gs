/* Hud.c generated by valac 0.34.8, the Vala compiler
 * generated from Hud.gs, do not modify */


#include <glib.h>
#include <glib-object.h>
#include <stdlib.h>
#include <string.h>
#include <SDL2/SDL_pixels.h>
#include <float.h>
#include <math.h>
#include <SDL2/SDL_rect.h>

typedef struct _Hud Hud;
typedef struct _sdxgraphicsSprite sdxgraphicsSprite;
typedef sdxgraphicsSprite sdxgraphicsSpriteTextSprite;
#define _g_free0(var) (var = (g_free (var), NULL))
void sdx_graphics_sprite_release (sdxgraphicsSprite* self);
void sdx_graphics_sprite_free (sdxgraphicsSprite* self);
sdxgraphicsSprite* sdx_graphics_sprite_retain (sdxgraphicsSprite* self);
#define _sdx_graphics_sprite_release0(var) ((var == NULL) ? NULL : (var = (sdx_graphics_sprite_release (var), NULL)))
typedef struct _sdxFont sdxFont;

#define TYPE_ENTITY (entity_get_type ())

#define TYPE_CATEGORY (category_get_type ())

#define TYPE_ACTOR (actor_get_type ())

#define SDX_MATH_TYPE_VECTOR2 (sdx_math_vector2_get_type ())
typedef struct _sdxmathVector2 sdxmathVector2;

#define SDX_GRAPHICS_TYPE_BBOX (sdx_graphics_bbox_get_type ())
typedef SDL_Rect sdxgraphicsBBox;

#define TYPE_TIMER (timer_get_type ())
typedef struct _Timer Timer;

#define TYPE_HEALTH (health_get_type ())
typedef struct _Health Health;
typedef struct _Entity Entity;

struct _Hud {
	gint retainCount__;
	gchar* text1;
	gchar* text2;
	gchar* text3;
	sdxgraphicsSpriteTextSprite* hudText1;
	sdxgraphicsSpriteTextSprite* hudText2;
	sdxgraphicsSpriteTextSprite* hudText3;
};

typedef enum  {
	CATEGORY_BACKGROUND,
	CATEGORY_PLAYER,
	CATEGORY_BONUS
} Category;

typedef enum  {
	ACTOR_DEFAULT,
	ACTOR_BACKGROUND,
	ACTOR_TEXT,
	ACTOR_PLAYER,
	ACTOR_BONUS,
	ACTOR_HUD
} Actor;

struct _sdxmathVector2 {
	gfloat x;
	gfloat y;
};

struct _Timer {
	gint begin;
	gint finish;
	gint best;
};

struct _Health {
	gint curHealth;
	gint maxHealth;
};

struct _Entity {
	gint id;
	gchar* name;
	gboolean active;
	Category category;
	Actor actor;
	sdxmathVector2 position;
	sdxgraphicsBBox bounds;
	sdxgraphicsSprite* sprite;
	sdxmathVector2* size;
	sdxmathVector2* scale;
	SDL_Color* tint;
	Timer* expires;
	Health* health;
	sdxmathVector2* velocity;
};


extern sdxFont* sdx_font;

void hud_free (Hud* self);
void sdx_graphics_sprite_free (sdxgraphicsSprite* self);
static void hud_instance_init (Hud * self);
Hud* hud_retain (Hud* self);
void hud_release (Hud* self);
void hud_free (Hud* self);
Hud* hud_new (void);
void sdx_font_free (sdxFont* self);
sdxgraphicsSpriteTextSprite* sdx_graphics_sprite_text_sprite_new (const gchar* text, sdxFont* font, SDL_Color color);
GType entity_get_type (void) G_GNUC_CONST;
GType category_get_type (void) G_GNUC_CONST;
GType actor_get_type (void) G_GNUC_CONST;
GType sdx_math_vector2_get_type (void) G_GNUC_CONST;
sdxmathVector2* sdx_math_vector2_dup (const sdxmathVector2* self);
void sdx_math_vector2_free (sdxmathVector2* self);
GType sdx_graphics_bbox_get_type (void) G_GNUC_CONST;
sdxgraphicsBBox* sdx_graphics_bbox_dup (const sdxgraphicsBBox* self);
void sdx_graphics_bbox_free (sdxgraphicsBBox* self);
GType timer_get_type (void) G_GNUC_CONST;
Timer* timer_dup (const Timer* self);
void timer_free (Timer* self);
GType health_get_type (void) G_GNUC_CONST;
Health* health_dup (const Health* self);
void health_free (Health* self);
Entity* entity_dup (const Entity* self);
void entity_free (Entity* self);
void entity_copy (const Entity* self, Entity* dest);
void entity_destroy (Entity* self);
void hud_render (Hud* self, Entity** player, gint tick);
gchar* formatTime (gint ticks);
void sdx_graphics_sprite_text_sprite_setText (sdxgraphicsSpriteTextSprite* self, const gchar* text, sdxFont* font, SDL_Color color);
void sdx_graphics_sprite_render (sdxgraphicsSprite* self, gint x, gint y, SDL_Rect* clip);

extern const SDL_Color SDX_COLOR_Cyan;

Hud* hud_retain (Hud* self) {
	Hud* result = NULL;
	g_return_val_if_fail (self != NULL, NULL);
	g_atomic_int_add ((volatile gint *) (&self->retainCount__), 1);
	result = self;
	return result;
}


void hud_release (Hud* self) {
	gboolean _tmp0_ = FALSE;
	g_return_if_fail (self != NULL);
	_tmp0_ = g_atomic_int_dec_and_test ((volatile gint *) (&self->retainCount__));
	if (_tmp0_) {
		hud_free (self);
	}
}


Hud* hud_new (void) {
	Hud* self;
	sdxFont* _tmp0_ = NULL;
	sdxgraphicsSpriteTextSprite* _tmp1_ = NULL;
	sdxFont* _tmp2_ = NULL;
	sdxgraphicsSpriteTextSprite* _tmp3_ = NULL;
	sdxFont* _tmp4_ = NULL;
	sdxgraphicsSpriteTextSprite* _tmp5_ = NULL;
	self = g_slice_new0 (Hud);
	hud_instance_init (self);
	_tmp0_ = sdx_font;
	_tmp1_ = sdx_graphics_sprite_text_sprite_new (" ", _tmp0_, SDX_COLOR_Cyan);
	_sdx_graphics_sprite_release0 (self->hudText1);
	self->hudText1 = _tmp1_;
	_tmp2_ = sdx_font;
	_tmp3_ = sdx_graphics_sprite_text_sprite_new (" ", _tmp2_, SDX_COLOR_Cyan);
	_sdx_graphics_sprite_release0 (self->hudText2);
	self->hudText2 = _tmp3_;
	_tmp4_ = sdx_font;
	_tmp5_ = sdx_graphics_sprite_text_sprite_new (" ", _tmp4_, SDX_COLOR_Cyan);
	_sdx_graphics_sprite_release0 (self->hudText3);
	self->hudText3 = _tmp5_;
	return self;
}


void hud_render (Hud* self, Entity** player, gint tick) {
	Entity* _tmp0_ = NULL;
	Timer* _tmp1_ = NULL;
	gint _tmp2_ = 0;
	Entity* _tmp31_ = NULL;
	Timer* _tmp32_ = NULL;
	gint _tmp33_ = 0;
	g_return_if_fail (self != NULL);
	_tmp0_ = *player;
	_tmp1_ = (*_tmp0_).expires;
	_tmp2_ = (*_tmp1_).begin;
	if (_tmp2_ >= 0) {
		gchar* t1 = NULL;
		gint _tmp3_ = 0;
		Entity* _tmp4_ = NULL;
		Timer* _tmp5_ = NULL;
		gint _tmp6_ = 0;
		gchar* _tmp7_ = NULL;
		const gchar* _tmp8_ = NULL;
		const gchar* _tmp9_ = NULL;
		sdxgraphicsSpriteTextSprite* _tmp15_ = NULL;
		_tmp3_ = tick;
		_tmp4_ = *player;
		_tmp5_ = (*_tmp4_).expires;
		_tmp6_ = (*_tmp5_).begin;
		_tmp7_ = formatTime (_tmp3_ - _tmp6_);
		t1 = _tmp7_;
		_tmp8_ = self->text1;
		_tmp9_ = t1;
		if (g_strcmp0 (_tmp8_, _tmp9_) != 0) {
			const gchar* _tmp10_ = NULL;
			gchar* _tmp11_ = NULL;
			sdxgraphicsSpriteTextSprite* _tmp12_ = NULL;
			const gchar* _tmp13_ = NULL;
			sdxFont* _tmp14_ = NULL;
			_tmp10_ = t1;
			_tmp11_ = g_strdup (_tmp10_);
			_g_free0 (self->text1);
			self->text1 = _tmp11_;
			_tmp12_ = self->hudText1;
			_tmp13_ = self->text1;
			_tmp14_ = sdx_font;
			sdx_graphics_sprite_text_sprite_setText (_tmp12_, _tmp13_, _tmp14_, SDX_COLOR_Cyan);
		}
		_tmp15_ = self->hudText1;
		sdx_graphics_sprite_render ((sdxgraphicsSprite*) _tmp15_, 50, 100, NULL);
		_g_free0 (t1);
	} else {
		Entity* _tmp16_ = NULL;
		Timer* _tmp17_ = NULL;
		gint _tmp18_ = 0;
		_tmp16_ = *player;
		_tmp17_ = (*_tmp16_).expires;
		_tmp18_ = (*_tmp17_).finish;
		if (_tmp18_ >= 0) {
			gchar* t2 = NULL;
			Entity* _tmp19_ = NULL;
			Timer* _tmp20_ = NULL;
			gint _tmp21_ = 0;
			gchar* _tmp22_ = NULL;
			const gchar* _tmp23_ = NULL;
			const gchar* _tmp24_ = NULL;
			sdxgraphicsSpriteTextSprite* _tmp30_ = NULL;
			_tmp19_ = *player;
			_tmp20_ = (*_tmp19_).expires;
			_tmp21_ = (*_tmp20_).finish;
			_tmp22_ = formatTime (_tmp21_);
			t2 = _tmp22_;
			_tmp23_ = self->text2;
			_tmp24_ = t2;
			if (g_strcmp0 (_tmp23_, _tmp24_) != 0) {
				const gchar* _tmp25_ = NULL;
				gchar* _tmp26_ = NULL;
				sdxgraphicsSpriteTextSprite* _tmp27_ = NULL;
				const gchar* _tmp28_ = NULL;
				sdxFont* _tmp29_ = NULL;
				_tmp25_ = t2;
				_tmp26_ = g_strdup (_tmp25_);
				_g_free0 (self->text2);
				self->text2 = _tmp26_;
				_tmp27_ = self->hudText2;
				_tmp28_ = self->text2;
				_tmp29_ = sdx_font;
				sdx_graphics_sprite_text_sprite_setText (_tmp27_, _tmp28_, _tmp29_, SDX_COLOR_Cyan);
			}
			_tmp30_ = self->hudText2;
			sdx_graphics_sprite_render ((sdxgraphicsSprite*) _tmp30_, 50, 100, NULL);
			_g_free0 (t2);
		}
	}
	_tmp31_ = *player;
	_tmp32_ = (*_tmp31_).expires;
	_tmp33_ = (*_tmp32_).best;
	if (_tmp33_ >= 0) {
		gchar* t3 = NULL;
		Entity* _tmp34_ = NULL;
		Timer* _tmp35_ = NULL;
		gint _tmp36_ = 0;
		gchar* _tmp37_ = NULL;
		gchar* _tmp38_ = NULL;
		gchar* _tmp39_ = NULL;
		gchar* _tmp40_ = NULL;
		const gchar* _tmp41_ = NULL;
		const gchar* _tmp42_ = NULL;
		sdxgraphicsSpriteTextSprite* _tmp48_ = NULL;
		_tmp34_ = *player;
		_tmp35_ = (*_tmp34_).expires;
		_tmp36_ = (*_tmp35_).best;
		_tmp37_ = formatTime (_tmp36_);
		_tmp38_ = _tmp37_;
		_tmp39_ = g_strconcat ("Best time: ", _tmp38_, NULL);
		_tmp40_ = _tmp39_;
		_g_free0 (_tmp38_);
		t3 = _tmp40_;
		_tmp41_ = self->text3;
		_tmp42_ = t3;
		if (g_strcmp0 (_tmp41_, _tmp42_) != 0) {
			const gchar* _tmp43_ = NULL;
			gchar* _tmp44_ = NULL;
			sdxgraphicsSpriteTextSprite* _tmp45_ = NULL;
			const gchar* _tmp46_ = NULL;
			sdxFont* _tmp47_ = NULL;
			_tmp43_ = t3;
			_tmp44_ = g_strdup (_tmp43_);
			_g_free0 (self->text3);
			self->text3 = _tmp44_;
			_tmp45_ = self->hudText3;
			_tmp46_ = self->text3;
			_tmp47_ = sdx_font;
			sdx_graphics_sprite_text_sprite_setText (_tmp45_, _tmp46_, _tmp47_, SDX_COLOR_Cyan);
		}
		_tmp48_ = self->hudText3;
		sdx_graphics_sprite_render ((sdxgraphicsSprite*) _tmp48_, 50, 150, NULL);
		_g_free0 (t3);
	}
}


static void hud_instance_init (Hud * self) {
	gchar* _tmp0_ = NULL;
	gchar* _tmp1_ = NULL;
	gchar* _tmp2_ = NULL;
	self->retainCount__ = 1;
	_tmp0_ = g_strdup ("");
	self->text1 = _tmp0_;
	_tmp1_ = g_strdup ("");
	self->text2 = _tmp1_;
	_tmp2_ = g_strdup ("");
	self->text3 = _tmp2_;
}


void hud_free (Hud* self) {
	_g_free0 (self->text1);
	_g_free0 (self->text2);
	_g_free0 (self->text3);
	_sdx_graphics_sprite_release0 (self->hudText1);
	_sdx_graphics_sprite_release0 (self->hudText2);
	_sdx_graphics_sprite_release0 (self->hudText3);
	g_slice_free (Hud, self);
}



