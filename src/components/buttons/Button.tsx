interface Props {
	onClickHandler?: () => void
	text: string
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	color?: 'primary' | 'red' | 'green' | 'blue' | 'yellow' | 'gray'
}
export default function Button({ text, onClickHandler, type, disabled, color = 'primary' }: Props) {

	if (color !== 'primary') {
		return (
			<button disabled={disabled} onClick={onClickHandler} className={`text-white bg-green-600 bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-600 font-medium rounded-sm text-xl px-5 py-2.5 select-none focus:shadow-outline disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed`} type={type}>{text}</button>
		)
	}

	return (
		<button disabled={disabled} onClick={onClickHandler} className={'text-white bg-primary hover:bg-primary-dark focus:ring-primary-dark font-medium rounded-sm text-xl px-5 py-2.5 select-none focus:shadow-outline disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'} type={type}>{text}</button>
	)
}