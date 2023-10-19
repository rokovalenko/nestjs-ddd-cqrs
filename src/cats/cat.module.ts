import { Module } from '@nestjs/common';
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from 'path';
import { CatResolver } from './app/resolvers/cat.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateCatHandler } from './app/command-handlers/createcat.handler';
import { CatCreatedHandler } from './app/event-handlers/catcreated.handler';
import { GetAllCatsHandler } from './app/query-handlers/getallcats.handler';
import { InMemoryCatRepository } from './infrastructure/inmemory.cat.repository';
import { CatRepository } from './domain/repos/cat.repository';

export const CommandHandlers = [CreateCatHandler];
export const EventHandlers = [CatCreatedHandler];
export const QueryHandlers = [GetAllCatsHandler];

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/cats/schema.gql'),
      sortSchema: true,
    }),
    CqrsModule
  ],
  providers: [
    CatResolver,
    {
      provide: CatRepository,
      useClass: InMemoryCatRepository
    },
    InMemoryCatRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers]
})

export class CatModule { }
