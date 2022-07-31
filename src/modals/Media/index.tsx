import React from "react";
import { Modal } from "@local/components";
import { MediaModalContext, MediaModalProvider } from "./Context";
import { Media } from "@local/api/models";

import Body from "./Body";
import Footer from "./Footer";

import "@local/styles/modals/Media.scss";
interface MediaModalProps {
    title: string,
    onClose: () => void,
    onFinish: (selectedMedia: Media) => void,
    folders: Array<string>
}

function MediaModal(props: MediaModalProps) {
    const { 
        title, 
        onClose, 
        onFinish,
        folders: newFolders 
    } = props;
    const { setFolders } = React.useContext(MediaModalContext);

    React.useEffect(() => {
        setFolders(newFolders);
    }, [newFolders]);

    return (
        <MediaModalProvider>
            <Modal
                className="MediaModal"

                width={800}
                height={600}
                onClose={onClose}

                header={title}
                body={<Body />}
                footer={<Footer onUseMedia={onFinish} />}

                draggable
            />
        </MediaModalProvider>
    );
}

export default MediaModal;