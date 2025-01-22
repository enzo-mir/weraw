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
const UrlsController = () => import('#controllers/urls_controller')
const GaleriesController = () => import('#controllers/galeries_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')
router.post('/login', [AuthentificationsController, 'login'])
router.post('/logout', [AuthentificationsController, 'logout'])
router.post('/galery', [DashboardController, 'store']).use(middleware.auth())
router.get('/dashboard', [DashboardController, 'index']).use(middleware.auth())
router.get('/galery/:id', [GaleriesController, 'show']).use(middleware.auth())
router.post('/url/status', [UrlsController, 'changeStatus'])

router.post('/image/:id', [GaleriesController, 'deleteImage']).use(middleware.auth())
