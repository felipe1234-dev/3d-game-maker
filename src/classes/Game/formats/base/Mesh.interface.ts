import { Object3D, isObject3D } from "./Object3D.interface";

interface Mesh extends Object3D {
    object: {
        type: "Mesh";
        geometry?: string;
        material?: string;
        body?: string;
    } & Object3D["object"]
}

function isMesh(json: any): json is Mesh {
    if (!(json instanceof Object)) return false;
    if (!(json.object instanceof Object)) return false;

    const isObj3D = isObject3D(json);
    const isType = json.object.type === "Mesh";

    const hasGeometry = !!json.object.geometry;
    const isGeometry = typeof json.object.geometry === "string";

    const hasMaterial = !!json.object.material;
    const isMaterial = typeof json.object.material === "string";

    const hasBody = !!json.object.body;
    const isBody = typeof json.object.body === "string";

    return (
        isObj3D &&
        isType &&
        (hasGeometry ? isGeometry : true) &&
        (hasMaterial ? isMaterial : true) &&
        (hasBody ? isBody : true)
    );
}

export type { Mesh };
export { isMesh };