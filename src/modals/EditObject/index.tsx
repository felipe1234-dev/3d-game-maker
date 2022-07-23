import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
    Slide
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { EditorContext } from "@local/contexts";
import { objectList, objectFields } from "@local/consts";
import { Helper } from "@local/components";

const Transition = (
    React.forwardRef(
        function Transition(
            props: TransitionProps & { children: React.ReactElement<any, any> },
            ref: React.Ref<unknown>
        ) {
            return (
                <Slide 
                    ref={ref}
                    direction="up"  
                    {...props} 
                />
            );
        }
    )
);

function EditObject() {
    const [open, setOpen] = React.useState<boolean>(true);

    const editor = React.useContext(EditorContext);
    const object = editor?.transformControls.object || null; 
    const abstract: typeof objectList[string] = !object ? {
        label: "Edit object",
        keys: []
    } : objectList[object.constructor.name];

    const navigate = useNavigate();
    
    const goBack = () => {
        setOpen(false);

        setTimeout(() => {
            navigate("/editor/", {
                state: { 
                    useLoader: false 
                }
            });
        }, 1000);
    }
    
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={goBack}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                {abstract.label} {object?.name}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
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
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>Save</Button>
                <Button>Agree</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditObject;