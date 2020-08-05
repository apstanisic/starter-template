import * as bcrypt from 'bcryptjs';
import * as Faker from 'faker';
import { User } from './user.entity';

/* This will only once hash password */
// const passwordHash = bcrypt.hashSync('password', 12);
const passwordHash = bcrypt.hashSync('password', 12);

export function userFactory(): User {
  const user = new User();
  user.id = Faker.random.uuid();
  user.email = Faker.internet.email().toLowerCase();
  user.password = passwordHash;
  user.name = Faker.name.firstName();
  user.confirmed = true;
  user.phoneNumber = Faker.phone.phoneNumber();

  return user;
}
