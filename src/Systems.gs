[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF
uses GLib
/**
 * Systems
 *
 * All systems are run during game.update
 */
class Systems : Object

    delegate SpawnEnemy(t: double, e:Enemies):double

    enemyT1: double = (double)Timers.Timer1
    enemyT2: double = (double)Timers.Timer2
    enemyT3: double = (double)Timers.Timer3
    const FireRate : double = 0.1
    timeToFire: double
    result: Rect
    game: Game

    construct(game: Game)
        this.game = game

    /**
     * Handle User Input
     */
    def input(delta: double, ref e: Entity)
        if e.entityType == EntityType.Player
            e.position.x = (int)game.mouse.x
            e.position.y = (int)game.mouse.y
            if game.inputs[Input.jump]
                timeToFire -= delta
                if timeToFire < 0
                    game.bullets.add(point2d(e.position.x - 27, e.position.y + 2))
                    game.bullets.add(point2d(e.position.x + 27, e.position.y + 2))
                    timeToFire = FireRate

    /**
     * Physics calculation 
     */
    def physics(delta: double, ref e: Entity)
        if e.velocity != null && e.active
            var x = e.position.x + e.velocity.x * delta
            var y = e.position.y + e.velocity.y * delta
            e.bounds.x = (int)(x-e.bounds.h/2)
            e.bounds.y = (int)(y-e.bounds.w/2)
            e.position.x = x
            e.position.y = y

    /**
     * Expire entities
     */
    def expire(delta: double, ref e: Entity)
        if e.expires > 0 && e.active
            e.expires = e.expires - delta
            if e.expires <= 0 do e.active = false

    /**
     * Scale Tweening
     */
    def scaleTween(delta: double, ref e: Entity)
        if e.scale != null && e.scaleTween != null && e.active
            var x = e.scale.x + (e.scaleTween.speed * delta)
            var y = e.scale.y + (e.scaleTween.speed * delta)
            var active = e.scaleTween.active
            if x > e.scaleTween.max
                x = e.scaleTween.max
                y = e.scaleTween.max
                active = false
            if x < e.scaleTween.min
                x = e.scaleTween.min
                y = e.scaleTween.min
                active = false
            
            e.scale = vector2d(x, y)
            e.scaleTween.active = active

    /**
     *  Remove Ships
     */
    def removeOffscreen(delta: double, ref e: Entity)
        if e.entityType == EntityType.Enemy && e.active 
            if e.position.y > WINDOW_SIZE.y do e.active = false

    /**
     *  Check for collisions
     */
    def collision(delta: double)
        for var i = 0 to (game.entities.length-1)
            if game.entities[i].active && game.entities[i].entityType == EntityType.Enemy
                for var j = 0 to (game.entities.length-1)
                    if game.entities[j].active && game.entities[j].entityType == EntityType.Bullet
                        if game.entities[i].bounds.intersection_rect(game.entities[j].bounds, out result)
                            handleCollision(ref game.entities[i], ref game.entities[j])

    /**
     *  handle a collision
     */
    def handleCollision(ref a:Entity, ref b:Entity)

        if a.entityType == EntityType.Enemy && b.entityType == EntityType.Bullet
            game.bangs.add(point2d(b.position.x, b.position.y))
            b.active = false
            for var i = 0 to 4 do game.particles.add(point2d(b.position.x, b.position.y))
            if a.health != null
                a.health.curHealth -= b.health.curHealth 
                if a.health.curHealth <= 0
                    game.explosions.add(point2d(b.position.x, b.position.y))
                    a.active = false


    /**
     * Spawn Enemy Ships
     */
    def spawn(delta: double)
        spawn:SpawnEnemy = def(t, e)
            var d = t-delta
            if d < 0 
                //game.addEnemy(e)
                case e  
                    when Enemies.Enemy1
                        game.enemies1.add(point2d(0,0))
                        return (double)Timers.Timer1
                    when Enemies.Enemy2
                        game.enemies3.add(point2d(0,0))
                        return (double)Timers.Timer2
                    when Enemies.Enemy3
                        game.enemies3.add(point2d(0,0))
                        return (double)Timers.Timer3
                    default
                        return 0
            else
                return d

        enemyT1 = spawn(enemyT1, Enemies.Enemy1)
        enemyT2 = spawn(enemyT2, Enemies.Enemy2)
        enemyT3 = spawn(enemyT3, Enemies.Enemy3)

    /**
     *  Is there a pending create request?
     */
    def create(delta: double, ref e: Entity)
        if !e.active
            case e.layer
                when Layer.BULLET
                    if game.bullets.size > 0
                        var bullet = game.bullets.remove_at(0)
                        e.expires = 1
                        e.position.x = (int)bullet.x
                        e.position.y = (int)bullet.y
                        e.active = true
                when Layer.ENEMY1
                    if game.enemies1.size > 0
                        var enemy = game.enemies1.remove_at(0)
                        e.position.x = (int)Random.int_range(0, WINDOW_SIZE.x-45)
                        e.position.y = 45
                        e.health = health(10, 10)
                        e.active = true
                when Layer.ENEMY2
                    if game.enemies2.size > 0
                        var enemy = game.enemies2.remove_at(0)
                        e.position.x = (int)Random.int_range(0, WINDOW_SIZE.x-86)
                        e.position.y = 86
                        e.health = health(20, 20)
                        e.active = true
                when Layer.ENEMY3
                    if game.enemies3.size > 0
                        var enemy = game.enemies3.remove_at(0)
                        e.position.x = (int)Random.int_range(0, WINDOW_SIZE.x-160)
                        e.position.y = 160
                        e.health = health(60, 60)
                        e.active = true
                when Layer.EXPLOSION
                    if game.explosions.size > 0
                        var exp = game.explosions.remove_at(0)
                        e.expires = 0.5
                        e.scale = vector2d(0.5, 0.5)
                        e.position.x = (int)exp.x
                        e.position.y = (int)exp.y
                        e.active = true
                when Layer.BANG
                    if game.bangs.size > 0
                        var exp = game.bangs.remove_at(0)
                        e.expires = 0.5
                        e.scale = vector2d(0.2, 0.2)
                        e.position.x = (int)exp.x
                        e.position.y = (int)exp.y
                        e.active = true
                when Layer.PARTICLE
                    if game.particles.size > 0
                        var part = game.particles.remove_at(0)
                        e.expires = 0.5
                        e.position.x = (int)part.x
                        e.position.y = (int)part.y
                        e.active = true
                
