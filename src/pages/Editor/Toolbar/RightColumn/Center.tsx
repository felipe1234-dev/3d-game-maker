import { Box, IconButton, Tooltip } from "@mui/material";
import { ArrowIosBack } from "@styled-icons/evaicons-solid";

import { ResizableDrawer } from "@local/components";
import { t } from "@local/i18n";

import ObjectTree from "./ObjectTree";

function Center() {
    return (
        <Box>
            <ResizableDrawer
                anchor="right"
                PaperProps={{ className: "ObjectTree" }}
                defaultDrawerWidth={45}
                minDrawerWidth={45}
                Dragger={({ style, ...props }) => (
                    <Tooltip title={t("Object tree")} placement="left" arrow>
                        <span className="ObjectTree-dragger" style={style}>
                            <IconButton {...props}>
                                <ArrowIosBack width={25} />
                            </IconButton>
                        </span>
                    </Tooltip>
                )}
            >
                <ObjectTree />
            </ResizableDrawer>
        </Box>
    );
}

export default Center;