[indent=4]
uses SDL.Video
/**
 * Component Factory
 */
    
enum Input
    none
    left
    right
    jump
    restart
    quit

enum Collision
    x
    y
    corner

enum CameraType
    fluidCamera
    innerCamera
    simpleCamera

enum Timers
    Timer1      = 2
    Timer2      = 7
    Timer3      = 13

enum Layer
    DEFAULT      = 0
    BACKGROUND   = 1
    TEXT         = 2
    LIVES        = 3
    ENEMY1       = 4
    ENEMY2       = 5
    ENEMY3       = 6
    PLAYER       = 7
    BULLET       = 8
    EXPLOSION    = 9
    BANG         = 10
    PARTICLE     = 11
    HUD          = 12

enum EntityType 
    Background   = 0
    Bullet       = 1
    Enemy        = 2
    Explosion    = 3
    Particle     = 4
    Player       = 5

enum Effect 
    PEW          = 0
    ASPLODE      = 1
    SMALLASPLODE = 2

enum Enemies
    Enemy1       = 0
    Enemy2       = 1
    Enemy3       = 2


struct Health
    curHealth: int
    maxHealth: int

struct ScaleTween
    min : double
    max : double
    speed : double
    repeat : bool
    active : bool

struct EnemyQue
    enemy : Enemies

struct ExplosionQue 
    x: double
    y: double
    scale : double

struct BulletQue 
    x: double
    y: double

struct ParticleQue 
    x: double
    y: double

struct Sprite
    texture: unowned Texture
    width: int
    height: int

struct Point2d
    x: double
    y: double
    def inline add(v: Vector2d): Point2d
        return point2d(x+v.x, y+v.y)
    def inline sub(v: Vector2d): Point2d
        return point2d(x-v.x, y-v.y)


struct Vector2d
    x: double
    y: double
    def inline mul(f: double): Vector2d
        return vector2d(x*f, y*f)
    def inline div(f: double): Vector2d
        return vector2d(x/f, y/f)
    def inline len(): double
        return Math.sqrt(x*x+y*y)

def sprite(texture:Texture, width:int, height:int): Sprite
    sprite:Sprite = {texture, width, height}
    return sprite

def health(curHealth: int, maxHealth: int): Health
    health: Health = {curHealth, maxHealth}
    return health

def scaletween(min: double, max: double, speed: double, repeat: bool, active: bool): ScaleTween
    scaletween: ScaleTween = {min, max, speed, repeat, active}
    return scaletween
    
def enemyque(enemy : Enemies): EnemyQue
    enemyque: EnemyQue = {enemy}
    return enemyque

def explosionque(x:double, y:double, scale : double) : ExplosionQue
    explosionque: ExplosionQue = {x, y, scale}
    return explosionque

def bulletque(x:double, y:double) : BulletQue
    bulletque: BulletQue = {x, y}
    return bulletque

def particleque(x:double, y:double) : ParticleQue
    particleque: ParticleQue = {x, y}
    return particleque

def rect(x:int, y:int, h:int, w:int): Rect
    rect:Rect = {x,y,h,w}
    return rect

def point2d(x: double, y: double): Point2d
    point2d: Point2d = {x, y}
    return point2d

def vector2d(x: double, y: double): Vector2d
    vector2d: Vector2d = {x, y}
    return vector2d

def color(r: uint8, g: uint8, b: uint8, a: uint8=255): Color
    color: Color = {r, g, b, a}
    return color

