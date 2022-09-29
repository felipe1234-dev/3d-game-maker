import * as THREE from "three";
import { Game } from "@local/classes";

function textureFromJSON(json: Game.TextureFormat, url: string): THREE.Texture {
    const loader = new THREE.TextureLoader();
    const texture = loader.load(url);

    texture.uuid = json.uuid;
    texture.name = json.name;

    const [wrapS, wrapT] = json.wrap;
    texture.wrapS = wrapS;
    texture.wrapT = wrapT;

    texture.magFilter = json.magFilter;
    texture.minFilter = json.minFilter;

    texture.format = json.format;
    texture.type = json.type;
    texture.encoding = json.encoding;
    texture.anisotropy = json.anisotropy;
    texture.mapping = json.mapping;

    const [rx, ry] = json.repeat;
    texture.repeat = new THREE.Vector2(rx, ry);

    const [ox, oy] = json.offset;
    texture.offset = new THREE.Vector2(ox, oy);

    const [cx, cy] = json.center;
    texture.center = new THREE.Vector2(cx, cy);

    texture.rotation = json.rotation;
    texture.flipY = json.flipY;

    texture.premultiplyAlpha = json.premultiplyAlpha;
    texture.unpackAlignment = json.unpackAlignment;

    texture.userData = json.userData;
    texture.needsUpdate = true;

    return texture;
}

export default textureFromJSON;