import { AppBar, Box, Toolbar } from "@mui/material";

import EditItem from "./EditItem";
import Project from "./Project";
import LangSelector from "./LangSelector";

function Menubar() {
    return (
        <AppBar className="Editor-menubar" component="header">
            <Toolbar>
                <EditItem />
                <Project />
                <Box flexGrow={1} />
                <LangSelector />
            </Toolbar>
        </AppBar>
    );
}

export default Menubar;