import { Game } from "@local/classes";

interface GameGeometry {
    toJSON(): Game.GeometryFormat;
}

export default GameGeometry;
