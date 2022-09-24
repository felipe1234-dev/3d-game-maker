import { Game } from "..";
import UtilsRenderer from "../Utils/Renderer.class";

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
}

export default GameRenderer;