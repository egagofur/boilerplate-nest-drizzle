import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import PG_CONNECTION from 'utils/urls';
import * as schema from 'schema/schema';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PG_CONNECTION) private db: NodePgDatabase<typeof schema>,
  ) {}

  create() {
    return 'This action adds a new product';
  }

  async findAll() {
    const products = this.db.select().from(schema.products);
    return products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
