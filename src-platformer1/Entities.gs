[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF
/**
 * Entity Factory
 */

 struct Entity 
    id: int                     /* Unique sequential id */
    name: string                /* Display name */
    active: bool                /* In use */
    category: Category          /* Category */
    actor: Actor                /* Display Actor */
    position: Point2d           /* Position on screen */
    bounds: Rect                /* Sprite dimensions*/
    sprite: Sprite              /* Sprite */
                                /* Optional: */
    scale: Vector2d?            /* Display scale */
    tint: Color?                /* Color to use as tint */
    expires: Timer?             /* Countdown until expiration */
    health: Health?             /* Track health */
    velocity: Vector2d?         /* Cartesian velocity*/


def CreatePlayer(texture: SDL.Video.Texture, h:int, w:int): Entity
    return Entity(){
        id = 0,
        name = "Player",
        active = true,
        category = Category.PLAYER,
        actor = Actor.PLAYER,
        position = point2d(),
        bounds = rect(0, 0, h, w),
        sprite = sprite(texture, h, w),
        scale = vector2d(1, 1),
        tint = color(),
        expires = timer(),
        health = health(0, 0),
        velocity = vector2d()
    }
