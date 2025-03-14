import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth,updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app, db, ref, set } from "../../firebase";

const auth = getAuth(app);

// User register
export const registerUser = createAsyncThunk("auth/registerUser", async ({ email, name, password }, { rejectWithValue }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await set(ref(db, "users/" + user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: name,
      createdAt: new Date().toISOString(),
    });
    
    return { 
      uid: user.uid, 
      email: user.email, 
      displayName: name
    }; 
  } catch (error) {
    console.error("Registration error:", error);
    return rejectWithValue(error.message);
  }
});

// User login
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await user.reload();

    return { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName || user.email.split("@")[0] 
    }; 
  } catch (error) {
    console.error("Login error:", error);
    return rejectWithValue(error.message);
  }
});

// User logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    window.location.reload(); 
    return null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Listening to authorization change
export const listenAuthState = createAsyncThunk("auth/listenAuthState", (_, { dispatch }) => {
  dispatch(setLoading(true)); 

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0]
      }));
    } else {
      dispatch(setUser(null));
    }
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload; 
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload; 
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUser, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;