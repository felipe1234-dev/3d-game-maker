import * as THREE from "three";
import * as CANNON from "cannon-es";
import { threeToCannon } from "three-to-cannon";
import MeshBody from "./MeshBody.class";

/**
 * @implements {GameObject}
 */
class MeshCore extends THREE.Mesh {
    /**
     * @param {THREE.BufferGeometry=} geometry
     * @param {THREE.Material=} material
     * @param {{
     *     hitboxSize?: number;
     * }=} physics
     */
    constructor(geometry, material, physics = {}) {
        super(geometry, material);

        /**
         * @type {THREE.BoxHelper}
         */
        this.helper = new THREE.BoxHelper(this);

        /**
         * @type {GameObject[]}
         */
        this.children = [];

        const scope = this;

        if (geometry) {
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

        const result = threeToCannon(this) || {};
        const { shape } = result;

        const { x: px, y: py, z: pz } = this.position;
        const { x: qx, y: qy, z: qz, w } = this.quaternion;

        /**
         * @type {MeshBody}
         * @public
         */
        this.body = new MeshBody({
            mesh: this,
            position: new CANNON.Vec3(px, py, pz),
            quaternion: new CANNON.Quaternion(qx, qy, qz, w),
            shape,
        });

        this.position = new Proxy(this.position, {
            set: function (position, axis, value) {
                position[axis] = Number(value);

                const { x, y, z } = position;
                scope.body.position.copy(new CANNON.Vec3(x, y, z));

                return true;
            },
        });

        this.rotation = new Proxy(this.rotation, {
            set: function (rotation, axis, value) {
                rotation[axis] = Number(value);
                rotation._onChangeCallback();

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
     * @override
     * @returns {any}
     */
    toJSON(meta) {
        const json = super.toJSON(meta);

        json.bodies = [];
        json.bodies.push(this.body.toJSON());
        json.object.body = this.body.uuid;

        return json;
    }
}

export default MeshCore;