[indent=4]
uses SDL
uses SDL.Video
uses SDLTTF

class Player : Object
    texture: unowned Video.Texture
    pos: Point2d
    vel: Vector2d
    time: Time
    construct(texture: Video.Texture)
        this.texture = texture
        time = new Time()
        restart()

    def restart()
        pos = point2d(170, 500)
        vel = vector2d(0, 0)
        time.begin = -1
        time.finish = -1 

    def render(renderer: SDL.Video.Renderer, texture: SDL.Video.Texture, pos: Point2d)
        var x = (int)pos.x
        var y = (int)pos.y
        bodyParts: array of BodyPart = {
            bodypart(rect(192,  64, 64, 32), rect(x-60, y,    96, 48), RendererFlip.NONE),
            bodypart(rect( 96,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
            bodypart(rect(192,  64, 64, 32), rect(x-36,    y, 96, 48), RendererFlip.NONE),
            bodypart(rect(192,  32, 64, 32), rect(x-60,    y, 96, 48), RendererFlip.NONE),
            bodypart(rect(  0,   0, 96, 96), rect(x-48, y-48, 96, 96), RendererFlip.NONE),
            bodypart(rect(192,  32, 64, 32), rect(x-36,    y, 96, 48), RendererFlip.NONE),
            bodypart(rect( 64,  96, 32, 32), rect(x-18, y-21, 36, 36), RendererFlip.NONE),
            bodypart(rect( 64,  96, 32, 32), rect(x- 6, y-21, 36, 36), RendererFlip.HORIZONTAL)
        }

        for var part in bodyParts
            renderer.copyex(texture, part.source, part.dest, 0, null, part.flip)
