import React from "react";
import { useParams } from "react-router-dom";

import { Modal } from "@local/components";
import { useGame } from "@local/contexts";
import { t } from "@local/i18n";

import controlList from "@local/consts/editor/controls/list";
import controlFields from "@local/consts/editor/controls/fields";

function EditControlsModal() {
    const params = useParams();
    const { controlUuid } = params;
    const { game } = useGame();

    const currentScene = game?.current.scene;
    const control = controlUuid ? currentScene?.getControlsByUuid(controlUuid) : undefined;
    const controlInfo = controlList.find(c => (
        control instanceof c.Constructor
    ));

    const header = `${t(controlInfo?.label || "Edit control")} ${control?.name || ""}`;

    const body = control && (<>
        {(controlInfo?.attributes || []).map((attr, i) => {
            const field = controlFields.find(
                field => field.key === attr
            );

            if (!field) {
                return <></>;
            }

            const { Component, ...props } = field;

            const key = `${field.key}-${i}-${control.uuid}`;
            return (
                <React.Fragment key={key}>
                    <Component object={control} {...props} />
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

export default EditControlsModal;