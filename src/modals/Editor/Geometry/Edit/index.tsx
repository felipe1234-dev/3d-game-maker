import { useEditor } from "@local/contexts";
import { Modal, Helper } from "@local/components";
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
            object.geometry.constructor.name ===
                geom.Constructor.prototype.constructor.name
    );

    return (
        <Modal
            height={500}
            width={400}
            placement="bottom-left"
            draggable
            header={`${t(geometryInfo?.label || "Edit geometry")} ${
                object?.name || ""
            }`}
            body={
                <>
                    {(geometryInfo?.attributes || []).map((attr, i) => {
                        const field = geometryFields.find(
                            field => field.key === attr
                        );

                        if (!field) {
                            return <></>;
                        }

                        const { Component: Field, helpText, ...props } = field;

                        return (
                            <span key={`${attr}-${i}`}>
                                <Helper
                                    text={helpText ? t(helpText) : undefined}
                                    placement="right"
                                    arrow
                                >
                                    <Field scope="object.geometry" {...props} />
                                </Helper>
                            </span>
                        );
                    })}
                </>
            }
        />
    );
}

export default EditGeometryModal;