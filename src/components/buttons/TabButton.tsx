interface Props {
	isActive: boolean
	children: React.ReactNode
	onClick?: () => void
}

export default function TabButton({ isActive, children, onClick }: Props) {
	const customStyle = 'px-4 py-2 rounded-sm border-b-2 transition hover:border-gray-300 select-none'

	return (
		<button onClick={onClick}
			className={customStyle + ' ' + (isActive ? 'border-gray-300' : 'border-transparent')}
		>
			{children}
		</button >
	)
}