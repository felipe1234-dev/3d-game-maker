import { useEffect } from "react";
import { Modal } from "@local/components";
import { useMediaModal, MediaModalProvider } from "./Context";
import { Media } from "@local/api/models";

import Body from "./Body";
import Footer from "./Footer";

import "@local/styles/components/MediaModal.scss";

interface MediaModalProps {
    title: string;
    onClose: () => void;
    onFinish: (selectedMedia: Media) => void;
    folders: string;
}

function Content(props: MediaModalProps) {
    const { title, onClose, onFinish, folders: newFolders } = props;
    const { setFolders } = useMediaModal();

    useEffect(() => {
        setFolders(newFolders);
    }, [newFolders]);

    return (
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
    );
}

const MediaModal = (props: MediaModalProps) => (
    <MediaModalProvider>
        <Content {...props} />
    </MediaModalProvider>
);

export default MediaModal;
export type { MediaModalProps };