import { Router } from "express"
import { CreateUserController } from "./controllers/user/CreateUserController"

const router = Router() //inicializamos o Router do express

//user
router.post("/users", new CreateUserController().handle) // criando a rota /users com o controller como middleware

export { router } //exportamos o router para ser utilizado externamente