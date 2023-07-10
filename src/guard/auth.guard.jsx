import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { PublicRoutes } from "../models/routes";
import AuthService from "../services/auth-service";

export function AuthGuard() {
	const userState = useSelector((store) => store.user);

	const verifyToken = async () => {
		try {
			const data = await AuthService.verify(userState.token)

			return data.result
		} catch (err) {
			console.error(err)
		}
	}


	return userState.userId && verifyToken() ? <Outlet /> : <Navigate replace to={PublicRoutes.login} />;
}

export default AuthGuard