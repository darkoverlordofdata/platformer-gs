/* Cache.c generated by valac 0.34.8, the Vala compiler
 * generated from Cache.vala, do not modify */


#include <glib.h>
#include <glib-object.h>
#include <stdio.h>

typedef struct _sdxutilsCache sdxutilsCache;
#define _g_list_free0(var) ((var == NULL) ? NULL : (var = (g_list_free (var), NULL)))

struct _sdxutilsCache {
	gint _retainCount;
	gpointer* items;
	gint items_length1;
	gint size;
};



void sdx_utils_cache_free (sdxutilsCache* self);
static void sdx_utils_cache_instance_init (sdxutilsCache * self);
sdxutilsCache* sdx_utils_cache_retain (sdxutilsCache* self);
void sdx_utils_cache_release (sdxutilsCache* self);
void sdx_utils_cache_free (sdxutilsCache* self);
sdxutilsCache* sdx_utils_cache_new (gint capacity);
gboolean sdx_utils_cache_isEmpty (sdxutilsCache* self);
gpointer sdx_utils_cache_get (sdxutilsCache* self, gint index);
void sdx_utils_cache_put (sdxutilsCache* self, gint index, gconstpointer entity);
void sdx_utils_cache_enque (sdxutilsCache* self, gconstpointer entity);
void sdx_utils_cache_grow (sdxutilsCache* self, gint newSize);
gpointer sdx_utils_cache_deque (sdxutilsCache* self);


sdxutilsCache* sdx_utils_cache_retain (sdxutilsCache* self) {
	sdxutilsCache* result = NULL;
	g_return_val_if_fail (self != NULL, NULL);
	g_atomic_int_add ((volatile gint *) (&self->_retainCount), 1);
	result = self;
	return result;
}


void sdx_utils_cache_release (sdxutilsCache* self) {
	gboolean _tmp0_ = FALSE;
	g_return_if_fail (self != NULL);
	_tmp0_ = g_atomic_int_dec_and_test ((volatile gint *) (&self->_retainCount));
	if (_tmp0_) {
		sdx_utils_cache_free (self);
	}
}


sdxutilsCache* sdx_utils_cache_new (gint capacity) {
	sdxutilsCache* self;
	gint _tmp0_ = 0;
	gpointer* _tmp1_ = NULL;
	self = g_slice_new0 (sdxutilsCache);
	sdx_utils_cache_instance_init (self);
	_tmp0_ = capacity;
	_tmp1_ = g_new0 (gpointer, _tmp0_);
	self->items = (g_free (self->items), NULL);
	self->items = _tmp1_;
	self->items_length1 = _tmp0_;
	self->size = 0;
	return self;
}


gboolean sdx_utils_cache_isEmpty (sdxutilsCache* self) {
	gboolean result = FALSE;
	gint _tmp0_ = 0;
	g_return_val_if_fail (self != NULL, FALSE);
	_tmp0_ = self->size;
	result = _tmp0_ == 0;
	return result;
}


gpointer sdx_utils_cache_get (sdxutilsCache* self, gint index) {
	gpointer result = NULL;
	gboolean _tmp0_ = FALSE;
	gint _tmp1_ = 0;
	gpointer* _tmp6_ = NULL;
	gint _tmp6__length1 = 0;
	gint _tmp7_ = 0;
	gconstpointer _tmp8_ = NULL;
	g_return_val_if_fail (self != NULL, NULL);
	_tmp1_ = index;
	if (_tmp1_ < 0) {
		_tmp0_ = TRUE;
	} else {
		gint _tmp2_ = 0;
		gint _tmp3_ = 0;
		_tmp2_ = index;
		_tmp3_ = self->size;
		_tmp0_ = _tmp2_ > _tmp3_;
	}
	if (_tmp0_) {
		FILE* _tmp4_ = NULL;
		gint _tmp5_ = 0;
		_tmp4_ = stdout;
		_tmp5_ = index;
		fprintf (_tmp4_, "Can't get cache at %d\n", _tmp5_);
		result = NULL;
		return result;
	}
	_tmp6_ = self->items;
	_tmp6__length1 = self->items_length1;
	_tmp7_ = index;
	_tmp8_ = _tmp6_[_tmp7_];
	result = _tmp8_;
	return result;
}


void sdx_utils_cache_put (sdxutilsCache* self, gint index, gconstpointer entity) {
	gboolean _tmp0_ = FALSE;
	gint _tmp1_ = 0;
	gpointer* _tmp6_ = NULL;
	gint _tmp6__length1 = 0;
	gint _tmp7_ = 0;
	gconstpointer _tmp8_ = NULL;
	gpointer _tmp9_ = NULL;
	g_return_if_fail (self != NULL);
	_tmp1_ = index;
	if (_tmp1_ < 0) {
		_tmp0_ = TRUE;
	} else {
		gint _tmp2_ = 0;
		gint _tmp3_ = 0;
		_tmp2_ = index;
		_tmp3_ = self->size;
		_tmp0_ = _tmp2_ >= _tmp3_;
	}
	if (_tmp0_) {
		FILE* _tmp4_ = NULL;
		gint _tmp5_ = 0;
		_tmp4_ = stdout;
		_tmp5_ = index;
		fprintf (_tmp4_, "Can't put cache at %d\n", _tmp5_);
		return;
	}
	_tmp6_ = self->items;
	_tmp6__length1 = self->items_length1;
	_tmp7_ = index;
	_tmp8_ = entity;
	_tmp6_[_tmp7_] = _tmp8_;
	_tmp9_ = _tmp6_[_tmp7_];
}


