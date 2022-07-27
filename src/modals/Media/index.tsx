import React from "react";
import { Modal } from "@local/components";
import Body from "./Body";

interface MediaModalProps {
    title: string,
    onClose: () => void,
    folders: Array<string>
}

function MediaModal(props: MediaModalProps) {
    const { title, onClose, folders } = props;
    
    return (
        <Modal
            width={600}
            height={600}
            onClose={onClose}

            header={title}
            body={<Body />}

            draggable
        />
    );
}

export default MediaModal;