import { Game } from "@local/classes";

function rendererToJSON(renderer: Game.Renderer): Game.Formats.Renderer {
    const json: Game.Formats.Renderer = {
        physicallyCorrectLights: renderer.physicallyCorrectLights,
        toneMapping: renderer.toneMapping,
        toneMappingExposure: renderer.toneMappingExposure,
        shadowMap: {
            type: renderer.shadowMap.type,
            enabled: renderer.shadowMap.enabled,
        },
    };

    return json;
}

export default rendererToJSON;