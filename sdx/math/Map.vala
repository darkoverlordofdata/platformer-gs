using sdx.graphics;

namespace sdx.math { 
    
    public enum TileType {
        Empty,
        Block,
        OneWay
    }

    public class Map : Object {
        public TileType[,] mTiles;
        public Sprite[,] mTilesSprites;

        public Vector2 mPosition;

        public int mWidth = 80;
        public int mHeight = 60;

        public Sprite mTilePrefab;

        public const int cTileSize = 16;


        public List<Sprite?> mDirtSprites;

        public static List<Vector2i?> mOverlappingAreas = new List<Vector2i?>();

        /// <summary>
        /// A set of areas in which at least one tile has been destroyed
        /// </summary>
        //public HashSet<Vector2i?> mUpdatedAreas;

        /// <summary>
        /// How many collision areas are there on the map horizontally.
        /// </summary>
        public int mHorizontalAreasCount;

        /// <summary>
        /// How many collision areas are there on the map vertically.
        /// </summary>
        public int mVerticalAreasCount;

        public int mGridAreaWidth = 16;
        public int mGridAreaHeight = 16;
        public List<MovingObject>[,] mObjectsInArea;

        public static List<MovingObject> mCollisionRequestObjects = new List<MovingObject>();

        public void removeObjectFromAreas(MovingObject obj) {
            for (int i = 0; i < obj.mAreas.length(); ++i)
                removeObjectFromArea(obj.mAreas.nth_data(i), obj.mIdsInAreas.nth_data(i), obj);
            obj.mAreas = new List<Vector2i?>();
            obj.mIdsInAreas = new List<int>();

        }

        public void removeObjectFromArea(Vector2i areaIndex, int objIndexInArea, MovingObject obj) {
            unowned List<MovingObject> area =  mObjectsInArea[areaIndex.x, areaIndex.y];

            //swap the last item with the one we are removing
            var tmp = area.nth_data(area.length() - 1);
            area.nth(area.length() - 1).data = obj;
            area.nth(objIndexInArea).data = tmp;

            unowned List<int> tmpIds = tmp.mIdsInAreas;
            unowned List<Vector2i?> tmpAreas = tmp.mAreas;
            for (int i = 0; i < tmpAreas.length(); ++i) {
                if (tmpAreas.nth_data(i).equals(areaIndex)) {
                    tmpIds.nth(i).data = objIndexInArea;
                    break;
                }
            }

            //remove the last item
            area.delete_link(area.nth(area.length() - 1));
        }
            
        public void addObjectToArea(Vector2i areaIndex, MovingObject obj) {
            unowned List<MovingObject> area = mObjectsInArea[areaIndex.x, areaIndex.y];

            //save the index of  the object in the area
            obj.mAreas.append(areaIndex);
            obj.mIdsInAreas.append((int)area.length());

            //add the object to the area
            area.append(obj);
        }

