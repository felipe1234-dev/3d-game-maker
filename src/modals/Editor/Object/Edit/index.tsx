import React from "react";
import { Button } from "@mui/material";
import { EditorContext } from "@local/contexts";
import { objectList, objectFields } from "@local/consts";
import { Modal, Helper } from "@local/components";

function EditObjectModal() {
    const editor = React.useContext(EditorContext);
    const object = editor?.transformControls.object || null; 
    const abstract: typeof objectList[string] = !object ? {
        label: "Edit object",
        keys: []
    } : objectList[object.constructor.name];

    return (
        <Modal 
            height={500}
            width={400}
            placement="bottom-left"
            draggable
            header={`${abstract.label} ${object?.name || ""}`}
            body={(
                <>
                    {abstract.keys.map(key => {
                        const field = objectFields.find(field => (
                            field.key === key
                        )); 

                        if (!field) {
                            return <></>;
                        }

                        const { 
                            key: fieldKey, 
                            Component: Field, 
                            helpText, 
                            ...props 
                        } = field;
                        return (
                            <Helper 
                                key={fieldKey} 
                                text={helpText} 
                                placement="right" 
                                arrow
                            >
                                <Field scope="object" {...props} />
                            </Helper>
                        );
                    })}
                </>
            )}
        />
    );
}

export default EditObjectModal;