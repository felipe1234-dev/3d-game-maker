import * as THREE from "three";
import { Editor } from "@local/classes";

class VertexHelper extends THREE.Object3D {
    public editor: Editor.Core;
    public object?: THREE.Mesh;
    public vertices: THREE.Mesh[];
    public color: THREE.ColorRepresentation;

    constructor(
        color: THREE.ColorRepresentation, 
        editor: Editor.Core
    ) {
        super();
        
        this.editor = editor;
        this.vertices = [];
        this.color = color;
    }

    protected updateObjectGeometry(): void {
        if (!this.object)
            return;

        const points = [];
        
        for (const vertex of this.vertices) {
            points.push(vertex.position);
        }

        this.object.geometry.setFromPoints(points);
        this.object.geometry.computeBoundingBox();
        this.object.geometry.computeBoundingSphere();
        this.object.geometry.computeTangents();
        this.object.geometry.computeVertexNormals();
    }

    public select(object: THREE.Mesh): this {
        this.object = object;
        this.visible = true;

        // Create vertex helpers
        const posAttrs = object.geometry.attributes.position;
        const positions = posAttrs.array;
        const { count, itemSize } = posAttrs;
        const vertices = [];

        for (let i = 0; i < count*itemSize; i += itemSize) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];

            const geometry = new THREE.SphereGeometry(0.05);
            const material = new THREE.MeshBasicMaterial({ color: this.color });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.name = `${object.name || "No name"}/Vertex ${(i + 3)/3}`;

            sphere.position.set(x, y, z);

            const scope = this;
            sphere.position = new Proxy(sphere.position, {
                set: function(pos, ax, value) {
                    if (ax === "x" || ax === "y" || ax === "z")
                        pos[ax] = Number(value);
                    
                    scope.updateObjectGeometry();

                    return true;
                }
            });

            vertices.push(sphere);
        }

        this.vertices = vertices;
        this.add(...vertices);
        
        const transformer = this.editor.transformControls;
        const { currentScene } = this.editor.game;

        currentScene?.add(this);
        transformer.addToBlacklist(this.object);
        transformer.unselect();

        this.position.copy(this.object.position);

        this.dispatchEvent({ type: "select", object });

        return this;
    }

    public unselect(): void {
        if (!this.object) return;

        const { currentScene } = this.editor.game;
        const transformer = this.editor.transformControls;
        
        transformer.unselect();
        transformer.removeFromBlacklist(this.object);
        
        const object = this.object;
        this.object = undefined;
        this.visible = false;
        this.clear();
        this.vertices = [];
        
        currentScene?.remove(this);
        this.dispatchEvent({ type: "unselect", object });
    }
}

export default VertexHelper;