import { Box, IconButton, Tooltip } from "@mui/material";
import { GridOn, GridOff } from "@styled-icons/material";
import { Planet as PlanetFilled } from "@styled-icons/ionicons-sharp";
import { Planet as PlanetOutline } from "@styled-icons/ionicons-outline";

import { useEditor } from "@local/contexts";
import { useForceUpdate } from "@local/hooks";
import { t } from "@local/i18n";

function Top() {
    const { editor } = useEditor();
    const { forceUpdate } = useForceUpdate();

    const showGrids = !!editor?.gridsHelper.visible;
    const showGravity = !!editor?.gravityHelper.visible;

    const toggleGrids = () => {
        if (!editor) return;
        editor.gridsHelper.visible = !showGrids;
        forceUpdate();
    };

    const toggleGravity = () => {
        if (!editor) return;
        editor.gravityHelper.visible = !showGravity;
        forceUpdate();
    };

    const buttonSize = "1.3em";

    return (
        <Box>
            <Tooltip
                title={t(showGrids ? "Hide grids" : "Show grids")}
                placement="right"
                arrow
            >
                <span style={{ width: "fit-content" }}>
                    <IconButton
                        onClick={toggleGrids}
                        sx={{ width: buttonSize, height: buttonSize }}
                    >
                        {showGrids ? <GridOn /> : <GridOff />}
                    </IconButton>
                </span>
            </Tooltip>

            <Tooltip
                title={t(showGravity ? "Hide gravity" : "Show gravity")}
                placement="right"
                arrow
            >
                <span style={{ width: "fit-content" }}>
                    <IconButton
                        onClick={toggleGravity}
                        sx={{ width: buttonSize, height: buttonSize }}
                    >
                        {showGravity ? <PlanetFilled /> : <PlanetOutline />}
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Top;