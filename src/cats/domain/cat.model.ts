import { randomUUID } from 'crypto';

export class Cat {

  constructor(name: string, age: number, homeAddress: string) {
    this.id = randomUUID();
    this.name = name;
    this.age = age;
    this.homeAddress = homeAddress;

  }

  id: string;

  name: string;

  age: number;

  homeAddress: string;
}