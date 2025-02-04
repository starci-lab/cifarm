import GridTable from "phaser3-rex-plugins/plugins/gridtable"
import {
    Buttons,
    NinePatch2,
    OverlapSizer,
    Pinch,
    ScrollablePanel,
    Sizer,
} from "phaser3-rex-plugins/templates/ui/ui-components"

// base constructor params for NinePatch2
export interface NinePatch2BaseConstructorParams {
  scene: Phaser.Scene;
  config?: NinePatch2.IConfig;
}

// base constructor params for Sizer
export interface SizerBaseConstructorParams {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  config?: Sizer.IConfig;
}

// overlap sizer base constructor params
export interface OverlapSizerBaseConstructorParams {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  config?: OverlapSizer.IConfig;
}

// interface for constructor params
export interface ConstructorParams<TBaseConstructorParams, TOptions> {
  baseParams: TBaseConstructorParams;
  options: TOptions;
}

// base constructor params for Buttons
export interface ButtonsBaseConstructorParams {
  scene: Phaser.Scene;
  config?: Buttons.IConfig;
}

// base constructor params for Pinch
export interface PinchBaseConstructorParams {
  scene: Phaser.Scene;
  config?: Pinch.IConfig;
}

export interface ScrollablePanelBaseConstructorParams {
  scene: Phaser.Scene;
  config?: ScrollablePanel.IConfig;
}

export interface GridTableBaseConstructorParams {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  config: GridTable.IConfig;
}
