import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CatRepository } from "src/cats/domain/repos/cat.repository";
import { CatCreated } from "../events/catcreated";

@EventsHandler(CatCreated)
export class CatCreatedHandler implements IEventHandler<CatCreated> {
  constructor(
    private repository: CatRepository
  ) {
  }
    handle(event: CatCreated) {
        console.log("Cat created with id " + event.catId);
    }
}

