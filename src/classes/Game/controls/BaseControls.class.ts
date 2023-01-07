import { Game } from "@local/classes";
import { generateID, metaToMetaAsArray } from "../utils";
import * as THREE from "three";

class BaseControls extends THREE.EventDispatcher implements Game.Controls {
    public id: number;
    public uuid: string;
    public name: string;
    public readonly type: typeof Game.Libs.controls[number];

    public readonly camera: Game.Camera;
    public readonly mesh: Game.Mesh;
    public children: Game.Object3D[];

    protected constructor(
        camera: Game.Camera,
        mesh: Game.Mesh
    ) {
        super();

        this.id = generateID();
        this.uuid = Game.MathUtils.generateUUID();
        this.name = "BaseControls";
        this.type = "BaseControls";

        this.camera = camera;
        this.mesh = mesh;
        this.children = [mesh, camera];
    }

    public connect(): void { }

    public disconnect(): void { }

    public update(delta: number): void { }

    public toJSON(): Game.Formats.Controls {
        return {
            id: this.id,
            uuid: this.uuid,
            type: this.type,
            name: this.name,
            camera: this.camera.uuid,
            mesh: this.mesh.uuid
        };
    }

    public static fromJSON(
        json: Game.Formats.BaseControls,
        meta: Game.Formats.Meta & {
            objects: {
                [uuid: string]: Game.Formats.Object3D["object"]
            }
        }
    ): BaseControls | undefined {
        const cameraUid = json.camera;
        const cameraJson = {
            ...metaToMetaAsArray(meta),
            object: meta.objects[cameraUid]
        };
        let camera: Game.Camera | undefined = undefined;

        for (const type of Game.Libs.cameras) {
            if (Game.Formats[`is${type}`](cameraJson)) {
                // @ts-ignore
                camera = Game[type].fromJSON(cameraJson);
            }
        }

        if (!camera) return undefined;

        const meshUid = json.mesh;
        const meshJson = {
            ...metaToMetaAsArray(meta),
            object: meta.objects[meshUid]
        };
        let mesh: Game.Mesh | undefined = undefined;

        if (Game.Formats.isMesh(meshJson)) {
            mesh = Game.Mesh.fromJSON(meshJson);
        }

        if (!mesh) return undefined;

        return new BaseControls(camera, mesh);
    }

    public add(...objects: Game.Object3D[]): void {
        for (const object of objects) {
            const alreadyAddedObjects = this.children.map(child => child.uuid);
            const isAlreadyAdded = alreadyAddedObjects.includes(object.uuid);

            if (isAlreadyAdded) continue;

            this.children.push(object);
        }
    }

    public remove(...objects: Game.Object3D[]): void {
        for (const object of objects) {
            this.children = this.children.filter(child => child.uuid !== object.uuid);
        }
    }
}

export default BaseControls;