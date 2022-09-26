import * as THREE from "three";

interface Renderer {
    autoClear?: boolean;

    /**
     * If autoClear is true; defines whether the renderer should clear the color buffer. Default is true.
     */
    autoClearColor?: boolean;

    /**
     * If autoClear is true; defines whether the renderer should clear the depth buffer. Default is true.
     */
    autoClearDepth?: boolean;

    /**
     * If autoClear is true; defines whether the renderer should clear the stencil buffer. Default is true.
     */
    autoClearStencil?: boolean;

    /**
     * Defines whether the renderer should sort objects. Default is true.
     */
    sortObjects?: boolean;

    localClippingEnabled?: boolean;

    physicallyCorrectLights?: boolean;
    toneMapping?: THREE.ToneMapping;
    toneMappingExposure?: number;

    shadowMap?: {
        type?: THREE.ShadowMapType;
        enabled?: boolean;
    };

    pixelRatio?: number;
}

export default Renderer;