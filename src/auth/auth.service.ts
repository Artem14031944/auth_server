import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '@/user/user.service';
import { AuthMethod } from '@prisma/__generate__';

@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async register(dto: RegisterDto) {
    const isExists = await this.userService.findByEmail(dto.email);

    if (isExists) {
      throw new ConflictException(`
        Регистрация не удалось. Пользователь с таким email уже существует.
        Пожалуйста, используйте другой email или войдите в систему.
      `);
    }

    const newUser = await this.userService.create({
      email: dto.email,
      password: dto.password,
      displayName: dto.name,
      picture: '',
      method: AuthMethod.CREDENTIALS,
      isVerified: false,
    });

    return newUser;
  }

  public async login() {}

  public async logout() {}

  private async saveSession() {}
}
