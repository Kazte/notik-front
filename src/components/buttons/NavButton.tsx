import { NavLink } from 'react-router-dom'

interface Props {
	to: string;
	children: React.ReactNode;
	onClick?: () => void;

}
export default function NavButton({ children, to, onClick }: Props) {
	const customStyle = 'px-4 py-2 rounded-sm border-b-2 transition hover:border-gray-300 select-none'


	return (
		<NavLink onClick={onClick} to={to}
			className={({ isActive }) => {
				return customStyle + ' ' + (isActive ? 'border-gray-300' : 'border-transparent')
			}}
		>
			{children}
		</NavLink>
	)
}