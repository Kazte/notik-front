import { useEffect } from 'react'
import useToggle from '../../hooks/setToggle'

interface Props {
	childrenTrue: React.ReactNode
	childrenFalse: React.ReactNode
	onChanged?: (value: boolean) => void
}
export default function ToggleButton({ childrenFalse, childrenTrue, onChanged }: Props) {

	const [show, toggleShow] = useToggle(true)

	useEffect(() => {
		onChanged && onChanged(show)
	}, [show])

	return (
		<button type='button' className='w-full h-full flex justify-center items-center' onClick={() => { toggleShow() }}>{show ?
			(
				<>
					{childrenTrue}
				</>
			) :
			(
				<>
					{childrenFalse}
				</>
			)
		}</button>
	)
}