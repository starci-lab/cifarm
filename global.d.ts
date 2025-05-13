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


declare global {
  interface Window {
    google: {
      accounts: {
        id: IdConfiguration;
      };
      oauth2: IdConfiguration;
    };
  }
}

// Define the expected structure of the Google login response
interface GoogleLoginResponse {
  credential: string; // JWT token
  clientId: string;   // Client ID used in the Google login
}