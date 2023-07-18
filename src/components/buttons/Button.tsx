interface Props {
	onClickHandler?: () => void
	text: string
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	style?: string
}
export default function Button({ text, onClickHandler, type, disabled, style }: Props) {
	return (
		<button disabled={disabled} onClick={onClickHandler} className={style + ' text-white bg-primary hover:bg-primary-dark focus:ring-primary-dark font-medium rounded-sm text-xl px-5 py-2.5 select-none focus:shadow-outline disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed'} type={type}>{text}</button>
	)
}