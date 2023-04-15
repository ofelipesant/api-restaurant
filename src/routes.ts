import { Router } from "express"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { AuthUserController } from "./controllers/user/AuthUserController"
import { DetailUserController } from "./controllers/user/DetailUserController"
import { CreateCategoryController } from "./controllers/category/CreateCategoryController"
import { ListCategoriesController } from "./controllers/category/ListCategoriesController"

import { isAuthenticated } from "./middlewares/isAuthenticated"

const router = Router() //inicializamos o Router do express

//user
router.post("/users", new CreateUserController().handle)
router.post("/auth", new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle )

//category
router.get("/categories", isAuthenticated, new ListCategoriesController().handle )
router.post("/categories", isAuthenticated, new CreateCategoryController().handle )


export { router } //exportamos o router para ser utilizado externamente