import {Request, Response} from 'express'
import { CreateUserService } from '../../services/user/CreateUserService'

class CreateUserController {
    async handle(req: Request, res: Response){
        const { name, email, password } = req.body

        if(!name){
            throw new Error("O campo nome é obrigatório")
        } else if(!email){
            throw new Error("O campo e-mail é obrigatório")
        } else if(!password){
            throw new Error("O campo de senha é obrigatório")
        }

        const createUserService  = new CreateUserService
        const user = await createUserService.create({
            //passando para o serviço os parâmetros enviados na requisição
            name, 
            email, 
            password
        })

        return res.json(user)
    }
}

export {CreateUserController}