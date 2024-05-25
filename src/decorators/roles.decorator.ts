import { SetMetadata } from '@nestjs/common';

export function Roles(roles) {
  return SetMetadata('roles', roles);
}
