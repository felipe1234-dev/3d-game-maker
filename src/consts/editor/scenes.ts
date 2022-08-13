export default [
    {
        "metadata": {
            "version": 0.1,
            "type": "Object",
            "generator": "Object3D.toJSON"
        },
        "object": {
            "uuid": "16EF0FA0-36DA-4354-88D7-15704F63368C",
            "type": "Scene",
            "name": "Stage 1",
            "layers": 1,
            "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            "background": 11184810
        }
    },
    {
        "metadata": {
            "version": 0.1,
            "type": "Object",
            "generator": "Object3D.toJSON",
            "opacityFactor": 0.5
        },
        "geometries": [
            {
                "uuid": "001699C2-A33F-485D-B1F8-DEA675B84EC1",
                "type": "BoxGeometry",
                "width": 1,
                "height": 1,
                "depth": 1,
                "widthSegments": 1,
                "heightSegments": 1,
                "depthSegments": 1
            }
        ],
        "materials": [
            {
                "uuid": "670790D3-F8D1-46EE-9F9F-BFADB9E19E9E",
                "type": "MeshPhysicalMaterial",
                "color": 302836,
                "roughness": 1,
                "metalness": 0,
                "sheen": 0,
                "sheenColor": 0,
                "sheenRoughness": 1,
                "emissive": 0,
                "specularIntensity": 1,
                "specularColor": 16777215,
                "clearcoat": 0,
                "clearcoatRoughness": 0,
                "envMapIntensity": 1,
                "reflectivity": 0.5,
                "refractionRatio": 0.98,
                "transmission": 0,
                "thickness": 0,
                "attenuationDistance": 0,
                "attenuationColor": 16777215,
                "side": 2,
                "depthFunc": 3,
                "depthTest": true,
                "depthWrite": true,
                "colorWrite": true,
                "stencilWrite": false,
                "stencilWriteMask": 255,
                "stencilFunc": 519,
                "stencilRef": 0,
                "stencilFuncMask": 255,
                "stencilFail": 7680,
                "stencilZFail": 7680,
                "stencilZPass": 7680,
                "transparent": true,
                "opacity": 1
            }
        ],
        "object": {
            "uuid": "A02016A4-DD4B-4D36-AE76-6B859EB7C67C",
            "type": "Scene",
            "name": "Stage 2",
            "layers": 1,
            "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            "children": [
                {
                    "uuid": "8CE9BBF5-BF66-4134-BCB4-82FF0AF4C9CE",
                    "type": "Mesh",
                    "name": "BoxGeometry",
                    "layers": 1,
                    "matrix": [
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0.5, 0, 1
                    ],
                    "geometry": "001699C2-A33F-485D-B1F8-DEA675B84EC1",
                    "material": "670790D3-F8D1-46EE-9F9F-BFADB9E19E9E"
                },
                {
                    "uuid": "7EB19074-D6DD-4CC4-9301-E639CE32879A",
                    "type": "AmbientLight",
                    "name": "AmbientLight",
                    "layers": 1,
                    "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                    "color": 0,
                    "intensity": 1
                },
                {
                    "uuid": "9E03C7E5-C2EC-40BE-AF4E-A72CDD5075FD",
                    "type": "PointLight",
                    "name": "PointLight",
                    "layers": 1,
                    "matrix": [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10, 0, 1],
                    "color": 16777215,
                    "intensity": 1,
                    "distance": 0,
                    "decay": 1,
                    "shadow": {
                        "camera": {
                            "uuid": "E9922AA5-F26F-4FA1-A06F-70B44BC61830",
                            "type": "PerspectiveCamera",
                            "layers": 1,
                            "fov": 90,
                            "zoom": 1,
                            "near": 0.5,
                            "far": 500,
                            "focus": 10,
                            "aspect": 1,
                            "filmGauge": 35,
                            "filmOffset": 0
                        }
                    }
                },
                {
                    "uuid": "0D4EFB61-DBA7-4E70-95D2-389804009AB7",
                    "type": "PointLight",
                    "name": "PointLight",
                    "layers": 1,
                    "matrix": [
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 15, 0.5, 15, 1
                    ],
                    "color": 16777215,
                    "intensity": 1,
                    "distance": 0,
                    "decay": 1,
                    "shadow": {
                        "camera": {
                            "uuid": "F3F3A1D5-7746-4859-80E7-6C0CE4A8FD27",
                            "type": "PerspectiveCamera",
                            "layers": 1,
                            "fov": 90,
                            "zoom": 1,
                            "near": 0.5,
                            "far": 500,
                            "focus": 10,
                            "aspect": 1,
                            "filmGauge": 35,
                            "filmOffset": 0
                        }
                    }
                },
                {
                    "uuid": "53A7FB94-B60F-4320-BAD8-08E96B75837C",
                    "type": "PointLight",
                    "name": "PointLight",
                    "layers": 1,
                    "matrix": [
                        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -15, -10, -15, 1
                    ],
                    "color": 16777215,
                    "intensity": 1,
                    "distance": 0,
                    "decay": 1,
                    "shadow": {
                        "camera": {
                            "uuid": "DA272678-346D-419E-A459-211412F06A83",
                            "type": "PerspectiveCamera",
                            "layers": 1,
                            "fov": 90,
                            "zoom": 1,
                            "near": 0.5,
                            "far": 500,
                            "focus": 10,
                            "aspect": 1,
                            "filmGauge": 35,
                            "filmOffset": 0
                        }
                    }
                }
            ]
        }
    }
];