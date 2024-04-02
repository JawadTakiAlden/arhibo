import { useRoutes } from 'react-router'
import { dashboardRoutes } from './dashboardRoutes'
import { authRoutes } from './authRoutes'
import { errorRoutes } from './errorRoutes'

const ThemeRoutes = () => {
  return useRoutes([authRoutes , dashboardRoutes , errorRoutes])
}

export default ThemeRoutes