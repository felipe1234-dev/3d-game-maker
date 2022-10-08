import { Geometry, isGeometry } from "./Geometry.interface";

interface IcosahedronGeometry extends Geometry {
    type: "IcosahedronGeometry";
    radius: number;
    detail: number;
}

function isIcosahedronGeometry(json: any): json is IcosahedronGeometry {
    const isGeo = isGeometry(json);
    const isType = json.type === "IcosahedronGeometry";
    
    const isRadius = typeof json.radius === "number";
    const isDetail = typeof json.detail === "number";

    return (
        isGeo &&
        isType &&
        
        isRadius &&
        isDetail
    );
}

export type { IcosahedronGeometry };
export { isIcosahedronGeometry };