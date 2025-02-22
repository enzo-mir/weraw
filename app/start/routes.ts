const AuthentificationsController = () => import('#controllers/admin/authentifications_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import app from '@adonisjs/core/services/app'
import env from './env.js'
const ImagesController = () => import('#controllers/images_controller')
const GaleryClientController = () => import('#controllers/client/galery_client_controller')
const GaleriesController = () => import('#controllers/admin/galery_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')

router.on('/').renderInertia('home').as('home')
router.on('/login').renderInertia('login')
router.post('/auth/login', [AuthentificationsController, 'login'])
router.post('/auth/logout', [AuthentificationsController, 'logout'])
router.get('/dashboard', [DashboardController, 'index']).use(middleware.auth())

router
  .group(() => {
    router
      .group(() => {
        router
          .get('/galery/:jwt', [GaleryClientController, 'show'])
          .use(middleware.jwt())
          .as('galery')
        router.put('/:jwt/like', [ImagesController, 'like'])
        router.put('/:jwt/comment', [ImagesController, 'comment'])
        router.put('/end_selected/:urlId', [ImagesController, 'end_selection'])
      })
      .use(middleware.session())

    router.get('/galery/:jwt/guard', [GaleryClientController, 'guard'])
    router.post('/galery/:jwt/guard/profile', [GaleryClientController, 'create_profile'])
    router.post('/galery/:jwt/load_session', [GaleryClientController, 'load_session'])
  })
  .domain(`photos.${app.inDev ? 'localhost' : env.get('DOMAIN')}`)

router
  .group(() => {
    router.post('/add', [ImagesController, 'add'])
    router.delete('', [ImagesController, 'delete'])
  })
  .prefix('image')
  .use(middleware.auth())

router.put('/account', [AuthentificationsController, 'edit']).use(middleware.auth())

router
  .group(() => {
    router.post('/add', [GaleriesController, 'create'])
    router.get('/:id', [GaleriesController, 'show']).where('id', /^[0-9]+/)
    router.delete('/:id', [GaleriesController, 'delete'])
    router.put('/:id', [GaleriesController, 'edit'])
  })
  .prefix('/galery')
  .use(middleware.auth())
