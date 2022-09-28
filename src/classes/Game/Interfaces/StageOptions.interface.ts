import { Game } from "@local/classes";

interface StageOptions {
    id?: number;
    uuid?: string;
    name: string;
    game?: Game.Core;
    scenes?: Game.Scene[];
}

export default StageOptions;