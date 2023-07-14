interface Props {
	children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	return (
		<main className="flex-1 w-full h-full">
			{children}
		</main>
	)
}