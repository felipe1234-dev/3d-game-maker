import React from "react";
import { 
    Box, 
    Tabs, 
    Tab, 
    TextField
} from "@mui/material";

import Library from "./Library";
import Upload from "./Upload";

import { MediaModalContext } from "../Context";

function Body() {
    const [search, setSearch] = React.useState<string>("");
    const [tab, setTab] = React.useState<number>(1);
    const { folders } = React.useContext(MediaModalContext);

    return (
        <>
            <TextField
                placeholder={`Search in "${folders}"`}
                onChange={evt => setSearch(evt.target.value)}
                defaultValue={search}
            />
            <Tabs
                value={tab} 
                onChange={(evt, newTab) => setTab(Number(newTab))}
            >
                <Tab label="Upload files" />
                <Tab label="Media library" />
            </Tabs>
            <Box role="tabpanel" hidden={tab !== 0}>
                <Upload />
            </Box>
            <Box role="tabpanel" hidden={tab !== 1}>
                <Library search={search} />
            </Box>
        </>
    );
}

export default Body;