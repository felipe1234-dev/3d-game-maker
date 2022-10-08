import { Game } from "@local/classes";
import { Body, isBody } from "./Body.interface";
import TextureFormat from "./Texture.interface";
import { Source, isSource } from "./Source.interface";
import { Geometry, isGeometry } from "../geometries/Geometry.interface";
import MaterialFormat from "../materials/Material.interface";

interface Object3D {
    geometries?: Geometry[];
    materials?: MaterialFormat[];
    textures?: TextureFormat[];
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
        children?: Object3D[];
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

    const isID = typeof json.object.id === "string";
    const isUuid = typeof json.object.uuid === "string";
    const isType =
        typeof json.object.type === "string" &&
        Game.Libs.objects3D.includes(json.object.type);

    const hasName = !!json.object.name;
    const isName = hasName ? typeof json.object.name === "string" : false;

    const isMatrix = Array.isArray(json.object.matrix)
        ? json.object.matrix.every((item: any) => typeof item === "number")
        : false;

    const hasChildren = !!json.object.children;
    const isChildren =
        hasChildren && Array.isArray(json.object.children)
            ? json.object.children.every((item: any) => isObject3D(item))
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

    const hasFrustumCulled = json.object.hasFrustumCulled !== undefined;
    const isFrustumCulled = hasFrustumCulled
        ? typeof json.object.hasFrustumCulled === "boolean"
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
        (hasBodies ? isBodies : true)
    );
}

export type { Object3D };
export { isObject3D };