/**
 * @see https://gamedevelopment.tutsplus.com/series/basic-2d-platformer-physics--cms-998
 */

namespace sdx.math { 

    public class MovingObject {

        public ObjectType mType;
        /// <summary>
        /// The previous position.
        /// </summary>
        public Vector2 mOldPosition;
        /// <summary>
        /// The current position.
        /// </summary>
        public Vector2 mPosition;
        public Vector2 mScale;
        public Vector2 scale {
            set {
                mScale = value;
                mAABB.scale = Vector2(Math.fabsf(value.x), Math.fabsf(value.y));
            }
            get { return mScale; }
        }
        
        public float scaleX {
            set
            {
                mScale.x = value;
                mAABB.scale.x = Math.fabsf(value);
            }
            get { return mScale.x; }
        }
        public float scaleY {
            set
            {
                mScale.y = value;
                mAABB.scale.y = Math.fabsf(value);
            }
            get { return mScale.y; }
        }

        /// <summary>
        /// The current speed in pixels/second.
        /// </summary>
        public Vector2 mSpeed;
        
        /// <summary>
        /// The previous speed in pixels/second.
        /// </summary>
        public Vector2 mOldSpeed;

        private Vector2 mAABBOffset;
        public Vector2 AABBOffset {
            set { mAABBOffset = value; }
            get { return Vector2(mAABBOffset.x * mScale.x, mAABBOffset.y * mScale.y); }
        }

        public float AABBOffsetX {
            set { mAABBOffset.x = value; }
            get { return mAABBOffset.x * mScale.x; }
        }

        public float AABBOffsetY {
            set { mAABBOffset.y = value; }
            get { return mAABBOffset.y * mScale.y; }
        }

        /// <summary>
        /// The AABB for collision queries.
        /// </summary>
        public AABB mAABB;

        //  public Game mGame;
        public Map mMap;

        public bool mOnOneWayPlatform = false;

        public bool mIsKinematic = false;

        public bool mPushesRight = false;
        public bool mPushesLeft = false;
        public bool mPushesBottom = false;
        public bool mPushesTop = false;

        public bool mPushedTop = false;
        public bool mPushedBottom = false;
        public bool mPushedRight = false;
        public bool mPushedLeft = false;

        public bool mPushesLeftObject = false;
        public bool mPushesRightObject = false;
        public bool mPushesBottomObject = false;
        public bool mPushesTopObject = false;

        public bool mPushedLeftObject = false;
        public bool mPushedRightObject = false;
        public bool mPushedBottomObject = false;
        public bool mPushedTopObject = false;

        public bool mPushesRightTile = false;
        public bool mPushesLeftTile = false;
        public bool mPushesBottomTile = false;
        public bool mPushesTopTile = false;

        public bool mPushedTopTile = false;
        public bool mPushedBottomTile = false;
        public bool mPushedRightTile = false;
        public bool mPushedLeftTile = false;

        public List<Vector2i?> mAreas = new List<Vector2i?>();
        public List<int> mIdsInAreas = new List<int>();
        protected List<MovingObject> mFilteredObjects = new List<MovingObject>();
        public List<CollisionData?> mAllCollidingObjects = new List<CollisionData?>();
        /// <summary>
        /// Depth for z-ordering the sprites.
        /// </summary>
        public float mSpriteDepth = -1.0f;

        public bool hasCollisionDataFor(MovingObject other) {
            foreach (var obj in mAllCollidingObjects) {
                if (obj.other == other)
                    return true;
            }
            return false;
        }

        public Vector2 roundVector(Vector2 v) {
            return Vector2(Math.roundf(v.x), Math.roundf(v.y));
        }
        
