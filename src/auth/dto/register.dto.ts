import { IsPasswordsMatchingConstraint } from '@/libs/common/decorators/is-passwords-matching-constraint.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Validate,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Имя должно быть строкой.' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения.' })
  name: string;

  @IsString({ message: 'Email должен быть строкой.' })
  @IsEmail({}, { message: 'Некорректеый формат email.' })
  @IsNotEmpty({ message: 'Email обязательно для заполнения.' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой.' })
  @IsNotEmpty({ message: 'Пароль обязательно для заполнения.' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов.' })
  password: string;

  @IsString({ message: 'Пароль подтвердения быть строкой.' })
  @IsNotEmpty({ message: 'Пароль подтвердения обязательно для заполнения.' })
  @MinLength(6, {
    message: 'Пароль подтвердения должен содержать минимум 6 символов.',
  })
  @Validate(IsPasswordsMatchingConstraint, { message: 'Пароли не совпадают' })
  passwordRepeat: string;
}
