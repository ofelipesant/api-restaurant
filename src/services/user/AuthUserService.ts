import prismaClient from "../../prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface AuthRequest{
    email: string
    password: string
}

class AuthUserService{
    async execute({email, password}:AuthRequest){
        //verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Nenhum usuário foi encontrado com este e-mail")
        }

        //verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Senha incorreta")
        }

        //gerar token JWT e devolver dados do usuário
        const token = sign(
            //payload
            {
                name: user.name,
                email: user.email
            },
            //secretkey
            process.env.JWT_SECRET,
            //sign options
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }