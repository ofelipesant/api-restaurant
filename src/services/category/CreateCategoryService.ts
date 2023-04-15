import prismaClient from "../../prisma"

class CreateCategoryService{
    async execute(name:string){
        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        })

        if(categoryAlreadyExists){
            throw new Error("Já existe uma categoria com este nome")
        }

        const category = await prismaClient.category.create({
            data:{
                name: name
            }
        })

        return category
    }
}

export {CreateCategoryService}