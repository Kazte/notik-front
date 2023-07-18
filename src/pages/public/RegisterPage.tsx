import { useDispatch } from 'react-redux'
import { Button, InputWithIconWhite, ToggleButton } from '../../components'
import { useSeo } from '../../hooks'
import { EmailIcon, HideIcon, PasswordIcon, ShowIcon, UserIcon } from '../../icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { UserKey, createUser, resetUser } from '../../redux/states/user'
import { PrivateRoutes, PublicRoutes } from '../../models'
import AuthService from '../../services/auth.service'
import { clearLocalStorage } from '../../utilities'

export default function RegisterPage() {
	useSeo({ title: 'Register', desription: 'Register page' })
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [fetching, setFetching] = useState(false)
	const [errors, setErrors] = useState<string[]>([])
	const [hidePassword, setHidePassword] = useState(true)

	useEffect(() => {
		clearLocalStorage(UserKey)
		dispatch(resetUser())
		navigate(`/${PublicRoutes.REGISTER}`, { replace: true })

		console.log('RegisterPage')
	}, [])


	async function register(username: string, email: string, password: string) {

		try {
			const response = await AuthService.register(username, email, password)

			if (response.result) {
				navigate(`/${PublicRoutes.LOGIN}`, { replace: true })
			} else {
				setErrors(response.errors)
			}
		} catch (error) {
			console.error('registerError', error)
			setErrors(['Something went wrong, please try again later.'])
		}

	}

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setErrors([])

		const username = (e.currentTarget.elements[0] as HTMLInputElement).value
		const email = (e.currentTarget.elements[1] as HTMLInputElement).value
		const password = (e.currentTarget.elements[2] as HTMLInputElement).value

		setFetching(true)

		await register(username, email, password)

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
					<InputWithIconWhite disabled={fetching} id='email' label="Email" icon={<EmailIcon />} placeholder='Email' type='email' />
					<InputWithIconWhite disabled={fetching} id='password' label="Password" icon={<PasswordIcon />} placeholder='Password' type={hidePassword ? 'password' : 'text'}
						rightComponent={<ToggleButton onChanged={handleTogglePasswordOnChanged} childrenTrue={<HideIcon />} childrenFalse={<ShowIcon />} />}
					/>


					{
						errors.length > 0 && (
							<div className='flex flex-col gap-2'>
								{
									errors.map((error, index) => (
										<p className="mt-2 text-sm text-red-600 dark:text-red-500" key={index}>{error}</p>
									))
								}
							</div>
						)
					}

					<Button disabled={fetching} text='Register' type='submit' />
				</form>
				<div className="mt-4">
					<p> Already have an account? <Link to={`/${PublicRoutes.LOGIN}`} className="text-neutral-300 hover:text-neutral-400">Login</Link></p>
				</div>
			</div>
		</div >
	)
}