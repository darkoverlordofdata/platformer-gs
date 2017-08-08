/**
 * 
 */
namespace sdx.math { 
    
    public class Character {

        public enum CharacterState
        {
            Stand,
            Walk,
            Jump,
            GrabLedge,
        }

        public float mWalkSfxTimer = 0.0f;
        public const float cWalkSfxTime = 0.25f;

        /// <summary>
        /// The number of frames passed from changing the state to jump.
        /// </summary>
        public int mFramesFromJumpStart = 0;

        public bool[] mInputs;
        public bool[] mPrevInputs;

        public CharacterState mCurrentState = CharacterState.Stand;
        public float mJumpSpeed;
        public float mWalkSpeed;

        public List<Vector2i?> mPath = new List<Vector2i?>();

        public Vector2i mLedgeTile;

        public int mCannotGoLeftFrames = 0;
        public int mCannotGoRightFrames = 0;

        public MovingObject obj;

        //  public void setCharacterWidth(Slider slider)
        //  {
        //      obj.scaleX = slider.value;
        //  }

        //  public void setCharacterHeight(Slider slider)
        //  {
        //      obj.scaleY = slider.value;
        //  }

        public void init(bool[] inputs, bool[] prevInputs)
        {
            obj = new MovingObject();
            obj.scale = Vector2.one;

            mInputs = inputs;
            mPrevInputs = prevInputs;

            //  // mAudioSource = GetComponent<AudioSource>();
            //  obj.mPosition = transform.position;

            obj.mAABB.halfSize = new Vector2(Constants.cHalfSizeX, Constants.cHalfSizeY);

            mJumpSpeed = Constants.cJumpSpeed;
            mWalkSpeed = Constants.cWalkSpeed;

            obj.AABBOffsetY = obj.mAABB.halfSizeY;

            //mGame.mObjects.Add(this);
        }

        public bool released(KeyInput key)
        {
            return (!mInputs[(int)key] && mPrevInputs[(int)key]);
        }

        public bool keyState(KeyInput key)
        {
            return (mInputs[(int)key]);
        }

        public bool pressed(KeyInput key)
        {
            return (mInputs[(int)key] && !mPrevInputs[(int)key]);
        }

        public void updatePrevInputs()
        {
            var count = (int)KeyInput.Count;

            for (var i = 0; i < count; ++i)
                mPrevInputs[i] = mInputs[i];
        }

