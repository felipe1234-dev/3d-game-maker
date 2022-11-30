import React from "react";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

import bodyList from "@local/consts/editor/bodies/list";
import bodyFields from "@local/consts/editor/bodies/fields";

function EditPhysicsModal() {
    const { editor } = useEditor();

    const transformer = editor?.transformControls;
    const object = transformer?.object instanceof Game.Mesh ? transformer.object : undefined;
    const body = object?.body;
    const bodyInfo = bodyList.find(
        obj => body instanceof obj.Constructor
    );

    const header = `${t(bodyInfo?.label || "Edit physics")} ${object?.name || ""}`;

    const modalBody = body && (<>
        {(bodyInfo?.attributes || []).map((attr, i) => {
            const field = bodyFields.find(
                field => field.key === attr
            );

            if (!field) {
                return <></>;
            }

            const { Component, ...props } = field;

            return (
                <React.Fragment key={`${field.key}-${i}-${body.uuid}`}>
                    <Component
                        object={body}
                        {...props}
                    />
                </React.Fragment>
            );
        })}
    </>);

    return (
        <Modal
            draggable
            height={500}
            width={400}
            placement="bottom-left"
            header={header}
            body={modalBody}
        />
    );
}

export default EditPhysicsModal;