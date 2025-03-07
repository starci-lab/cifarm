import {
    Buttons,
    Label,
    NinePatch2,
    OverlapSizer,
    Pinch,
    Checkbox,
    ScrollablePanel,
    Sizer,
    GridTable,
    BadgeLabel,
    BBCodeText,
    Slider,
} from "phaser3-rex-plugins/templates/ui/ui-components"

// base constructor params for NinePatch2
export interface NinePatch2BaseConstructorParams {
  scene: Phaser.Scene;
  config?: NinePatch2.IConfig;
}

// base constructor params for Sizer
export interface BaseSizerBaseConstructorParams {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  config?: Sizer.IConfig;
}

export interface SizerBaseConstructorParams {
  scene: Phaser.Scene;
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
  options?: TOptions;
}

export interface BBCodeTextBaseConstructorParams {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  text?: string;
  style?: BBCodeText.TextStyle;
}

export interface CheckboxBaseConstructorParams {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: number;
  config?: Partial<Checkbox.IConfig>;
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
  config?: Partial<GridTable.IConfig>;
}

export interface SliderBaseConstructorParams {
  scene: Phaser.Scene;
  config?: Partial<Slider.IConfig>;
}

export interface ContainerLiteBaseConstructorParams {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  children?: Array<Phaser.GameObjects.GameObject>;
}

export interface LabelBaseConstructorParams {
  scene: Phaser.Scene;
  config?: Label.IConfig;
}

export interface BadgeLabelBaseConstructorParams {
  scene: Phaser.Scene;
  config?: BadgeLabel.IConfig;
}
