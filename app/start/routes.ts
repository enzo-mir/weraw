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
const EditAccountController = () => import('#controllers/admin/edit_account_controller')
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
    router.post('/image/like/:groupe', [GaleriesController, 'like'])
    router.post('/comment/:groupe/:imageId', [GaleriesController, 'comment'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('/image/add', [GaleriesController, 'addImage'])
    router.post('/image/:id', [GaleriesController, 'deleteImage'])
    router.post('/url/status', [UrlsController, 'changeStatus'])
    router.post('/edit', [EditAccountController, 'index'])
  })
  .prefix('admin')
  .use(middleware.auth())

router
  .group(() => {
    router
      .group(() => {
        router.post('/add', [DashboardController, 'store'])
        router.get('/:id', [GaleriesController, 'show']).where('id', /^[0-9]+/)
        router.post('/delete/:id', [GaleriesController, 'deleteGalery'])
        router.post('/edit/:id', [GaleriesController, 'editGalery'])
      })
      .prefix('/admin')
      .use(middleware.auth())

    router.get('/:groupe', [GaleryClientController, 'show'])
  })
  .prefix('/galery')
