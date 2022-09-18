import { useState } from "react";
import { Box, TextField, Divider } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";
import { DropzoneArea } from "material-ui-dropzone";
import { Upload as UploadIcon } from "@styled-icons/bootstrap";

import * as gallery from "@local/api/collections/gallery";

import { useAlert } from "@local/contexts";
import { useMediaModal } from "../Context";

import { Alert } from "@local/interfaces";

function Upload() {
    const [loading, setLoading] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File>();

    const { folders } = useMediaModal();
    const { setMessage, setSeverity } = useAlert();

    const addMedia = () => {
        if (!file) {
            return;
        }

        setLoading(true);

        setTimeout(() => {
            gallery
                .add({
                    title,
                    description,
                    folders,
                    file,
                })
                .then(() => {
                    setSeverity("success");
                    setMessage("File added successfully");
                })
                .catch((err: Alert) => {
                    setSeverity(err.severity);
                    setMessage(err.message);
                })
                .finally(() => setLoading(false));
        }, 3000);
    };

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
            />
            <Divider />
            <DropzoneArea
                onChange={files => setFile(files[0])}
                filesLimit={1}
                maxFileSize={10000000}
            />
            <Divider />
            <Button
                startIcon={<UploadIcon style={{ width: 20 }} />}
                onClick={addMedia}
                loading={loading}
            >
                Upload file
            </Button>
        </Box>
    );
}

export default Upload;