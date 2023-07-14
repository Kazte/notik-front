interface Props {
	id: string
	icon: React.ReactNode
	placeholder: string
	label: string
	type: string
	disabled?: boolean
	rightComponent?: React.ReactNode
}
export default function InputWithIcon({ id, icon, placeholder, type, label, disabled, rightComponent }: Props) {
	return (
		<div className="flex flex-col gap-1 ">
			<label htmlFor={id} className="block text-sm font-medium">{label}</label>
			<div className="flex bg-gray-50">
				<span className="inline-flex justify-center items-center h-[45px] w-[45px] m-auto text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-sm">
					{icon}
				</span>
				<input disabled={disabled} type={type} id={id} className={`rounded-none ${!rightComponent && 'rounded-r-sm'}  border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-m p-2.5`} placeholder={placeholder} />

				{
					rightComponent &&
					<span className="inline-flex justify-center items-center h-[45px] w-[45px] my-auto text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-sm">
						{rightComponent}
					</span>
				}

			</div>

		</div>
	)
}