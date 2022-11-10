import {
    useState,
    forwardRef,
    ReactElement,
    ReactNode,
    Ref
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

import { useHistory } from "@local/contexts";

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
    disableClose?: boolean;
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
        className: customClassName = "",
        onClose = () => {
            history.back({
                state: {
                    useLoader: false,
                },
            });
        },
        placement = "center",
        disableClose = false,
        resizable = false,
        draggable = false,
        disableBackdrop = false,
        width: initialWidth = 300,
        height: initialHeight = 100,
        header,
        body,
        footer,
        ...dialogProps
    } = props;

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

    const history = useHistory();

    const [open, setOpen] = useState(true);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);

    const closeModal = (reason: string) => {
        if (disableClose) {
            return;
        }

        if (disableBackdrop && reason === "backdropClick") {
            return;
        }

        setOpen(false);

        setTimeout(() => onClose(), 1000);
    };

    const Content = () => (
        <>
            {header && (
                <DialogTitle {...headerProps}>
                    {header}
                    {(disableBackdrop && !disableClose) && (
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