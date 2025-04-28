import { faker } from '@faker-js/faker/.';
import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  const hashedPassword = await bcrypt.hash('password111', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'admin@skill-track.co.uk',
        password: hashedPassword,
        name: 'Test Admin',
        role: 'ADMIN',
      },
      {
        email: 'test-client@skill-track.co.uk',
        password: hashedPassword,
        name: 'Test Client',
        role: Role.USER
      },
      // {
      //   email: 'client1@skill-track.co.uk',
      //   password: hashedPassword,
      //   firstName: 'Alice',
      //   role: Role.USER
      // },
      // {
      //   email: 'client2@skill-track.co.uk',
      //   password: hashedPassword,
      //   firstName: 'Bob',
      //   role: Role.USER
      // },
      // {
      //   email: 'dj1@skill-track.co.uk',
      //   password: hashedPassword,
      //   firstName: 'Charlie',
      //   role:Role.USER,
      // },
      // {
      //   email: 'dj2@skill-track.co.uk',
      //   password: hashedPassword,
      //   firstName: 'Diana',
      //   role:Role.USER,
      // }
    ],
  });
}