void sdx_utils_cache_enque (sdxutilsCache* self, gconstpointer entity) {
	gint _tmp0_ = 0;
	gpointer* _tmp1_ = NULL;
	gint _tmp1__length1 = 0;
	gpointer* _tmp3_ = NULL;
	gint _tmp3__length1 = 0;
	gint _tmp4_ = 0;
	gconstpointer _tmp5_ = NULL;
	gpointer _tmp6_ = NULL;
	g_return_if_fail (self != NULL);
	_tmp0_ = self->size;
	_tmp1_ = self->items;
	_tmp1__length1 = self->items_length1;
	if (_tmp0_ >= _tmp1__length1) {
		gpointer* _tmp2_ = NULL;
		gint _tmp2__length1 = 0;
		_tmp2_ = self->items;
		_tmp2__length1 = self->items_length1;
		sdx_utils_cache_grow (self, _tmp2__length1 * 2);
	}
	_tmp3_ = self->items;
	_tmp3__length1 = self->items_length1;
	_tmp4_ = self->size;
	self->size = _tmp4_ + 1;
	_tmp5_ = entity;
	_tmp3_[_tmp4_] = _tmp5_;
	_tmp6_ = _tmp3_[_tmp4_];
}


gpointer sdx_utils_cache_deque (sdxutilsCache* self) {
	gpointer result = NULL;
	gint _tmp0_ = 0;
	gpointer* _tmp2_ = NULL;
	gint _tmp2__length1 = 0;
	gint _tmp3_ = 0;
	gint _tmp4_ = 0;
	gconstpointer _tmp5_ = NULL;
	g_return_val_if_fail (self != NULL, NULL);
	_tmp0_ = self->size;
	if (_tmp0_ <= 0) {
		FILE* _tmp1_ = NULL;
		_tmp1_ = stdout;
		fprintf (_tmp1_, "Unable to pop from queue\n");
		result = NULL;
		return result;
	}
	_tmp2_ = self->items;
	_tmp2__length1 = self->items_length1;
	_tmp3_ = self->size;
	self->size = _tmp3_ - 1;
	_tmp4_ = self->size;
	_tmp5_ = _tmp2_[_tmp4_];
	result = _tmp5_;
	return result;
}


void sdx_utils_cache_grow (sdxutilsCache* self, gint newSize) {
	GList* temp = NULL;
	gpointer* _tmp0_ = NULL;
	gint _tmp0__length1 = 0;
	gint _tmp2_ = 0;
	gpointer* _tmp3_ = NULL;
	gint i = 0;
	GList* _tmp4_ = NULL;
	g_return_if_fail (self != NULL);
	temp = NULL;
	_tmp0_ = self->items;
	_tmp0__length1 = self->items_length1;
	{
		gpointer* item_collection = NULL;
		gint item_collection_length1 = 0;
		gint _item_collection_size_ = 0;
		gint item_it = 0;
		item_collection = _tmp0_;
		item_collection_length1 = _tmp0__length1;
		for (item_it = 0; item_it < _tmp0__length1; item_it = item_it + 1) {
			gpointer item = NULL;
			item = item_collection[item_it];
			{
				gconstpointer _tmp1_ = NULL;
				_tmp1_ = item;
				temp = g_list_prepend (temp, _tmp1_);
			}
		}
	}
	_tmp2_ = newSize;
	_tmp3_ = g_new0 (gpointer, _tmp2_);
	self->items = (g_free (self->items), NULL);
	self->items = _tmp3_;
	self->items_length1 = _tmp2_;
	i = 0;
	_tmp4_ = temp;
	{
		GList* item_collection = NULL;
		GList* item_it = NULL;
		item_collection = _tmp4_;
		for (item_it = item_collection; item_it != NULL; item_it = item_it->next) {
			gpointer item = NULL;
			item = item_it->data;
			{
				gpointer* _tmp5_ = NULL;
				gint _tmp5__length1 = 0;
				gint _tmp6_ = 0;
				gconstpointer _tmp7_ = NULL;
				gpointer _tmp8_ = NULL;
				_tmp5_ = self->items;
				_tmp5__length1 = self->items_length1;
				_tmp6_ = i;
				i = _tmp6_ + 1;
				_tmp7_ = item;
				_tmp5_[_tmp6_] = _tmp7_;
				_tmp8_ = _tmp5_[_tmp6_];
			}
		}
	}
	_g_list_free0 (temp);
}


static void sdx_utils_cache_instance_init (sdxutilsCache * self) {
	self->_retainCount = 1;
}


void sdx_utils_cache_free (sdxutilsCache* self) {
	self->items = (g_free (self->items), NULL);
	g_slice_free (sdxutilsCache, self);
}



