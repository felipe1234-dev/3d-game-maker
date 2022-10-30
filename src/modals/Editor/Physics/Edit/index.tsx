import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

import bodyList from "@local/consts/editor/bodies/list";
import bodyFields from "@local/consts/editor/bodies/fields";

function EditPhysicsModal() {
    const editor = useEditor();
    const object = editor.transformControls.object;
    const bodyInfo = bodyList.find(
        obj =>
            object instanceof Game.Mesh &&
            object.body instanceof obj.Constructor
    );

    const header = `${t(bodyInfo?.label || "Edit physics")} ${object?.name || ""}`;

    const body = (
        <>
            {(bodyInfo?.attributes || []).map((attr, i) => {
                const field = bodyFields.find(
                    field => field.key === attr
                );

                if (!field) {
                    return <></>;
                }

                const { Component: Field, ...props } = field;

                return <Field scope="object.body" {...props} />;
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

export default EditPhysicsModal;