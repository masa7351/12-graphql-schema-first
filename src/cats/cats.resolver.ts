import { ParseIntPipe, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
// import { RolesGuard } from "src/common/roles.guard";
import { RolesService } from "src/roles/roles.service";
import { Cat } from "../graphql.schema";
import { CatsGuard } from "./cats.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";

const pubSub = new PubSub();

@Resolver("Cat")
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService,
    private readonly rolesService: RolesService
  ) {}

  @Query("cats")
  @UseGuards(CatsGuard)
  // @UseGuards(RolesGuard)
  async getCats(): Promise<Cat[]> {
    const message = this.rolesService.helloWorld();
    console.log("message:", message);
    return this.catsService.findAll();
  }

  @Query("cat")
  async findOneById(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<Cat> {
    return this.catsService.findOneById(id);
  }

  @Mutation("createCat")
  async create(@Args("createCatInput") args: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish("catCreated", { catCreated: createdCat });
    return createdCat;
  }

  @Subscription("catCreated")
  catCreated() {
    return pubSub.asyncIterator("catCreated");
  }
}
