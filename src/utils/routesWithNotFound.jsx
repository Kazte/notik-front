import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { NotFoundPage } from "../pages";

export default function RoutesWithNotFound({ children }) {
	return (
		<Routes>
			{children}
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	)
}