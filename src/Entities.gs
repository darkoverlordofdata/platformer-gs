[indent=4]
uses SDL.Video
/**
 * Entity Factory
 */
    
def createPlayer(game: Game, renderer: Renderer):Entity
    return Entity(){
        id = game.nextUniqueId(), 
        name = "Player", 
        active = true, 
        entityType = EntityType.Player, 
        layer = Layer.PLAYER, 
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

def createBullet(game: Game, renderer: Renderer):Entity
    return Entity(){
        id = game.nextUniqueId(), 
        name = "Bullet", 
        active = false, 
        entityType = EntityType.Bullet, 
        layer = Layer.BULLET, 
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

def createEnemy1(game: Game, renderer: Renderer):Entity
    return Entity(){
        id = game.nextUniqueId(),
        name = "Enemy1",
        active = false,
        entityType = EntityType.Enemy, 
        layer = Layer.ENEMY1,
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

def createEnemy2(game: Game, renderer: Renderer):Entity
    return Entity(){
        id = game.nextUniqueId(),
        name = "Enemy2",
        active = false,
        entityType = EntityType.Enemy, 
        layer = Layer.ENEMY2,
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

def createEnemy3(game: Game, renderer: Renderer):Entity
    return Entity(){
        id = game.nextUniqueId(),
        name = "Enemy3",
        active = false,
        entityType = EntityType.Enemy, 
        layer = Layer.ENEMY3,
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

def createExplosion(game: Game, renderer: Renderer, scale:double = 0.5):Entity
    return Entity(){
        id = game.nextUniqueId(),
        name = "Explosion",
        active = false,
        entityType = EntityType.Explosion, 
        layer = Layer.EXPLOSION,
        position = point2d(0, 0),
        bounds = rect(0, 0, (int)game.explosionSurface.w/2, (int)game.explosionSurface.h/2),
        scale = vector2d(scale, scale),
        sprite = sprite(game.explosionTexture, game.explosionSurface.w, game.explosionSurface.h),
        tint = color(0xd2, 0xfa, 0xd2, 0xfa),
        expires = 0.5,
        health = null,
        scaleTween = scaletween(scale/100, scale, -3, false, true),
        velocity = null
    }

def createBang(game: Game, renderer: Renderer, scale:double = 0.2):Entity
    return Entity(){
        id = game.nextUniqueId(),
        name = "Bang",
        active = false,
        entityType = EntityType.Explosion, 
        layer = Layer.BANG,
        position = point2d(0, 0),
        bounds = rect(0, 0, (int)game.explosionSurface.w/2, (int)game.explosionSurface.h/2),
        scale = vector2d(scale, scale),
        sprite = sprite(game.explosionTexture, game.explosionSurface.w, game.explosionSurface.h),
        tint = color(0xaa, 0xe8, 0xaa, 0xee),
        expires = 0.5,
        health = null,
        scaleTween = scaletween(scale/100, scale, -3, false, true),
        velocity = null
    }

def createParticle(game: Game, renderer: Renderer):Entity
    var radians = Random.next_double() * 2 * Math.PI
    var magnitude = Random.int_range(0, 200)
    var velocityX = magnitude * Math.cos(radians)
    var velocityY = magnitude * Math.sin(radians)
    var scale = Random.double_range(0.1, 1.0)
    return Entity(){
        id = game.nextUniqueId(),
        name = "Particle",
        active = false,
        entityType = EntityType.Particle, 
        layer = Layer.PARTICLE,
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

def createEntityDB(game: Game, renderer: Renderer, width: int, height: int): array of Entity
    return {
        createPlayer(game, renderer),
        createBang(game, renderer),
        createBang(game, renderer),
        createBang(game, renderer),
        createBang(game, renderer),
        createBang(game, renderer),
        createBang(game, renderer),
        createBang(game, renderer),
        createBang(game, renderer),
        createExplosion(game, renderer),
        createExplosion(game, renderer),
        createExplosion(game, renderer),
        createExplosion(game, renderer),
        createExplosion(game, renderer),
        createExplosion(game, renderer),
        createExplosion(game, renderer),
        createExplosion(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createBullet(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy1(game, renderer),
        createEnemy2(game, renderer),
        createEnemy2(game, renderer),
        createEnemy2(game, renderer),
        createEnemy2(game, renderer),
        createEnemy2(game, renderer),
        createEnemy2(game, renderer),
        createEnemy3(game, renderer),
        createEnemy3(game, renderer),
        createEnemy3(game, renderer),
        createEnemy3(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer),
        createParticle(game, renderer)
    }

