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
    const navigate = useNavigate();
    
    const goBack = () => {
        navigate("/editor/", {
            state: { 
                useLoader: false 
            }
        });
    }
    
    return (
        <Dialog
            open
            TransitionComponent={Transition}
            keepMounted
            onClose={goBack}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>
                Edit object
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
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