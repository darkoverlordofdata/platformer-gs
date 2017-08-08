using sdx.math;

public class PhysicsSystem : System {
	public PhysicsSystem(Map map) {
		
		execute = (ref player, tick) => {
			if (sdx.keys[114] == 1) {
				player.position = { 170, 500 };
				player.velocity = { 0, 0 };
				player.expires = { 0, 0, player.expires.best };
				return;
			}
			
			var ground = map.isOnGround(player.position, player.size);
			if (sdx.direction[sdx.Direction.UP]) {
				if (ground) {
					player.velocity.y = -21;
				}
			}
			var direction = (float)((int)sdx.direction[sdx.Direction.RIGHT] - (int)sdx.direction[sdx.Direction.LEFT]);

			player.velocity.y += 0.75f;
			if (ground)
				player.velocity.x = 0.5f * player.velocity.x + 4.0f * direction;
			else
				player.velocity.x = 0.95f * player.velocity.x + 2.0f * direction;

			player.velocity.x = clamp(player.velocity.x, -8, 8);
			map.moveBox(ref player.position, ref player.velocity, player.size);
		};
	}

}
