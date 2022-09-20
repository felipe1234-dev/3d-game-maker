import { useEffect, useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    FormGroup,
    TextField,
    Button,
} from "@mui/material";
import * as THREE from "three";

import { useEditor } from "@local/contexts";
import { useUnmount } from "@local/hooks";

import "@local/styles/fields/MultiNumberField.scss";

const axes = ["x", "y", "z"] as const;

function Body() {
    const editor = useEditor();
    const { vertexHelper, transformControls: transformer } = editor;
    const [vertices, setVertices] = useState<THREE.Mesh[]>(
        vertexHelper.vertices
    );

    const updateVertices = () => setVertices([...vertexHelper.vertices]);

    useEffect(() => {
        vertexHelper.addEventListener("addVertex", updateVertices);
        vertexHelper.addEventListener("changeVertex", updateVertices);
    }, [editor]);

    useUnmount(() => {
        vertexHelper.removeEventListener("addVertex", updateVertices);
        vertexHelper.removeEventListener("changeVertex", updateVertices);
    });

    return (
        <div>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    onClick={() => {
                        if (
                            transformer.object &&
                            transformer.object instanceof THREE.Mesh
                        ) {
                            vertexHelper.deleteVertex(transformer.object);
                        }
                    }}
                >
                    Del
                </Button>
                <Button onClick={() => vertexHelper.addVertex(0, 0, 0)}>
                    Add
                </Button>
            </Box>
            {vertices.map(vert => (
                <FormControl key={vert.uuid} className="MultiNumberField">
                    <FormLabel className="MultiNumberField-label">
                        {vert.name}
                    </FormLabel>

                    <FormGroup className="MultiNumberField-row" row>
                        {axes.map((ax, i) => (
                            <TextField
                                key={`${vert.uuid}-${ax}`}
                                label={ax}
                                className="MultiNumberField-row-input"
                                defaultValue={vert.position[ax]}
                                onChange={evt =>
                                    (vert.position[ax] = Number(
                                        evt.target.value
                                    ))
                                }
                                inputProps={{
                                    type: "number",
                                    step: 0.1,
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            ))}
        </div>
    );
}

export default Body;