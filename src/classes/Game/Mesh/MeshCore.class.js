import * as THREE from "three";
import * as CANNON from "cannon-es";
import { threeToCannon } from "three-to-cannon";

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

        if (geometry) {
            geometry.parameters = new Proxy(geometry.parameters, {
                set: function(parameters, param, value) {
                    const oldParameters = parameters;
                    const newParameters = {
                        ...oldParameters,
                        [param]: value
                    };

                    const args = [];

                    Object.entries(newParameters).forEach(([ key, value ]) => {
                        args.push(value);
                        parameters[key] = value;
                    });

                    const newGeometry = new THREE[geometry.type](...args);

                    Object.keys(geometry).forEach((key) => {
                        if ([ "uuid", "id", "parameters" ].includes(key)) {
                            return;
                        }
                        
                        geometry[key] = newGeometry[key];
                    });

                    return true;
                }
            });
        }

        const {
            hitboxSize = 1.3
        } = physics;
        
        const result = threeToCannon(this) || {};
        const { shape } = result;
        
        const { x, y, z } = this.position;
        /**
         * @type {CANNON.Body}
         * @public
         */
        this.body = new CANNON.Body({
            position: new CANNON.Vec3(x, y, z),
            shape
        });
        
        /* const scope = this;
        this.position = new Proxy(this.position, {
            set: function(position, axis, value) {
                position[axis] = Number(value);
                
                scope.body.position.copy(position);
                scope.body.quaternion.copy(position);

                return true;
            }
        }); */

        console.log(this.body);
    }


}

export default MeshCore;