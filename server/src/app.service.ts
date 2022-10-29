import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCode(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const length = 4;
    let code = '';
    for (let i = 0; i < length; i++)
      code += letters.charAt(Math.random() * letters.length);
    return code;
  }
}
