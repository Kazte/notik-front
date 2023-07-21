import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes } from '../models'
import { AppStore } from '../redux/store'
import { useEffect } from 'react'
import AuthService from '../services/auth.service'
import { clearLocalStorage } from '../utilities'
import { UserKey, resetUser } from '../redux/states/user'

interface Props {
	privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />
const PublicValidationFragment = <Navigate replace to={PrivateRoutes.NOTES} />

export const AuthGuard = ({ privateValidation }: Props) => {
	const userState = useSelector((store: AppStore) => store.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		verifyUser()
	}, [navigate])

	const verifyUser = async () => {
		try {
			const response = await AuthService.verify(userState.token)
			if (!response.response) {
				navigate(PublicRoutes.LOGIN, { replace: true })
				clearLocalStorage(UserKey)
				dispatch(resetUser())
			}

		} catch (error) {
			console.error('verifyUser error\n', error)
			navigate(PublicRoutes.LOGIN, { replace: true })
			clearLocalStorage(UserKey)
			dispatch(resetUser())
		}
	}

	return userState.name ? (
		privateValidation ? (
			PrivateValidationFragment
		) : (
			PublicValidationFragment
		)
	) : (
		<Navigate replace to={PublicRoutes.LOGIN} />
	)
}

export default AuthGuard
