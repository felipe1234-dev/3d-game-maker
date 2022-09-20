import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import * as THREE from "three";
import { Game } from "@local/classes";
import { t } from "@local/i18n";

const GameContext = createContext<Game.Core | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game.Core>();
    let { state } = useLocation();
    state = state || {};
    const { inputGame } = state as any;

    useEffect(() => {
        if (inputGame instanceof Game.Core) {
        } else {
            const material = new THREE.MeshPhysicalMaterial({
                color: 0x00ff00,
            });

            const stage1 = new Game.Stage("Stage 1");
            const scene1 = new Game.Scene("Scene 1");
            const box = new THREE.BoxGeometry(1, 1, 1);
            const cube = new Game.Mesh(box, material);
            scene1.add(cube);

            const spotLight = new THREE.SpotLight(0xffffff);
            spotLight.position.set(10, 10, 10);
            scene1.add(spotLight);

            /* const spotLightHelper = new THREE.SpotLightHelper( spotLight );
            scene.add(spotLightHelper); */

            stage1.addScene(scene1);

            const stage2 = new Game.Stage("Stage 2");
            const scene2 = new Game.Scene("Scene 2");
            const ball = new THREE.SphereGeometry(1, 50, 50);
            const sphere = new Game.Mesh(ball, material);
            scene2.add(sphere);
            stage2.addScene(scene2);

            const camera = new Game.PerspectiveCamera();

            const obj = new Game.Core({
                name: t("Default game"),
                description: t("This is a generated game"),
                scenes: [scene1, scene2],
                stages: [stage1, stage2],
                cameras: [camera],
            });

            obj.renderer.physicallyCorrectLights = true;
            obj.renderer.shadowMap.enabled = true;
            obj.renderer.toneMapping = THREE.LinearToneMapping;

            setGame(obj);
        }
    }, []);

    return (
        <GameContext.Provider value={game}>
            {props.children}
        </GameContext.Provider>
    );
}

function useGame() {
    const context = useContext(GameContext);

    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return context;
}

export { useGame, GameProvider, GameContext };