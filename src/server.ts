import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import { router } from './routes'
import cors from 'cors'

const app = express() // inicializamos o app

app.use(express.json())
app.use(cors()) //habilitando o cors da API
app.use(router) //utilizamos as rotas do arquito route

//middleware para tratativa de erros
//sempre que disparamos throw new error em algumas das rotas
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    //se for uma instância do tipo error
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "internal server error"
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`server listening in the port ${port}`)
})