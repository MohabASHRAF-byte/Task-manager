import { ConflictException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({
      username,
      password,
    });

    const salt: string = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);

    try {
      await this.save(user);
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        if ((error as any).code === '23505') {
          throw new ConflictException('Username already exists');
        }
      }
    }
  }
}
