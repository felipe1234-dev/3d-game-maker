import * as THREE from "three";
import { Editor } from "@local/classes";

class GridsHelper extends THREE.Group {
    public editor: Editor.Core;
    public grid1: THREE.GridHelper;
    public grid2: THREE.GridHelper;
    public parameters: {
        grid1: {
            color: THREE.ColorRepresentation;
            divisions: number;
        };
        grid2: {
            color: THREE.ColorRepresentation;
            divisions: number;
        };
        centerLineColor: THREE.ColorRepresentation;
        size: number;
    };

    constructor(
        editor: Editor.Core,
        grid1Options?: {
            color?: THREE.ColorRepresentation;
            divisions?: number;
        },
        grid2Options?: {
            color?: THREE.ColorRepresentation;
            divisions?: number;
        },
        centerLineColor?: THREE.ColorRepresentation,
        size?: number
    ) {
        super();

        this.editor = editor;
        size = size ?? 30;
        centerLineColor = centerLineColor ?? "#ebebeb";

        if (!grid1Options) grid1Options = {};
        if (!grid1Options.color) grid1Options.color = "#888888";
        if (!grid1Options.divisions) grid1Options.divisions = size;

        if (!grid2Options) grid2Options = {};
        if (!grid2Options.color) grid2Options.color = "#222222";
        if (!grid2Options.divisions) grid2Options.divisions = size/5;

        const grid1 = new THREE.GridHelper(
            size, 
            grid1Options.divisions, 
            centerLineColor,
            grid1Options.color
        );
        const grid2 = new THREE.GridHelper(
            size, 
            grid2Options.divisions, 
            centerLineColor,
            grid2Options.color 
        );

        this.add(grid1, grid2);

        this.grid1 = grid1;
        this.grid2 = grid2;

        this.parameters = {
            grid1: grid1Options as typeof this.parameters.grid1,
            grid2: grid2Options as typeof this.parameters.grid2,
            size,
            centerLineColor
        };

        const scope = this;

        this.parameters = new Proxy(this.parameters, {
            set: function(parameters, param, value) {
                if (param === "size") {
                    parameters[param] = Number(value);
                } else if (param === "centerLineColor") {
                    parameters[param] = value;
                } else {
                    return false;
                }

                const grids = ["grid1", "grid2"] as const;

                for (const gridName of grids) {
                    scope.remove(scope[gridName]);

                    scope[gridName] = new THREE.GridHelper(
                        parameters.size,
                        parameters[gridName].divisions, 
                        parameters.centerLineColor,
                        parameters[gridName].color
                    );

                    scope.add(scope[gridName]);
                }

                return true;
            },

            get: function(parameters, param) {
                if (param === "grid1" || param === "grid2") {
                    return new Proxy(parameters[param], {
                        set: function(grid, prop, value) {
                            if (prop === "color") {
                                grid[prop] = value;
                            } else if (prop === "divisions") {
                                grid[prop] = Number(value);
                            } else {
                                return false;
                            }

                            const gridName = param;
                            
                            scope.remove(scope[gridName]);
                            scope[gridName] = new THREE.GridHelper(
                                parameters.size,
                                grid.divisions, 
                                parameters.centerLineColor,
                                grid.color
                            );
                            scope.add(scope[gridName]);

                            return true;
                        }
                    });
                } else if (param === "size" || param === "centerLineColor") {
                    return parameters[param];
                } else {
                    return undefined;
                }
            }
        });
    }
}

export default GridsHelper;