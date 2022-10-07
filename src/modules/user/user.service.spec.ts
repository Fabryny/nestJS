import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user-dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;
  
  const DefaultUserDto: User = {
    firstName: "default",
    lastName: "default",
    username: "default",
    email: "default",
    password: "default",
    active: true,
    id: 'id',
    salt: 'salt'

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });


  describe(UserService.prototype.create, () => {

    it('should be success', () => {
      jest.spyOn(repository, 'create').mockReturnValue(DefaultUserDto);
      const user = service.create(DefaultUserDto);
      expect(user.username).toBe(DefaultUserDto.username);
      expect(user.id).toBeDefined();
    });

    it('should be fail', () => {
      jest.spyOn(repository, 'create').mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });
      const t = () => service.create(DefaultUserDto);
      expect(t).toThrow(BadRequestException);
    });
    
  });

  describe(UserService.prototype.update, () => {
    it('should be defined', () => {  
      jest.spyOn(repository, 'update').mockReturnValue(DefaultUserDto);
      const user = service.update('1', DefaultUserDto);
      expect(user.username).toBe(DefaultUserDto.username);
    });
  });
/* 
  describe(UserService.prototype.findAll, () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repository).toBeDefined();
    });
  }); */

});
