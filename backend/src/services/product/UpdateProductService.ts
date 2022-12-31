import prismaClient from '../../prisma';
import { RequestHandler } from 'express';

type ReqQuery = {
  query: string;
}

interface ProductRequest {
  product_id: any;
  name: string,
  price: string;
  description: string;
  banner: string;
  category_id: string;
  color: string;
  size: string;
}

class UpdateProductService {
  async execute({ product_id, name, price, description, banner, category_id, color, size }: ProductRequest) {
    const productUpdated = prismaClient.product.update({
      where: {
        id: String(product_id),
      },
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

    return productUpdated;
  }
}

export { UpdateProductService }
