public class LogicSystem : System {
	public LogicSystem(Map map) {
		
		execute = (ref player, tick) => {
			switch (map.getTile(player.position.x, player.position.y)) {
				
				case Map.START:
					player.expires.begin = tick; 
					break;

				case Map.FINISH:
					if (player.expires.begin >= 0) {
						player.expires.finish = tick - player.expires.begin;
						player.expires.begin = -1;
						if (player.expires.best < 0 || player.expires.finish < player.expires.best) {
							player.expires.best = player.expires.finish;
						}
						print("Finished in %s\n", formatTime(player.expires.finish));
					}
					break;
			}
		};
	}
}
