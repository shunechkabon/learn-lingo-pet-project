import { useEffect, useState } from "react";
import { listenToFavorites } from "../services/favoritesService";
import { auth } from "../firebase";

export const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            listenToFavorites(user.uid, setFavorites);
        }
    }, [user]);

    return favorites;
};