        public bool hasCeiling(Vector2 oldPosition, Vector2 position, out float ceilingY) {
            //make sure the aabb is up to date with the position
            var center = position.add(AABBOffset);
            var oldCenter = oldPosition.add(AABBOffset);

            //init the groundY
            ceilingY = 0.0f;

            var oldTopRight = roundVector(oldCenter.add(mAABB.halfSize).add(Vector2.up).sub(Vector2.right));
            
            //set the Vector2is right below us on our left and right sides
            var newTopRight = roundVector(center.add(mAABB.halfSize).add(Vector2.up).sub(Vector2.right));
            var newTopLeft = roundVector(Vector2(newTopRight.x - mAABB.halfSizeX * 2.0f + 2.0f, newTopRight.y));

            int endY = mMap.getMapTileYAtPoint(newTopRight.y);
            int begY = (int)Math.fminf(mMap.getMapTileYAtPoint(oldTopRight.y) + 1, endY);
            int dist = (int)Math.fmaxf(Math.fabsf(endY - begY), 1);

            //get the indices of a tile below us on our left side
            int tileIndexX;

            for (int tileIndexY = begY; tileIndexY <= endY; ++tileIndexY) {
                var topRight = Vector2.lerp(newTopRight, oldTopRight, (float)Math.fabsf(endY - tileIndexY) / dist);
                var topLeft = Vector2(topRight.x - mAABB.halfSizeX * 2.0f + 2.0f, topRight.y);

                //iterate over all the tiles that the object may collide with from the left to the right
                for (var checkedTile = topLeft; ; checkedTile.x += Map.cTileSize) {
                    //makre sure that we don't check beyound the top right corner
                    checkedTile.x = Math.fminf(checkedTile.x, topRight.x);

                    tileIndexX = mMap.getMapTileXAtPoint(checkedTile.x);

                    if (mMap.isObstacle(tileIndexX, tileIndexY)) {
                        ceilingY = (float)tileIndexY * Map.cTileSize - Map.cTileSize / 2.0f + mMap.mPosition.y;
                        return true;
                    }

                    //if we checked all the possible tiles and there's nothing right above the aabb
                    if (checkedTile.x >= topRight.x)
                        break;
                }
            }

            //there's nothing right above the aabb
            return false;
        }
        
        public bool hasGround(Vector2 oldPosition, Vector2 position, Vector2 speed, out float groundY, ref bool onOneWayPlatform) {
            var oldCenter = oldPosition.add(AABBOffset);
            //make sure the aabb is up to date with the position
            var center = position.add(AABBOffset);

            //init the groundY
            groundY = 0.0f;

            var oldBottomLeft = roundVector(oldCenter.sub(mAABB.halfSize).sub(Vector2.up).add(Vector2.right));
            //set the Vector2is right below us on our left and right sides
            var newBottomLeft = roundVector(center.sub(mAABB.halfSize).sub(Vector2.up).add(Vector2.right));
            var newBottomRight = roundVector(Vector2(newBottomLeft.x + mAABB.halfSizeX * 2.0f - 2.0f, newBottomLeft.y));

            //left side
            //calculate the indices of a tile below us on our left side

            int endY = mMap.getMapTileYAtPoint(newBottomLeft.y);
            int begY = (int)Math.fmaxf(mMap.getMapTileYAtPoint(oldBottomLeft.y) - 1, endY);
            int dist = (int)Math.fmaxf(Math.fabsf(endY - begY), 1);

            int tileIndexX;

            for (int tileIndexY = begY; tileIndexY >= endY; --tileIndexY) {
                var bottomLeft = Vector2.lerp(newBottomLeft, oldBottomLeft, (float)Math.fabsf(endY - tileIndexY) / dist);
                var bottomRight = Vector2(bottomLeft.x + mAABB.halfSizeX * 2.0f - 2.0f, bottomLeft.y);

                //iterate over all the tiles that the object may collide with from the left to the right
                for (var checkedTile = bottomLeft; ; checkedTile.x += Map.cTileSize) {
                    //makre sure that we don't check beyound the bottom right corner
                    checkedTile.x = Math.fminf(checkedTile.x, bottomRight.x);

                    tileIndexX = mMap.getMapTileXAtPoint(checkedTile.x);

                    //calculate the y position of the floor tile's top
                    groundY = (float)tileIndexY * Map.cTileSize + Map.cTileSize / 2.0f + mMap.mPosition.y;
                    //if the tile is not empty, it means we have a floor right below us
                    if (mMap.isObstacle(tileIndexX, tileIndexY)) {
                        onOneWayPlatform = false;
                        return true;
                    }
                    //if there's a one way platform below us, treat it as a floor only if we're falling or standing
                    else if (mMap.isOneWayPlatform(tileIndexX, tileIndexY)
                            && Math.fabsf(checkedTile.y - groundY) <= Constants.cOneWayPlatformThreshold + mOldPosition.y - position.y)
                        onOneWayPlatform = true;

                    //if we checked all the possible tiles and there's nothing right below the aabb
                    if (checkedTile.x >= bottomRight.x) {
                        if (onOneWayPlatform)
                            return true;
                        break;
                    }
                }
            }

            //there's nothing right beneath the aabb
            return false;
        }

