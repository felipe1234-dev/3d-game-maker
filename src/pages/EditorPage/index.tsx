import { Box } from "@mui/material";
import Viewport from "./Viewport";
import "@local/styles/pages/EditorPage.scss";

function EditorPage() {
    return (
        <Box component="main" className="Editor">
            <Viewport />
        </Box>
    );
}

export default EditorPage;