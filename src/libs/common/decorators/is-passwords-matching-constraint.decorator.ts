import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { RegisterDto } from '@/auth/dtos/register.dto';

@ValidatorConstraint({ name: 'IsPasswordsMatching', async: false })
export class IsPasswordsMatchingConstraint
  implements ValidatorConstraintInterface
{
  /**
   * Проверяет, совпадает ли подтверждение пароля с основным паролем.
   *
   * @param passwordRepeat
   * @param args
   * @returns
   */
  public validate(passwordRepeat: string, args: ValidationArguments) {
    const obj = args.object as RegisterDto;
    return obj.password === passwordRepeat;
  }

  /**
   * Возвращает сообщение по умолчанию, если валидация не прошла.
   *
   * @param validationArguments - Аргументы валидации.
   * @returns Сообщение об ошибке.
   */
  public defaultMessage(validationArguments?: ValidationArguments) {
    return 'Пароли не совпадают';
  }
}
