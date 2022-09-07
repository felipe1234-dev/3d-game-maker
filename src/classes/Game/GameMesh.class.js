import * as THREE from "three";

class GameMesh extends THREE.Mesh {
    /**
     * @param {THREE.BufferGeometry=} geometry 
     * @param {THREE.Material=} material 
     */
    constructor(geometry, material) {
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
    }
}

export default GameMesh;