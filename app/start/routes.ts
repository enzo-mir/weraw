/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthentificationsController = () => import('#controllers/authentifications_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const DashboardController = () => import('#controllers/dashboard_controller')
router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')
router.post('/login', [AuthentificationsController, 'login'])
router.post('/logout', [AuthentificationsController, 'logout'])
router.get('/dashboard', [DashboardController, 'index']).use(middleware.auth())
