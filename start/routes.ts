/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import ProductsController from '#controllers/products_controller'
import CategoriesController from '#controllers/categories_controller'
import ReportsController from '#controllers/reports_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {

    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

      router.get('/users', async () => {
        const User = (await import('#models/user')).default

        return await User.all()
      })

          // CATEGORIES API
    router
      .group(() => {

        router.get(
          '/',
          [CategoriesController, 'index']
        )

        router.post(
          '/',
          [CategoriesController, 'store']
        )

        router.delete(
          '/:id',
          [CategoriesController, 'destroy']
        )

      })
      .prefix('categories')
      .use(middleware.auth())

      // PUBLIC PRODUCTS
      router.get(
        'products',
        [ProductsController, 'index']
      )

      router.get(

      'products/:id',

      [ProductsController, 'show']

      ) 

      // ADMIN PRODUCTS
      router
        .group(() => {

          router.post(
            '/',
            [ProductsController, 'store']
          )

          router.put(
            '/:id',
            [ProductsController, 'update']
          )

          router.delete(
            '/:id',
            [ProductsController, 'destroy']
          )

        })
        .prefix('products')
        .use(middleware.auth())

              // PUBLIC REPORTS
      router.post(
        'reports',
        [ReportsController, 'store']
      )

      // ADMIN REPORTS
      router
        .group(() => {

          router.get(
            '/',
            [ReportsController, 'index']
          )

          router.put(
            '/:id',
            [ReportsController, 'update']
          )

          router.delete(
            '/:id',
            [ReportsController, 'destroy']
          )

        })
        .prefix('reports')
        .use(middleware.auth())

    
    

  })
  .prefix('/api/v1')
