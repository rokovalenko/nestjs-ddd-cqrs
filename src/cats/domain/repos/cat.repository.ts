import { Injectable } from "@nestjs/common";
import { Cat } from "../cat.model";

@Injectable()
export abstract class CatRepository {
    getAll(): Cat[] { return null }

    getById(id: string): Cat { return null }

    createOne(name: string, age: number, homeAddress: string): Cat { return null }
}