        public bool collidesWithRightWall(Vector2 oldPosition, Vector2 position, out float wallX) {
            //make sure the aabb is up to date with the position
            var center = position.add(AABBOffset);
            var oldCenter = oldPosition.add(AABBOffset);

            //init the wallX
            wallX = 0.0f;

            var oldBottomRight = roundVector(oldCenter.add(Vector2(mAABB.halfSizeX, -mAABB.halfSizeY).add(Vector2.right)));
            //calculate the bottom left and top left vertices of our aabb
            var newBottomRight = roundVector(center.add(Vector2(mAABB.halfSizeX, -mAABB.halfSizeY).add(Vector2.right)));
            var newTopRight = roundVector(newBottomRight.add(Vector2(0.0f, mAABB.halfSizeY * 2.0f)));

            int endX = (int)mMap.getMapTileXAtPoint(newBottomRight.x);
            int begX = (int)Math.fminf(mMap.getMapTileXAtPoint(oldBottomRight.x) + 1, endX);
            int dist = (int)Math.fmaxf(Math.fabsf(endX - begX), 1);

            //get the bottom right vertex's tile indices
            int tileIndexY;

            for (int tileIndexX = begX; tileIndexX <= endX; ++tileIndexX) {
                var bottomRight = Vector2.lerp(newBottomRight, oldBottomRight, (float)Math.fabsf(endX - tileIndexX) / dist);
                var topRight = bottomRight.add(Vector2(0.0f, mAABB.halfSizeY * 2.0f));

                //iterate over all the tiles that the object may collide with from the top to the bottom
                for (var checkedTile = bottomRight; ; checkedTile.y += Map.cTileSize) {
                    //make sure that we don't check beyound the top right corner
                    checkedTile.y = Math.fminf(checkedTile.y, topRight.y);

                    tileIndexY = mMap.getMapTileYAtPoint(checkedTile.y);

                    if (mMap.isObstacle(tileIndexX, tileIndexY)) {
                        //calculate the x position of the left side of the wall
                        wallX = (float)tileIndexX * Map.cTileSize - Map.cTileSize / 2.0f + mMap.mPosition.x;
                        return true;
                    }

                    //if we checked all the possible tiles and there's nothing right next to the aabb
                    if (checkedTile.y >= topRight.y)
                        break;
                }
            }

            return false;
        }
        
        /// <summary>
        /// Checks if the hero collides with a wall on the left.
        /// </summary>
        /// <returns>
        /// True if the hero collides with the wall on the left, otherwise false.
        /// </returns>
        /// <param name='wallX'>
        /// The X coordinate in world space of the right edge of the wall the hero collides with.
        /// </param>
        public bool collidesWithLeftWall(Vector2 oldPosition, Vector2 position, out float wallX) {
            //make sure the aabb is up to date with the position
            var center = position.add(AABBOffset);
            var oldCenter = oldPosition.add(AABBOffset);

            //init the wallX
            wallX = 0.0f;

            var oldBottomLeft = roundVector(oldCenter.sub(mAABB.halfSize).sub(Vector2.right));
            //calculate the bottom left and top left vertices of our aabb
            var newBottomLeft = roundVector(center.sub(mAABB.halfSize).sub(Vector2.right));
            var newTopLeft = roundVector(newBottomLeft.add(Vector2(0.0f, mAABB.halfSizeY * 2.0f)));

            //get the bottom left vertex's tile indices
            int tileIndexY;

            int endX = (int)mMap.getMapTileXAtPoint(newBottomLeft.x);
            int begX = (int)Math.fmaxf(mMap.getMapTileXAtPoint(oldBottomLeft.x) - 1, endX);
            int dist = (int)Math.fmaxf(Math.fabsf(endX - begX), 1);

            for (int tileIndexX = begX; tileIndexX >= endX; --tileIndexX) {
                var bottomLeft = Vector2.lerp(newBottomLeft, oldBottomLeft, (float)Math.fabsf(endX - tileIndexX) / dist);
                var topLeft = bottomLeft.add(Vector2(0.0f, mAABB.halfSizeY * 2.0f));

                //iterate over all the tiles that the object may collide with from the top to the bottom
                for (var checkedTile = bottomLeft; ; checkedTile.y += Map.cTileSize) {
                    //make sure that we don't check beyound the top right corner
                    checkedTile.y = Math.fminf(checkedTile.y, topLeft.y);

                    tileIndexY = mMap.getMapTileYAtPoint(checkedTile.y);

                    if (mMap.isObstacle(tileIndexX, tileIndexY)) {
                        //calculate the x position of the right side of the wall
                        wallX = (float)tileIndexX * Map.cTileSize + Map.cTileSize / 2.0f + mMap.mPosition.x;
                        return true;
                    }

                    //if we checked all the possible tiles and there's nothing right next to the aabb
                    if (checkedTile.y >= topLeft.y)
                        break;
                }
            }

            return false;
        }

