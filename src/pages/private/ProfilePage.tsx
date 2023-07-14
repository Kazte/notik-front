import { useSelector } from 'react-redux'
import { AppStore } from '../../redux/store'
import { useSeo } from '../../hooks'

interface Props { }

export default function ProfilePage({ }: Props) {

	useSeo({ title: 'Profile', desription: 'Profile page' })

	const userState = useSelector((state: AppStore) => state.user)

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="max-w-lg mx-auto my-10 bg-surface rounded-lg shadow-md p-5">
				<img className="w-32 h-32 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture" />
				<h2 className="text-center text-2xl font-semibold mt-3">{userState.name}</h2>
				{/* <div className="flex justify-center mt-5">
					<a href="" className="text-blue-500 hover:text-blue-700 mx-3">Twitter</a>
					<a href="" className="text-blue-500 hover:text-blue-700 mx-3">LinkedIn</a>
					<a href="" className="text-blue-500 hover:text-blue-700 mx-3">GitHub</a>
				</div> */}
				<hr className="border-neutral-700" />
				<div className="mt-5">
					<h3 className="text-xl font-semibold">Info</h3>
					<div className="mt-2">
						<span className="font-semibold">Email:</span> {userState.email}
					</div>
				</div>
				<hr className="border-neutral-700" />
				<div className="mt-5">
					<h3 className="text-xl font-semibold">Bio</h3>
					<p className="mt-2">John is a software engineer with over 10 years of experience in developing web and mobile applications. He is skilled in JavaScript, React, and Node.js.</p>
				</div>
			</div>
		</div>
	)
}