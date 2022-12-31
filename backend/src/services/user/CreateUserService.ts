import prismaClient from '../../prisma/index';
import { hash } from 'bcryptjs';

interface UserRequest{
    name: string;
    email: string;
    password: string;
    admin: boolean;
}

class CreateUserService{
    async execute({name, email, password, admin}: UserRequest){
        
        if(!email){
            throw new Error('Email incorrect')
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email,
            }
        })

        if(userAlreadyExists){
            throw new Error('User already exist')
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
                admin: false,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserService };