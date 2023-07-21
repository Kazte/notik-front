interface Props {
	children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	return (
		<main className="flex-grow">
			{children}
		</main>
	)
}