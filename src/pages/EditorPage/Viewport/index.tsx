import React from "react";
import { Box } from "@mui/material";
import * as THREE from "three";

import * as Game from "@local/classes/Game";
import { ScreenContext } from "@local/contexts";

function Viewport() {
    const viewportElement = React.useRef<HTMLElement>();
    const { screen, setScreen } = React.useContext(ScreenContext);
    
    React.useEffect(() => {
        const container = viewportElement.current;
        
        if (container && container.innerHTML.length === 0) {
            const scene = new THREE.Scene();
            
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
			
            scene.add(cube);
                 
            const screen = new Game.Screen(container);
            
            screen.scene = scene;
            screen.renderer = new THREE.WebGLRenderer();
            
            screen.animate();
            
            setScreen(screen);
        }
    }, [viewportElement, screen]);
    
    return (
        <Box ref={viewportElement} component="section" className="Editor-viewport">
        </Box>
    );
}

export default Viewport;