        public void updateAreas(MovingObject obj) {
            //get the areas at the aabb's corners
            var topLeft = getMapTileAtPoint(obj.mAABB.center.add(Vector2(-obj.mAABB.halfSize.x, obj.mAABB.halfSizeY)));
            var topRight = getMapTileAtPoint(obj.mAABB.center.add(obj.mAABB.halfSize));
            var bottomLeft = getMapTileAtPoint(obj.mAABB.center.sub(obj.mAABB.halfSize));
            var bottomRight = Vector2i(0, 0);

            topLeft.x /= mGridAreaWidth;
            topLeft.y /= mGridAreaHeight;

            topRight.x /= mGridAreaWidth;
            topRight.y /= mGridAreaHeight;

            bottomLeft.x /= mGridAreaWidth;
            bottomLeft.y /= mGridAreaHeight;

            /*topLeft.x = Mathf.Clamp(topLeft.x, 0, mHorizontalAreasCount - 1);
            topLeft.y = Mathf.Clamp(topLeft.y, 0, mVerticalAreasCount - 1);

            topRight.x = Mathf.Clamp(topRight.x, 0, mHorizontalAreasCount - 1);
            topRight.y = Mathf.Clamp(topRight.y, 0, mVerticalAreasCount - 1);

            bottomLeft.x = Mathf.Clamp(bottomLeft.x, 0, mHorizontalAreasCount - 1);
            bottomLeft.y = Mathf.Clamp(bottomLeft.y, 0, mVerticalAreasCount - 1);*/

            bottomRight.x = topRight.x;
            bottomRight.y = bottomLeft.y;

            //see how many different areas we have
            if (topLeft.x == topRight.x && topLeft.y == bottomLeft.y) {
                mOverlappingAreas.append(topLeft);
            } else if (topLeft.x == topRight.x) {
                mOverlappingAreas.append(topLeft);
                mOverlappingAreas.append(bottomLeft);
            } else if (topLeft.y == bottomLeft.y) {
                mOverlappingAreas.append(topLeft);
                mOverlappingAreas.append(topRight);
            } else {
                mOverlappingAreas.append(topLeft);
                mOverlappingAreas.append(bottomLeft);
                mOverlappingAreas.append(topRight);
                mOverlappingAreas.append(bottomRight);
            }

            unowned List<Vector2i?> areas = obj.mAreas;
            unowned List<int> ids = obj.mIdsInAreas;

            for (int i = 0; i < areas.length(); ++i) {
                if (null == mOverlappingAreas.find(areas.nth_data(i))) {
                    removeObjectFromArea(areas.nth_data(i), ids.nth_data(i), obj);
                    //object no longer has an index in the area
                    areas.delete_link(areas.nth(i));
                    ids.delete_link(ids.nth(i));
                    --i;
                }
            }

            for (var i = 0; i < mOverlappingAreas.length(); ++i) {
                var area = mOverlappingAreas.nth_data(i);
                if (null == areas.find(area))
                    addObjectToArea(area, obj);
            }

            mOverlappingAreas = new List<Vector2i?>();
        }

        public TileType getTile(int x, int y) {
            if (x < 0 || x >= mWidth
                || y < 0 || y >= mHeight)
                return TileType.Block;

            return mTiles[x, y];
        }

        public bool isOneWayPlatform(int x, int y) {
            if (x < 0 || x >= mWidth
                || y < 0 || y >= mHeight)
                return false;

            return (mTiles[x, y] == TileType.OneWay);
        }

        public bool isGround(int x, int y) {
            if (x < 0 || x >= mWidth
            || y < 0 || y >= mHeight)
                return false;

            return (mTiles[x, y] == TileType.OneWay || mTiles[x, y] == TileType.Block);
        }

        public bool isObstacle(int x, int y) {
            if (x < 0 || x >= mWidth
                || y < 0 || y >= mHeight)
                return true;

            return (mTiles[x, y] == TileType.Block);
        }

        public bool isEmpty(int x, int y) {
            if (x < 0 || x >= mWidth
                || y < 0 || y >= mHeight)
                return false;

            return (mTiles[x, y] == TileType.Empty);
        }

        public bool isNotEmpty(int x, int y) {
            if (x < 0 || x >= mWidth
                || y < 0 || y >= mHeight)
                return true;

            return (mTiles[x, y] != TileType.Empty);
        }
        
        public void getMapTileAtPoint2(Vector2 point, out int tileIndexX, out int tileIndexY) {
            tileIndexY = (int)((point.y - mPosition.y + cTileSize / 2.0f) / (float)(cTileSize));
            tileIndexX = (int)((point.x - mPosition.x + cTileSize / 2.0f) / (float)(cTileSize));
        }

        public int getMapTileYAtPoint(float y) {
            return (int)((y - mPosition.y + cTileSize / 2.0f) / (float)(cTileSize));
        }

        public int getMapTileXAtPoint(float x) {
            return (int)((x - mPosition.x + cTileSize / 2.0f) / (float)(cTileSize));
        }

        public Vector2i getMapTileAtPoint(Vector2 point) {
            return Vector2i((int)((point.x - mPosition.x + cTileSize / 2.0f) / (float)(cTileSize)),
                        (int)((point.y - mPosition.y + cTileSize / 2.0f) / (float)(cTileSize)));
        }

        public Vector2 getMapTilePosition(int tileIndexX, int tileIndexY) {
            return Vector2(
                    (float)(tileIndexX * cTileSize) + mPosition.x,
                    (float)(tileIndexY * cTileSize) + mPosition.y
                );
        }

        //  public Vector2 getMapTilePosition(Vector2i tileCoords) {
        //      return Vector2(
        //          (float)(tileCoords.x * cTileSize) + mPosition.x,
        //          (float)(tileCoords.y * cTileSize) + mPosition.y
        //          );
        //  }

