import { User } from '@prisma/client';

export class UsersEntity implements User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  cpf: string | null;
  cnpj: string | null;
  password: string;
  status: string;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
