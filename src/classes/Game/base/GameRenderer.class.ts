import { Game } from "@local/classes";
import UtilsRenderer from "@local/classes/Utils/Renderer.class";

class GameRenderer extends UtilsRenderer {
    public toJSON(): Game.Formats.Renderer {
        const json: Game.Formats.Renderer = {
            autoClear: this.autoClear,
            autoClearColor: this.autoClearColor,
            autoClearDepth: this.autoClearDepth,
            autoClearStencil: this.autoClearStencil,
            sortObjects: this.sortObjects,
            localClippingEnabled: this.localClippingEnabled,
            physicallyCorrectLights: this.physicallyCorrectLights,
            toneMapping: this.toneMapping,
            toneMappingExposure: this.toneMappingExposure,
            shadowMap: {
                type: this.shadowMap.type,
                enabled: this.shadowMap.enabled,
            },
            pixelRatio: this.pixelRatio,
        };

        return json;
    }

    public static fromJSON(json: Game.Formats.Renderer): GameRenderer {
        const renderer = new GameRenderer({ antialias: true });

        renderer.autoClear = json.autoClear;
        renderer.autoClearColor = json.autoClearColor;
        renderer.autoClearDepth = json.autoClearDepth;

        renderer.autoClearStencil = json.autoClearStencil;
        renderer.sortObjects = json.sortObjects;

        renderer.localClippingEnabled = json.localClippingEnabled;

        renderer.physicallyCorrectLights = json.physicallyCorrectLights;
        renderer.toneMapping = json.toneMapping;

        renderer.toneMappingExposure = json.toneMappingExposure;
        renderer.shadowMap.type = json.shadowMap.type;

        renderer.shadowMap.enabled = json.shadowMap.enabled;
        renderer.pixelRatio = json.pixelRatio;

        return renderer;
    }
}

export default GameRenderer;