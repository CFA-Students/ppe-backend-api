import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersService {
  private readonly users: UsersDto = {
    1: {
      id: 1,
      name: 'Jarod',
      email: 'ejilane.jarod@gmail.com',
      emailVerifiedAt: '2021-03-10 21:38:33',
      password: 'jarod321',
      createdAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
      isOnline: false,
    },
    2: {
      id: 2,
      name: 'Benjamin',
      email: 'benjamim@gmail.com',
      emailVerifiedAt: '2021-03-10 21:38:33',
      password: 'benjamin123',
      createdAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
      isOnline: false,
    },
  };

  findAll(): UsersDto {
    return this.users;
  }

  create(newUser: UserDto): void {
    const id = new Date().valueOf();
    this.users[id] = {
      ...newUser,
      id,
    };
  }

  find(id: number): UserDto {
    const record: UserDto = this.users[id];

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  update(updatedUser: UserDto): void {
    if (this.users[updatedUser.id]) {
      this.users[updatedUser.id] = updatedUser;
      return;
    }

    throw new Error('No record found to update');
  }

  delete(id: number): void {
    const record: UserDto = this.users[id];

    if (record) {
      delete this.users[id];
      return;
    }

    throw new Error('No record found to delete');
  }
}
