import { Game } from "@local/classes";

function rendererFromJSON(json: Game.Formats.Renderer): Game.Renderer {
    const renderer = new Game.Renderer({ antialias: true });

    if (json.autoClear) renderer.autoClear = json.autoClear;
    if (json.autoClearColor) renderer.autoClearColor = json.autoClearColor;
    if (json.autoClearDepth) renderer.autoClearDepth = json.autoClearDepth;
    if (json.autoClearStencil)
        renderer.autoClearStencil = json.autoClearStencil;
    if (json.sortObjects) renderer.sortObjects = json.sortObjects;
    if (json.localClippingEnabled)
        renderer.localClippingEnabled = json.localClippingEnabled;
    if (json.physicallyCorrectLights)
        renderer.physicallyCorrectLights = json.physicallyCorrectLights;
    if (json.toneMapping) renderer.toneMapping = json.toneMapping;
    if (json.toneMappingExposure)
        renderer.toneMappingExposure = json.toneMappingExposure;
    if (json.shadowMap?.type) renderer.shadowMap.type = json.shadowMap.type;
    if (json.shadowMap?.enabled)
        renderer.shadowMap.enabled = json.shadowMap.enabled;
    if (json.pixelRatio) renderer.pixelRatio = json.pixelRatio;

    return renderer;
}

export default rendererFromJSON;