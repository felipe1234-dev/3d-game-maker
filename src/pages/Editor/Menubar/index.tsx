import { AppBar, Box, Toolbar, Divider } from "@mui/material";

import Project from "./Project";
import Renderer from "./Renderer";
import TestGame from "./TestGame";
import SaveGame from "./SaveGame";
import LangSelector from "./LangSelector";

function Menubar() {
    return (
        <AppBar className="Editor-menubar" component="header">
            <Toolbar>
                <Project />
                <Renderer />
                <Box flexGrow={1} />
                <TestGame />
                <SaveGame />
                <Divider
                    orientation="vertical"
                    flexItem
                />
                <LangSelector />
            </Toolbar>
        </AppBar>
    );
}

export default Menubar;