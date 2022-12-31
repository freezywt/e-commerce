import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { ListAllProductsController } from './controllers/product/ListAllProductsController';
import { ListExactProductController } from './controllers/product/ListExactProductController';
import { UpdateProductController } from './controllers/product/UpdateProductController';
import { RemoveProductController } from './controllers/product/RemoveProductController';

import { isAuthenticated } from './middlewares/isAuthenticated';
import { isAdminAuthenticated } from './middlewares/isAdminAuthenticated';

import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload('./images'))

/* user routes */

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)
router.get('/product/all', isAuthenticated, new ListAllProductsController().handle)
router.get('/product/exact', isAuthenticated, new ListExactProductController().handle)

/* admin routes */

router.post('/category', isAdminAuthenticated, new CreateCategoryController().handle)

router.post('/product', isAdminAuthenticated, upload.single('file'), new CreateProductController().handle)
router.put('/product/update', isAdminAuthenticated, upload.single('file'), new UpdateProductController().handle)
router.delete('/product/remove', isAdminAuthenticated, new RemoveProductController().handle)

export { router }
