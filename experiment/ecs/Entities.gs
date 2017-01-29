[indent=4]
uses SDL.Video
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
    expires: double             /* Countdown until expiration */
    health: Health?             /* Track health */
    scaleTween: ScaleTween?     /* scale Tweening variables*/
    velocity: Vector2d?         /* Cartesian velocity*/


    
def createPlayer(game: Game, renderer: Renderer, uniqueId: int):Entity
    return Entity(){
        id = uniqueId, 
        name = "Player", 
        active = true, 
        category = Category.PLAYER, 
        actor = Actor.PLAYER, 
        bounds = rect(100, 100, (int)game.playerSurface.w/2, (int)game.playerSurface.h/2),
        position = point2d(100, 100),
        sprite = sprite(game.playerTexture, game.playerSurface.w, game.playerSurface.h),
        scale = null,
        tint = null, 
        expires = 0, 
        health = health(100, 100), 
        scaleTween = null, 
        velocity = vector2d(0, 0)
    }

def createBullet(game: Game, renderer: Renderer, uniqueId: int):Entity
    return Entity(){
        id = uniqueId, 
        name = "Bullet", 
        active = false, 
        category = Category.BULLET, 
        actor = Actor.BULLET, 
        bounds = rect(0, 0, (int)game.bulletSurface.w/2, (int)game.bulletSurface.h/2),
        position = point2d(0, 0),
        sprite = sprite(game.bulletTexture, game.bulletSurface.w, game.bulletSurface.h),
        scale = null,
        tint = color(0xd2, 0xfa, 0x00, 0xfa),
        expires = 1, 
        health = health(2, 2), 
        scaleTween = null, 
        velocity = vector2d(0, -800)
    }

def createEnemy1(game: Game, renderer: Renderer, uniqueId: int):Entity
    return Entity(){
        id = uniqueId,
        name = "Enemy1",
        active = false,
        category = Category.ENEMY, 
        actor = Actor.ENEMY1,
        bounds = rect(0, 100, (int)game.enemy1Surface.w/2, (int)game.enemy1Surface.h/2),
        position = point2d(0, 100),
        scale = null,
        sprite = sprite(game.enemy1Texture, game.enemy1Surface.w, game.enemy1Surface.h),
        tint = null,
        expires = 0,
        health = health(10, 10),
        scaleTween = null,
        velocity = vector2d(0, 40)
    }

def createEnemy2(game: Game, renderer: Renderer, uniqueId: int):Entity
    return Entity(){
        id = uniqueId,
        name = "Enemy2",
        active = false,
        category = Category.ENEMY, 
        actor = Actor.ENEMY2,
        bounds = rect(0, 100, (int)game.enemy2Surface.w/2, (int)game.enemy2Surface.h/2),
        position = point2d(0, 100),
        scale = null,
        sprite = sprite(game.enemy2Texture, game.enemy2Surface.w, game.enemy2Surface.h),
        tint = null,
        expires = 0,
        health = health(20, 20),
        scaleTween = null,
        velocity = vector2d(0, 30)
    }

def createEnemy3(game: Game, renderer: Renderer, uniqueId: int):Entity
    return Entity(){
        id = uniqueId,
        name = "Enemy3",
        active = false,
        category = Category.ENEMY, 
        actor = Actor.ENEMY3,
        bounds = rect(0, 100, (int)game.enemy3Surface.w/2, (int)game.enemy3Surface.h/2),
        position = point2d(0, 100),
        scale = null,
        sprite = sprite(game.enemy3Texture, game.enemy3Surface.w, game.enemy3Surface.h),
        tint = null,
        expires = 0,
        health = health(60, 60),
        scaleTween = null,
        velocity = vector2d(0, 20)
    }

def createExplosion(game: Game, renderer: Renderer, uniqueId: int):Entity
    return Entity(){
        id = uniqueId,
        name = "Explosion",
        active = false,
        category = Category.EXPLOSION, 
        actor = Actor.EXPLOSION,
        position = point2d(0, 0),
        bounds = rect(0, 0, (int)game.explosionSurface.w/2, (int)game.explosionSurface.h/2),
        scale = vector2d(0.5, 0.5),
        sprite = sprite(game.explosionTexture, game.explosionSurface.w, game.explosionSurface.h),
        tint = color(0xd2, 0xfa, 0xd2, 0xfa),
        expires = 0.5,
        health = null,
        scaleTween = scaletween(0.5/100, 0.5, -3, false, true),
        velocity = null
    }

def createBang(game: Game, renderer: Renderer, uniqueId: int):Entity
    return Entity(){
        id = uniqueId,
        name = "Bang",
        active = false,
        category = Category.EXPLOSION, 
        actor = Actor.BANG,
        position = point2d(0, 0),
        bounds = rect(0, 0, (int)game.explosionSurface.w/2, (int)game.explosionSurface.h/2),
        scale = vector2d(0.2, 0.2),
        sprite = sprite(game.explosionTexture, game.explosionSurface.w, game.explosionSurface.h),
        tint = color(0xaa, 0xe8, 0xaa, 0xee),
        expires = 0.5,
        health = null,
        scaleTween = scaletween(0.2/100, 0.2, -3, false, true),
        velocity = null
    }

def createParticle(game: Game, renderer: Renderer, uniqueId: int):Entity
    var radians = Random.next_double() * 2 * Math.PI
    var magnitude = Random.int_range(0, 200)
    var velocityX = magnitude * Math.cos(radians)
    var velocityY = magnitude * Math.sin(radians)
    var scale = Random.double_range(0.1, 1.0)
    return Entity(){
        id = uniqueId,
        name = "Particle",
        active = false,
        category = Category.PARTICLE, 
        actor = Actor.PARTICLE,
        position = point2d(0, 0),
        bounds = rect(0, 0, (int)game.particleSurface.w/2, (int)game.particleSurface.h/2),
        scale = vector2d(scale, scale),
        sprite = sprite(game.particleTexture, game.particleSurface.w, game.particleSurface.h),
        tint = color(0xfa, 0xfa, 0xd2, 0xff),
        expires = 0.5,
        health = null,
        scaleTween = null,
        velocity = vector2d(velocityX, velocityY)
    }

def createEntityDB(game: Game, renderer: Renderer, uniqueId: int=0): array of Entity
    return {
        createPlayer(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createBang(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createExplosion(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createBullet(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy1(game, renderer, uniqueId++),
        createEnemy2(game, renderer, uniqueId++),
        createEnemy2(game, renderer, uniqueId++),
        createEnemy2(game, renderer, uniqueId++),
        createEnemy2(game, renderer, uniqueId++),
        createEnemy2(game, renderer, uniqueId++),
        createEnemy2(game, renderer, uniqueId++),
        createEnemy3(game, renderer, uniqueId++),
        createEnemy3(game, renderer, uniqueId++),
        createEnemy3(game, renderer, uniqueId++),
        createEnemy3(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++),
        createParticle(game, renderer, uniqueId++)
    }

