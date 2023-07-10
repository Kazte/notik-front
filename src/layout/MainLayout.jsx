export default function MainLayout({ children }) {
	return (
		<main className="flex-1 bg-[#121212] text-white p-4">
			{children}
		</main>
	);
}