import { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Navigate } from 'react-router-dom'
import { AuthGuard, RoleGuard } from './guards'
import { PrivateRoutes, PublicRoutes, Roles } from './models'
import { RegisterPage, RoutesWithNotFound, SharePage } from './pages'
import store from './redux/store'
import { FooterLayout, HeaderLayout, MainLayout } from './layout'


const Login = lazy(() => import('./pages/public/LoginPage'))
const Private = lazy(() => import('./pages/private/PrivatePage'))

function App() {
	return (
		<div className="flex flex-col h-screen">
			<Suspense fallback={<>Cargando</>}>
				<Provider store={store}>
					<BrowserRouter>
						<HeaderLayout />
						<MainLayout>
							<RoutesWithNotFound>

								<Route path="/" element={<Navigate to={PrivateRoutes.NOTES} />} />
								<Route path={PublicRoutes.LOGIN} element={<Login />} />
								<Route path={PublicRoutes.REGISTER} element={<RegisterPage />} />
								<Route path={`${PublicRoutes.SHARE}/:guid`} element={<SharePage />} />

								<Route element={<AuthGuard privateValidation={true} />}>
									{/* <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<Private />} /> */}
									<Route path='/*' element={<Private />} />
								</Route>
								{/* <Route element={<RoleGuard rol={Roles.ADMIN} />}>
								<Route path={PrivateRoutes.DASHBOARD} element={<Dashboard />} />
							</Route> */}
							</RoutesWithNotFound>
						</MainLayout>

						<FooterLayout />
					</BrowserRouter>
				</Provider>
			</Suspense>
		</div>
	)
}

export default App
