import { Injectable } from "@nestjs/common";
import { Cat } from "../domain/cat.model"
import { CatRepository } from "../domain/repos/cat.repository";

@Injectable()
export class InMemoryCatRepository implements CatRepository {
    private cats: Cat[] = [new Cat("Fluffers", 12, "Ashes Street 1")]

    public getAll(): Cat[] {
        return this.cats;
    }

    public getById(id: string): Cat {
        return this.cats[0];
    }

    public createOne(name: string, age: number, homeAddress: string): Cat {
        var cat = new Cat(name, age, homeAddress);
        this.cats.push(cat);
        return cat;
    }
}