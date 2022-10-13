import { Game } from "@local/classes";

/**
 * Applies the base properties of materials.
 */
function applyBaseMaterialJSON(
    material: Game.Material,
    json: Game.Formats.Material
): void {
    material.uuid = json.uuid;
    material.name = json.name || "";

    if (json.alphaTest) material.alphaTest = json.alphaTest;
    material.stencilRef = json.stencilRef;
    material.stencilWriteMask = json.stencilWriteMask;
    material.stencilFuncMask = json.stencilFuncMask;
    if (json.opacity) material.opacity = json.opacity;
    if (json.polygonOffsetFactor) material.polygonOffsetFactor = json.polygonOffsetFactor;
    if (json.polygonOffsetUnits) material.polygonOffsetUnits = json.polygonOffsetUnits;

    if (json.alphaToCoverage !== undefined) material.alphaToCoverage = json.alphaToCoverage;
    material.colorWrite = json.colorWrite;
    material.depthTest = json.depthTest;
    material.depthWrite = json.depthWrite;
    material.stencilWrite = json.stencilWrite;
    if (json.polygonOffset !== undefined) material.polygonOffset = json.polygonOffset;
    if (json.premultipliedAlpha !== undefined) material.premultipliedAlpha = json.premultipliedAlpha;
    if (json.dithering !== undefined) material.dithering = json.dithering;
    if (json.toneMapped !== undefined) material.toneMapped = json.toneMapped;
    if (json.transparent !== undefined) material.transparent = json.transparent;
    if (json.vertexColors !== undefined) material.vertexColors = json.vertexColors;
    if (json.visible !== undefined) material.visible = json.visible;

    if (json.blending !== undefined) material.blending = json.blending;
    material.stencilFunc = json.stencilFunc;
    material.depthFunc = json.depthFunc;
    material.stencilFail = json.stencilFail;
    material.stencilZFail = json.stencilZFail;
    material.stencilZPass = json.stencilZPass;
    if (json.side !== undefined) material.side = json.side;
    if (json.shadowSide !== undefined) material.shadowSide = json.shadowSide;

    if (json.userData instanceof Object) material.userData = json.userData;
}

export default applyBaseMaterialJSON;