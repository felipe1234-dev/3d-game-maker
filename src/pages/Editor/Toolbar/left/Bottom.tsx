import { Box, Tooltip, Button } from "@mui/material";
import { Terrain as TerrainIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

function Bottom() {
    const location = useLocation();

    return (
        <Box>
            <Tooltip title="Edit scene" placement="right" arrow>
                <span>
                    <Button 
                        component={Link}
                        aria-label="Edit scene" 
                        startIcon={<TerrainIcon />}
                        to="/editor/scene/"
                        state={{
                            background: location,
                            useLoader: false
                        }}
                    >
                        Edit scene
                    </Button>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Bottom;