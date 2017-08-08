namespace  sdx.math { 

    /**
     * axis aligned bounding box
     */
    public struct AABB {
        public Vector2 scale;
        public Vector2 center;

        public Vector2 _halfSize;

        public Vector2 halfSize {
            set { _halfSize = value; }
            get { return Vector2(Math.roundf(halfSize.x * scale.x), Math.roundf(halfSize.y * scale.y)); }
        }

        public float halfSizeX {
            set { _halfSize.x = value; }
            get { return Math.roundf(_halfSize.x * scale.x); }
        }

        public float halfSizeY {
            set { _halfSize.y = value; }
            get { return Math.roundf(_halfSize.y * scale.y); }
        }

        public AABB(Vector2 center, Vector2 halfSize) {
            scale = Vector2.one;
            this.center = center;
            this._halfSize = halfSize;
        }

        public Vector2 max() {
            return center.add(_halfSize);
        }

        public Vector2 min() {
            return center.sub(_halfSize);
        }

        public bool overlaps(AABB other, out float overlapWidth=null, out float overlapHeight=null) {
            if ( Math.fabsf(center.x - other.center.x) > _halfSize.x + other._halfSize.x ) return false;
            if ( Math.fabsf(center.y - other.center.y) > _halfSize.y + other._halfSize.y ) return false;
            overlapWidth = (other._halfSize.x + _halfSize.x) - Math.fabsf(center.x - other.center.x);
            overlapHeight = (other._halfSize.y + _halfSize.y) - Math.fabsf(center.y - other.center.y);
            return true;
        }

        public bool overlapsUnsigned(AABB other, out float overlapWidth, out float overlapHeight) {
            overlapWidth = overlapHeight = 0;
            if (halfSizeX == 0.0f || halfSizeY == 0.0f || other.halfSizeX == 0.0f || other.halfSizeY == 0.0f
                || Math.fabsf(center.x - other.center.x) > halfSizeX + other.halfSizeX
                || Math.fabsf(center.y - other.center.y) > halfSizeY + other.halfSizeY)
                return false;
            overlapWidth = (other.halfSizeX + halfSizeX) - Math.fabsf(center.x - other.center.x);
            overlapHeight = (other.halfSizeY + halfSizeY) - Math.fabsf(center.y - other.center.y);
            return true;
        }

        public bool overlapsSigned(AABB other, out Vector2 overlap) {
            overlap = Vector2.zero;

            if (halfSizeX == 0.0f || halfSizeY == 0.0f || other.halfSizeX == 0.0f || other.halfSizeY == 0.0f
                || Math.fabsf(center.x - other.center.x) > halfSizeX + other.halfSizeX
                || Math.fabsf(center.y - other.center.y) > halfSizeY + other.halfSizeY) return false;

            overlap = new Vector2(sign(center.x - other.center.x) * ((other.halfSizeX + halfSizeX) - Math.fabsf(center.x - other.center.x)),
                sign(center.y - other.center.y) * ((other.halfSizeY + halfSizeY) - Math.fabsf(center.y - other.center.y)));

            return true;
        }


    }

}