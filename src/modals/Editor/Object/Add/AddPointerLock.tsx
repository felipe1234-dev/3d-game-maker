import { useState } from "react";
import { Button, TextField, MenuItem } from "@mui/material";

import { Game } from "@local/classes";
import { useGame } from "@local/contexts";
import { Modal } from "@local/components";
import { t } from "@local/i18n";

import controlList from "@local/consts/editor/controls/list";

interface AddControlDialogProps {
    onHide: () => void;
    item?: typeof controlList[number]
}

function AddControlDialog(props: AddControlDialogProps) {
    const { Constructor } = props.item || {};

    const [selectedCamera, setSelectedCamera] = useState<Game.Camera>();
    const [selectedMesh, setSelectedMesh] = useState<Game.Mesh>();

    const { game } = useGame();
    const scene = game?.current.scene;

    const cameras = scene?.cameras || [];
    const meshes = scene?.meshes || [];

    const handleSelectCamera = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (!scene) return;

        const cameraUuid = evt.target.value;
        const camera = scene.getCameraByUuid(cameraUuid);

        if (camera) {
            setSelectedCamera(camera);
        }
    };

    const handleSelectMesh = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (!scene) return;

        const meshUuid = evt.target.value;
        const mesh = scene.getObjectByUuid(meshUuid);

        if (mesh instanceof Game.Mesh) {
            setSelectedMesh(mesh);
        }
    };

    const handleAddPointerLock = () => {
        if (
            !Constructor ||
            !selectedCamera ||
            !selectedMesh ||
            !scene
        ) return;
        if (!(Constructor.prototype instanceof Game.PointerLockControls)) return;

        const camera = selectedCamera;
        const mesh = selectedMesh;
        // @ts-ignore
        const controls = new Constructor(camera, mesh);

        scene.addControls(controls);
        props.onHide();
    };

    const cameraValue = selectedCamera?.uuid || "";
    const meshValue = selectedMesh?.uuid || "";
    const disabled = !selectedCamera || !selectedMesh;

    return (
        <Modal
            placement="center"
            height={325}
            header={t("Choose a camera and a mesh")}
            body={<>
                <TextField
                    select
                    label={t("Camera")}
                    onChange={handleSelectCamera}
                    value={cameraValue}
                >
                    {cameras.map(camera => (
                        <MenuItem key={camera.uuid} value={camera.uuid}>
                            {camera.name}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label={t("Mesh")}
                    onChange={handleSelectMesh}
                    value={meshValue}
                >
                    {meshes.map(mesh => (
                        <MenuItem key={mesh.uuid} value={mesh.uuid}>
                            {mesh.name}
                        </MenuItem>
                    ))}
                </TextField>
            </>}
            footer={(
                <Button
                    onClick={handleAddPointerLock}
                    disabled={disabled}
                >
                    {t("Add")}
                </Button>
            )}
        />
    );

}

export default AddControlDialog;