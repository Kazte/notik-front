
import { FooterLayout, HeaderLayout, MainLayout } from "./layout"
import './App.css'
import { BrowserRouter, Route, Navigate } from "react-router-dom"
import { RegisterPage, DashboardPage, PrivatePages } from "./pages"
import AuthGuard from "./guard/auth.guard"
import { PrivateRoutes, PublicRoutes } from "./models/routes"
import RoutesWithNotFound from "./utils/routesWithNotFound"
import { Suspense, lazy } from "react"
import { Spinner } from "./components"
import { Provider } from "react-redux"
import store from "./redux/store"

const Login = lazy(() => import('./pages/public/LoginPage'))

function App() {

  return (

    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <BrowserRouter>
          <HeaderLayout />
          <MainLayout>

            <RoutesWithNotFound>

              {/* Public routes */}
              <Route path="/" element={<Navigate to={`${PrivateRoutes.private}`} />} />
              <Route path={PublicRoutes.login} element={<Login />} />
              <Route path={PublicRoutes.register} element={<RegisterPage />} />


              <Route element={<AuthGuard privateValidation={true} />}>
                <Route path={`${PrivateRoutes.private}/*`} element={<PrivatePages />} />
              </Route>

              {/* Protected routes by admin auth */}
              <Route path={PrivateRoutes.dashboard} element={<DashboardPage />} />

            </RoutesWithNotFound>
          </MainLayout>
          <FooterLayout />
        </BrowserRouter >
      </Provider>
    </Suspense>
  )
}

export default App
