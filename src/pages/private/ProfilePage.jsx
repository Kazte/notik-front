import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProfilePage() {

	const userState = useSelector((store) => store.user);

	useEffect(() => {

	}, [])

	return (
		<div className="flex flex-col items-center justify-start bg-[#1e1e1e] p-4 h-full">
			<h1 className="text-4xl font-bold mb-4">Profile</h1>

			<div className="flex flex-row gap-2">
				<div className="flex flex-col gap-2">
					<p className="text-xl font-bold">Username</p>
					<p className="text-xl">{userState.username}</p>
				</div>
				{/* hr tag vertically */}
				<div className="border-l-2 h-16"></div>

				<div className="flex flex-col gap-2">
					<p className="text-xl font-bold">Email</p>
					<p className="text-xl">{userState.email}</p>
				</div>
			</div>
		</div>


	);
}