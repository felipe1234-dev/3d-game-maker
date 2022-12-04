import { useState, useEffect } from "react";
import {
    Box,
    Collapse,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Plus } from "@styled-icons/boxicons-regular";
import { Minus } from "@styled-icons/heroicons-outline";
import { Trash } from "@styled-icons/bootstrap";

import { Game } from "@local/classes";
import { useGame } from "@local/contexts";
import { t } from "@local/i18n";
import {
    stringToColor,
    getChildrenOfChildren,
    getGameObjects
} from "@local/functions";
import { useBgLocation } from "@local/hooks";

import ObjectItem from "./ObjectItem";

interface ControlItemProps {
    control: Game.Controls;
    setActiveObject: (uuid: string) => void;
    activeObject: string;
    rerenderTreeList: () => void;
}

function ControlItem(props: ControlItemProps) {
    const {
        control,
        activeObject,
        setActiveObject,
        rerenderTreeList
    } = props;
    const location = useLocation();
    const navigate = useNavigate();
    const { background } = useBgLocation();
    const { game } = useGame();

    const [selected, setSelected] = useState(false);

    const childrenOfChildren = getChildrenOfChildren(control).map(child => child.uuid);
    const openDropdown = [
        ...childrenOfChildren,
        control.uuid
    ].includes(activeObject);

    const toggleCollapser = (evt: React.MouseEvent) => {
        setActiveObject(
            !openDropdown
                ? control.uuid
                : ""
        );
        rerenderTreeList();

        evt.stopPropagation();
    };

    const selectObject = () => {
        setSelected(true);

        navigate(`controls/edit/${control.uuid}`, {
            state: {
                useLoader: false,
                background: location
            }
        });
    };

    const deleteControl = (evt: React.MouseEvent) => {
        if (!game?.current.scene) return;
        game.current.scene.removeControls(control);

        evt.stopPropagation();
    };

    useEffect(() => {
        if (!background) setSelected(false);
    }, [background]);

    const gameObjects = getGameObjects(control);

    return (
        <>
            <ListItemButton
                key={control.uuid}
                className="ObjectTree-list-item"
                component="li"

                onClick={selectObject}
                selected={selected}
            >
                <ListItemIcon>
                    {gameObjects.length > 0 && (
                        <IconButton onClick={toggleCollapser}>
                            {openDropdown ? (
                                <Minus width={15} />
                            ) : (
                                <Plus width={15} />
                            )}
                        </IconButton>
                    )}
                    <IconButton onClick={deleteControl}>
                        <Trash width={15} />
                    </IconButton>
                    <Box sx={{
                        backgroundColor: stringToColor(control.name || control.type),
                    }} />
                </ListItemIcon>
                <ListItemText
                    primary={control.name || t("No name")}
                    secondary={t(control.type)}
                />
            </ListItemButton>
            {gameObjects.length > 0 && (
                <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                    {gameObjects.map(child => (
                        <ObjectItem
                            key={child.uuid}
                            object={child}
                            setActiveObject={setActiveObject}
                            activeObject={activeObject}
                            rerenderTreeList={rerenderTreeList}
                        />
                    ))}
                    <Divider />
                </Collapse>
            )}
        </>
    );
}

export default ControlItem;