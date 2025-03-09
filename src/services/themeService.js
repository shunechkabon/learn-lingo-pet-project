import { db, auth, ref, get, set } from "../firebase";

export const saveThemeToDatabase = async (theme) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await set(ref(db, `users/${user.uid}/theme`), theme); 
  } catch (error) {
    console.error("Error of saving the theme into Realtime Database:", error);
  }
};

export const getThemeFromDatabase = async () => {
  const user = auth.currentUser;
  if (!user) return "theme-yellow";

  try {
    const themeRef = ref(db, `users/${user.uid}/theme`);
    const snapshot = await get(themeRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return "theme-yellow";
    }
  } catch (error) {
    console.error("Error in getting the theme from Realtime Database:", error);
    return "theme-yellow";
  }
};
