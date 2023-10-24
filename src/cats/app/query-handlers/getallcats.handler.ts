import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CatRepository } from "src/cats/domain/repos/cat.repository";
import { GetAllCats } from "../queries/getallcats";
import { CatDto } from "../dtos/catdto";
import { Repository } from "src/cats/infrastructure/repository";
import { Cat } from "src/cats/domain/cat.model";

@QueryHandler(GetAllCats)
export class GetAllCatsHandler implements IQueryHandler<GetAllCats> {
  constructor(
    private repository: CatRepository,
    private crepository: Repository<Cat, Cat>
  ) {
  }

  async execute(query: GetAllCats) {
    let cats = this.repository.getAll();

    return cats.map(cat => new CatDto(cat.id, cat.name, cat.age, cat.homeAddress));
  }
}