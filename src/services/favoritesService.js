import { db, ref, get, set, remove, onValue } from "../firebase";

export const toggleFavorite = async ( userId, teacherId, teacherData ) => {
    if (!userId) return;

    const teacherRef = ref(db, `users/${userId}/favorites/${teacherId}`);

    try {
        const snapshot = await get(teacherRef);
        if (snapshot.exists()) {
            await remove(teacherRef);
        } else {
            await set(teacherRef, teacherData);
        }
    } catch (error) {
        console.error("Error updating favorites:", error);
    }
};

export const listenToFavorites = (userId, callback) => {
    if (!userId) return;

    const favoritesRef = ref(db, `users/${userId}/favorites`);

    onValue(favoritesRef, (snapshot) => {
        if (snapshot.exists()) {
            callback(Object.values(snapshot.val())); 
        } else {
            callback([]); 
        }
    });
};
