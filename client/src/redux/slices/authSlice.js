import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
	user: (() => {
		try {
			const user = localStorage.getItem("userInfo");
			return user ? JSON.parse(user) : null;
		} catch (error) {
			console.error("Failed to parse user info from localStorage:", error);
			return null;
		}
	})(),
	isSidebarOpen: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials(state, action) {
			state.user = action.payload;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("userInfo");
		},
		setOpenSidebar: (state, action) => {
			state.isSidebarOpen = action.payload;
		},
	},
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;