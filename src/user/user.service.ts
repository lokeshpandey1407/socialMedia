import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {name, bio,username, email, profile_image, age, password} = createUserDto;
    const existingEmailUser = await this.userRepository.findOneBy({ email });
    if (existingEmailUser) {
      throw new ConflictException('Email is already registered');
    }

    const existingUsernameUser = await this.userRepository.findOneBy({username});
    if(existingUsernameUser){
      throw new ConflictException('Username is already taken')
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.bio = bio;
    user.username = username;
    try {
      const hash = await bcrypt.hash(password, 8);
      user.password = hash;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to hash password');
    }
    user.profile_image = profile_image;
    user.age = age;
    return this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User> {
   return this.userRepository.findOneBy({ id }).then(user => {
      if (!user) {
        throw new NotFoundException()
      }
      else return user
    })
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username }).then(user => {
      if(!user){
        throw new NotFoundException()
      } else return user
    })
  }

  async findOneByEmail(email: string) :Promise<User> {
    return this.userRepository.findOneBy({ email }).then(user=>{
      if(!user){
        throw new NotFoundException()
      }else return user
    })
  }

  async findOneByName (name:string) :Promise <User>{
    return this.userRepository.findOneBy({name}).then (user =>{
      if(!user){
        throw new NotFoundException()
      }else return user
    })
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  deleteById(id: number) {
    return this.userRepository.delete(id);
  }
}
