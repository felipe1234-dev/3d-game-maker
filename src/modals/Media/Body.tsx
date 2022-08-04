import React from "react";
import { 
    Box, 
    Tabs, 
    Tab, 
    TextField,
    Typography
} from "@mui/material";

import Library from "./Library";
import Upload from "./Upload";

import { MediaModalContext } from "./Context";

function Body() {
    const [tab, setTab] = React.useState<number>(1);
    const { 
        folders, 
        search, 
        setSearch,
        mediaList
    } = React.useContext(MediaModalContext);
    const path = folders.join("/");

    return (
        <>
            <TextField
                placeholder={`Search in "${path}/"`}
                onChange={evt => setSearch(evt.target.value)}
                value={search}
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
                {mediaList.length > 0 ? (
                    <Library />
                ) : ( 
                    <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        paddingTop: "20%"
                    }}>
                        <Typography variant="h6">
                            No files correspond to "{search}"
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    );
}

export default Body;