import { useRoutes } from 'react-router'
import { dashboardRoutes } from './dashboardRoutes'
import { authRoutes } from './authRoutes'
import { errorRoutes } from './errorRoutes'
import { navigateRoute } from './navigateRoute'

const ThemeRoutes = () => {
  return useRoutes([navigateRoute , authRoutes , dashboardRoutes , errorRoutes])
}

export default ThemeRoutes