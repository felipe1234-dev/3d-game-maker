import { useState } from "react";
import { Box, Tabs, Tab, TextField, Divider } from "@mui/material";

import Library from "./Library";
import Upload from "./Upload";

import { useMediaModal } from "../Context";

function Body() {
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState(1);
    const { folders } = useMediaModal();

    return (
        <>
            <TextField
                placeholder={`Search in "${folders}"`}
                onChange={evt => setSearch(evt.target.value)}
                defaultValue={search}
            />
            <Divider />
            <Tabs
                value={tab}
                onChange={(evt, newTab) => setTab(Number(newTab))}
            >
                <Tab label="Upload files" />
                <Tab label="Media library" />
            </Tabs>
            <Divider />
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