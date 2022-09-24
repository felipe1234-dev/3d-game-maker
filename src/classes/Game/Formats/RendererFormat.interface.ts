import * as THREE from "three";

interface RendererFormat {
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

    clippingPlanes?: any[];
    localClippingEnabled?: boolean;

    /**
     * Default is false.
     */
    gammaInput?: boolean;

    /**
     * Default is false.
     */
    gammaOutput?: boolean;

    physicallyCorrectLights?: boolean;
    toneMapping?: THREE.ToneMapping;
    toneMappingExposure?: number;
    toneMappingWhitePoint?: number;

    /**
     * Default is false.
     */
    shadowMapDebug?: boolean;

    /**
     * Default is 8.
     */
    maxMorphTargets?: number;

    /**
     * Default is 4.
     */
    maxMorphNormals?: number;

    shadowMap?: {
        type?: THREE.ShadowMapType;
        enabled?: boolean;
    };

    pixelRation?: number
}

export default RendererFormat;