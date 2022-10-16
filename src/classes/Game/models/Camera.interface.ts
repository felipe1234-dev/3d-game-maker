import { Game } from "@local/classes";
import Object3D from "./Object3D.interface";

interface Camera extends Object3D {
    type: typeof Game.Libs.cameras[number];
}

export default Camera;