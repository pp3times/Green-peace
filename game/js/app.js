let app;
let player;

window.onload = () => {
    app = new PIXI.Application({
        width: 1920,
        height: 1080,
        antialias: true,
        transparent: false,
        resolution: 1,
        forceCanvas: true,
        autoResize: true,
        view: document.getElementById("app"),
    })

    const loader = PIXI.Loader.shared;

    const resources = [
        {
            name: "bg_water",
            path: "bg_water.png"
        },
    ]

    loader.onLoad.add(handleLoad)
    loader.onProgress.add(handleProgressLoad)
    loader.onComplete.add(handleCompleteLoad)
    loader.onError.add(handleErrorLoad)

    resources.forEach((resource) => {
        loader.add(resource.name, `./resources/${resource.path}`)
    })

    loader.load();
}

const handleLoad = () => {
    console.log(`Loading...`)
}

const handleProgressLoad = (data) => {
    console.log(`Progress load ${data.progress}%`)
}

const handleCompleteLoad = () => {
    console.log(PIXI.utils.TextureCache)
}

const handleErrorLoad = (err) => {
    console.log("ERROR LOAD", err)
}