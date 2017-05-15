[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF

const WINDOW_SIZE: Point = {1280, 720}
const TILES_PER_ROW: int = 16
const TILES_SIZE: Point = {64, 64}
const PLAYER_SIZE: Vector2d = {64, 64}
const AIR: int = 0
const START: int = 78
const FINISH: int = 110
const PLAYER_PNG:string     = "/home/bruce/Git/platformer/data/res/player.bmp"
const GRASS_PNG:string      = "/home/bruce/Git/platformer/data/res/grass.bmp"
const DEFAULT_MAP:string    = "/home/bruce/Git/platformer/data/res/default.map"
const FONT_TTF:string       = "/home/bruce/Git/platformer/data/res/OpenDyslexic-Bold.otf"


class Game : Object
    inputs: array of bool
    renderer: unowned Renderer
    font: Font
    font_rw: RWops
    evt : private SDL.Event
    player: Player
    map: Map
    camera: Vector2d
    cameraType: CameraType
    pos: Point2d
    playerSurface: Surface
    playerTexture: Texture
    grassTexture: Texture
    playerSprite: Texture
    playerEntity: Entity
    construct(renderer: Renderer)
        this.renderer = renderer
        playerTexture = loadTexture(renderer, PLAYER_PNG)
        grassTexture = loadTexture(renderer, GRASS_PNG)
        inputs = new array of bool[6]

        font_rw = new RWops.from_file(FONT_TTF, "r")
        font = new Font.RW(font_rw, 0, 28)

        sdlFailIf(font == null, "Failed to load font")
        playerSurface = SDLImage.load(PLAYER_PNG)

        player = new Player(playerTexture, playerSurface)
        // Bake the player sprite
        playerSprite = player.composite(renderer)
        playerEntity = CreatePlayer(playerSprite, 96, 96)
        map = new Map(grassTexture, DEFAULT_MAP)
        cameraType = CameraType.simpleCamera 
        
    def toInput(key: SDL.Input.Scancode): Input
        case key    
            when SDL.Input.Scancode.LEFT
                return Input.left
            when SDL.Input.Scancode.RIGHT
                return Input.right
            when SDL.Input.Scancode.UP
                return Input.jump
            when SDL.Input.Scancode.SPACE
                return Input.jump
            when SDL.Input.Scancode.R
                return Input.restart
            when SDL.Input.Scancode.Q
                return Input.quit
        return Input.none

    def loadTexture(renderer: Renderer, path: string): Texture
        var surface = SDLImage.load(path)
        sdlFailIf(surface == null, "Unable to load image!")
        var texture = Video.Texture.create_from_surface(renderer, surface)
        sdlFailIf(texture == null, "Unable to load texture!")
        texture.set_blend_mode(Video.BlendMode.BLEND)
        return texture

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

    def render(tick: int)
        renderer.set_draw_color(110, 132, 174, 255)
        renderer.clear()

        var x = player.pos.x - camera.x
        var y = player.pos.y - camera.y
        var h = playerEntity.sprite.height
        var w = playerEntity.sprite.width
        renderer.copy(playerEntity.sprite.texture, null, {(int)x-h/2, (int)y-w/2, h, w})
        map.render(renderer, camera)
        
        var time = player.time
        var white = color(255, 255, 255, 255)
        if time.begin >= 0
            render_text(formatTime(tick - time.begin), 50, 100, white)
        else if time.finish >= 0
            render_text("Finished in: " + formatTime(time.finish), 50, 100, white)
        if time.best >= 0
            render_text("Best time: " + formatTime(time.best), 50, 150, white)

        renderer.present()

    def render_text(text: string, x: int, y: int, foreColor: Color)
        var outlineColor = color(0, 0, 0, 64)
        try
            renderText(renderer, font, text, x, y, (FontStyle)2, outlineColor)
            renderText(renderer, font, text, x, y, (FontStyle)0, foreColor)
        except e:Error
            print e.message

    def physics()
        if inputs[Input.restart] do player.restart()

        var ground = map.onGround(player.pos, PLAYER_SIZE)
        if inputs[Input.jump]
            if ground
                player.vel.y = -21

        var direction = (double)((int)inputs[Input.right] - (int)inputs[Input.left])

        player.vel.y += 0.75
        if ground
            player.vel.x = 0.5 * player.vel.x + 4.0 * direction
        else
            player.vel.x = 0.95 * player.vel.x + 2.0 * direction


        player.vel.x = clamp(player.vel.x, -8, 8)
        map.moveBox(ref player.pos, ref player.vel, PLAYER_SIZE)
            
    def moveCamera()
        var halfWin = (double)WINDOW_SIZE.x/2
        if cameraType == CameraType.fluidCamera
            var dist = camera.x - player.pos.x + halfWin
            camera.x -= 0.05 * dist
        else if cameraType == CameraType.innerCamera
            var leftArea  = player.pos.x - halfWin - 100
            var rightArea = player.pos.x - halfWin + 100
            camera.x = clamp(camera.x, leftArea, rightArea)
        else // CameraType.simpleCamera
            camera.x = player.pos.x - halfWin

    def logic(tick: int)
        case map.getTile(player.pos.x, player.pos.y)
            when START
                player.time.begin = tick
            when FINISH
                if player.time.begin >= 0
                    player.time.finish = tick - player.time.begin
                    player.time.begin = -1
                    if player.time.best < 0 || player.time.finish < player.time.best
                        player.time.best = player.time.finish
                    print "Finished in %s", formatTime(player.time.finish)
            

