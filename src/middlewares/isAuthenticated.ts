import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface Payload{
    sub: string
}

export function isAuthenticated(req:Request, res:Response, next:NextFunction){
    //receber o token do usuário
    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).end()
    }

    //split para pegar apenas o token
    const [, token] = authToken.split(" ")

    //validar token
    try{
        //o sub é utilizado para pegar o subject configurado no token JWT
        const { sub } = verify(
            //passamos o token e a secret_key na função verify
            token,
            process.env.JWT_SECRET
        ) as Payload
        
        //para resolver erro de tipagem, criar a tipagem na pasta @types com o arquivo index.d.ts
        //depois, no arquivo tsconfig.ts habilitar os Typeroots e informar a pasta
        req.user_id = sub

        return next()
    } catch(error){
        return res.status(400).json("Token inválido").end()
    }
}