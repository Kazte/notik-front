import { useEffect, useRef } from 'react'

interface Props {
	title: string
	desription: string
}

export default function useSeo({ title, desription }: Props) {
	const prevTitle = useRef(document.title)
	const prevDescription = useRef(document.querySelector('meta[name="description"]')?.getAttribute('content'))

	useEffect(() => {
		const previousTitle = prevTitle.current
		if (title) {
			document.title = `${title} | notik.`
		}

		return () => document.title = previousTitle
	}, [title])

	useEffect(() => {
		const metaDescription = document.querySelector('meta[name="description"]')
		const previousDescription = prevDescription.current

		if (desription) {
			metaDescription?.setAttribute('content', desription)
		}

		return () => metaDescription?.setAttribute('content', previousDescription)
	}, [desription])

}