        public void setTile(int x, int y, TileType type) {
            if (x <= 1 || x >= mWidth - 2 || y <= 1 || y >= mHeight - 2)
                return;

            mTiles[x, y] = type;

            if (type == TileType.Block) {
                autoTile(type, x, y, 1, 8, 4, 4, 4, 4);
                //  mTilesSprites[x, y].enabled = true;
            } else if (type == TileType.OneWay) {
            //      mTilesSprites[x, y].enabled = true;

            //      mTilesSprites[x, y].transform.localScale = Vector3(1.0f, 1.0f, 1.0f);
            //      mTilesSprites[x, y].transform.eulerAngles = Vector3(0.0f, 0.0f, 0.0f);
            //      mTilesSprites[x, y].sprite = mDirtSprites[25];
            } else {
                //  mTilesSprites[x, y].enabled = false;
            }

            autoTile(type, x - 1, y, 1, 8, 4, 4, 4, 4);
            autoTile(type, x + 1, y, 1, 8, 4, 4, 4, 4);
            autoTile(type, x, y - 1, 1, 8, 4, 4, 4, 4);
            autoTile(type, x, y + 1, 1, 8, 4, 4, 4, 4);
        }
        
        public void init() {
            //set the position

            mTiles = new TileType[mWidth, mHeight];
            mTilesSprites = new Sprite[mWidth, mHeight];

            //mUpdatedAreas = new HashSet<Vector2i>();

            mHorizontalAreasCount = (int)Math.ceilf((float)mWidth / (float)mGridAreaWidth);
            mVerticalAreasCount = (int)Math.ceilf((float)mHeight / (float)mGridAreaHeight);

            mObjectsInArea = new List<MovingObject>[mHorizontalAreasCount, mVerticalAreasCount];

            for (var y = 0; y < mVerticalAreasCount; ++y) {
                for (var x = 0; x < mHorizontalAreasCount; ++x)
                    mObjectsInArea[x, y] = new List<MovingObject>();
            }

            for (int y = 0; y < mHeight; ++y) {
                for (int x = 0; x < mWidth; ++x) {
                    //  mTilesSprites[x, y] = Instantiate<SpriteRenderer>(mTilePrefab);
                    //  mTilesSprites[x, y].transform.parent = transform;
                    //  mTilesSprites[x, y].transform.position = mPosition + new Vector3(cTileSize * x, cTileSize * y, 10.0f);

                    if (y > mHeight / 2)
                        setTile(x, y, TileType.Empty);
                    else if (y == mHeight / 2 + 4)
                        setTile(x, y, TileType.OneWay);
                    else
                        setTile(x, y, TileType.Block);
                }
            }

            for (int y = 0; y < mHeight; ++y) {
                mTiles[1, y] = TileType.Block;
                mTiles[mWidth - 2, y] = TileType.Block;
            }

            for (int x = 0; x < mWidth; ++x) {
                mTiles[x, 1] = TileType.Block;
                mTiles[x, mHeight - 2] = TileType.Block;
            }
        }

