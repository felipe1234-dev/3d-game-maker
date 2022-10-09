import { threeToCannon } from "three-to-cannon";
import { Game } from "@local/classes";
import {
    generateID,
    parseObjectChildren,
    applyObject3DJSON
} from "../utils/private";
import * as THREE from "three";
import * as CANNON from "cannon-es";

/**
 * @implements {Game.Object3D}
 */
class Mesh extends THREE.Mesh {
    /**
     * @param {THREE.BufferGeometry=} geometry
     * @param {THREE.Material=} material
     * @param {Game.Body=} body
     */
    constructor(geometry, material, body) {
        super(geometry, material);

        this.id = generateID();

        /**
         * @type {THREE.BoxHelper}
         */
        this.helper = new THREE.BoxHelper(this);

        /**
         * @type {Game.Object3D[]}
         */
        this.children = [];

        const scope = this;

        if (geometry && geometry.parameters) {
            geometry.parameters = new Proxy(geometry.parameters, {
                set: function (parameters, param, value) {
                    const oldParameters = parameters;
                    const newParameters = {
                        ...oldParameters,
                        [param]: value,
                    };

                    const args = [];

                    Object.entries(newParameters).forEach(([key, value]) => {
                        args.push(value);
                        parameters[key] = value;
                    });

                    const newGeometry = new THREE[geometry.type](...args);

                    Object.keys(geometry).forEach(key => {
                        if (["uuid", "id", "parameters"].includes(key)) {
                            return;
                        }

                        geometry[key] = newGeometry[key];
                    });

                    scope.body.needsUpdate = true;

                    return true;
                },
            });
        }

        if (body) {
            const result = threeToCannon(this) || {};
            const { shape: defaultShape } = result;

            const { x: px, y: py, z: pz } = this.position;
            const { x: qx, y: qy, z: qz, w } = this.quaternion;

            body.mesh = this;
            if (body.shapes.length === 0 && defaultShape)
                body.addShape(defaultShape);
            body.position.set(px, py, pz);
            body.quaternion.set(qx, qy, qz, w);

            this.body = body;
        }

        this.position = new Proxy(this.position, {
            set: function (position, axis, value) {
                position[axis] = Number(value);

                if (!scope.body) return true;

                const { x, y, z } = position;
                scope.body.position.copy(new CANNON.Vec3(x, y, z));

                return true;
            },
        });

        this.rotation = new Proxy(this.rotation, {
            set: function (rotation, axis, value) {
                rotation[axis] = Number(value);
                rotation._onChangeCallback();

                if (!scope.body) return true;

                const { x, y, z, order } = rotation;
                scope.body.quaternion.setFromEuler(x, y, z, order);

                return true;
            },
        });

        this.receiveShadow = true;
        this.castShadow = true;

        this.material.side = THREE.DoubleSide;
        this.material.needsUpdate = true;
    }

    /**
     * @param {boolean} bool
     */
    set needsUpdate(bool) {
        if (!this.body || !bool) {
            return;
        }

        const { x: px, y: py, z: pz } = this.body.position;
        this.position.copy(new THREE.Vector3(px, py, pz));

        const { x: qx, y: qy, z: qz, w } = this.body.quaternion;
        this.quaternion.copy(new THREE.Quaternion(qx, qy, qz, w));
    }

    /**
     * @public
     * @param {{
     *     geometries: {
     *         [uuid: string]: Game.Formats.Geometry
     *     };
     *     materials: {
     *         [uuid: string]: Game.Formats.Material
     *     };
     *     textures: {
     *         [uuid: string]: Game.Formats.Texture
     *     };
     *     images: {
     *         [uuid: string]: Game.Formats.Source
     *     };
     *     bodies: {
     *         [uuid: string]: Game.Formats.Body
     *     };
     * }} meta
     * @returns {Game.Formats.Mesh}
     */
    toJSON(meta) {
        const json = super.toJSON(meta);
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

    /**
     * @public
     * @param {Game.Formats.Mesh} json
     * @param {Game.Formats.Meta=} meta
     * @returns {Mesh}
     */
    static fromJSON(json, meta) {
        /**
         * @type {THREE.BufferGeometry | undefined}
         */
        let geometry = undefined;
        /**
         * @type {THREE.Material | undefined}
         */
        let material = undefined;
        /**
         * @type {Game.Body | undefined}
         */
        let body = undefined;

        const geometries = meta?.geometries || {};
        const materials = meta?.materials || {};
        const bodies = meta?.bodies || {};

        const geometryUid = json.object.geometry || "";
        const materialUid = json.object.material || "";
        const bodyUid = json.object.body || "";

        if (geometries[geometryUid]) {
            const geomJSON = geometries[geometryUid];

            geometry = Game[geomJSON.type].fromJSON(geomJSON);
        }

        if (materials[materialUid]) {
            const matJSON = materials[materialUid];

            material = Game[matJSON.type].fromJSON(matJSON);
        }

        if (bodies[bodyUid]) {
            const bodyJSON = bodies[bodyUid];

            body = Game.Body.fromJSON(bodyJSON);
        }

        const mesh = new Game.Mesh(geometry, material, body);

        mesh.id = json.id;
        mesh.uuid = json.uuid;
        mesh.name = json.name || "";

        applyObject3DJSON(mesh, json);
        parseObjectChildren(mesh, json, meta);

        return mesh;
    }
}

export default Mesh;