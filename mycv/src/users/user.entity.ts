import { IsEmail } from 'class-validator';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id ${this.id}`);
  }
}
