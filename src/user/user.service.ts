import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './dto/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.bio = createUserDto.bio;
    user.username = createUserDto.username;
    try {
      const hash = await bcrypt.hash(createUserDto.password, 8);
      user.password = hash;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to hash password');
    }
    user.profile_image = createUserDto.profile_image;
    user.age = 29;
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
   return this.userRepository.findOneBy({ id });   
  }

  findOneByUsername(username: string) :Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  deleteById(id: number) {
    return this.userRepository.delete(id);
  }
}
