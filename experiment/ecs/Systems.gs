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

    enemyT1: double = (double)Timers.TIMER1
    enemyT2: double = (double)Timers.TIMER2
    enemyT3: double = (double)Timers.TIMER3
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
        if e.category == Category.PLAYER
            e.position.x = (int)game.mouse.x
            e.position.y = (int)game.mouse.y
            if game.inputs[Input.JUMP]
                timeToFire -= delta
                if timeToFire < 0
                    game.bullets.add(point2d(e.position.x - 27, e.position.y + 2))
                    game.bullets.add(point2d(e.position.x + 27, e.position.y + 2))
                    timeToFire = FireRate

    /**
     * Physics calculations 
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
        if e.category == Category.ENEMY && e.active 
            if e.position.y > WINDOW_SIZE.y do e.active = false

    /**
     *  Check for collisions
     */
    def collision(delta: double)
        for var i = 0 to (game.entities.length-1)
            if game.entities[i].active && game.entities[i].category == Category.ENEMY
                for var j = 0 to (game.entities.length-1)
                    if game.entities[j].active && game.entities[j].category == Category.BULLET
                        if game.entities[i].bounds.intersection_rect(game.entities[j].bounds, out result)
                            handleCollision(ref game.entities[i], ref game.entities[j])

    /**
     *  handle a collision
     */
    def handleCollision(ref a:Entity, ref b:Entity)
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
                case e  
                    when Enemies.ENEMY1
                        game.enemies1.add(point2d(0,0))
                        return (double)Timers.TIMER1
                    when Enemies.ENEMY2
                        game.enemies3.add(point2d(0,0))
                        return (double)Timers.TIMER2
                    when Enemies.ENEMY3
                        game.enemies3.add(point2d(0,0))
                        return (double)Timers.TIMER3
                    default
                        return 0
            else
                return d

        enemyT1 = spawn(enemyT1, Enemies.ENEMY1)
        enemyT2 = spawn(enemyT2, Enemies.ENEMY2)
        enemyT3 = spawn(enemyT3, Enemies.ENEMY3)

    /**
     *  Is there a pending create request?
     */
    def create(delta: double, ref e: Entity)
        if !e.active
            case e.actor
                when Actor.BULLET
                    if game.bullets.size > 0
                        var bullet = game.bullets.remove_at(0)
                        e.expires = 1
                        e.position.x = (int)bullet.x
                        e.position.y = (int)bullet.y
                        e.active = true
                when Actor.ENEMY1
                    if game.enemies1.size > 0
                        var enemy = game.enemies1.remove_at(0)
                        e.position.x = (int)Random.int_range(0, WINDOW_SIZE.x-45)
                        e.position.y = 45
                        e.health = health(10, 10)
                        e.active = true
                when Actor.ENEMY2
                    if game.enemies2.size > 0
                        var enemy = game.enemies2.remove_at(0)
                        e.position.x = (int)Random.int_range(0, WINDOW_SIZE.x-86)
                        e.position.y = 86
                        e.health = health(20, 20)
                        e.active = true
                when Actor.ENEMY3
                    if game.enemies3.size > 0
                        var enemy = game.enemies3.remove_at(0)
                        e.position.x = (int)Random.int_range(0, WINDOW_SIZE.x-160)
                        e.position.y = 160
                        e.health = health(60, 60)
                        e.active = true
                when Actor.EXPLOSION
                    if game.explosions.size > 0
                        var explosion = game.explosions.remove_at(0)
                        e.expires = 0.5
                        e.scale = vector2d(0.5, 0.5)
                        e.position.x = (int)explosion.x
                        e.position.y = (int)explosion.y
                        e.active = true
                when Actor.BANG
                    if game.bangs.size > 0
                        var bang = game.bangs.remove_at(0)
                        e.expires = 0.5
                        e.scale = vector2d(0.2, 0.2)
                        e.position.x = (int)bang.x
                        e.position.y = (int)bang.y
                        e.active = true
                when Actor.PARTICLE
                    if game.particles.size > 0
                        var particle = game.particles.remove_at(0)
                        e.expires = 0.5
                        e.position.x = (int)particle.x
                        e.position.y = (int)particle.y
                        e.active = true
                
