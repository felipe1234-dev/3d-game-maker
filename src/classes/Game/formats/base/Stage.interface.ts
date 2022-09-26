interface Stage {
    id: number;
    uuid: string;
    name: string;
    game?: string;
    scenes: string[]; // Scene uuids
}

export default Stage;