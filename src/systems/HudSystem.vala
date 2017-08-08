using sdx.math;
using sdx.graphics;

public class HudSystem : System {
    public HudSystem() {

        var text1 = "";
        var text2 = "";
        var text3 = "";

        var hudText1 = new Sprite.TextSprite(" ", sdx.font, sdx.Color.Cyan);
        var hudText2 = new Sprite.TextSprite(" ", sdx.font, sdx.Color.Cyan);
        var hudText3 = new Sprite.TextSprite(" ", sdx.font, sdx.Color.Cyan);

        /**
         * render hud
         */
        render = (ref player, tick) => {
            if (player.expires.begin >= 0) {
                var t1 = formatTime(tick - player.expires.begin);
                if (text1 != t1) {   
                    text1 = t1;
                    hudText1.setText(text1, sdx.font, sdx.Color.Cyan);
                }
                hudText1.render(50, 100);
            } else if (player.expires.finish >= 0) {
                var t2 = formatTime(player.expires.finish);
                if (text2 != t2) {
                    text2 = t2;
                    hudText2.setText(text2, sdx.font, sdx.Color.Cyan);
                }
                hudText2.render(50, 100);
            }
            if (player.expires.best >= 0) {
                var t3 = "Best time: " + formatTime(player.expires.best);
                if (text3 != t3) {
                    text3 = t3;
                    hudText3.setText(text3, sdx.font, sdx.Color.Cyan);
                }
                hudText3.render(50, 150);
            }
        };
    }
}
