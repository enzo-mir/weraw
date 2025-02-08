const AuthentificationsController = () => import('#controllers/admin/authentifications_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import app from '@adonisjs/core/services/app'
import env from './env.js'
const ImagesController = () => import('#controllers/images_controller')
const EditAccountController = () => import('#controllers/admin/edit_account_controller')
const GaleryClientController = () => import('#controllers/client/galery_client_controller')
const GaleriesController = () => import('#controllers/admin/galery_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')

router.on('/').renderInertia('home')
router.on('/login').renderInertia('login')
router.post('/auth/login', [AuthentificationsController, 'login'])
router.post('/auth/logout', [AuthentificationsController, 'logout'])
router.get('/dashboard', [DashboardController, 'index']).use(middleware.auth())

router.group(() => {
  router.post('/like', [ImagesController, 'like'])
  router.post('/comment/:imageId', [ImagesController, 'comment'])
  router.post('/end_selected/:urlId', [ImagesController, 'end_selection'])
})

router
  .group(() => {
    router.post('/image/add', [ImagesController, 'add'])
    router.post('/image/:id', [ImagesController, 'delete'])
    router.post('/edit', [EditAccountController, 'index'])
  })
  .prefix('admin')
  .use(middleware.auth())

router
  .group(() => {
    router
      .group(() => {
        router.post('/add', [GaleriesController, 'create'])
        router.get('/:id', [GaleriesController, 'show']).where('id', /^[0-9]+/)
        router.post('/delete/:id', [GaleriesController, 'delete'])
        router.post('/edit/:id', [GaleriesController, 'edit'])
      })
      .prefix('/admin')
      .use(middleware.auth())
  })
  .prefix('/galery')
router
  .get('/', ({ response }) => {
    response.send('Hello world')
  })
  .domain(`photos.${app.inDev ? 'localhost' : env.get('DOMAIN')}`)

router
  .get('/:jwt', [GaleryClientController, 'show'])
  .domain(`photos.${app.inDev ? 'localhost' : env.get('DOMAIN')}`)
  .use(middleware.jwt())
  .as('client.galery')
