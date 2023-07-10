import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

export default function RoutesWithNotFound({ children }) {
	return (
		<Routes>
			{children}
			<Route path="*" element={<h1>Not Found!</h1>} />
		</Routes>
	)
}