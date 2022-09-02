import { Module } from "@nestjs/common";
import { RolesModule } from "src/roles/roles.module";
import { OwnersModule } from "../owners/owners.module";
import { CatOwnerResolver } from "./cat-owner.resolver";
import { CatsResolver } from "./cats.resolver";
import { CatsService } from "./cats.service";

@Module({
  imports: [OwnersModule, RolesModule],
  providers: [CatsService, CatsResolver, CatOwnerResolver],
})
export class CatsModule {}
