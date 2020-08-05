import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from 'src/users/user.entity';
import { userFactory } from 'src/users/user.factory';

export class SeedUsersTable1592697234870 implements MigrationInterface {
  name = 'seed_users_table_1592697234870';

  public async up(queryRunner: QueryRunner): Promise<any> {
    let users: User[] = [];
    for (let i = 0; i < 10; i++) {
      users.push(userFactory());
    }
    users = await queryRunner.manager.save(users);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.clearTable('users');
  }
}
