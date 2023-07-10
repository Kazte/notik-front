import { createSlice } from "@reduxjs/toolkit";

export const EmptyUser = {
	id: "",
	username: "",
	email: "",
	token: "",
}

export const persistLocalStorageUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user))
}

export const clearLocalStorageUser = () => {
	localStorage.removeItem("user")
}

export const userSlice = createSlice({
	name: "user",
	initialState: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : EmptyUser,
	reducers: {
		createUser: (state, action) => {
			persistLocalStorageUser(action.payload)
			return action.payload
		},
		updateUser: (state, action) => {
			const result = { ...state, ...action.payload }
			persistLocalStorageUser(result)
			return result
		},
		resetUser: () => {
			clearLocalStorageUser()
			return EmptyUser
		}
	}
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer