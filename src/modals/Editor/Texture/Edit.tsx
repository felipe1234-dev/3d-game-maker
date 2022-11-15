import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { Modal } from "@local/components";
import { useForceUpdate } from "@local/hooks";
import { t } from "@local/i18n";

import materialList from "@local/consts/editor/materials/list";
import materialFields from "@local/consts/editor/materials/fields";

function EditTextureModal() {
    const { forceUpdate } = useForceUpdate();
    const { editor } = useEditor();

    const transformer = editor?.transformControls;
    const object = transformer?.object instanceof Game.Mesh ? transformer?.object : undefined;
    const materialInfo = materialList.find(
        mat => object?.material instanceof mat.Constructor
    );

    const header = `${t(materialInfo?.label || "Edit material")} ${object?.name || ""}`;

    const body = (
        <>
            {(materialInfo?.attributes || []).map((attr, i) => {
                const field = materialFields.find(
                    field => field.key === attr
                );

                if (!field) {
                    return <></>;
                }

                const { Component: Field, ...props } = field;

                return (
                    <Field
                        scope="object.material"
                        forceUpdate={forceUpdate}
                        {...props}
                    />
                );
            })}
        </>
    );

    return (
        <Modal
            draggable
            height={500}
            width={400}
            placement="bottom-left"
            header={header}
            body={body}
        />
    );
}

export default EditTextureModal;