import prismaClient from "../../prisma"
//utilizado para criptografar a senha
import { hash } from "bcryptjs"

interface UserRequest{
    name: string
    email: string
    password: string
}

class CreateUserService{
    async create({name, email, password}: UserRequest){

        //verificar se o email já existe no banco
        //prismaClient.user vai acessar a table de users e realizar a função que foi passada
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("Já existe um usuário cadastrado com este e-mail")
        }

        //criptografando a senha
        const passwordHash = await hash(password, 8)

        //criar registero do usuário no banco
        const user = await prismaClient.user.create({
            data: {
                name: name, 
                email: email,
                password: passwordHash
            },
            //usamos o select para selecionar o que iremos retornar para o controller
            select:{
                id: true,
                email: true,
                name: true
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }
}

export { CreateUserService }