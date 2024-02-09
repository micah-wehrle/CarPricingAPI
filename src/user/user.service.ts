import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  public create(email: string, password: string) {
    const user = this.repo.create({email, password});
    return this.repo.save(user);
  }

  public findOne(id: number): Promise<User> {
    return this.repo.findOneBy( {id} );
  }

  public find(email: string): Promise<User[]> {
    return this.repo.find({where: {email}});
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  public remove(id: number) {
    
  }
}
