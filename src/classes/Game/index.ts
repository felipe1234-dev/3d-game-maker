import { WebGLRendererParameters } from "three";
import { Screen } from "./Screen";
import { WebGLRendererProperties } from "@local/types";

const defaults: {
    renderer: {
        parameters: WebGLRendererParameters,
        properties: WebGLRendererProperties
    }
} = {
    renderer: {
        parameters: {
            antialias: false
        },
        properties: {
            shadowMap: {
                type: 0,
                enabled: true
            },
            toneMapping: 0,
            toneMappingExposure: 1,
            physicallyCorrectLights: true
        }
    }
}

export {
    defaults,
    Screen,
};