/**
 * TextureRegion.gs
 *
 */
using GLib;
using sdx.graphics;

namespace sdx.graphics {

    public class TextureRegion : Object {
        public Surface.TextureSurface? texture;
        public int top;
        public int left;
        public int width;
        public int height;
        public int regionWidth;
        public int regionHeight;
        public float u;
        public float v;
        public float u2;
        public float v2;

        public TextureRegion(Surface.TextureSurface texture, int x=0, int y=0, int width=0, int height=0) {
            width = width == 0 ? texture.width : width;
            height = height == 0 ? texture.height : height;
            this.texture = texture;
            this.top = x;
            this.left = y;
            this.width = width;
            this.height = height; 
            setRegionXY(x, y, width, height);
        }

        public void setRegion(float u, float v, float u2, float v2) {
            var texWidth = this.width;
            var texHeight = this.height;
            regionWidth =(int)Math.round(Math.fabs(u2 - u) * texWidth);
            regionHeight =(int)Math.round(Math.fabs(v2 - v) * texHeight);
            if (regionWidth == 1 && regionHeight == 1) {
                var adjustX = 0.25f / texWidth;
                u = adjustX;
                u2 = adjustX;
                var adjustY = 0.25f / texHeight;
                v = adjustY;
                v2 = adjustY;
            }
        }

        public void setRegionXY(int x, int y, int width, int height) {
            var invTexWidth = 1 / this.width;
            var invTexHeight = 1 / this.height;
            setRegion(x * invTexWidth, y * invTexHeight,(x + width) * invTexWidth,(y + height) * invTexHeight);
            regionWidth =(int)Math.fabs(width);
            regionHeight =(int)Math.fabs(height);
        }

        public void setByRegion(TextureRegion region) {
            texture = region.texture;
            setRegion(region.u, region.v, region.u2, region.v2);
        }

        public void setByRegionXY(TextureRegion region, int x, int y, int width, int height) {            
            texture = region.texture;
            setRegionXY(region.getRegionX()+x, region.getRegionY()+y, width, height);
        }

        public void flip(bool x, bool y) {
            if (x) {
                var temp = u;
                u = u2;
                u2 = temp;
            }
            if (y) {
                var temp = v;
                v = v2;
                v2 = temp;
            }
        }

        public float getU() { 
            return u;
        }

        public void setU(float u) { 
            this.u = u;
            regionWidth = (int)Math.round(Math.fabs(u2 - u) * this.width);
        }

        public float getV() {
            return v;
        }

        public void setV(float v) { 
            this.v = v;
            regionHeight = (int)Math.round(Math.fabs(v2 - v) * this.height);
        }

        public float getU2() {
            return u2;
        }

        public void setU2(float u2) { 
            this.u2 = u2;
            regionWidth = (int)Math.round(Math.fabs(u2 - u) * this.width);
        }

        public float getV2() {
            return v2;
        }

        public void setV2(float v2) { 
            this.v2 = v2;
            regionHeight = (int)Math.round(Math.fabs(v2 - v) * this.height);
        }

        public int getRegionX() {
            return (int)Math.round(u * this.width);
        }

        public void setRegionX(int x) {
            setU(x /(float)this.width);
        }

        public int getRegionY() {
            return (int)Math.round(v * this.height);
        }        

        public void setRegionY(int y) {
            setV(y /this.height);
        }

        /** Returns the region's width. */
        public int getRegionWidth() {
            return regionWidth;
        }

        public void setRegionWidth(int width) {
            if (isFlipX())
                setU(u2 + width /(float)this.width);
             else 
                setU2(u + width /(float)this.width);
        }
        

        /** Returns the region's height. */
        public int getRegionHeight() {
            return regionHeight;
        }

        public void setRegionHeight(int height) { 
            if (isFlipY())
                setV(v2 + height /(float)this.height);	
             else 
                setV2(v + height /(float)this.height);
        }
        
        public bool isFlipX() {
            return u > u2;
        }

        public bool isFlipY() {
            return v > v2;
        }
    }
}