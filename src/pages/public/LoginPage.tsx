import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { PrivateRoutes, PublicRoutes, Roles } from '../../models'
import { UserKey, createUser, resetUser } from '../../redux/states/user'
import { clearLocalStorage } from '../../utilities'
import { InputWithIconWhite, Button, ToggleButton } from '../../components'
import useSeo from '../../hooks/useSeo'
import AuthService from '../../services/auth.service'
import { UserIcon, PasswordIcon, HideIcon, ShowIcon } from '../../icons'

export default function LoginPage() {
	useSeo({ title: 'Login', desription: 'Login page' })
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [fetching, setFetching] = useState(false)
	const [errors, setErrors] = useState<string[]>([])
	const [hidePassword, setHidePassword] = useState(true)

	useEffect(() => {
		clearLocalStorage(UserKey)
		dispatch(resetUser())
		navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
	}, [])

	const login = async (username: string, password: string) => {
		try {
			const result = await AuthService.login(username, password)

			console.log(result)

			if (result.result) {
				dispatch(createUser({
					id: result.user.userId,
					name: result.user.username,
					email: result.user.email,
					token: result.token
				}))
			}


			navigate(`/${PrivateRoutes.NOTES}`, { replace: true })
		} catch (error) {
			console.error('login error\n', error)
			setErrors(['Something went wrong, please try again later.'])
		}
	}

	const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()


		const form = event.currentTarget
		const username = form.username.value
		const password = form.password.value

		console.log('username', username)
		console.log('password', password)


		setFetching(true)
		await login(username, password)
		setFetching(false)
	}

	const handleTogglePasswordOnChanged = (value: boolean) => {
		setHidePassword(value)
	}

	return (
		<div className="grid place-items-center h-full">
			<div className="w-full max-w-md p-4 space-y-4 bg-neutral-800 rounded-sm">
				<h1 className='text-3xl font-bold text-center'>Login</h1>
				<form className="flex flex-col gap-4" onSubmit={onSubmitHandler} onChange={() => { setErrors([]) }}>
					<InputWithIconWhite disabled={fetching} id='username' label="Username" icon={<UserIcon />} placeholder='Username' type='text' />
					<InputWithIconWhite disabled={fetching} id='password' label="Password" icon={<PasswordIcon />} placeholder='Password' type={hidePassword ? 'password' : 'text'}
						rightComponent={<ToggleButton onChanged={handleTogglePasswordOnChanged} childrenTrue={<HideIcon />} childrenFalse={<ShowIcon />} />}
					/>

					{
						errors?.length > 0 && (
							<div className='flex flex-col gap-2'>
								{
									errors.map((error, index) => (
										<p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}>{error}</p>
									))
								}
							</div>
						)
					}

					<Button disabled={fetching} text='Login' type='submit' />
				</form>
				<div className="mt-4">
					<p>Don&apos;t have an account? <Link to={`/${PublicRoutes.REGISTER}`} className="text-neutral-300 hover:text-neutral-400">Register</Link></p>
				</div>
			</div>
		</div>
	)
}