        /// <summary>
        /// Updates the moving object's physics, integrates the movement, updates sensors for terrain collisions.
        /// </summary>
        public void updatePhysics() {	
            //assign the previous state of onGround, atCeiling, pushesRightWall, pushesLeftWall
            //before those get recalculated for this frame
            mPushedBottomTile = mPushesBottomTile;
            mPushedRightTile = mPushesRightTile;
            mPushedLeftTile = mPushesLeftTile;
            mPushedTopTile = mPushesTopTile;
            mPushedBottom = mPushesBottom;
            mPushedRight = mPushesRight;
            mPushedLeft = mPushesLeft;
            mPushedTop = mPushesTop;

            mOnOneWayPlatform = false;
            
            //save the speed to oldSpeed vector
            mOldSpeed = mSpeed;
            
            //save the position to the oldPosition vector
            mOldPosition = mPosition;
            
            //integrate the movement only if we're not tweening
            //mPosition += mSpeed*sdx.delta;
            mPosition = mPosition.add(mSpeed.mul(sdx.delta));

            float groundY = 0.0f, ceilingY = 0.0f;
            float rightWallX = 0.0f, leftWallX = 0.0f;

            if (mSpeed.x <= 0.0f 
                && collidesWithLeftWall(mOldPosition, mPosition, out leftWallX)) {
                if (mOldPosition.x - mAABB.halfSizeX + AABBOffsetX >= leftWallX) {
                    mPosition.x = leftWallX + mAABB.halfSizeX - AABBOffsetX;
                    mPushesLeftTile = true;
                }
                mSpeed.x = Math.fmaxf(mSpeed.x, 0.0f);
            }
            else
                mPushesLeftTile = false;

            if (mSpeed.x >= 0.0f 
                && collidesWithRightWall(mOldPosition, mPosition, out rightWallX)) {
                if (mOldPosition.x + mAABB.halfSizeX + AABBOffsetX <= rightWallX) {
                    mPosition.x = rightWallX - mAABB.halfSizeX - AABBOffsetX;
                    mPushesRightTile = true;
                }

                mSpeed.x = Math.fminf(mSpeed.x, 0.0f);
            }
            else
                mPushesRightTile = false;

            if (mSpeed.y <= 0.0f
                && hasGround(mOldPosition, mPosition, mSpeed, out groundY, ref mOnOneWayPlatform)) {
                mPosition.y = groundY + mAABB.halfSizeY - AABBOffsetY;
                mSpeed.y = 0.0f;
                mPushesBottomTile = true;
            }
            else
                mPushesBottomTile = false;

            if (mSpeed.y >= 0.0f 
                && hasCeiling(mOldPosition, mPosition, out ceilingY)) {
                mPosition.y = ceilingY - mAABB.halfSizeY - AABBOffsetY - 1.0f;
                mSpeed.y = 0.0f;
                mPushesTopTile = true;
            }
            else
                mPushesTopTile = false;

            //update the aabb
            mAABB.center = mPosition.add(AABBOffset);
        }

