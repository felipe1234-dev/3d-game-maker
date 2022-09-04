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
    EditSceneTreeModal
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
        pageTitle: `Testing`,
        path: "/test",
        Element: TestPage,
        wrappers: [],
        providers: []
    },
    {
        pageTitle: `Auth - ${app.name}`,
        path: "/auth",
        Element: AuthPage,
        wrappers: [],
        providers: []
    },
    {
        pageTitle: `Home - ${app.name}`,
        path: "/home",
        Element: HomePage,
        wrappers: [
            RequireAuth
        ],
        providers: []
    },
    {
        pageTitle: `Editor - ${app.name}`,
        path: "/editor",
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
        path: "/editor/project/edit",
        Element: EditProjectModal,
        wrappers: [
            RequireAuth
        ],
        providers: []
    },
    // Texture
    {
        path: "/editor/texture/edit",
        Element: EditTextureModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    // Geometry
    {
        path: "/editor/geometry/edit",
        Element: EditGeometryModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    // Object
    {
        path: "/editor/object/add",
        Element: AddObjectModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    {
        path: "/editor/object/edit",
        Element: EditObjectModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    // Scene
    {
        path: "/editor/scene/edit",
        Element: EditSceneModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    },
    {
        path: "/editor/scene-tree/edit",
        Element: EditSceneTreeModal,
        wrappers: [
            RequireAuth,
        ],
        providers: []
    }
];

export default {
    pages: pageRoutes,
    modals: modalRoutes
};