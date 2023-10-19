import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateCat } from "../commands/CreateCat";
import { CatRepository } from "src/cats/domain/repos/cat.repository";
import { CatCreated } from "../events/catcreated";
import { CatDto } from "../dtos/catdto";

@CommandHandler(CreateCat)
export class CreateCatHandler implements ICommandHandler<CreateCat> {
  constructor(
    private repository: CatRepository,
    private eventBus: EventBus
  ) {
  }

  async execute(command: CreateCat) {
    const { name, age, homeAddress } = command;
    let createdCat = this.repository.createOne(name, age, homeAddress);
    this.eventBus.publish(new CatCreated(createdCat.id));
    return new CatDto(createdCat.id, createdCat.name, createdCat.age, createdCat.homeAddress);
  }
}