[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF


class Game : Object

    delegate SortByEntity(a:Entity?, b:Entity?):int

    uniqueId: int = 0
    inputs: array of bool
    mouse: Point2d
    renderer: unowned Renderer
    font: Font
    rawFont: RWops
    evt : private SDL.Event
    pos: Point2d
    system: Systems

    playerSurface: Surface
    bulletSurface: Surface
    enemy1Surface: Surface
    enemy2Surface: Surface
    enemy3Surface: Surface
    particleSurface: Surface
    explosionSurface: Surface

    playerTexture: Texture
    bulletTexture: Texture
    enemy1Texture: Texture
    enemy2Texture: Texture
    enemy3Texture: Texture
    particleTexture: Texture
    explosionTexture: Texture

    const FONT_TTF:string       = "/home/bruce/Git/platformer/data/res/OpenDyslexic-Bold.otf"
    const PLAYER_PNG:string     = "/home/bruce/Git/ShmupWarz/res/images/fighter.png"
    const BULLET_PNG:string     = "/home/bruce/Git/ShmupWarz/res/images/bullet.png"
    const ENEMY1_PNG:string     = "/home/bruce/Git/ShmupWarz/res/images/enemy1.png"
    const ENEMY2_PNG:string     = "/home/bruce/Git/ShmupWarz/res/images/enemy2.png"
    const ENEMY3_PNG:string     = "/home/bruce/Git/ShmupWarz/res/images/enemy3.png"
    const PARTICLE_PNG:string   = "/home/bruce/Git/ShmupWarz/res/images/star.png"
    const EXPLOSION_PNG:string  = "/home/bruce/Git/ShmupWarz/res/images/explosion.png"


    entities: array of Entity
    particles: list of ParticleQue? = new list of ParticleQue?
    bullets: list of BulletQue? = new list of BulletQue?
    enemies1: list of EnemyQue? = new list of EnemyQue?
    enemies2: list of EnemyQue? = new list of EnemyQue?
    enemies3: list of EnemyQue? = new list of EnemyQue?
    explosions: list of ExplosionQue? = new list of ExplosionQue?
    bangs: list of ExplosionQue? = new list of ExplosionQue?

    construct(renderer: Renderer)
        this.renderer = renderer

        playerSurface = SDLImage.load(PLAYER_PNG)
        playerTexture = Video.Texture.create_from_surface(renderer, playerSurface)
        playerTexture.set_blend_mode(Video.BlendMode.BLEND)

        bulletSurface = SDLImage.load(BULLET_PNG)
        bulletTexture = Video.Texture.create_from_surface(renderer, bulletSurface)
        bulletTexture.set_blend_mode(Video.BlendMode.BLEND)

        enemy1Surface = SDLImage.load(ENEMY1_PNG)
        enemy1Texture = Video.Texture.create_from_surface(renderer, enemy1Surface)
        enemy1Texture.set_blend_mode(Video.BlendMode.BLEND)

        enemy2Surface = SDLImage.load(ENEMY2_PNG)
        enemy2Texture = Video.Texture.create_from_surface(renderer, enemy2Surface)
        enemy2Texture.set_blend_mode(Video.BlendMode.BLEND)

        enemy3Surface = SDLImage.load(ENEMY3_PNG)
        enemy3Texture = Video.Texture.create_from_surface(renderer, enemy2Surface)
        enemy3Texture.set_blend_mode(Video.BlendMode.BLEND)

        particleSurface = SDLImage.load(PARTICLE_PNG)
        particleTexture = Video.Texture.create_from_surface(renderer, particleSurface)
        particleTexture.set_blend_mode(Video.BlendMode.BLEND)

        explosionSurface = SDLImage.load(EXPLOSION_PNG)
        explosionTexture = Video.Texture.create_from_surface(renderer, explosionSurface)
        explosionTexture.set_blend_mode(Video.BlendMode.BLEND)

        rawFont = new RWops.from_file(FONT_TTF, "r")
        font = new Font.RW(rawFont, 0, 28)
        sdlFailIf(font == null, "Failed to load font")

        entities = createEntityDB(this, renderer, 0, 0)
        inputs = new array of bool[6]
        system = new Systems(this)

    def nextUniqueId(): int
        return uniqueId++
        
    def render(delta: double)
        renderer.set_draw_color(110, 132, 174, 255)
        renderer.clear()
        for e in activeEntities()
            var w = e.scale != null ? e.sprite.width * e.scale.x : e.sprite.width
            var h = e.scale != null ? e.sprite.height * e.scale.y : e.sprite.height
            var x = e.position.x-(w/2)
            var y = e.position.y-(h/2)
            if e.tint != null 
                e.sprite.texture.set_color_mod(e.tint.r, e.tint.g, e.tint.b)
            renderer.copy(e.sprite.texture, null, {(int)x, (int)y, (int)w, (int)h})
        renderer.present()


    def activeEntities(): list of Entity?
        sort: CompareDataFunc of Entity? = def(a, b)
            return (int)a.layer-(int)b.layer

        var l = new list of Entity?
        for e in entities do if e.active do l.add(e)
        l.sort(sort)
        return l

    def update(delta:double)
        system.spawn(delta)
        for var i=0 to (entities.length-1) do system.input(delta, ref entities[i])
        for var i=0 to (entities.length-1) do system.create(delta, ref entities[i])
        for var i=0 to (entities.length-1) do system.movement(delta, ref entities[i])
        for var i=0 to (entities.length-1) do system.expiring(delta, ref entities[i])
        for var i=0 to (entities.length-1) do system.scaleTween(delta, ref entities[i])
        for var i=0 to (entities.length-1) do system.removeOffscreen(delta, ref entities[i])
        system.collision(delta)
            
    def addBullet(x: double, y: double)
        bullets.add(bulletque(x, y))

    def addParticle(x: double, y: double)
        particles.add(particleque(x, y))
    
    def addEnemy(e: Enemies)
        case e  
            when Enemies.Enemy1
                enemies1.add(enemyque(e))
            when Enemies.Enemy2
                enemies2.add(enemyque(e))
            when Enemies.Enemy3
                enemies3.add(enemyque(e))

    def addExplosion(x: double, y: double)
        explosions.add(explosionque(x, y, 0.5))

    def addBang(x: double, y: double)
        bangs.add(explosionque(x, y, 0.2))

    def handleInput()
        evt: Event
        while SDL.Event.poll(out evt) != 0
            case evt.type
                when SDL.EventType.QUIT
                    inputs[Input.quit] = true
                when SDL.EventType.KEYDOWN
                    inputs[toInput(evt.key.keysym.scancode)] = true
                when SDL.EventType.KEYUP
                    inputs[toInput(evt.key.keysym.scancode)] = false
                when SDL.EventType.MOUSEBUTTONUP
                    inputs[Input.jump] = false
                when SDL.EventType.MOUSEBUTTONDOWN
                    mouse.x = evt.motion.x
                    mouse.y = evt.motion.y
                    inputs[Input.jump] = true
                when SDL.EventType.MOUSEMOTION
                    mouse.x = evt.motion.x
                    mouse.y = evt.motion.y
                when SDL.EventType.FINGERUP
                    inputs[Input.jump] = false
                when SDL.EventType.FINGERDOWN
                    mouse.x = evt.motion.x
                    mouse.y = evt.motion.y
                    inputs[Input.jump] = true
                when SDL.EventType.FINGERMOTION
                    mouse.x = evt.motion.x
                    mouse.y = evt.motion.y
                    inputs[Input.jump] = true

    def toInput(key: SDL.Input.Scancode): Input
        case key    
            when SDL.Input.Scancode.LEFT
                return Input.left
            when SDL.Input.Scancode.RIGHT
                return Input.right
            when SDL.Input.Scancode.UP
                return Input.jump
            when SDL.Input.Scancode.Z
                return Input.jump
            when SDL.Input.Scancode.R
                return Input.restart
            when SDL.Input.Scancode.Q
                return Input.quit
        return Input.none

