import React from "react";

import { Game } from "@local/classes";
import { Modal } from "@local/components";
import { useEditor } from "@local/contexts";
import { useForceUpdate } from "@local/hooks";
import { MaterialSelector } from "@local/fields";
import { t } from "@local/i18n";

import materialList from "@local/consts/editor/materials/list";
import materialFields from "@local/consts/editor/materials/fields";

function EditTextureModal() {
    const { forceUpdate } = useForceUpdate();
    const { editor } = useEditor();

    const transformer = editor?.transformControls;
    const object = transformer?.object instanceof Game.Mesh ? transformer.object : undefined;
    const material = Game.isMaterial(object?.material) ? object?.material : undefined;
    const materialInfo = materialList.find(
        mat => material instanceof mat.Constructor
    );

    const handleUpdateMaterial = () => {
        if (!material) return;
        material.needsUpdate = true;
    };

    const header = `${t(materialInfo?.label || "Edit material")} ${object?.name || ""}`;

    const body = material && (<>
        {(materialInfo?.attributes || []).map((attr, i) => {
            const field = materialFields.find(
                field => field.key === attr
            );

            if (!field) {
                return <></>;
            }

            const { Component, ...props } = field;
            const key = `${field.key}-${i}-${material.uuid}`;

            if (Component === MaterialSelector) {
                return (
                    <React.Fragment key={key}>
                        <Component
                            object={object}
                            forceUpdate={forceUpdate}
                            onChange={handleUpdateMaterial}
                            {...props}
                        />
                    </React.Fragment>
                );
            }

            return (
                <React.Fragment key={key}>
                    <Component
                        object={material}
                        forceUpdate={forceUpdate}
                        onChange={handleUpdateMaterial}
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

export default EditTextureModal;