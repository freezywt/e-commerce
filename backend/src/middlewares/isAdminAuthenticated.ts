import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import prismaClient from '../prisma';

interface Payload {
  sub: string;
}

export async function isAdminAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(
      token,
      process.env.HASH as string,
    ) as Payload;

    req.user_id = sub;
    
    const result = async () => { 
      const user = await prismaClient.user.findFirst({
        where: {
          id: sub
        },
        select: {
          admin: true,
        }
      });
      return user;
    }

    const user = await result();

    if(user?.admin == false) {
      return res.status(401).json({ message: 'This user is not admin!' }).end();
    }

    return next();
  } catch (err) {
    console.log(err)
    return res.status(404).end();
  }
}
