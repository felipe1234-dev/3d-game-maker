import React from "react";
import { Modal } from "@local/components";

interface MediaModalProps {
    title: string,
    onClose: () => void,
    folders: Array<string>
}

function MediaModal(props: MediaModalProps) {
    const { title, onClose, folders } = props;

    return (
        <Modal
            header={title}
            width={600}
            height={600}
            onClose={onClose}
            draggable
        />
    );
}

export default MediaModal;