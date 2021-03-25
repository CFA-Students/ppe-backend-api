import { Injectable } from '@nestjs/common';
import { User } from './user';
import { Users } from './users';

@Injectable()
export class UsersService {
  private readonly users: Users = {
    1: {
      id: 1,
      name: 'Jarod',
      email: 'ejilane.jarod@gmail.com',
      emailVerifiedAt: '2021-03-10 21:38:33',
      password: 'jarod321',
      createdAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
    },
    2: {
      id: 2,
      name: 'Benjamin',
      email: 'benjamim@gmail.com',
      emailVerifiedAt: '2021-03-10 21:38:33',
      password: 'benjamin123',
      createdAt: '2021-03-10 21:38:33',
      updatedAt: '2021-03-10 21:38:33',
    },
  };

  findAll(): Users {
    return this.users;
  }

  create(newUser: User): void {
    const id = new Date().valueOf();
    this.users[id] = {
      ...newUser,
      id,
    };
  }

  find(id: number): User {
    const record: User = this.users[id];

    if (record) {
      return record;
    }

    throw new Error('No record found');
  }

  update(updatedUser: User): void {
    if (this.users[updatedUser.id]) {
      this.users[updatedUser.id] = updatedUser;
      return;
    }

    throw new Error('No record found to update');
  }

  delete(id: number): void {
    const record: User = this.users[id];

    if (record) {
      delete this.users[id];
      return;
    }

    throw new Error('No record found to delete');
  }
}
