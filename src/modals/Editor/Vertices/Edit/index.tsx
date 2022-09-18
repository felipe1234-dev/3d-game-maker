import { useEffect } from "react";
import * as THREE from "three";

import { Modal } from "@local/components";
import { useUnmount } from "@local/hooks";
import { useEditor } from "@local/contexts";
import { t } from "@local/i18n";

import Body from "./Body";

function EditVerticesModal() {
    const editor = useEditor();

    useEffect(() => {
        const { object } = editor.transformControls || {};
        if (!object || !(object instanceof THREE.Mesh)) return;
        editor.vertexHelper.select(object);
    }, []);

    useUnmount(() => {
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