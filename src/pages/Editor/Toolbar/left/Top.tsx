import { useContext, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { GridOn, GridOff } from "@styled-icons/material";
import { EditorContext } from "@local/contexts";
import { t } from "@local/i18n";

function Top() {
    const editor = useContext(EditorContext);

    const [showGrids, setShowGrids] = useState<boolean>(Boolean(editor?.showGrids));

    const toggleGrids = () => {
        if (!editor) {
            return;
        } 
        
        setShowGrids(!editor.showGrids);
        editor.showGrids = !editor.showGrids;
    }

    const buttonSize = "1.3em";

    return (
        <Box>
            <Tooltip    
                title={t(
                    showGrids 
                        ? "Show grids" 
                        : "Hide grids"
                )} 
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