        private void updatePhysicsResponse() {
            if (mIsKinematic)
                return;

            mPushedBottomObject = mPushesBottomObject;
            mPushedRightObject = mPushesRightObject;
            mPushedLeftObject = mPushesLeftObject;
            mPushedTopObject = mPushesTopObject;

            mPushesBottomObject = false;
            mPushesRightObject = false;
            mPushesLeftObject = false;
            mPushesTopObject = false;

            Vector2 offsetSum = Vector2.zero;

            foreach (var data in mAllCollidingObjects) {
                var other = data.other;
                var overlap = data.overlap.sub(offsetSum);

                if (overlap.x == 0.0f) {
                    if (other.mAABB.center.x > mAABB.center.x) {
                        mPushesRightObject = true;
                        mSpeed.x = Math.fminf(mSpeed.x, 0.0f);
                    } else {
                        mPushesLeftObject = true;
                        mSpeed.x = Math.fmaxf(mSpeed.x, 0.0f);
                    }
                    continue;
                } else if (overlap.y == 0.0f) {
                    if (other.mAABB.center.y > mAABB.center.y) {
                        mPushesTopObject = true;
                        mSpeed.y = Math.fminf(mSpeed.y, 0.0f);
                    } else {
                        mPushesBottomObject = true;
                        mSpeed.y = Math.fmaxf(mSpeed.y, 0.0f);
                    }
                    continue;
                }

                Vector2 absSpeed1 = Vector2(Math.fabsf(data.pos1.x - data.oldPos1.x), Math.fabsf(data.pos1.y - data.oldPos1.y));
                Vector2 absSpeed2 = Vector2(Math.fabsf(data.pos2.x - data.oldPos2.x), Math.fabsf(data.pos2.y - data.oldPos2.y));
                Vector2 speedSum = absSpeed1.add(absSpeed2);

                float speedRatioX, speedRatioY;

                if (other.mIsKinematic)
                    speedRatioX = speedRatioY = 1.0f;
                else {
                    if (speedSum.x == 0.0f && speedSum.y == 0.0f) {
                        speedRatioX = speedRatioY = 0.5f;
                    } else if (speedSum.x == 0.0f) {
                        speedRatioX = 0.5f;
                        speedRatioY = absSpeed1.y / speedSum.y;
                    } else if (speedSum.y == 0.0f) {
                        speedRatioX = absSpeed1.x / speedSum.x;
                        speedRatioY = 0.5f;
                    } else {
                        speedRatioX = absSpeed1.x / speedSum.x;
                        speedRatioY = absSpeed1.y / speedSum.y;
                    }
                }

                float offsetX = overlap.x * speedRatioX;
                float offsetY = overlap.y * speedRatioY;

                bool overlappedLastFrameX = Math.fabsf(data.oldPos1.x - data.oldPos2.x) < mAABB.halfSizeX + other.mAABB.halfSizeX;
                bool overlappedLastFrameY = Math.fabsf(data.oldPos1.y - data.oldPos2.y) < mAABB.halfSizeY + other.mAABB.halfSizeY;

                if ((!overlappedLastFrameX && overlappedLastFrameY)
                    || (!overlappedLastFrameX && !overlappedLastFrameY && Math.fabsf(overlap.x) <= Math.fabsf(overlap.y))) {
                    mPosition.x += offsetX;
                    offsetSum.x += offsetX;

                    if (overlap.x < 0.0f) {
                        mPushesRightObject = true;
                        mSpeed.x = Math.fminf(mSpeed.x, 0.0f);
                    } else {
                        mPushesLeftObject = true;
                        mSpeed.x = Math.fmaxf(mSpeed.x, 0.0f);
                    }
                } else {
                    mPosition.y += offsetY;
                    offsetSum.y += offsetY;

                    if (overlap.y < 0.0f) {
                        mPushesTopObject = true;
                        mSpeed.y = Math.fminf(mSpeed.y, 0.0f);
                    } else {
                        mPushesBottomObject = true;
                        mSpeed.y = Math.fmaxf(mSpeed.y, 0.0f);
                    }
                }
            }
        }
    }
}