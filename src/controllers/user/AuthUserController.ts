import { Request, Response } from "express"
import { AuthUserService } from "../../services/user/AuthUserService"

class AuthUserController{
    async handle(req: Request, res: Response){
        const {email, password} = req.body

        if(!email || !password){
            throw new Error("Um dos campos obrigatórios não foi preenchido, verifique e tente novamente.")
        }

        const authUserService = new AuthUserService
        const auth = await authUserService.execute({
            email, 
            password
        })

        return res.json(auth)
    }
}

export { AuthUserController }