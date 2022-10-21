import { Game } from "@local/classes";
import * as THREE from "three";

interface TextureOptions extends Omit<
    Game.Formats.Texture,
    "image" | "repeat" | "wrap" | "offset" | "center"
> {
    image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    repeat?: THREE.Vector2;
    wrapS?: THREE.Wrapping;
    wrapT?: THREE.Wrapping;
    offset?: THREE.Vector2;
    center?: THREE.Vector2;
}

class Texture extends THREE.Texture implements Game.Texture {
    constructor(options?: TextureOptions) {
        const {
            // Params
            image,
            mapping,
            wrapS,
            wrapT,
            magFilter,
            minFilter,
            format,
            type,
            anisotropy,
            encoding,

            // To be applied after constructor
            uuid = THREE.MathUtils.generateUUID(),
            name = "",
            repeat,
            offset,
            center,
            rotation,
            flipY,
            premultiplyAlpha,
            unpackAlignment,
            userData
        } = options || {};

        super(
            image,
            mapping,
            wrapS,
            wrapT,
            magFilter,
            minFilter,
            format,
            type,
            anisotropy,
            encoding
        );

        this.uuid = uuid;
        this.name = name;

        if (repeat) this.repeat = repeat;
        if (offset) this.offset = offset;
        if (center) this.center = center;
        if (rotation) this.rotation = rotation;
        if (flipY) this.flipY = flipY;
        if (premultiplyAlpha) this.premultiplyAlpha = premultiplyAlpha;
        if (unpackAlignment) this.unpackAlignment = unpackAlignment;

        if (userData instanceof Object)
            this.userData = userData;
    }

    public static fromURL(
        url: string,
        params?: Omit<TextureOptions, "image">
    ): Promise<Texture> {
        return new Promise<Texture>((resolve, reject) => {
            const loader = new THREE.TextureLoader();

            loader.load(
                url,
                (texture) => {
                    const mockTexture = new Texture(params);
                    mockTexture.source = texture.source;

                    resolve(mockTexture);
                },
                undefined,
                (err) => reject(err)
            );
        });
    }

    public setURL(url: string | null): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!url) {
                this.source = new THREE.Source(url);
                return resolve();
            }

            const loader = new THREE.TextureLoader();

            loader.load(
                url,
                (texture) => {
                    this.source = texture.source;
                    resolve();
                },
                undefined,
                (err) => reject(err)
            );
        });
    }

    public override toJSON(meta?: Game.Formats.Meta): Game.Formats.Texture {
        return super.toJSON(meta);
    }

    public static async fromJSON(
        json: Game.Formats.Texture,
        meta?: Game.Formats.Meta
    ): Promise<Texture> {
        let texture: Game.Texture;

        const {
            image: imgUuid = "",
            repeat = [1, 1],
            wrap = [THREE.ClampToEdgeWrapping, THREE.ClampToEdgeWrapping],
            offset = [0, 0],
            center = [0, 0],
            ...restJson
        } = json;

        const [wrapS, wrapT] = wrap;
        const [rx, ry] = repeat;
        const [cx, cy] = center;
        const [ox, oy] = offset;
        const params = {
            ...restJson,
            repeat: new THREE.Vector2(rx, ry),
            wrapS,
            wrapT,
            offset: new THREE.Vector2(ox, oy),
            center: new THREE.Vector2(cx, cy),
        };

        const newMeta = {
            images: {},
            ...meta,
        };

        const { images } = newMeta;
        const srcJSON = images[imgUuid]

        if (srcJSON) {
            texture = await Texture.fromURL(srcJSON.url, params);
        } else {
            texture = new Texture(params);
        }

        return texture;
    }
}

export default Texture;
export type { TextureOptions };