import * as THREE from "three";
import * as CANNON from "cannon-es";
import { threeToCannon } from "three-to-cannon";
import { Game } from "@local/classes";

/**
 * @implements {Game.Object}
 */
class Mesh extends THREE.Mesh {
    /**
     * @param {THREE.BufferGeometry=} geometry
     * @param {THREE.Material=} material
     * @param {Game.Body=} body
     */
    constructor(geometry, material, body) {
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

        if (!body) {
            const result = threeToCannon(this) || {};
            const { shape } = result;

            const { x: px, y: py, z: pz } = this.position;
            const { x: qx, y: qy, z: qz, w } = this.quaternion;

            /**
             * @type {Game.Body}
             * @public
             */
            this.body = new Game.Body({
                mesh: this,
                position: new CANNON.Vec3(px, py, pz),
                quaternion: new CANNON.Quaternion(qx, qy, qz, w),
                shape,
            });
        } else {
            body.mesh = this;
            this.body = body;
        }

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
     * @returns {Game.MeshFormat}
     */
    toJSON(meta) {
        const json = super.toJSON(meta);
        const isRootObject = !!meta;

        if (!isRootObject) {
            json.bodies = [];
            json.bodies.push(this.body.toJSON());
        } else {
            if (!meta.bodies) meta.bodies = [];
            meta.bodies.push(this.body.toJSON());
        }

        json.object.body = this.body.uuid;

        const geometry = this.geometry;
        if (!geometry || geometry.type === "BufferGeometry") {
            return json;
        }

        const geometryJSON = isRootObject
            ? { ...json.geometry }
            : { ...meta.geometries[geometry.uuid] };
        geometryJSON.data = {};

        if (geometry.index !== null) {
            const index = geometry.index;

            geometryJSON.data.index = {
                type: index.array.constructor.name,
                array: Array.prototype.slice.call(index.array),
            };
        }

        geometryJSON.data.attributes = {};
        for (const [key, attribute] of Object.entries(geometry.attributes)) {
            geometryJSON.data.attributes[key] = attribute.toJSON(
                geometryJSON.data
            );
        }

        const morphAttributes = {};
        let hasMorphAttributes = false;
        for (const [key, attributeArr] of Object.entries(
            geometry.morphAttributes
        )) {
            const array = [];

            for (const attribute in attributeArr) {
                array.push(attribute.toJSON(geometryJSON.data));
            }

            if (array.length > 0) {
                morphAttributes[key] = array;
                hasMorphAttributes = true;
            }
        }

        if (hasMorphAttributes) {
            geometryJSON.data.morphAttributes = morphAttributes;
            geometryJSON.data.morphTargetsRelative =
                geometry.morphTargetsRelative;
        }

        if (geometry.groups.length > 0) {
            geometryJSON.data.groups = JSON.parse(
                JSON.stringify(geometry.groups)
            );
        }

        if (geometry.boundingSphere !== null) {
            const boundingSphere = geometry.boundingSphere;

            geometryJSON.data.boundingSphere = {
                center: boundingSphere.center.toArray(),
                radius: boundingSphere.radius,
            };
        }

        json.geometry = geometryJSON;

        return json;
    }

    /**
     * @public
     * @param {Game.MeshFormat} json
     * @param {{
     *     geometry?: any;
     *     material?: any;
     *     body?: Game.BodyFormat;
     * }=} meta
     * @returns {Game.Mesh}
     */
    static fromJSON(json, meta) {
        let geometry = undefined;
        let material = undefined;
        let body = undefined;

        if (meta?.geometry) {
            geometry = THREE[meta.geometry.type].fromJSON(meta.geometry);
        }

        if (meta?.material) {
        }
    }
}

export default Mesh;