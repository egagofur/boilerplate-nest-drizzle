import { HttpException, Inject, Injectable } from '@nestjs/common';
import PG_CONNECTION from 'utils/urls';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from 'schema/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

interface SignUp {
  email: string;
  password: string;
  username: string;
}

interface SignIn {
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  async signup({ email, password, username }: SignUp) {
    const userExists = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));

    if (userExists.length > 0) {
      return 'user exists';
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.db
        .insert(schema.users)
        .values({ email, password: hashedPassword, username });
      return { user, token: this.generateToken(email, user.oid.toString())};
    }
  }

  async signin({ email, password }: SignIn) {
    const userExists = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));

    if (userExists.length > 0) {
      const isValidPassword = await bcrypt.compare(
        password,
        userExists[0].password,
      );

      if (!isValidPassword)
        throw new HttpException('Invalid username or password', 400);
      else {
        return {user: userExists[0], token: this.generateToken(email, userExists[0]?.id.toString())};
      }
    } else {
      return 'user does not exist';
    }
  }

  private generateToken(email: string, id: string) {
    const token = jwt.sign({ email, id }, process.env.SECRET, {
      expiresIn: 10000000,
    });
    return token;
  }
}
