import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as jwt from 'jsonwebtoken';
import PG_CONNECTION, { secret } from 'utils/urls';
import * as schema from 'schema/schema';

interface jwtPayload {
  name: string;
  id: number;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(PG_CONNECTION) db: NodePgDatabase<typeof schema>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roles) {
      const request = context.switchToHttp().getRequest();
      const token = request.headers?.authorization;

      //verify token
      try {
        const verified = jwt.verify(token, secret) as jwtPayload;
      } catch (error) {
        return false;
      }
    }

    return true;
  }
}
