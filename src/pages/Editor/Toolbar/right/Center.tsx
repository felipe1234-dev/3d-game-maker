import { useContext, useEffect, useState } from "react";
import { Box, IconButton, SwipeableDrawer, Tooltip } from "@mui/material";
import { ArrowIosBack } from "@styled-icons/evaicons-solid";

import { ResizableDrawer } from "@local/components";
import { EditorContext } from "@local/contexts";
import { t } from "@local/i18n";

function Center() {
    const editor = useContext(EditorContext);

    return (
        <Box>
            <ResizableDrawer
                anchor="right"
                PaperProps={{ className: "ObjectTree" }}
                defaultDrawerWidth={40}
                minDrawerWidth={35}
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
                Test
            </ResizableDrawer>
        </Box>
    );
}

export default Center;