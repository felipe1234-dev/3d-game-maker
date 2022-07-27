import React from "react";
import { 
    Slide,

    Dialog, 
    DialogProps,
    
    Paper,
    PaperProps,

    DialogTitle,
    DialogTitleProps,

    DialogContent,
    DialogActions
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import "@local/styles/components/Modal.scss";

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

const DraggablePaper = (props: PaperProps) => (
    <Draggable
        handle=".Modal--isDraggable-handle"
        cancel='[class*="MuiDialogContent-root"]'
    >
        <Paper {...props} />
    </Draggable>
);

interface ModalProps {
    placement?: 
        "center" | "top-center" | "bottom-center" | "top-right" | 
        "top-left" | "bottom-left" | "bottom-right",
    onClose?: () => void,
    resizable?: boolean,
    draggable?: boolean,
    height?: number,
    width?: number, 
    header?: React.ReactNode,
    body?: React.ReactNode,
    footer?: React.ReactNode
}

function Modal(props: ModalProps & Omit<DialogProps, "open">) {
    let {
        onClose,
        placement,
        resizable,
        draggable,
        width: initialWidth,
        height: initialHeight,
        header,
        body,
        footer,
        ...dialogProps 
    } = props;
    placement = placement ?? "center";

    let className = "Modal";
    className += " Modal--" + ("is-" + placement)
        .toLowerCase()
        .replace(
            /[^a-zA-Z0-9]+(.)/g, 
            (m, chr) => chr.toUpperCase()
        );
    if (draggable) {
        className += " Modal--isDraggable";
    }

    if (resizable) {
        className += " Modal--isResizable";
    }

    let headerProps: DialogTitleProps = {};
    if (draggable) {
        headerProps.className = "Modal--isDraggable-handle";
    }

    const [open, setOpen] = React.useState<boolean>(true);
    const [height, setHeight] = React.useState<number>(initialHeight ?? 100);
    const [width, setWidth] = React.useState<number>(initialWidth ?? 300);

    const navigate = useNavigate();
    
    const goBack = () => {
        navigate("/editor/", {
            state: { 
                useLoader: false 
            }
        });
    }

    const Content = () => (
        <>
            {header && (
                <DialogTitle {...headerProps}>
                    {header}
                </DialogTitle>
            )}
            {body && (
                <DialogContent>
                    {body}
                </DialogContent>
            )}
            {footer && (
                <DialogActions>
                    {footer}
                </DialogActions>
            )}
        </>
    )

    return (
        <Dialog
            className={className}
            keepMounted
            open={open}
            TransitionComponent={Transition}
            onClose={() => {
                setOpen(false);

                setTimeout(() => {
                    if (onClose) {
                        onClose();
                    } else {
                        goBack();
                    }
                }, 1000);
            }}
            PaperComponent={draggable ? DraggablePaper : Paper}
            PaperProps={{ style: { width, height } }}
            {...dialogProps}
        >
            {resizable ? (
                <Resizable
                    height={height}
                    width={width}
                    onResize={(evt: any, data: any) => {
                        setHeight(data.size.height);
                        setWidth(data.size.width);
                    }}
                    handle={
                        <span className="Modal--isResizable-handle" />
                    }
                >
                    <div className="Modal--isResizable-container"> 
                        <Content />
                    </div>
                </Resizable>
            ) : <Content />}
        </Dialog>
    );
}

export default Modal;
export type { ModalProps };