import { useEditor } from "@local/contexts";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

import objectList from "@local/consts/editor/objects/list";
import objectFields from "@local/consts/editor/objects/fields";

function EditObjectModal() {
    const { editor } = useEditor();
    const object = editor?.transformControls.object;
    const objectInfo = objectList.find(
        obj => object instanceof obj.Constructor
    );

    const header = `${t(objectInfo?.label || "Edit object")} ${object?.name || ""}`;

    const body = (
        <>
            {(objectInfo?.attributes || []).map((attr, i) => {
                const field = objectFields.find(
                    field => field.key === attr
                );

                if (!field) {
                    return <></>;
                }

                const { Component: Field, ...props } = field;

                return (
                    <Field
                        scope="object"
                        {...props}
                    />
                );
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

export default EditObjectModal;