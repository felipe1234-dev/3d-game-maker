import React from "react";
import * as THREE from "three";
import { Game } from "@local/classes";

const GameContext = React.createContext<Game.Core | undefined>(undefined);

function GameProvider(props: { children: React.ReactNode }) {
    const [game, setGame] = React.useState<Game.Core>();
    
    React.useEffect(() => {
        const scene = new Game.Scene("Scene 1");
            
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        
        scene.add(cube);
        
        const obj = new Game.Core([ scene ]);
        
        setGame(obj);
    }, []);
    
    return (
        <GameContext.Provider value={game}>
            {props.children}
        </GameContext.Provider>
    );
}

export { GameContext, GameProvider };