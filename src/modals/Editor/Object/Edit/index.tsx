import { useEditor } from "@local/contexts";
import { Modal, Helper } from "@local/components";
import { t } from "@local/i18n";

import objectList from "@local/consts/editor/objects/list";
import objectFields from "@local/consts/editor/objects/fields";

function EditObjectModal() {
    const editor = useEditor();
    const object = editor.transformControls.object || null;
    const objectInfo = objectList.find(
        obj => object instanceof obj.Constructor
    );

    return (
        <Modal
            height={500}
            width={400}
            placement="bottom-left"
            draggable
            header={`${t(objectInfo?.label || "Edit object")} ${
                object?.name || ""
            }`}
            body={
                <>
                    {(objectInfo?.attributes || []).map((attr, i) => {
                        const field = objectFields.find(
                            field => field.key === attr
                        );

                        if (!field) {
                            return <></>;
                        }

                        const { Component: Field, helpText, ...props } = field;

                        return (
                            <Helper
                                key={i}
                                text={helpText ? t(helpText) : helpText}
                                placement="right"
                                arrow
                            >
                                <Field scope="object" {...props} />
                            </Helper>
                        );
                    })}
                </>
            }
        />
    );
}

export default EditObjectModal;