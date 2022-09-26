import { Game, Utils } from "@local/classes";

class GameRenderer extends Utils.Renderer {
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
}

export default GameRenderer;