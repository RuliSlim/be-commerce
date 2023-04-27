import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { StoreRepository } from './repositories/store.repository';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = await this.storeRepository.create(createStoreDto);
    await this.storeRepository.save(store);
    return store;
  }

  async findAll() {
    // const store = new Store()
    // console.log(this.storeRepository.remove(store), '<<<');
    // const coba = await this.storeRepository.coba();
    const stores: Store[] = await this.storeRepository.find();
    return stores;
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
