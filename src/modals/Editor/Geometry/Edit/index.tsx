import { useEditor } from "@local/contexts";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

import geometryList from "@local/consts/editor/geometries/list";
import geometryFields from "@local/consts/editor/geometries/fields";
import * as THREE from "three";

function EditGeometryModal() {
    const editor = useEditor();
    const object = editor?.transformControls.object || null;
    const geometryInfo = geometryList.find(
        geom =>
            object instanceof THREE.Mesh &&
            object.geometry.type === geom.Constructor.prototype.constructor.name
    );

    const header = `${t(geometryInfo?.label || "Edit geometry")} ${object?.name || ""}`;

    const body = (
        <>
            {(geometryInfo?.attributes || []).map((attr, i) => {
                const field = geometryFields.find(
                    field => field.key === attr
                );

                if (!field) {
                    return <></>;
                }

                const { Component: Field, ...props } = field;

                return <Field scope="object.geometry" {...props} />;
            })}
        </>
    );

    return (
        <Modal
            height={500}
            width={400}
            placement="bottom-left"
            draggable
            header={header}
            body={body}
        />
    );
}

export default EditGeometryModal;