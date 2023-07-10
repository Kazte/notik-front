import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models/routes";
import AuthService from "../services/auth-service";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function AuthGuard({ privateValidation }) {
	const userState = useSelector((store) => store.user);
	const navigator = useNavigate()

	const verifyToken = async () => {
		try {
			const data = await AuthService.verify(userState.token)

			console.log("verifyToken", data);

			if (!data.response) {
				navigator(PublicRoutes.login, { replace: true })
			}
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		verifyToken()
	}, [navigator])


	return userState.userId ?
		privateValidation ?
			<Outlet /> :
			<Navigate replace to={PrivateRoutes.private} />
		: <Navigate replace to={PublicRoutes.login} />

}

export default AuthGuard