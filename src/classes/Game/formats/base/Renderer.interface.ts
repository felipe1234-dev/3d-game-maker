import * as THREE from "three";

interface Renderer {
    autoClear: boolean;

    /**
     * If autoClear is true; defines whether the renderer should clear the color buffer. Default is true.
     */
    autoClearColor: boolean;

    /**
     * If autoClear is true; defines whether the renderer should clear the depth buffer. Default is true.
     */
    autoClearDepth: boolean;

    /**
     * If autoClear is true; defines whether the renderer should clear the stencil buffer. Default is true.
     */
    autoClearStencil: boolean;

    /**
     * Defines whether the renderer should sort objects. Default is true.
     */
    sortObjects: boolean;

    localClippingEnabled: boolean;

    physicallyCorrectLights: boolean;
    toneMapping: THREE.ToneMapping;
    toneMappingExposure: number;

    shadowMap: {
        type: THREE.ShadowMapType;
        enabled: boolean;
    };

    pixelRatio: number;
}

function isRenderer(json: any): json is Renderer {
    if (!(json instanceof Object)) return false;

    const isAutoClear = typeof json.autoClear === "boolean";
    const isAutoClearColor = typeof json.autoClearColor === "boolean";
    const isAutoClearDepth = typeof json.autoClearDepth === "boolean";
    const isAutoClearStencil = typeof json.autoClearStencil === "boolean";
    const isSortObjects = typeof json.sortObjects === "boolean";
    const isLocalClippingEnabled =
        typeof json.localClippingEnabled === "boolean";
    const isPhysicallyCorrectLights =
        typeof json.physicallyCorrectLights === "boolean";
    const isToneMapping = [
        THREE.NoToneMapping,
        THREE.LinearToneMapping,
        THREE.ReinhardToneMapping,
        THREE.CineonToneMapping,
        THREE.ACESFilmicToneMapping,
        THREE.CustomToneMapping,
    ].includes(json.toneMapping);
    const isToneMappingExposure = typeof json.toneMappingExposure === "number";
    const isShadowMap =
        json.shadowMap instanceof Object &&
        [
            THREE.BasicShadowMap,
            THREE.PCFShadowMap,
            THREE.PCFSoftShadowMap,
            THREE.VSMShadowMap,
        ].includes(json.shadowMap.type) &&
        typeof json.shadowMap.enabled === "boolean";

    const isPixelRatio = typeof json.pixelRatio === "number";

    return (
        isAutoClear &&
        isAutoClearColor &&
        isAutoClearDepth &&
        isAutoClearStencil &&
        isSortObjects &&
        isLocalClippingEnabled &&
        isPhysicallyCorrectLights &&
        isToneMapping &&
        isToneMappingExposure &&
        isShadowMap &&
        isPixelRatio
    );
}

export type { Renderer };
export { isRenderer };