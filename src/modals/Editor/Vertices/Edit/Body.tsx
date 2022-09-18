import { useEffect, useState } from "react";
import * as THREE from "three";

import { useEditor } from "@local/contexts";
import { useUnmount } from "@local/hooks";

function Body() {
    const [vertex, setVertex] = useState<THREE.Object3D>();
    const editor = useEditor();
    const vertexList = editor.vertexHelper.vertices || [];

    const updateVertex = (evt: THREE.Event & { object?: THREE.Object3D }) => {
        setVertex(evt.object);
    };

    useEffect(() => {
        const transformer = editor.transformControls;
        transformer.addEventListener("select", updateVertex);
    }, [editor]);

    useUnmount(() => {
        const transformer = editor.transformControls;
        transformer.removeEventListener("select", updateVertex);
    });

    return (
        <div>
            {vertexList.map((vert, i) => (
                <div key={i}>
                    {vert.name} {vert.uuid === vertex?.uuid && "selected"}
                </div>
            ))}
        </div>
    );
}

export default Body;