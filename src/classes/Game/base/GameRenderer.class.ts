import { Game } from "@local/classes";
import UtilsRenderer from "@local/classes/Utils/Renderer.class";

class GameRenderer extends UtilsRenderer {
    public toJSON(): Game.RendererFormat {
        const json: Game.RendererFormat = {
            physicallyCorrectLights: this.physicallyCorrectLights,
            toneMapping: this.toneMapping,
            toneMappingExposure: this.toneMappingExposure,
            shadowMap: {
                type: this.shadowMap.type,
                enabled: this.shadowMap.enabled,
            },
        };

        return json;
    }

    public static fromJSON(json: Game.RendererFormat): GameRenderer {
        const renderer = new GameRenderer({ antialias: true });

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
}

export default GameRenderer;