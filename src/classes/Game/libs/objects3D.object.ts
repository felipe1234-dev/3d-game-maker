import cameras from "./cameras.object";
import lights from "./lights.object";

const objects3D = [
    "BaseObject3D",
    "Group",
    "Mesh",
    ...cameras,
    ...lights,
    "Scene",
] as const;

export default objects3D;