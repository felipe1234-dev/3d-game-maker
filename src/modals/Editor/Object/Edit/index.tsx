import React from "react";
import { Button } from "@mui/material";
import { EditorContext } from "@local/contexts";
import { Modal, Helper } from "@local/components";
import { t } from "@local/i18n";

import objectList from "@local/consts/editor/objects/list"; 
import objectFields from "@local/consts/editor/objects/fields";

function EditObjectModal() {
    const editor = React.useContext(EditorContext);
    const object = editor?.transformControls.object || null; 
    const objectInfo = objectList.find(obj => obj.className === object?.constructor.name);

    return (
        <Modal 
            height={500}
            width={400}
            placement="bottom-left"
            draggable
            header={`${t(objectInfo?.label || "Edit object")} ${object?.name || ""}`}
            body={(
                <>
                    {(objectInfo?.props || []).map(key => {
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