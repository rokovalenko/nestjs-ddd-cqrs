import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CatRepository } from "src/cats/domain/repos/cat.repository";
import { GetAllCats } from "../queries/getallcats";
import { CatDto } from "../dtos/catdto";

@QueryHandler(GetAllCats)
export class GetAllCatsHandler implements IQueryHandler<GetAllCats> {
  constructor(
    private repository: CatRepository
  ) {
  }

  async execute(query: GetAllCats) {
    let cats = this.repository.getAll();

    return cats.map(cat => new CatDto(cat.id, cat.name, cat.age, cat.homeAddress));
  }
}