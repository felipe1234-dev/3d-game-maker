import * as THREE from "three";
import { Game } from "@local/classes";

interface SceneOptions {
    id?: number;
    uuid?: string;
    name: string;

    background?: THREE.Color | THREE.Texture | null;
    environment?: THREE.Texture | null;
    fog?: THREE.FogBase | null;

    game?: Game.Core;
    stage?: Game.Stage;
    physics?: Game.Physics;

    children?: Game.Object[];
}

export default SceneOptions;