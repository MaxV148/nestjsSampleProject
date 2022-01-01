import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'sfdsdfsf@gmsdx.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdw' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('should signup as a new user then get the currently logged in user', async () => {
    const email = 'ada@sdadas.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);
    console.log('TEST COOKIE', res.text);
    const cookie = res.get('Set-Cookie');
    console.log('COOKIE: ', cookie);

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);
    console.log('BODY: ', body);

    expect(body.email).toEqual(email);
  });
});
