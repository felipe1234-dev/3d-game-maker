import * as THREE from "three";
import * as CANNON from "cannon-es";
import { threeToCannon } from "three-to-cannon";
import { Game } from "@local/classes";

/**
 * @param {string} type
 * @param {number[]} array
 * @returns {
 *     Float64Array | Float32Array |
 *     Int32Array | Int16Array | Int8Array |
 *     Uint32Array | Uint16Array | Uint8Array |
 *     Uint8ClampedArray | number[]
 * }
 */
const getTypedArray = (type, array) => {
    switch (type) {
        case "Float64Array":
            return new Float64Array(array);
        case "Float32Array":
            return new Float32Array(array);

        case "Int32Array":
            return new Int32Array(array);
        case "Int16Array":
            return new Int16Array(array);
        case "Int8Array":
            return new Int8Array(array);

        case "Uint32Array":
            return new Uint32Array(array);
        case "Uint16Array":
            return new Uint16Array(array);
        case "Uint8Array":
            return new Uint8Array(array);

        case "Uint8ClampedArray":
            return new Uint8ClampedArray(array);

        default:
            return array;
    }
};

/**
 * @param {Game.AttributeFormat} attribute
 * @returns {THREE.BufferAttribute}
 */
const bufferAttributeFromJSON = attribute => {
    const bufferAttribute = new THREE.BufferAttribute(
        getTypedArray(attribute.type, attribute.array),
        attribute.itemSize,
        attribute.normalized
    );

    bufferAttribute.name = attribute.name || "";

    if (attribute.usage !== undefined) bufferAttribute.usage = attribute.usage;
    if (attribute.updateRange)
        bufferAttribute.updateRange = attribute.updateRange;

    return bufferAttribute;
};

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

        this.id = Game.generateID();

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
        const { shape: defaultShape } = result;

        if (!body) {
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
                shape: defaultShape,
            });
        } else {
            body.mesh = this;
            if (body.shapes.length === 0 && defaultShape)
                body.addShape(defaultShape);

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
     * @param {Game.MetaFormat=} meta
     * @returns {Game.MeshFormat}
     */
    toJSON(meta) {
        const json = super.toJSON(meta);
        const isRootObject = !meta;

        if (!isRootObject) {
            json.bodies = [];
            json.bodies.push(this.body.toJSON(meta));
        } else {
            if (!meta.bodies) meta.bodies = {};
            meta.bodies[this.body.uuid] = this.body.toJSON(meta);
        }

        json.object.body = this.body.uuid;

        return json;
    }

    /**
     * @public
     * @param {Game.MeshFormat} json
     * @param {Game.MetaFormat=} meta
     * @returns {Game.Mesh}
     */
    static fromJSON(json, meta) {
        /**
         * @type {THREE.BufferGeometry=}
         */
        let geometry = undefined;
        /**
         * @type {THREE.Material=}
         */
        let material = undefined;
        /**
         * @type {Game.Body=}
         */
        let body = undefined;

        const geometries = meta?.geometries || {};
        const materials = meta?.materials || {};
        const bodies = meta?.bodies || {};

        const geometryUid = json.geometry || "";
        const materialUid = json.material || "";
        const bodyUid = json.body || "";

        if (geometries[geometryUid]) {
            const geomJSON = geometries[geometryUid];

            geometry = THREE[geomJSON.type].fromJSON(geomJSON);

            geometry.id = geomJSON.id;
            geometry.uuid = geomJSON.uuid;
            geometry.name = geomJSON.name || "";

            const data = geomJSON.data;

            if (data.index) {
                geometry.setIndex(data.index.array);
            }

            if (data.attributes) {
                const attributes = Object.entries(data.attributes);

                for (const [name, attributeJSON] of attributes) {
                    geometry.setAttribute(
                        name,
                        bufferAttributeFromJSON(attributeJSON)
                    );
                }
            }

            if (data.morphAttributes) {
                const morphAttributes = Object.entries(data.morphAttributes);
                /**
                 * @type {{
                 *     [name: string]: THREE.BufferAttribute[]
                 * }}
                 */
                const newMorphAttributes = {};

                for (const [name, list] of morphAttributes) {
                    newMorphAttributes[name] = list.map(attributeJSON =>
                        bufferAttributeFromJSON(attributeJSON)
                    );
                }

                geometry.morphAttributes = newMorphAttributes;
                if (data.morphTargetsRelative !== undefined)
                    geometry.morphTargetsRelative = data.morphTargetsRelative;
            }

            if (data.groups?.length > 0) {
                geometry.groups = JSON.parse(JSON.stringify(data.groups));
            }

            if (data.boundingSphere) {
                const sphereJSON = data.boundingSphere;
                const center = sphereJSON.center;
                const [x, y, z] = center;
                const radius = sphereJSON.radius;

                geometry.boundingSphere = new THREE.Sphere(
                    new THREE.Vector3(x, y, z),
                    radius
                );
            }
        }

        if (materials[materialUid]) {
            const matJSON = materials[materialUid];

            material = THREE[matJSON.type].fromJSON(matJSON);

            material.id = matJSON.id;
            material.uuid = matJSON.uuid;
            material.name = matJSON.name || "";
        }

        if (bodies[bodyUid]) {
            const bodyJSON = bodies[bodyUid];

            body = Game.Body.fromJSON(bodyJSON);
        }

        return new Game.Mesh(geometry, material, body);
    }
}

export default Mesh;