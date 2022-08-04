import React from "react";
import * as gallery from "@local/api/collections/gallery";
import { Media } from "@local/api/models";
import { AlertContext } from "@local/contexts";
import { Alert, Filter } from "@local/interfaces";

interface MediaModalValue {
    folders: string[],
    mediaList: Media[],
    search: string,
    selectedMedia?: Media,

    setFolders: React.Dispatch<React.SetStateAction<string[]>>,
    setMediaList: React.Dispatch<React.SetStateAction<Media[]>>,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setSelectedMedia: React.Dispatch<React.SetStateAction<Media | undefined>>
}

const MediaModalContext = React.createContext<MediaModalValue>({
    folders: [],
    mediaList: [],
    search: "",
    selectedMedia: undefined,

    setFolders: () => {},
    setMediaList: () => {},
    setSearch: () => {},
    setSelectedMedia: () => {}
});

function MediaModalProvider(props: { children: React.ReactNode }) {
    const { setSeverity, setMessage } = React.useContext(AlertContext);

    const [folders, setFolders] = React.useState<string[]>([]);
    const [mediaList, setMediaList] = React.useState<Media[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const [selectedMedia, setSelectedMedia] = React.useState<Media>();

    React.useEffect(() => {
        const filter: Filter = {
            where: []
        };

        if (search) {
            filter.where!.push(["tags", "array-contains-any", search.toLowerCase().split(" ")]);
        }

        gallery.list(filter).then(resp => {
            if (folders.length === 0) {
                setMediaList(resp);
            } else {
                setMediaList(resp.filter(media => (
                    JSON.stringify(media.folders) === JSON.stringify(folders)
                )));
            }
        }).catch((error: Alert) => {
            setSeverity(error.severity);
            setMessage(error.message);
        });
    }, [search]);

    React.useEffect(() => {
        console.log("mediaList ", mediaList);
    }, [selectedMedia]);

    React.useEffect(() => {
        console.log("folders ", folders);
    }, [folders]);

    return (
        <MediaModalContext.Provider value={{
            folders,
            mediaList,
            search,
            selectedMedia,

            setFolders,
            setMediaList,
            setSearch,
            setSelectedMedia
        }}>
            {props.children}
        </MediaModalContext.Provider>
    );
}

export { MediaModalContext, MediaModalProvider };
export type { MediaModalValue };