import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './common/config/typeorm.config';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
    }),
   
    UserModule,
   
    RoleModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
