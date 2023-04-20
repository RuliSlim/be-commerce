import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Store } from '../entities/store.entity';

@Injectable()
export class StoreRepository extends Repository<Store> {
  constructor(private dataSource: DataSource) {
    super(Store, dataSource.createEntityManager());
  }
}
