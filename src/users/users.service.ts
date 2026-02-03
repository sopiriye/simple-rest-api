import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'sopiriye',
      email: 'sopiriyerobinson@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'divine',
      email: 'divinerobinson@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'robinson',
      email: 'robinson@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'glory',
      email: 'gloryrobinson@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'biodun',
      email: 'biodunrobinson@gmail.com',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);

      if (rolesArray.length === 0) {
        throw new NotFoundException('User Not Found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  create(createUser: CreateUserDTO) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUser,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
