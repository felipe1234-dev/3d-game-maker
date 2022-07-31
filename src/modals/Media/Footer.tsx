import React from "react";
import { Button, Typography } from "@mui/material";
import { MediaModalContext } from "./Context";
import { AlertContext, FirebaseContext } from "@local/contexts";
import * as users from "@local/api/collections/users";
import { Alert } from "@local/interfaces";
import { Media, User } from "@local/api/models";

interface FooterProps {
    onUseMedia: (media: Media) => void
}

function Footer(props: FooterProps) {
    const { onUseMedia } = props;

    const { selectedMedia } = React.useContext(MediaModalContext);
    const { db } = React.useContext(FirebaseContext);
    const { setSeverity, setMessage } = React.useContext(AlertContext);

    const [uploader, setUploader] = React.useState<User>();

    React.useEffect(() => {
        if (!selectedMedia) {
            return;
        }
        
        users.byUid(db, selectedMedia.createdBy).then(resp => {
            setUploader(resp);
        }).catch((error: Alert) => {
            setSeverity(error.severity);
            setMessage(error.message);
        });
    }, [selectedMedia]);

    return (
        <div className="MediaModal-footer">
            <Typography variant="subtitle1" component="p">
                {(selectedMedia && uploader) 
                    ? `${selectedMedia.title} (${selectedMedia.mimeType}) • Uploaded by ${uploader.firstName} ${uploader.lastName}` 
                    : "No file selected"
                } 
            </Typography>
            <Button 
                className="MediaModal-footer-finishButton" 
                onClick={() => selectedMedia ? onUseMedia(selectedMedia) : {}}
                disabled={!selectedMedia}
            >
                Use this file
            </Button>
        </div>
    );
}

export default Footer;