import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/states/user";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth-service";

export default function RegisterPage() {
	const [errors, setErrors] = useState([]);
	const [fetching, setFetching] = useState(false);

	const dispatch = useDispatch()
	const navigator = useNavigate()

	const register = async (username, email, password) => {
		try {
			const data = await AuthService.register(username, email, password);


			if (data.result) {
				dispatch(createUser({ ...data.user, token: data.token }))

				navigator(`/`, { replace: true })
			} else {
				setErrors(data.errors);
			}
		} catch (err) {
			console.error(err);
		}
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const username = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;

		setFetching(true);
		await register(username, email, password);
		setFetching(false);
	}

	const handleOnChange = () => {
		setErrors([]);
	}


	return (
		<div className="h-full w-full grid place-items-center">
			<div className="flex flex-col items-center justify-center bg-[#1e1e1e] p-4">
				<h1 className="text-4xl font-bold mb-4">Register</h1>

				<form
					onChange={handleOnChange}
					className="flex flex-col gap-8 w-96 text-black"
					onSubmit={handleOnSubmit}
				>

					<div className="flex flex-col gap-2">
						<label htmlFor="username" className="text-sm  text-white">Username</label>
						<input
							disabled={fetching} type="username" id="username" className="border border-gray-300 rounded-md px-2 py-1" />
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="email" className="text-sm text-white">Email</label>
						<input
							disabled={fetching} type="email" id="email" className="border border-gray-300 rounded-md px-2 py-1" />
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="password" className="text-sm  text-white">Password</label>
						<input
							disabled={fetching} type="password" id="password" className="border border-gray-300 rounded-md px-2 py-1" />
					</div>

					{errors.length > 0 && (
						<div className="flex flex-col gap-2">
							{errors.map((error, index) => (
								<p key={index} className="text-red-500">{error}</p>
							))}
						</div>
					)}

					<button type="submit"
						disabled={fetching}
						className="bg-zinc-500 text-white rounded-md px-4 py-2 hover:bg-zinc-600 transition-colors">Register</button>
				</form>

				<div className="mt-4">
					<p>Already have an account? <Link to="/" className="text-zinc-500 hover:text-zinc-600">Login</Link></p>
				</div>
			</div>
		</div>
	)
}