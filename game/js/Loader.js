function Load() {
    let loader = PIXI.Loader.shared;

    loader.onLoad.add(() => {
        console.log(`Loading...`)
    })
    loader.onProgress.add((data) => {
        console.log(`Progress load ${data.progress}%`)
    })
    loader.onError.add((err) => {
        console.log("ERROR LOAD", err)
    })

    const resources = [
        {
            name: "bg_water",
            path: "bg_water.png"
        },
    ]

    resources.forEach((resource) => {
        loader.add(resource.name, `./resources/${resource.path}`)
    })

    loader.load();
    return loader;
}