import prismaClient from "../../prisma"

class ListCategoriesService{
    async execute(){
        const categories = await prismaClient.category.findMany({
            select:{
                id: true,
                name: true,
                products: true
            }
        })

        return categories
    }
}

export { ListCategoriesService }