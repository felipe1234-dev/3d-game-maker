import React from "react";
import * as gallery from "@local/api/collections/gallery";
import { Media } from "@local/api/models";
import { FirebaseContext } from "@local/contexts";
import { Alert, Filter } from "@local/interfaces";

function Body() {
    const [medias, setMedias] = React.useState<Media[]>([]);
    const [search, setSearch] = React.useState<string>("");
    const { db } = React.useContext(FirebaseContext);

    React.useEffect(() => {
        const filter: Filter = {};

        if (search) {
            filter.where = [
                ["tags", "array-contains", search]
            ];
        }

        gallery.list(db, filter).then(resp => {
            console.log(resp);
            setMedias(resp);
        }).catch((error: Alert) => {
            console.error(error);
        });
    }, []);

    return (
        <></>
    );
}

export default Body;