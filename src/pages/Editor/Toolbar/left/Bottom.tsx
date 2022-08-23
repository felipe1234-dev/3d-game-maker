import { Box, Button, IconButton } from "@mui/material";
import { Terrain as TerrainIcon } from "@mui/icons-material";
import { Tree as TreeIcon } from "@styled-icons/entypo";
import { CubeAlt } from "@styled-icons/boxicons-regular";
import { Link, useLocation } from "react-router-dom";
import { t } from "@local/i18n";

function Bottom() {
    const location = useLocation();

    return (
        <Box>
            <Button
                component={Link}
                startIcon={<CubeAlt width={25} />}
                to="object/add"
                state={{
                    background: location,
                    useLoader: false
                }}
            >
                {t("Add objects")}
            </Button>
            <Button
                component={Link}
                startIcon={<TerrainIcon />}
                to="scene/edit"
                state={{
                    background: location,
                    useLoader: false
                }}
            >
                {t("Edit scene")}
            </Button>
            <Button
                component={Link}
                startIcon={<TreeIcon width={25} />}
                to="scene-tree/edit"
                state={{
                    background: location,
                    useLoader: false
                }}
            >
                {t("Scene tree")}
            </Button>
        </Box>
    );
}

export default Bottom;