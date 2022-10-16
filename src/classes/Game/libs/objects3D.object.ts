import cameras from "./cameras.object";
import lights from "./lights.object";

const objects3D = [
    ...cameras,
    ...lights,
    "BaseObject3D",
    "Mesh",
    "Group",
    "Scene",
] as const;

export default objects3D;