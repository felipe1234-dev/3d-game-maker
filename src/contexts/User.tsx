import React from "react";
import { User } from "@local/api/models";

interface UserValue {
    user: User | null,
    setUser(user: User | null): void
}

const UserContext = React.createContext<UserValue>({
    user: null,
    setUser: () => {}
});

function UserProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };