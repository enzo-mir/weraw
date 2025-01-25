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
const GaleryClientController = () => import('#controllers/client/galery_client_controller')
const UrlsController = () => import('#controllers/urls_controller')
const GaleriesController = () => import('#controllers/galeries_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')
router.post('/auth/login', [AuthentificationsController, 'login'])
router.post('/auth/logout', [AuthentificationsController, 'logout'])
router.get('/dashboard', [DashboardController, 'index']).use(middleware.auth())

router
  .group(() => {
    router.post('/image/add', [GaleriesController, 'addImage']).use(middleware.auth())
    router.post('/image/:id', [GaleriesController, 'deleteImage']).use(middleware.auth())
    router.post('/url/status', [UrlsController, 'changeStatus'])
  })
  .prefix('admin')

router
  .group(() => {
    router
      .group(() => {
        router.post('/add', [DashboardController, 'store'])
        router.get('/:id', [GaleriesController, 'show'])
        router.post('/delete/:id', [GaleriesController, 'deleteGalery'])
        router.post('/edit/:id', [GaleriesController, 'editGalery'])
      })
      .prefix('/admin')
      .use(middleware.auth())

    router.get('/:groupe', [GaleryClientController, 'show'])
  })
  .prefix('/galery')
