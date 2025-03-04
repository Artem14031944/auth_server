import { Module } from '@nestjs/common';

console.log(process.env.POSTGRES_PASSWORD, 31123);

@Module({
  imports: [],
})
export class AppModule {}
