import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  
  const DefaultUserDto: CreateUserDto = {
    firstName: "default",
    lastName: "default",
    username: "default",
    email: "default",
    password: "default",

  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /Users', async () => {
    await request(app.getHttpServer())
    .post('/user')
    .send(DefaultUserDto)
    .expect(201);

    return request(app.getHttpServer())
    .get('/user')
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(1);
    });
  });
});
