const AuthentificationsController = () => import('#controllers/authentifications_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ImagesController = () => import('#controllers/images_controller')
const EditAccountController = () => import('#controllers/admin/edit_account_controller')
const GaleryClientController = () => import('#controllers/client/galery_client_controller')
const UrlsController = () => import('#controllers/urls_controller')
const GaleriesController = () => import('#controllers/galery_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')
router.post('/auth/login', [AuthentificationsController, 'login'])
router.post('/auth/logout', [AuthentificationsController, 'logout'])
router.get('/dashboard', [DashboardController, 'index']).use(middleware.auth())

router.group(() => {
  router.post('/like/:groupe', [ImagesController, 'like'])
  router.post('/comment/:groupe/:imageId', [ImagesController, 'comment'])
  router.post('/end_selected/:groupe/:urlId', [ImagesController, 'end_selection'])
})

router
  .group(() => {
    router.post('/image/add', [ImagesController, 'add'])
    router.post('/image/:id', [ImagesController, 'delete'])
    router.post('/url/status', [UrlsController, 'changeStatus'])
    router.post('/edit', [EditAccountController, 'index'])
  })
  .prefix('admin')
  .use(middleware.auth())

router.get('/galery/:jwt', [GaleryClientController, 'show']).use(middleware.jwt())
router
  .group(() => {
    router
      .group(() => {
        router.post('/add', [DashboardController, 'store'])
        router.get('/:id', [GaleriesController, 'show']).where('id', /^[0-9]+/)
        router.post('/delete/:id', [GaleriesController, 'delete'])
        router.post('/edit/:id', [GaleriesController, 'edit'])
      })
      .prefix('/admin')
      .use(middleware.auth())
  })
  .prefix('/galery')
