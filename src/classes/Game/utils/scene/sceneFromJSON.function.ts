import * as THREE from "three";
import { Game } from "@local/classes";

function sceneFromJSON(json: Game.Formats.Scene): Game.Scene {
    let background: THREE.Color | THREE.Texture | null = null;
    const bgIsColor = typeof json.object.background === "number";
    const bgIsTexture = typeof json.object.background === "string";

    if (bgIsColor) {
        const color = json.object.background as THREE.ColorRepresentation;
        background = new THREE.Color(color);
    }

    if (bgIsTexture) {
        const texture = json.textures?.find(
            texture => texture.uuid === json.object.background
        );
        const image = json.images?.find(image => image.uuid === texture?.image);

        if (texture && image) {
            background = Game.Utils.texture.fromJSON(texture, image.url);
        }
    }

    let environment: THREE.Texture | null = null;
    const envIsTexture = typeof json.object.environment === "string";

    if (envIsTexture) {
        const texture = json.textures?.find(
            texture => texture.uuid === json.object.environment
        );
        const image = json.images?.find(image => image.uuid === texture?.image);

        if (texture && image) {
            environment = Game.Utils.texture.fromJSON(texture, image.url);
        }
    }

    let fog: THREE.FogBase | null = null;
    if (json.object.fog) {
        if (json.object.fog.type === "Fog") {
            const { color, near, far } = json.object.fog;
            fog = new THREE.Fog(color, near, far);
        } else if (json.object.fog.type === "FogExp2") {
            const { color, density } = json.object.fog;
            fog = new THREE.FogExp2(color, density);
        }
    }

    const scene = new Game.Scene({
        id: json.object.id,
        uuid: json.object.uuid,
        name: json.object.name,
        background,
        environment,
        fog,
        physics: Game.Utils.physics.fromJSON(json.object.physics),
    });

    const meta = Game.Utils.meta.fromJSON(json);

    for (const objectJSON of json.object.children) {
        switch (objectJSON.type) {
            case "Mesh":
                const meshJSON = objectJSON as Game.Formats.Mesh;
                const mesh = Game.Utils.mesh.fromJSON(meshJSON, meta);
                scene.add(mesh);
                break;

            default:
                break;
        }
    }

    return scene;
}

export default sceneFromJSON;