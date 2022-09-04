import { useContext } from "react";
import { Tooltip, IconButton } from "@mui/material";
import { Selection } from "@styled-icons/boxicons-regular";
import { Eraser, Brush } from "@styled-icons/entypo";
import { ColorPicker } from "@styled-icons/evaicons-solid";

import { t } from "@local/i18n";
import { CursorContext } from "../contexts";

function LeftToolbar() {
    const { mode, setMode } = useContext(CursorContext);

    return (
        <aside className="GraphicsEditor-toolbar">
            <Tooltip title={t("Paint")} placement="right" arrow>
                <span>
                    <IconButton onClick={() => setMode("Paint")}>
                        <Brush width={25} />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Erase")} placement="right" arrow>
                <span>
                    <IconButton onClick={() => setMode("Erase")}>
                        <Eraser width={25} />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Color picker")} placement="right" arrow>
                <span>
                    <IconButton onClick={() => setMode("ColorPicker")}>
                        <ColorPicker width={25} />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Fill")} placement="right" arrow>
                <span>
                    <IconButton onClick={() => setMode("Fill")}>
                        <ColorPicker width={25} />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title={t("Select area")} placement="right" arrow>
                <span>
                    <IconButton onClick={() => setMode("Selection")}>
                        <Selection width={25} />
                    </IconButton>
                </span>
            </Tooltip>
        </aside>
    );
}

export default LeftToolbar;