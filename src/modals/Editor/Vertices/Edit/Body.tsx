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
import { useForceUpdate } from "@local/hooks";

import "@local/styles/fields/MultiNumberField.scss";

const axes = ["x", "y", "z"] as const;

function Body() {
    const { editor } = useEditor();
    const { forceUpdate } = useForceUpdate();

    const vertexHelper = editor?.vertexHelper;
    const transformer = editor?.transformControls;

    const deleteVertex = () => {
        if (
            vertexHelper &&
            transformer?.object &&
            transformer?.object instanceof THREE.Mesh
        ) {
            vertexHelper.deleteVertex(
                transformer.object
            );
        }

        forceUpdate();
    };

    const addVertex = () => {
        vertexHelper?.addVertex(0, 0, 0);
        forceUpdate();
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                }}
            >
                <Button onClick={deleteVertex}>
                    Del
                </Button>
                <Button onClick={addVertex}>
                    Add
                </Button>
            </Box>
            {(vertexHelper?.vertices || []).map(vert => (
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
                                    vert.position[ax] = Number(evt.target.value)
                                }
                                inputProps={{
                                    type: "number",
                                    step: 0.1,
                                }}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            ))}
        </>
    );
}

export default Body;