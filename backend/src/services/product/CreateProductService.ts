import prismaClient from '../../prisma';

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
    color: string;
    size: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, category_id, color, size }: ProductRequest) {
        const product = await prismaClient.product.create({
            data: {
                name: name,
                price: price,
                description: description,
                banner: banner,
                category_id: category_id,
                color: color,
                size: size,
            }
        })

        return product;
    }
}

export { CreateProductService }