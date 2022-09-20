import * as THREE from "three";

import { useEditor } from "@local/contexts";
import { Modal, Helper } from "@local/components";
import { t } from "@local/i18n";

import materialList from "@local/consts/editor/materials/list";
import materialFields from "@local/consts/editor/materials/fields";

function EditTextureModal() {
    const editor = useEditor();
    const object = editor.transformControls.object || null;
    const materialInfo = materialList.find(
        mat =>
            object instanceof THREE.Mesh &&
            object.material instanceof mat.Constructor
    );

    return (
        <Modal
            draggable
            height={500}
            width={400}
            placement="bottom-left"
            header={`${t(materialInfo?.label || "Edit material")} ${
                object?.name || ""
            }`}
            body={
                <>
                    {(materialInfo?.attributes || []).map((attr, i) => {
                        const field = materialFields.find(
                            field => field.key === attr
                        );

                        if (!field) {
                            return <></>;
                        }

                        const { Component: Field, helpText, ...props } = field;

                        return (
                            <Helper
                                key={`${field.key}-${i}`}
                                text={helpText ? t(helpText) : undefined}
                                placement="right"
                                arrow
                            >
                                <Field scope="object.material" {...props} />
                            </Helper>
                        );
                    })}
                </>
            }
        />
    );
}

export default EditTextureModal;