import { EntityRepository, Repository } from 'typeorm';
import { TravelDto } from './travel.dto';
import { Travel } from './travels.entity';

@EntityRepository(Travel)
export class TravelRepository extends Repository<Travel> {
  createDog = async (travel: TravelDto) => {
    return await this.save(travel);
  };
}
