import { AppBar, Box, Toolbar } from "@mui/material";

import Project from "./Project";
import Renderer from "./Renderer";
import LangSelector from "./LangSelector";

function Menubar() {
    return (
        <AppBar className="Editor-menubar" component="header">
            <Toolbar>
                <Project />
                <Renderer />
                <Box flexGrow={1} />
                <LangSelector />
            </Toolbar>
        </AppBar>
    );
}

export default Menubar;