import React from "react";
import { Box, Button } from "@mui/material";
import { Terrain as TerrainIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

function Bottom() {
    const location = useLocation();

    return (
        <Box>
            <Button
                component={Link}
                aria-label="Edit scene"
                startIcon={<TerrainIcon />}
                to="scene/"
                state={{
                    background: location,
                    useLoader: false
                }}
            >
                Edit scene
            </Button>
        </Box>
    );
}

export default Bottom;