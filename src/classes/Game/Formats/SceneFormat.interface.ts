interface SceneFormat {
	metadata: {
		version: number;
		type: "Object";
		generator: "ObjectExporter"
	};
	geometries: object[];
	materials: object[];
    bodies: object[];
    object: {
		uuid: string;
        game?: string;
		type: "Scene";
		matrix: number[];
		children: object[];
	}
}

export default SceneFormat;