// create toggle custom hook

import { useState } from 'react'

export default function useToggle(initialValue: boolean): [boolean, () => void] {
	const [value, setValue] = useState(initialValue)

	const toggle = () => {
		setValue(!value)
	}

	return [value, toggle]
}