        public void customUpdate()
        {
            switch (mCurrentState)
            {
                case CharacterState.Stand:

                    mWalkSfxTimer = cWalkSfxTime;
                    // mAnimator.Play("Stand");

                    obj.mSpeed = Vector2.zero;

                    if (!obj.mPushesBottom)
                    {
                        mCurrentState = CharacterState.Jump;
                        break;
                    }

                    //if left or right key is pressed, but not both
                    if (keyState(KeyInput.GoRight) != keyState(KeyInput.GoLeft))
                    {
                        mCurrentState = CharacterState.Walk;
                        break;
                    }
                    else if (keyState(KeyInput.Jump))
                    {
                        obj.mSpeed.y = mJumpSpeed;
                        // mAudioSource.PlayOneShot(mJumpSfx);
                        mCurrentState = CharacterState.Jump;
                        break;
                    }

                    if (keyState(KeyInput.GoDown))
                    {
                        if (obj.mOnOneWayPlatform)
                            obj.mPosition.y -= Constants.cOneWayPlatformThreshold;
                    }

                    break;
                case CharacterState.Walk:
                    // mAnimator.Play("Walk");

                    mWalkSfxTimer += sdx.delta;

                    if (mWalkSfxTimer > cWalkSfxTime)
                    {
                        mWalkSfxTimer = 0.0f;
                        // mAudioSource.PlayOneShot(mWalkSfx);
                    }

                    //if both or neither left nor right keys are pressed then stop walking and stand

                    if (keyState(KeyInput.GoRight) == keyState(KeyInput.GoLeft))
                    {
                        mCurrentState = CharacterState.Stand;
                        obj.mSpeed = Vector2.zero;
                        break;
                    }
                    else if (keyState(KeyInput.GoRight))
                    {
                        if (obj.mPushesRight)
                            obj.mSpeed.x = 0.0f;
                        else
                            obj.mSpeed.x = mWalkSpeed;
                        obj.scaleX = -Math.fabsf(obj.scaleX);
                    }
                    else if (keyState(KeyInput.GoLeft))
                    {
                        if (obj.mPushesLeft)
                            obj.mSpeed.x = 0.0f;
                        else
                            obj.mSpeed.x = -mWalkSpeed;
                        obj.scaleX = Math.fabsf(obj.scaleX);
                    }

                    //if there's no tile to walk on, fall
                    if (keyState(KeyInput.Jump))
                    {
                        obj.mSpeed.y = mJumpSpeed;
                        // mAudioSource.PlayOneShot(mJumpSfx, 1.0f);
                        mCurrentState = CharacterState.Jump;
                        break;
                    }
                    else if (!obj.mPushesBottom)
                    {
                        mCurrentState = CharacterState.Jump;
                        break;
                    }

                    if (keyState(KeyInput.GoDown))
                    {
                        if (obj.mOnOneWayPlatform)
                            obj.mPosition.y -= Constants.cOneWayPlatformThreshold;
                    }

                    break;
                case CharacterState.Jump:

                    ++mFramesFromJumpStart;

                    if (mFramesFromJumpStart <= Constants.cJumpFramesThreshold)
                    {
                        if (obj.mPushesTop || obj.mSpeed.y > 0.0f)
                            mFramesFromJumpStart = Constants.cJumpFramesThreshold + 1;
                        else if (keyState(KeyInput.Jump))
                            obj.mSpeed.y = mJumpSpeed;
                    }

                    mWalkSfxTimer = cWalkSfxTime;

                    // mAnimator.Play("Jump");

                    obj.mSpeed.y += Constants.cGravity * sdx.delta;

                    obj.mSpeed.y = Math.fmaxf(obj.mSpeed.y, Constants.cMaxFallingSpeed);

                    if (!keyState(KeyInput.Jump) && obj.mSpeed.y > 0.0f)
                    {
                        obj.mSpeed.y = Math.fminf(obj.mSpeed.y, 200.0f);
                    }

                    if (keyState(KeyInput.GoRight) == keyState(KeyInput.GoLeft))
                    {
                        obj.mSpeed.x = 0.0f;
                    }
                    else if (keyState(KeyInput.GoRight))
                    {
                        if (obj.mPushesRight)
                            obj.mSpeed.x = 0.0f;
                        else
                            obj.mSpeed.x = mWalkSpeed;
                        obj.scaleX = -Math.fabsf(obj.scaleX);
                    }
                    else if (keyState(KeyInput.GoLeft))
                    {
                        if (obj.mPushesLeft)
                            obj.mSpeed.x = 0.0f;
                        else
                            obj.mSpeed.x = -mWalkSpeed;
                        obj.scaleX = Math.fabsf(obj.scaleX);
                    }

                    //if we hit the ground
                    if (obj.mPushesBottom)
                    {
                        //if there's no movement change state to standing
                        if (keyState(KeyInput.GoRight) == keyState(KeyInput.GoLeft))
                        {
                            mCurrentState = CharacterState.Stand;
                            obj.mSpeed = Vector2.zero;
                            // mAudioSource.PlayOneShot(mHitWallSfx, 0.5f);
                        }
                        else	//either go right or go left are pressed so we change the state to walk
                        {
                            mCurrentState = CharacterState.Walk;
                            obj.mSpeed.y = 0.0f;
                            // mAudioSource.PlayOneShot(mHitWallSfx, 0.5f);
                        }
                    }

                    if (mCannotGoLeftFrames > 0)
                    {
                        --mCannotGoLeftFrames;
                        mInputs[(int)KeyInput.GoLeft] = false;
                    }
                    if (mCannotGoRightFrames > 0)
                    {
                        --mCannotGoRightFrames;
                        mInputs[(int)KeyInput.GoRight] = false;
                    }
                
                    if (obj.mSpeed.y <= 0.0f && !obj.mPushesTop
                        && ((obj.mPushesRight && mInputs[(int)KeyInput.GoRight]) || (obj.mPushesLeft && mInputs[(int)KeyInput.GoLeft])))
                    {
                        //we'll translate the original aabb's HalfSize so we get a vector Vector2iing
                        //the top right corner of the aabb when we want to grab the right edge
                        //and top left corner of the aabb when we want to grab the left edge
                        Vector2 aabbCornerOffset;

                        if (obj.mPushesRight && mInputs[(int)KeyInput.GoRight])
                            aabbCornerOffset = obj.mAABB.halfSize;
                        else
                            aabbCornerOffset = new Vector2(-obj.mAABB.halfSizeX - 1.0f, obj.mAABB.halfSizeY);

                        int tileX, topY, bottomY;
                        tileX = obj.mMap.getMapTileXAtPoint(obj.mAABB.center.x + aabbCornerOffset.x);

                        if ((obj.mPushedLeft && obj.mPushesLeft) || (obj.mPushedRight && obj.mPushesRight))
                        {
                            topY = obj.mMap.getMapTileYAtPoint(obj.mOldPosition.y + obj.AABBOffsetY + aabbCornerOffset.y - Constants.cGrabLedgeStartY);
                            bottomY = obj.mMap.getMapTileYAtPoint(obj.mAABB.center.y + aabbCornerOffset.y - Constants.cGrabLedgeEndY);
                        }
                        else
                        {
                            topY = obj.mMap.getMapTileYAtPoint(obj.mAABB.center.y + aabbCornerOffset.y - Constants.cGrabLedgeStartY);
                            bottomY = obj.mMap.getMapTileYAtPoint(obj.mAABB.center.y + aabbCornerOffset.y - Constants.cGrabLedgeEndY);
                        }

                        for (int y = topY; y >= bottomY; --y)
                        {
                            if (!obj.mMap.isObstacle(tileX, y)
                                && obj.mMap.isObstacle(tileX, y - 1))
                            {
                                //calculate the appropriate corner
                                var tileCorner = obj.mMap.getMapTilePosition(tileX, y - 1);
                                tileCorner.x -= sign(aabbCornerOffset.x) * Map.cTileSize / 2;
                                tileCorner.y += Map.cTileSize / 2;

                                //check whether the tile's corner is between our grabbing Vector2is
                                if (y > bottomY ||
                                    ((obj.mAABB.center.y + aabbCornerOffset.y) - tileCorner.y <= Constants.cGrabLedgeEndY
                                    && tileCorner.y - (obj.mAABB.center.y + aabbCornerOffset.y) >= Constants.cGrabLedgeStartY))
                                {
                                    //save the tile we are holding so we can check later on if we can still hold onto it
                                    mLedgeTile = new Vector2i(tileX, y - 1);

                                    //calculate our position so the corner of our AABB and the tile's are next to each other
                                    obj.mPosition.y = tileCorner.y - aabbCornerOffset.y - obj.AABBOffsetY - Constants.cGrabLedgeStartY + Constants.cGrabLedgeTileOffsetY;
                                    obj.mSpeed = Vector2.zero;

                                    //finally grab the edge
                                    mCurrentState = CharacterState.GrabLedge;
                                    // mAnimator.Play("GrabLedge");
                                    // mAudioSource.PlayOneShot(mHitWallSfx, 0.5f);
                                    break;
                                    //mGame.PlayOneShot(SoundType.Character_LedgeGrab, obj.mPosition, Game.sSfxVolume);
                                }
                            }
                        }
                    }


                    break;

                case CharacterState.GrabLedge:

                    // mAnimator.Play("GrabLedge");

                    bool ledgeOnLeft = mLedgeTile.x * Map.cTileSize < obj.mPosition.x;
                    bool ledgeOnRight = !ledgeOnLeft;

                    //if down button is held then drop down
                    if (mInputs[(int)KeyInput.GoDown]
                        || (mInputs[(int)KeyInput.GoLeft] && ledgeOnRight)
                        || (mInputs[(int)KeyInput.GoRight] && ledgeOnLeft))
                    {
                        if (ledgeOnLeft)
                            mCannotGoLeftFrames = 3;
                        else
                            mCannotGoRightFrames = 3;

                        mCurrentState = CharacterState.Jump;
                        //mGame.PlayOneShot(SoundType.Character_LedgeRelease, obj.mPosition, Game.sSfxVolume);
                    }
                    else if (mInputs[(int)KeyInput.Jump])
                    {
                        //the speed is positive so we don't have to worry about hero grabbing an edge
                        //right after he jumps because he doesn't grab if speed.y > 0
                        obj.mSpeed.y = mJumpSpeed;
                        // mAudioSource.PlayOneShot(mJumpSfx, 1.0f);
                        mCurrentState = CharacterState.Jump;
                    }

                    //when the tile we grab onto gets destroyed
                    if (!obj.mMap.isObstacle(mLedgeTile.x, mLedgeTile.y))
                        mCurrentState = CharacterState.Jump;

                    break;
            }

            //if (mAllCollidingObjects.Count > 0)
            //    GetComponent<SpriteRenderer>().color = Color.black;
            //else
            //    GetComponent<SpriteRenderer>().color = Color.white;

            obj.updatePhysics();

            if (obj.mPushedBottom && !obj.mPushesBottom)
                mFramesFromJumpStart = 0;

            if (obj.mPushesBottom && !obj.mPushedBottom)
                // mAudioSource.PlayOneShot(mHitWallSfx, 0.5f);

            updatePrevInputs();
        }
        

    }
}
