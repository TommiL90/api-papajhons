import { compare, hashSync } from "bcryptjs";
import {
  TCreateUser,
  TLogin,
  TResCreateUser,
  TUser,
  TUsersList,
} from "../../interfaces/user.interfaces";
import prisma from "../../prisma";
import { resCreateUserSchema, usersListSchema } from "../../schemas/user.schema";
import { AppError } from "../../errors/AppError";
import { sign } from "jsonwebtoken";

const createUserService = async (
  payload: TCreateUser
): Promise<TResCreateUser> => {

  const email = await prisma.user.findUnique({
    where:{
      email: payload.email
    }
  })

  if(email){
    throw new AppError("Email already in use", 409)
  }

  const hashedPassword = hashSync(payload.password, 10);
  const data = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  const newUser = resCreateUserSchema.parse(data);

  return newUser;
};

const loginUserService = async (payload: TLogin): Promise<string> => {
  const user = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const pwdMatch: boolean = await compare(payload.password, user.password);

  if (!pwdMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { randomKey: "randomValue" },
    String(process.env.SECRET_KEY),
    { expiresIn: "24h", subject: String(user.id) }
  );

  return token;
};

const updateUserService = async (
  payload: Partial<TCreateUser>,
  id: number
): Promise<TResCreateUser> => {
  const user = await prisma.user.findFirst({
    where: {
      id: id
    }
  });

const updatedUser = await prisma.user.update({
  where:{
    id: id
  },
  data:{...user, ...payload}
})

  return resCreateUserSchema.parse(updatedUser);
};


const deleteUserService = async (idUser: number): Promise<void> => {

  await prisma.user.update({
    where: {
      id: idUser,
    },
    data: {
      deletedAt: new Date(),
    },
  });  

}

const getActiveUsers = async (): Promise<TUsersList> => {
  const activeUsers = await prisma.user.findMany({
    where: {
      deletedAt: null,
    },
  });
  return usersListSchema.parse(activeUsers);
}; 

export default { createUserService, loginUserService, updateUserService, deleteUserService, getActiveUsers };
