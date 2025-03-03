export const loadImageAwait = async ({
    key,
    imageUrl,
    scene,
}: LoadImageAwaitParams): Promise<void> => {
    return new Promise((resolve) => {
    // Start loading the image
        scene.load.image(key, imageUrl)

        // Listen for 'filecomplete' (success) and 'loaderror' (failure) events
        scene.load.once(`filecomplete-image-${key}`, () => {
            resolve() // Resolves the promise if the file is loaded successfully
        })

        // Start loading
        scene.load.start()
    })
}

export const loadSvgAwait = async ({
    key,
    svgUrl,
    scene,
    scale = 1,
}: LoadSvgAwaitParams): Promise<void> => {
    return new Promise((resolve) => {
    // Start loading the SVG
        scene.load.svg(key, svgUrl, {
            scale
        })

        // Listen for 'filecomplete' (success) and 'loaderror' (failure) events
        scene.load.once(`filecomplete-svg-${key}`, () => {
            resolve() // Resolves the promise if the file is loaded successfully
        })

        // Start loading
        scene.load.start()
    })
}

export interface LoadSvgAwaitParams {
  key: string;
  svgUrl: string;
  scene: Phaser.Scene;
  scale?: number;
}

export interface LoadImageAwaitParams {
  key: string;
  imageUrl: string;
  scene: Phaser.Scene;
}
