import { Route } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";
import RoutesWithNotFound from "../utils/routesWithNotFound";
import { Navigate } from "react-router-dom";
import NotesPage from "./private/NotesPage";
import NotesDetailPage from "./private/NotesDetailPage";
import ProfilePage from "./private/ProfilePage";

export default function PrivatePages() {
	return (
		<RoutesWithNotFound>
			{/* Protected routes by common auth */}
			<Route path="/" element={<Navigate to={PrivateRoutes.notes} />} />
			<Route path={`${PrivateRoutes.notes}`} element={<NotesPage />} />
			<Route path={`${PrivateRoutes.notes}/:id`} element={<NotesDetailPage />} />
			<Route path={PrivateRoutes.profile} element={<ProfilePage />} />
		</RoutesWithNotFound>
	)
}