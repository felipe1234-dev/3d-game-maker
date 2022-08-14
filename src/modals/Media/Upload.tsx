import React from "react";
import { Box, TextField } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import { DropzoneArea } from "material-ui-dropzone";

import * as gallery from "@local/api/collections/gallery";

import { AlertContext } from "@local/contexts";
import { MediaModalContext } from "./Context";

import { Alert } from "@local/interfaces";

function Upload() {
    const [loading, setLoading] = React.useState<boolean>(false);

    const [title, setTitle] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [file, setFile] = React.useState<File>();

    const { folders } = React.useContext(MediaModalContext);
    const { setMessage, setSeverity } = React.useContext(AlertContext);

    const addMedia = () => {
        if (!file) {
            return;
        }

        setLoading(true);

        setTimeout(() => {
            gallery.add({
                title, 
                description,
                folders,
                file
            }).then(() => {
                setSeverity("success");
                setMessage("File added successfully");
            }).catch((err: Alert) => {
                setSeverity(err.severity);
                setMessage(err.message);
            }).finally(() => (
                setLoading(false)
            ));
        }, 3000);
    }

    return (
        <Box className="MediaModal-upload">
            <TextField
                variant="outlined"
                label="Title"
                value={title}
                onChange={evt => setTitle(evt.target.value)}
            />
            <TextField
                variant="outlined"
                label="Description"
                value={description}
                onChange={evt => setDescription(evt.target.value)}
                sx={{ marginBottom: 10 }}
            />
            <DropzoneArea
                onChange={files => setFile(files[0])}
                filesLimit={1}
            />
            <Button onClick={addMedia} loading={loading}>
                Upload file
            </Button>
        </Box>
    );
}

export default Upload;