//phaser plugin
import "phaser"
import GesturesPlugin from "phaser3-rex-plugins/plugins/gestures-plugin.js"
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin.js"

declare module "phaser" {
  interface Scene {
    rexGestures: GesturesPlugin;
    rexUI: RexUIPlugin;
  }
}

