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
            const greenMaterial = new Game.MeshPhysicalMaterial({
                color: 0x00ff00,
            });
            const brownMaterial = new Game.MeshPhysicalMaterial({
                color: "#553820",
            });

            const stage1 = new Game.Stage({ name: "Stage 1" });
            const scene1 = new Game.Scene({ name: "Scene 1" });

            const box = new Game.BoxGeometry(1, 1, 1);
            const cube = new Game.Mesh(box, greenMaterial);
            cube.position.y = 0.5;
            cube.name = "Oliver";
            scene1.add(cube);

            const rect = new Game.BoxGeometry(6, 0.5, 6);
            const ground = new Game.Mesh(rect, brownMaterial);
            ground.position.y = -0.2;
            ground.name = "Ground";
            scene1.add(ground);

            const hemisphereLight = new Game.HemisphereLight();
            hemisphereLight.intensity = 2;
            hemisphereLight.name = "Hemisphere Light";
            scene1.add(hemisphereLight);

            const directionalLight = new Game.DirectionalLight();
            directionalLight.position.set(3.1, 3.1, 2);
            directionalLight.name = "Directional Light";
            scene1.add(directionalLight);

            stage1.addScene(scene1);

            const stage2 = new Game.Stage({ name: "Stage 2" });
            const scene2 = new Game.Scene({ name: "Scene 2" });
            const ball = new Game.SphereGeometry(1, 50, 50);
            const sphere = new Game.Mesh(ball, greenMaterial);
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