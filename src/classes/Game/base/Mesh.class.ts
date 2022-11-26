import { threeToCannon } from "three-to-cannon";
import { Game } from "@local/classes";
import { Body } from "../base";
import {
    generateID,
    parseObjectChildren,
    applyObject3DJSON,
    metaFromObjectJSON
} from "../utils/private";
import * as THREE from "three";
import * as CANNON from "cannon-es";

class Mesh extends THREE.Mesh implements Game.Object3D {
    public readonly type: "Mesh";
    public body: Game.Body;
    public helper: Game.Helper;

    constructor(
        geometry?: Game.Geometry,
        material?: Game.Material,
        body?: Game.Body
    ) {
        super(geometry, material);

        this.id = generateID();
        this.helper = new THREE.BoxHelper(this);
        this.type = "Mesh";

        if (!geometry) {
            geometry = new Game.BoxGeometry();
            this.geometry = geometry;
        }

        if (geometry && geometry.parameters) {
            geometry.parameters = new Proxy(geometry.parameters, {
                set: (parameters, param, value) => {
                    if (!geometry) return false;

                    const oldParameters = parameters;
                    const newParameters = {
                        ...oldParameters,
                        [param]: value,
                    };

                    const args: any[] = [];

                    Object.entries(newParameters).forEach(([key, value]) => {
                        args.push(value);
                        parameters[key] = value;
                    });

                    const newGeometry = new Game[geometry.type](...args);

                    Object.keys(geometry).forEach(key => {
                        if (["uuid", "id", "parameters"].includes(key)) {
                            return;
                        }

                        // @ts-ignore
                        geometry[key] = newGeometry[key];
                    });

                    if (this.body)
                        this.body.needsUpdate = true;

                    return true;
                },
            });
        }

        if (!material) {
            material = new Game.MeshPhysicalMaterial();
            this.material = material;
        }

        if (!body) {
            body = new Game.Body({
                type: CANNON.BODY_TYPES.STATIC
            });
            this.body = body;
        }

        const result = threeToCannon(this);
        const defaultShape = result?.shape || undefined;

        const { x: px, y: py, z: pz } = this.position;
        const { x: qx, y: qy, z: qz, w } = this.quaternion;

        body.mesh = this;
        if (body.shapes.length === 0 && defaultShape)
            body.addShape(defaultShape);
        body.position.set(px, py, pz);
        body.quaternion.set(qx, qy, qz, w);

        this.body = body;

        this.position = new Proxy(this.position, {
            set: (
                position,
                axis: "x" | "y" | "z",
                value
            ) => {
                position[axis] = Number(value);

                if (!this.body) return true;

                const { x, y, z } = position;
                this.body.position.copy(new CANNON.Vec3(x, y, z));

                return true;
            },
        });

        this.rotation = new Proxy(this.rotation, {
            set: (
                rotation,
                axis: "x" | "y" | "z",
                value
            ) => {
                rotation[axis] = Number(value);
                rotation._onChangeCallback();

                if (!this.body) return true;

                const { x, y, z, order } = rotation;
                this.body.quaternion.setFromEuler(x, y, z, order);

                return true;
            },
        });

        this.receiveShadow = true;
        this.castShadow = true;
    }

    set needsUpdate(bool: boolean) {
        if (!this.body || !bool) {
            return;
        }

        const { x: px, y: py, z: pz } = this.body.position;
        this.position.copy(new THREE.Vector3(px, py, pz));

        const { x: qx, y: qy, z: qz, w } = this.body.quaternion;
        this.quaternion.copy(new THREE.Quaternion(qx, qy, qz, w));
    }

    public override toJSON(meta?: Game.Formats.Meta): Game.Formats.Mesh {
        const json: Game.Formats.Mesh = super.toJSON(meta ? {
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            ...meta,
        } : undefined);
        const isRootObject = !meta;

        if (isRootObject && this.body) {
            json.bodies = [];
            json.bodies.push(this.body.toJSON());
        } else if (!isRootObject && this.body) {
            if (!meta.bodies) meta.bodies = {};
            meta.bodies[this.body.uuid] = this.body.toJSON();
        }

        if (this.body) json.object.body = this.body.uuid;

        return json;
    }

    public static fromJSON(json: Game.Formats.Mesh): Mesh {
        const meta = metaFromObjectJSON(json);

        let geometry: Game.Geometry | undefined = undefined;
        let material: Game.Material | undefined = undefined;
        let body: Game.Body | undefined = undefined;

        const geometries = meta.geometries || {};
        const materials = meta.materials || {};
        const bodies = meta.bodies || {};

        const geometryUuid = json.object.geometry || "";
        const materialUuid = json.object.material || "";
        const bodyUuid = json.object.body || "";

        if (geometries[geometryUuid]) {
            const geomJSON = geometries[geometryUuid];

            for (const type of Game.Libs.geometries) {
                if (Game.Formats[`is${type}`](geomJSON)) {
                    // @ts-ignore
                    geometry = Game[type].fromJSON(geomJSON, meta);
                }
            }
        }

        if (materials[materialUuid]) {
            const matJSON = materials[materialUuid];

            for (const type of Game.Libs.materials) {
                if (Game.Formats[`is${type}`](matJSON)) {
                    // @ts-ignore
                    material = Game[type].fromJSON(matJSON, meta);
                }
            }
        }

        if (bodies[bodyUuid]) {
            const bodyJSON = bodies[bodyUuid];

            body = Game.Body.fromJSON(bodyJSON);
        }

        const mesh = new Game.Mesh(geometry, material, body);

        mesh.id = json.object.id;
        mesh.uuid = json.object.uuid;
        mesh.name = json.object.name || "";

        applyObject3DJSON(mesh, json);
        parseObjectChildren(mesh, json);

        return mesh;
    }
}

export default Mesh;