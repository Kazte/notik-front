import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../models/routes";
import { resetUser } from "../redux/states/user";

export default function HeaderLayout() {

	const [loggedIn, setLoggedIn] = useState(false);

	const userState = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const navigator = useNavigate();

	let customStyle = "px-4 py-2 rounded-sm border-b-2 transition hover:border-gray-300 select-none "

	useEffect(() => {
		setLoggedIn(userState.userId);
	}, [userState]);

	return (
		<header className="w-full min-h-16 bg-zinc-800 text-white flex justify-around items-center py-2 ">
			<h1 className="text-2xl font-bold cursor-pointer select-none "
				onClick={() => {
					navigator(`${PrivateRoutes.private}`, { replace: true });
				}}
			>notik.</h1>

			<nav className="flex justify-around items-center gap-4">
				{
					loggedIn ?
						<>
							<NavLink
								className={({ isActive }) => {

									return customStyle + (isActive ? "border-gray-300" : "border-transparent")
								}}
								to={`${PrivateRoutes.private}/${PrivateRoutes.notes}`}>Notes</NavLink>



							<NavLink
								className={({ isActive }) => {

									return customStyle + (isActive ? "border-gray-300" : "border-transparent")
								}}
								to={`${PrivateRoutes.private}/${PrivateRoutes.profile}`}>Profile</NavLink>

							<NavLink
								className={({ isActive }) => {

									return customStyle + (isActive ? "border-gray-300" : "border-transparent")
								}}
								to={PublicRoutes.login}
								onClick={
									() => {
										dispatch(resetUser());
									}
								}>Logout</NavLink>

						</>
						:
						<>
							<NavLink
								className={({ isActive }) => {

									return customStyle + (isActive ? "border-gray-300" : "border-transparent")
								}}
								to={`${PublicRoutes.login}`}>Login</NavLink>
							<NavLink
								className={({ isActive }) => {

									return customStyle + (isActive ? "border-gray-300" : "border-transparent")
								}}
								to={`${PublicRoutes.register}`}>Register</NavLink>
						</>
				}

			</nav>
		</header>
	);
}