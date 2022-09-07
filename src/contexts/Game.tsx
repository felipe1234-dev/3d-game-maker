import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import * as THREE from "three";
import { Game } from "@local/classes";

const GameContext = createContext<Game.Core | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = useState<Game.Core>();

    useEffect(() => {
        const gameJSON = sessionStorage.getItem("Current Game");

        if (gameJSON) {

        } else {            
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            
            const stage1 = new Game.Stage("Stage 1");
            const scene1 = new Game.Scene("Scene 1");
            const box = new THREE.BoxGeometry(1, 1, 1);
            const cube = new Game.Mesh(box, material);
            scene1.add(cube);
            stage1.addScene(scene1);
            
            const stage2 = new Game.Stage("Stage 2");
            const scene2 = new Game.Scene("Scene 2");
            const ball =  new THREE.SphereGeometry(1, 50, 50);
            const sphere = new Game.Mesh(ball, material);
            scene2.add(sphere);
            stage2.addScene(scene2);

            const obj = new Game.Core({
                name: "Default game",
                description: "This is a generated game",
                scenes: [scene1, scene2],
                stages: [stage1, stage2]
            });
            setGame(obj);
        }
    }, []);
    
    return (
        <GameContext.Provider value={game}>
            {props.children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };