// import {
//   HttpException,
//   HttpStatus,
//   Injectable,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { AdminDto } from './admin.dto';
// import { AdminsDto } from './admins.dto';
// import { Admin } from './admin.entity';

// @Injectable()
// export class AdminsService {
//   constructor(
//     @InjectRepository(Admin)
//     private adminsRepository: Repository<Admin>
//   ) {}

//   // async findAll(): Promise<AdminsDto> {
//   //   return await this.adminsRepository.find();
//   // }

//   async findById(id: number): Promise<AdminDto> {
//     const record = await this.adminsRepository.findOne(id);

//     if (record) {
//       console.debug('find by id :', record);
//       return record;
//     }

//     throw new HttpException('No user found', HttpStatus.NOT_FOUND);
//   }

//   // async find(email: string): Promise<AdminDto> {
//   //   const record = await this.adminsRepository.findOne({ email });
//   //   console.log(email);

//   //   if (record) {
//   //     console.debug('find by email :', record);
//   //     return record;
//   //     // new HttpException('Forbidden', HttpStatus.FORBIDDEN);
//   //   }

//   //   throw new HttpException('No user found', HttpStatus.NOT_FOUND);
//   // }

//   async insert(newAdmin: AdminDto): Promise<void> {
//     await this.adminsRepository.insert(newAdmin);
//   }

//   async update(updatedAdmin: AdminDto): Promise<void> {
//     await this.adminsRepository.save(updatedAdmin);
//   }

//   async delete(id: number): Promise<void> {
//     await this.adminsRepository.delete(id);
//   }
// }
