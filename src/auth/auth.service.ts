import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '@/user/user.service';
import { AuthMethod, User } from '@prisma/__generate__';
import { Request } from 'express-session';
@Injectable()
export class AuthService {
  public constructor(private readonly userService: UserService) {}

  public async register(req: Request, dto: RegisterDto) {
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

    return this.saveSession(req, newUser);
  }

  public async login() {}

  public async logout() {}

  private async saveSession(req: Request, user: User) {
    return new Promise((res, rej) => {
      req.session.userId = user.id;

      req.session.save((err: Error) => {
        if (err) {
          return rej(
            new InternalServerErrorException(
              `Не удалось сохранить сессию. 
              Проверьте, правильно ли настроены параметры сессии.`,
            ),
          );
        }
        res({ user });
      });
    });
  }
}
