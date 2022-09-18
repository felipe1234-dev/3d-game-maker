import * as THREE from "three";
import * as CANNON from "cannon-es";
import { threeToCannon } from "three-to-cannon";
import MeshBody from "./MeshBody.class";

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

                    const mesh = new THREE.Mesh(geometry);
                    const { shape } = threeToCannon(mesh) || {};
                    scope.body = new MeshBody({
                        mesh: scope,
                        shape,
                        collisionFilterGroup: scope.body.collisionFilterGroup,
                        collisionFilterMask: scope.body.collisionFilterMask,
                        collisionResponse: scope.body.collisionResponse,
                        position: scope.body.position,
                        velocity: scope.body.velocity,
                        mass: scope.body.mass,
                        material: scope.body.material,
                        linearDamping: scope.body.linearDamping,
                        type: scope.body.type,
                        allowSleep: scope.body.allowSleep,
                        sleepSpeedLimit: scope.body.sleepSpeedLimit,
                        sleepTimeLimit: scope.body.sleepTimeLimit,
                        quaternion: scope.body.quaternion,
                        angularVelocity: scope.body.angularVelocity,
                        fixedRotation: scope.body.fixedRotation,
                        angularDamping: scope.body.angularDamping,
                        linearFactor: scope.body.linearFactor,
                        angularFactor: scope.body.angularFactor,
                        isTrigger: scope.body.isTrigger,
                    });

                    return true;
                },
            });
        }

        const { hitboxSize = 1.3 } = physics;

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

        this.scale = new Proxy(this.scale, {
            set: function (scale, axis, value) {
                scale[axis] = Number(value);

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
    }
}

export default MeshCore;