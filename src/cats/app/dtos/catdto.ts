import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CatDto {
    constructor(
      id: string,
      name: string,
      age: number,
      homeAddress: string
    )
    {
      this.id = id;
      this.name = name;
      this.age = age;
      this.homeAddress = homeAddress;
    }

    @Field()
    id: string;

    @Field()
    name: string;
  
    @Field( _ => Int)
    age: number;
  
    @Field()
    homeAddress: string;
  }