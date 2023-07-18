import { lazy } from 'react'
import { Navigate, Route, useSearchParams } from 'react-router-dom'
import { PrivateRoutes } from '../../models'
import { NotesPage, ProfilePage, RoutesWithNotFound } from '..'
import { useSeo } from '../../hooks'
import NoteDetailPage from './NoteDetailPage'

// const Dashboard = lazy(() => import('./Dashboard/Dashboard'))
// const Home = lazy(() => import('./Home/Home'))

export default function PrivatePage() {
	return (
		<RoutesWithNotFound>
			<Route path="/" element={<Navigate to={PrivateRoutes.NOTES} />} />
			<Route path={PrivateRoutes.NOTES} element={<NotesPage />} />
			<Route path={`${PrivateRoutes.NOTES}/:id`} element={<NoteDetailPage />} />
			<Route path={PrivateRoutes.PROFILE} element={<ProfilePage />} />
		</RoutesWithNotFound>
	)
}

