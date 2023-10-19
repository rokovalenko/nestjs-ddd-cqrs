import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateCat } from "../commands/createcat";
import { GetAllCats } from "../queries/getallcats";
import { CatDto } from "../dtos/catdto";

@Resolver(of => CatDto)
export class CatResolver {

  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {
  }

  @Query(returns => [CatDto])
  async getall() {
    return this.queryBus.execute(new GetAllCats());
  }

  @Mutation(returns => CatDto)
  async create(
    @Args('name', {type: () => String}) name: string,
    @Args('age', {type: () => Int}) age: number,
    @Args('HomeAddress', {type: () => String}) homeAddress: string)
  {
    this.commandBus.execute(new CreateCat(name,age,homeAddress));
  }
}