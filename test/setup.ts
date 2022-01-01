import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

//Globales beforeEach() wird vor jedem Test ausgeführt -> "setupFilesAfterEnv": ["<rootDir>/setup.ts"]
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

//nach jedem Test die Verbindung mit typeorm kappen
global.afterEach(async () => {
  const conn = getConnection();
  await conn.close();
});
