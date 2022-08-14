import React from "react";
import * as gallery from "@local/api/collections/gallery";
import { Media } from "@local/api/models";
import { AlertContext } from "@local/contexts";
import { Alert, Filter } from "@local/interfaces";

interface MediaModalValue {
    folders: string,
    mediaList: Media[],
    selectedMedia?: Media,

    setFolders: React.Dispatch<React.SetStateAction<string>>,
    setMediaList: React.Dispatch<React.SetStateAction<Media[]>>,
    setSelectedMedia: React.Dispatch<React.SetStateAction<Media | undefined>>
}

const MediaModalContext = React.createContext<MediaModalValue>({
    folders: "",
    mediaList: [],
    selectedMedia: undefined,

    setFolders: () => {},
    setMediaList: () => {},
    setSelectedMedia: () => {}
});

function MediaModalProvider(props: { children: React.ReactNode }) {
    const { setSeverity, setMessage } = React.useContext(AlertContext);

    const [mediaList, setMediaList] = React.useState<Media[]>([]);
    const [selectedMedia, setSelectedMedia] = React.useState<Media>();
    const [folders, setFolders] = React.useState<string>("");

    React.useEffect(() => {
        const filter: Filter = {
            where: []
        };

        if (folders) {
            filter.where!.push(["folders", "==", folders]);
        }

        gallery.list(filter).then(resp => {
            console.log(filter, resp);
            setMediaList(resp);
        }).catch((error: Alert) => {
            setSeverity(error.severity);
            setMessage(error.message);
        });
    }, [folders]);

    return (
        <MediaModalContext.Provider value={{
            folders,
            mediaList,
            selectedMedia,

            setFolders,
            setMediaList,
            setSelectedMedia
        }}>
            {props.children}
        </MediaModalContext.Provider>
    );
}

export { MediaModalContext, MediaModalProvider };
export type { MediaModalValue };