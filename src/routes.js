import { Router } from 'express'
import multer from 'multer'

import multerConfig from './config/multer'

import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'
import ProductController from './app/controllers/ProductController'
import CategoryController from './app/controllers/CategoryController'
// import OrderController from './app/controllers/OrderController'

import authMiddlewares from './app/middlewares/auth'

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/session', SessionController.store)

routes.use(authMiddlewares) // sera chamado por todas as rotas a baixo

routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

// routes.post('/orders', OrderController.store)

export default routes
