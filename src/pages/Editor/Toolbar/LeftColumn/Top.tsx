import { Box, IconButton, Tooltip } from "@mui/material";
import { GridOn, GridOff } from "@styled-icons/material";

import { useEditor } from "@local/contexts";
import { useForceUpdate } from "@local/hooks";
import { t } from "@local/i18n";

function Top() {
    const editor = useEditor();
    const showGrids = editor.gridsHelper.visible;

    const { forceUpdate } = useForceUpdate();
    const toggleGrids = () => {
        editor.gridsHelper.visible = !showGrids;
        forceUpdate();
    };

    const buttonSize = "1.3em";

    return (
        <Box>
            <Tooltip
                title={t(showGrids ? "Show grids" : "Hide grids")}
                placement="right"
                arrow
            >
                <span style={{ width: "fit-content" }}>
                    <IconButton
                        onClick={toggleGrids}
                        sx={{ width: buttonSize, height: buttonSize }}
                    >
                        {showGrids ? <GridOff /> : <GridOn />}
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
}

export default Top;