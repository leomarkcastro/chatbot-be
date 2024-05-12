import { hashSync } from "bcrypt";
import { jwt_verify } from "../../../common/jwt";
import { GlobalContext } from "../../../common/types";
import { IChangePassword, IUserJwt } from "./UserJWT.dto";

export async function resetPassword(
  token: string,
  newPassword: string,
  context: GlobalContext,
) {
  const decoded = (await jwt_verify(token)) as IUserJwt;
  if (!decoded) return;
  if (decoded.type !== "reset-password") return;

  const hashedPassword = hashSync(newPassword, 10);

  const userObj = await context.prisma.user.findUnique({
    where: { id: decoded.id },
    include: {
      localAuth: true,
    },
  });
  if (!userObj) throw new Error("User not found");

  if (!userObj.localAuth) {
    await context.prisma.user.update({
      where: { id: decoded.id },
      data: {
        localAuth: {
          create: {
            password: hashedPassword,
          },
        },
      },
    });
  }

  await context.prisma.user.update({
    where: { id: decoded.id },
    data: {
      localAuth: {
        update: {
          password: hashedPassword,
        },
      },
    },
  });
}

export async function changePassword(
  user: {
    id: string;
  },
  passwordInput: IChangePassword,
  context: GlobalContext,
) {
  const userObj = await context.prisma.user.findUnique({
    where: { id: user.id },
    include: {
      localAuth: true,
    },
  });
  if (!userObj) throw new Error("User not found");

  if (!userObj.localAuth) {
    // create local auth
    const hashedPassword = hashSync(passwordInput.newPassword, 10);

    await context.prisma.userLocalAuth.create({
      data: {
        password: hashedPassword,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return;
  }
}
