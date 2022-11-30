import React from "react";

import { useEditor } from "@local/contexts";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

import objectList from "@local/consts/editor/objects/list";
import objectFields from "@local/consts/editor/objects/fields";

function EditObjectModal() {
    const { editor } = useEditor();
    const transformer = editor?.transformControls;
    const object = transformer?.object;
    const objectInfo = objectList.find(
        obj => object instanceof obj.Constructor
    );

    const header = `${t(objectInfo?.label || "Edit object")} ${object?.name || ""}`;

    const body = (object && transformer) && (<>
        {(objectInfo?.attributes || []).map((attr, i) => {
            const field = objectFields.find(
                field => field.key === attr
            );

            if (!field) {
                return <></>;
            }

            const { Component, ...props } = field;

            return (
                <React.Fragment key={`${field.key}-${i}-${object.uuid}`}>
                    <Component
                        object={object}
                        onChange={() => transformer.helper?.update()}
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
            body={body}
        />
    );
}

export default EditObjectModal;