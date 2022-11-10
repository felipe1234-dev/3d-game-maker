import {
    AuthPage,
    HomePage,
    EditorPage,
    TestPage
} from "@local/pages";
import {
    AddObjectModal,
    EditObjectModal,
    EditProjectModal,
    EditTextureModal,
    EditGeometryModal,
    EditSceneModal,
    EditSceneTreeModal,
    EditVerticesModal,
    EditRendererModal,
    EditPhysicsModal,
    ChooseSnippetsModal
} from "@local/modals";
import {
    GameProvider,
    EditorProvider
} from "@local/contexts";
import { RouteInfo } from "@local/interfaces";
import { RequireAuth } from "@local/components";
import app from "./app";

const pageRoutes: RouteInfo[] = [
    {
        pageTitle: `Testing - ${app.name}`,
        path: "/:lang/test/:gameUid",
        Element: TestPage,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider
        ]
    },
    {
        pageTitle: `Auth - ${app.name}`,
        path: "/:lang/auth",
        Element: AuthPage,
        wrappers: [],
        providers: []
    },
    {
        pageTitle: `Home - ${app.name}`,
        path: "/:lang/home",
        Element: HomePage,
        wrappers: [
            RequireAuth
        ],
        providers: []
    },
    {
        pageTitle: `Editor - ${app.name}`,
        path: "/:lang/editor/:gameUid",
        Element: EditorPage,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },

];

const modalRoutes: RouteInfo[] = [
    // Project
    {
        path: "/:lang/editor/:gameUid/project/edit",
        Element: EditProjectModal,
        wrappers: [
            RequireAuth
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Renderer 
    {
        path: "/:lang/editor/:gameUid/renderer/edit",
        Element: EditRendererModal,
        wrappers: [
            RequireAuth
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Body 
    {
        path: "/:lang/editor/:gameUid/physics/edit",
        Element: EditPhysicsModal,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Texture
    {
        path: "/:lang/editor/:gameUid/texture/edit",
        Element: EditTextureModal,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Geometry
    {
        path: "/:lang/editor/:gameUid/geometry/edit",
        Element: EditGeometryModal,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Object
    {
        path: "/:lang/editor/:gameUid/object/add",
        Element: AddObjectModal,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    {
        path: "/:lang/editor/:gameUid/object/edit",
        Element: EditObjectModal,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Scene
    {
        path: "/:lang/editor/:gameUid/scene/edit",
        Element: EditSceneModal,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    {
        path: "/:lang/editor/:gameUid/scene-tree/edit",
        Element: EditSceneTreeModal,
        wrappers: [
            RequireAuth,
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Vertices
    {
        path: "/:lang/editor/:gameUid/vertices/edit",
        Element: EditVerticesModal,
        wrappers: [
            RequireAuth
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    },
    // Snippets
    {
        path: "/:lang/editor/:gameUid/snippets",
        Element: ChooseSnippetsModal,
        wrappers: [
            RequireAuth
        ],
        providers: [
            GameProvider,
            EditorProvider
        ]
    }
];

export default {
    pages: pageRoutes,
    modals: modalRoutes
};