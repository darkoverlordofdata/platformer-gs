using sdx.math;
using sdx.graphics;

public enum Collision {
	X,
	Y,
	CORNER
}


public struct Timer { 
	public int begin;
	public int finish;
	public int best;
}

public struct ScaleTween {
	public float min;
	public float max;
	public float speed;
	public bool repeat;
	public bool active;
}

public struct Health {
	public int curHealth;
	public int maxHealth;
}

public struct Entity { 
	public int id;				/* Unique sequential id */
	public string name;			/* Display name */
	public bool active;			/* In use */
	public Rect aabb;			/* Sprite dimensions*/
	public Vector2 position;   	/* Position on screen */
	public Vector2 size;		/* Display size */
	public Vector2 scale;		/* Display scale */
	public Sprite sprite;		/* Sprite */
								/* Optional: */
	public Color? tint;			/* Color to use as tint */
	public Timer? expires;		/* Countdown until expiration */
	public Health? health;		/* Track health */
	public Vector2? velocity;	/* Cartesian velocity*/
}

public inline SDL.Video.Rect rect(int x, int y, int h, int w) { 
	return { x, y, h, w };
}

public inline SDL.Video.Color color(uint8 r, uint8 g, uint8 b, uint8 a) {
	return { r, g, b, a };
}


