import React from "react";

import { Game } from "@local/classes";
import { useEditor } from "@local/contexts";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

import geometryList from "@local/consts/editor/geometries/list";
import geometryFields from "@local/consts/editor/geometries/fields";

function EditGeometryModal() {
    const { editor } = useEditor();

    const transformer = editor?.transformControls;
    const object = transformer?.object instanceof Game.Mesh ? transformer.object : undefined;
    const geometry = object?.geometry;
    const geometryInfo = geometryList.find(
        geom => geometry instanceof geom.Constructor
    );

    const header = `${t(geometryInfo?.label || "Edit geometry")} ${object?.name || ""}`;

    const body = (geometry && transformer) && (<>
        {(geometryInfo?.attributes || []).map((attr, i) => {
            const field = geometryFields.find(
                field => field.key === attr
            );

            if (!field) {
                return <></>;
            }

            const { Component, ...props } = field;

            const key = `${field.key}-${i}-${geometry.uuid}`;

            return (
                <React.Fragment key={key}>
                    <Component
                        object={geometry}
                        onChange={() => transformer.helper?.update()}
                        {...props}
                    />
                </React.Fragment>
            );
        })}
    </>);

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

export default EditGeometryModal;