        void autoTile(TileType type, int x, int y, int rand4NeighbourTiles, int rand3NeighbourTiles,
            int rand2NeighbourPipeTiles, int rand2NeighbourCornerTiles, int rand1NeighbourTiles, int rand0NeighbourTiles) {
            if (x >= mWidth || x < 0 || y >= mHeight || y < 0)
                return;

            if (mTiles[x, y] != TileType.Block)
                return;

            int tileOnLeft = mTiles[x - 1, y] == mTiles[x, y] ? 1 : 0;
            int tileOnRight = mTiles[x + 1, y] == mTiles[x, y] ? 1 : 0;
            int tileOnTop = mTiles[x, y + 1] == mTiles[x, y] ? 1 : 0;
            int tileOnBottom = mTiles[x, y - 1] == mTiles[x, y] ? 1 : 0;

            float scaleX = 1.0f;
            float scaleY = 1.0f;
            float rot = 0.0f;
            int id = 0;

            int sum = tileOnLeft + tileOnRight + tileOnTop + tileOnBottom;

            switch (sum) {
                case 0:
                    id = 1 + sdx.nextInt(rand0NeighbourTiles);

                    break;
                case 1:
                    id = 1 + rand0NeighbourTiles + sdx.nextInt(rand1NeighbourTiles);

                    if (tileOnRight == 1)
                        scaleX = -1;
                    else if (tileOnTop == 1)
                        rot = -1;
                    else if (tileOnBottom == 1) {
                        rot = 1;
                        scaleY = -1;
                    }

                    break;
                case 2:

                    if (tileOnLeft + tileOnBottom == 2)
{
                        id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + rand2NeighbourPipeTiles
                            + sdx.nextInt(rand2NeighbourCornerTiles);
                    }
                    else if (tileOnRight + tileOnBottom == 2)
                    {
                        id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + rand2NeighbourPipeTiles
                            + sdx.nextInt(rand2NeighbourCornerTiles);
                        scaleX = -1;
                    }
                    else if (tileOnTop + tileOnLeft == 2)
                    {
                        id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + rand2NeighbourPipeTiles
                            + sdx.nextInt(rand2NeighbourCornerTiles);
                        scaleY = -1;
                    }
                    else if (tileOnTop + tileOnRight == 2)
                    {
                        id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + rand2NeighbourPipeTiles
                            + sdx.nextInt(rand2NeighbourCornerTiles);
                        scaleX = -1;
                        scaleY = -1;
                    }
                    else if (tileOnTop + tileOnBottom == 2)
                    {
                        id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + sdx.nextInt(rand2NeighbourPipeTiles);
                        rot = 1;
                    }
                    else if (tileOnRight + tileOnLeft == 2)
                        id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + sdx.nextInt(rand2NeighbourPipeTiles);

                    break;
                case 3:
                    id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + rand2NeighbourPipeTiles
                        + rand2NeighbourCornerTiles + sdx.nextInt(rand3NeighbourTiles);

                    if (tileOnLeft == 0)
                    {
                        rot = 1;
                        scaleX = -1;
                    }
                    else if (tileOnRight == 0)
                    {
                        rot = 1;
                        scaleY = -1;
                    }
                    else if (tileOnBottom == 0)
                        scaleY = -1;

                    break;

                case 4:
                    id = 1 + rand0NeighbourTiles + rand1NeighbourTiles + rand2NeighbourPipeTiles
                        + rand2NeighbourCornerTiles + rand3NeighbourTiles + sdx.nextInt(rand4NeighbourTiles);

                    break;
            }

            //  mTilesSprites[x, y].transform.localScale = new Vector3(scaleX, scaleY, 1.0f);
            //  mTilesSprites[x, y].transform.eulerAngles = new Vector3(0.0f, 0.0f, rot * 90.0f);
            //  mTilesSprites[x, y].sprite = mDirtSprites[id - 1];
        }
        public void checkCollisions() {
            Vector2 overlap;

            for (int y = 0; y < mVerticalAreasCount; ++y)
            {
                for (int x = 0; x < mHorizontalAreasCount; ++x)
                {
                    unowned List<MovingObject> objectsInArea = mObjectsInArea[x, y];
                    for (int i = 0; i < objectsInArea.length() - 1; ++i)
                    {
                        var obj1 = objectsInArea.nth_data(i);
                        for (int j = i + 1; j < objectsInArea.length(); ++j)
                        {
                            var obj2 = objectsInArea.nth_data(j);

                            if (obj1.mAABB.overlapsSigned(obj2.mAABB, out overlap) && !obj1.hasCollisionDataFor(obj2))
                            {
                                obj1.mAllCollidingObjects.append(CollisionData(obj2, overlap, obj1.mSpeed, obj2.mSpeed, obj1.mOldPosition, obj2.mOldPosition, obj1.mPosition, obj2.mPosition));
                                obj2.mAllCollidingObjects.append(CollisionData(obj1, Vector2.zero.sub(overlap), obj2.mSpeed, obj1.mSpeed, obj2.mOldPosition, obj1.mOldPosition, obj2.mPosition, obj1.mPosition));
                            }
                        }
                    }
                }
            }
        }

        public void updateCollisionState(MovingObject obj) {
            if (obj.mSpeed.x > 0.0f)
            {
                obj.mSpeed.x = 0.0f;
                obj.mPushesRight = true;
            }
            else if (obj.mSpeed.x < 0.0f)
            {
                obj.mSpeed.x = 0.0f;
                obj.mPushesLeft = true;
            }

            if (obj.mSpeed.y > 0.0f)
            {
                obj.mSpeed.y = 0.0f;
                obj.mPushesTop = true;
            }
            else if (obj.mSpeed.y < 0.0f)
            {
                obj.mSpeed.y = 0.0f;
                obj.mPushesBottom = true;
            }
        }


    }
}