export const selectIsLoggedIn = (state) => Boolean(state.auth.user);

export const selectUser = (state) => state.auth.user;

export const selectToken = (state) => state.auth.token;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectError = state => state.auth.error;