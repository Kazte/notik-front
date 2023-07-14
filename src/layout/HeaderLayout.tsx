import { useDispatch, useSelector } from 'react-redux'
import { NavButton } from '../components'
import { AppStore } from '../redux/store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from '../models'
import { UserKey, resetUser } from '../redux/states/user'
import { clearLocalStorage } from '../utilities'

export default function HeaderLayout() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const userState = useSelector((state: AppStore) => state.user)
	const [isLogged, setIsLogged] = useState<boolean>(false)

	useEffect(() => {
		setIsLogged(Boolean(userState.token))
	}, [userState])

	const handleLogout = () => {
		clearLocalStorage(UserKey)
		dispatch(resetUser())
		navigate(PublicRoutes.LOGIN, { replace: true })
	}

	return (
		<header className="flex justify-around items-center w-full bg-surface p-2">
			<div className="flex flex-row items-center gap-2 cursor-pointer select-none">
				<picture className="w-12 h-12 overflow-hidden" onClick={() => navigate('/')}>
					<img src="/notik-favicon.png" alt="profile" />
				</picture>
			</div>

			<nav className="flex justify-between gap-2">
				{
					!isLogged ?
						(
							<>
								<NavButton to={`${PublicRoutes.LOGIN}`}>Login</NavButton>
								<NavButton to={`${PublicRoutes.REGISTER}`}>Register</NavButton>
							</>
						) :
						(
							<>
								<NavButton to="/">Notes</NavButton>
								<NavButton to={`${PrivateRoutes.PROFILE}`}>Profile</NavButton>
								<NavButton onClick={handleLogout} to={`${PublicRoutes.LOGIN}`}>Logout</NavButton>
							</>
						)
				}

			</nav>
		</header>
	)
}