import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { LoadingButton as Button } from "@mui/lab";

import { users } from "@local/api";
import { Media, User } from "@local/api/models";

import { useAlert } from "@local/contexts";
import { useMediaModal } from "../Context";

import { Alert } from "@local/interfaces";

interface FooterProps {
    onUseMedia: (media: Media) => void;
}

function Footer(props: FooterProps) {
    const { onUseMedia } = props;

    const { selectedMedia } = useMediaModal();
    const { setSeverity, setMessage } = useAlert();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploader, setUploader] = useState<User>();

    useEffect(() => {
        if (!selectedMedia) {
            return;
        }

        users
            .byUid(selectedMedia.createdBy)
            .then(resp => {
                setUploader(resp);
            })
            .catch((error: Alert) => {
                setSeverity(error.severity);
                setMessage(error.message);
            });
    }, [selectedMedia]);

    const withLoadingEffect = (callback: Function, ms: number) => {
        setIsLoading(true);
        setTimeout(() => {
            callback();
            setIsLoading(false);
        }, ms);
    };

    return (
        <div className="MediaModal-footer">
            <Typography variant="subtitle1" component="p">
                {selectedMedia && uploader
                    ? `${selectedMedia.title} (${selectedMedia.mimeType}) • Uploaded by ${uploader.firstName} ${uploader.lastName}`
                    : "No file selected"}
            </Typography>
            <Button
                className="MediaModal-footer-finishButton"
                onClick={() =>
                    withLoadingEffect(
                        () => (selectedMedia ? onUseMedia(selectedMedia) : {}),
                        1500
                    )
                }
                disabled={!selectedMedia}
                loading={isLoading}
            >
                Use this file
            </Button>
        </div>
    );
}

export default Footer;