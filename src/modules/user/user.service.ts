import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user-dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) { }

  public async create(createUser: CreateUserDto): Promise<UserDto> {
    try {
      const user = this.repo.create(createUser);
      const dbUser = await this.repo.save(user);
      this.repo.save(user);

      return plainToInstance(UserDto, dbUser);
    }
    catch (e) {
      throw new InternalServerErrorException("Error trying to create user");
    }
  }

public async findAll(): Promise<UserDto[]> {
  const users = await this.repo.find({
  /*   relations: ['userRoles'] */
  });
  return plainToInstance(UserDto, users);
}

public async findById(id: string): Promise<User>{
  const user = await this.repo.findOneBy({
    id
  })
 if (!user) throw new NotFoundException();
 return user
}

public async findOne(id: string): Promise<UserDto> {
  const user = await this.findById(id);
  return plainToInstance(UserDto, user);
}

public async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
  const user = await this.findById(id);
  const newUser: User = {
    ...user,
    ...updateUserDto
  };
  this.repo.save(newUser);
  return plainToInstance(UserDto, user);
}

public async remove(id: string): Promise<void> {
  const user = await this. findById(id);
  await this.repo.remove(user);  
}


/*   public create(createUser: CreateUserDto): User {
    try {
      return  this.userRepository.create(createUser);
    } catch (e) {
      throw new BadRequestException('Something went wrong')
    }

  } 

  public findAll() {
    return this.userRepository.findAll();
  }

  public findOne(id: string): User {
    return this.userRepository.findOne(id);
  }

  public update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  public remove(id: string) {
    return this.userRepository.remove(id);
  }*/
}
