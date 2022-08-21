import { Box, Button, IconButton } from "@mui/material";
import { Terrain as TerrainIcon } from "@mui/icons-material";
import { Tree as TreeIcon } from "@styled-icons/entypo";
import { Link, useLocation } from "react-router-dom";
import { t } from "@local/i18n";

function Bottom() {
    const location = useLocation();

    return (
        <Box>
            <Box sx={{ 
                display: "flex !important",
                justifyContent: "space-between !important",
                flexDirection: "row !important"
            }}>
                <Button
                    component={Link}
                    startIcon={<TerrainIcon />}
                    to="scene/"
                    state={{
                        background: location,
                        useLoader: false
                    }}
                >
                    {t("Edit scene")}
                </Button>
                <IconButton
                    component={Link}
                    to="scene-tree/"
                    state={{
                        background: location,
                        useLoader: false
                    }}
                    sx={{ marginLeft: "8px !important" }}
                >
                    <TreeIcon style={{ width: 25 }}/>
                </IconButton>
            </Box>
        </Box>
    );
}

export default Bottom;