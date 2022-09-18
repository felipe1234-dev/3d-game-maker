import { useContext, useEffect } from "react";
import * as THREE from "three";
import { Modal } from "@local/components";
import { t } from "@local/i18n";
import { useUnmount } from "@local/hooks";
import { EditorContext } from "@local/contexts";
import Body from "./Body";

function EditVerticesModal() {
    const editor = useContext(EditorContext);

    useEffect(() => {
        const { object } = editor?.transformControls || {};
        if (!editor || !object || !(object instanceof THREE.Mesh)) return;
        editor.vertexHelper.select(object);
    }, []);

    useUnmount(() => {
        if (!editor) return;
        editor.vertexHelper.unselect();
    });

    return (
        <Modal
            placement="center-left"
            header={t("Vertex editor")}
            body={<Body />}
            height={500}
            width={400}
            disableBackdrop
            draggable
        />
    );
}

export default EditVerticesModal;