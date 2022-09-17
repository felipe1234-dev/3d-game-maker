import React, {
    forwardRef,
    ReactElement,
    ReactNode,
    Ref,
    useContext,
    useState,
} from "react";
import {
    Slide,
    Dialog,
    DialogProps,
    Paper,
    PaperProps,
    DialogTitle,
    DialogTitleProps,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Resizable } from "react-resizable";
import { CloseOutline } from "@styled-icons/evaicons-outline";
import Draggable from "react-draggable";

import { HistoryContext } from "@local/contexts";

import "@local/styles/components/Modal.scss";

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: ReactElement<any, any> },
    ref: Ref<unknown>
) {
    return <Slide ref={ref} direction="up" {...props} />;
});

const DraggablePaper = (props: PaperProps) => (
    <Draggable
        handle=".Modal--isDraggable-handle"
        cancel='[class*="MuiDialogContent-root"]'
    >
        <Paper {...props} />
    </Draggable>
);

interface ModalProps extends Omit<DialogProps, "open"> {
    className?: string;
    placement?:
        | "top"
        | "top-left"
        | "top-right"
        | "center"
        | "center-left"
        | "center-right"
        | "bottom"
        | "bottom-left"
        | "bottom-right";
    onClose?: () => void;
    resizable?: boolean;
    draggable?: boolean;
    height?: number;
    width?: number;
    header?: ReactNode;
    body?: ReactNode;
    footer?: ReactNode;
    disableBackdrop?: boolean;
}

function Modal(props: ModalProps) {
    let {
        className: customClassName,
        onClose,
        placement,
        resizable,
        draggable,
        width: initialWidth,
        height: initialHeight,
        header,
        body,
        footer,
        disableBackdrop,
        ...dialogProps
    } = props;

    customClassName = customClassName ?? "";
    placement = placement ?? "center";

    let className = "Modal " + customClassName;
    className +=
        " Modal--" +
        ("is-" + placement)
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    if (draggable) {
        className += " Modal--isDraggable";
    }

    if (resizable) {
        className += " Modal--isResizable";
    }

    if (disableBackdrop) {
        className += " Modal--backdropDisabled";
    }

    let headerProps: DialogTitleProps = {};
    if (draggable) {
        headerProps.className = "Modal--isDraggable-handle";
    }

    const history = useContext(HistoryContext);

    const [open, setOpen] = useState(true);
    const [height, setHeight] = useState(initialHeight ?? 100);
    const [width, setWidth] = useState(initialWidth ?? 300);

    const closeModal = (reason: string) => {
        if (disableBackdrop && reason === "backdropClick") {
            return;
        }

        setOpen(false);

        setTimeout(() => {
            if (onClose) {
                onClose();
            } else {
                history.back({
                    state: {
                        useLoader: false,
                    },
                });
            }
        }, 1000);
    };

    const Content = () => (
        <>
            {header && (
                <DialogTitle {...headerProps}>
                    {header}
                    {disableBackdrop && (
                        <IconButton
                            className="Modal--backdropDisabled-closeButton"
                            onClick={() => closeModal("closeButtonClick")}
                        >
                            <CloseOutline width={24} />
                        </IconButton>
                    )}
                </DialogTitle>
            )}
            {body && <DialogContent>{body}</DialogContent>}
            {footer && <DialogActions>{footer}</DialogActions>}
        </>
    );

    return (
        <Dialog
            className={className}
            keepMounted
            open={open}
            TransitionComponent={Transition}
            onClose={(evt, reason) => closeModal(reason)}
            PaperComponent={draggable ? DraggablePaper : Paper}
            PaperProps={{ style: { width, height } }}
            style={{
                ["--width" as any]: `${width}px`,
                ["--height" as any]: `${height}px`,
            }}
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
                    handle={<span className="Modal--isResizable-handle" />}
                >
                    <div className="Modal--isResizable-container">
                        <Content />
                    </div>
                </Resizable>
            ) : (
                <Content />
            )}
        </Dialog>
    );
}

export default Modal;
export type { ModalProps };