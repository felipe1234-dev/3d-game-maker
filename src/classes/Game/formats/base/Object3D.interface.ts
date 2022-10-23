import { Game } from "@local/classes";
import { Body, isBody } from "./Body.interface";
import { Source, isSource } from "./Source.interface";
import { isTexture, Texture } from "../textures/Texture.interface";
import { Geometry, isGeometry } from "../geometries/Geometry.interface";
import { Material, isMaterial } from "../materials/Material.interface";

interface Object3D {
    metadata?: {
        version: 4.5;
        type: "Object";
        generator: "Object3D.toJSON";
    };
    geometries?: Geometry[];
    materials?: Material[];
    textures?: Texture[];
    images?: Source[];
    shapes?: any[];
    skeletons?: any[];
    animations?: any[];
    nodes?: any[];
    bodies?: Body[];
    object: {
        id: number;
        uuid: string;
        type: typeof Game.Libs.objects3D[number];
        name?: string;
        matrix: number[];
        children?: Object3D["object"][];
        receiveShadow?: boolean;
        castShadow?: boolean;
        visible?: boolean;
        frustumCulled?: boolean;
        renderOrder?: number;
        userData?: any;
    }
}

function isObject3D(json: any): json is Object3D {
    const isObj = json instanceof Object;
    if (!isObj) return false;

    const isObject = json.object instanceof Object;
    if (!isObject) return false;

    const isID = typeof json.object.id === "number";
    const isUuid = typeof json.object.uuid === "string";
    const isType =
        typeof json.object.type === "string" &&
        Game.Libs.objects3D.includes(json.object.type);

    console.log(isID, isUuid, isType);

    const hasName = !!json.object.name;
    const isName = hasName ? typeof json.object.name === "string" : false;

    const isMatrix = Array.isArray(json.object.matrix)
        ? json.object.matrix.every((item: any) => typeof item === "number")
        : false;

    const hasChildren = !!json.object.children;
    const isChildren =
        hasChildren && Array.isArray(json.object.children)
            ? json.object.children.every((item: any) => isObject3D({ object: item }))
            : false;

    const hasReceiveShadow = json.object.receiveShadow !== undefined;
    const isReceiveShadow = hasReceiveShadow
        ? typeof json.object.receiveShadow === "boolean"
        : false;

    const hasCastShadow = json.object.castShadow !== undefined;
    const isCastShadow = hasCastShadow
        ? typeof json.object.castShadow === "boolean"
        : false;

    const hasVisible = json.object.visible !== undefined;
    const isVisible = hasVisible ? typeof json.object.visible === "boolean" : false;

    const hasFrustumCulled = json.object.frustumCulled !== undefined;
    const isFrustumCulled = hasFrustumCulled
        ? typeof json.object.frustumCulled === "boolean"
        : false;

    const hasRenderOrder = json.object.renderOrder !== undefined;
    const isRenderOrder = hasRenderOrder
        ? typeof json.object.renderOrder === "number"
        : false;

    const hasUserData = json.object.userData !== undefined;
    const isUserData = hasUserData
        ? json.object.userData instanceof Object
        : false;

    const hasGeometries = json.geometries !== undefined;
    const isGeometries = hasGeometries
        ? !!(
            Array.isArray(json.geometries) &&
            json.geometries.every((item: any) => isGeometry(item))
        )
        : false;

    console.log("hasGeometries", hasGeometries);
    console.log("isGeometries", isGeometries);

    const hasSources = json.sources !== undefined;
    const isSources = hasSources
        ? !!(
            Array.isArray(json.sources) &&
            json.sources.every((item: any) => isSource(item))
        )
        : false;

    const hasBodies = json.bodies !== undefined;
    const isBodies = hasBodies
        ? !!(
            Array.isArray(json.bodies) &&
            json.bodies.every((item: any) => isBody(item))
        )
        : false;

    const hasMaterials = json.materials !== undefined;
    const isMaterials = hasMaterials
        ? !!(
            Array.isArray(json.materials) &&
            json.materials.every((item: any) => isMaterial(item))
        )
        : false;

    console.log("hasMaterials", hasMaterials);
    console.log("isMaterials", isMaterials);

    const hasTextures = json.textures !== undefined;
    const isTestures = hasTextures
        ? !!(
            Array.isArray(json.textures) &&
            json.textures.every((item: any) => isTexture(item))
        )
        : false;

    return (
        isID &&
        isUuid &&
        isType &&
        (hasName ? isName : true) &&

        isMatrix &&
        (hasChildren ? isChildren : true) &&

        (hasReceiveShadow ? isReceiveShadow : true) &&
        (hasCastShadow ? isCastShadow : true) &&
        (hasVisible ? isVisible : true) &&
        (hasFrustumCulled ? isFrustumCulled : true) &&
        (hasRenderOrder ? isRenderOrder : true) &&

        (hasUserData ? isUserData : true) &&

        (hasGeometries ? isGeometries : true) &&
        (hasSources ? isSources : true) &&
        (hasBodies ? isBodies : true) &&
        (hasMaterials ? isMaterials : true) &&
        (hasTextures ? isTestures : true)
    );
}

export type { Object3D };
export { isObject3D };