export const loadImageAwait = async ({
    key,
    imageUrl,
    scene,
}: LoadImageAwaitParams): Promise<void> => {
    return new Promise((resolve, reject) => {
    // Start loading the image
        scene.load.image(key, imageUrl)

        // Listen for 'filecomplete' (success) and 'loaderror' (failure) events
        scene.load.on("filecomplete", () => {
            resolve() // Resolves the promise if the file is loaded successfully
        })

        scene.load.on("loaderror", () => {
            reject(new Error(`Failed to load image: ${key}`)) // Rejects the promise if there is an error
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
    return new Promise((resolve, reject) => {
    // Start loading the SVG
        scene.load.svg(key, svgUrl, {
            scale
        })

        // Listen for 'filecomplete' (success) and 'loaderror' (failure) events
        scene.load.on("filecomplete", () => {
            resolve() // Resolves the promise if the file is loaded successfully
        })

        scene.load.on("loaderror", () => {
            reject(new Error(`Failed to load SVG: ${key}`)) // Rejects the promise if there is an error
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
