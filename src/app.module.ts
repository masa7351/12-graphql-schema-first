import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
// import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { RolesModule } from "./roles/roles.module";
import { ApolloServerPluginCacheControl } from "apollo-server-core";
import responseCachePlugin from "apollo-server-plugin-response-cache";

@Module({
  imports: [
    CatsModule,
    RolesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        const options = {
          typePaths: ["./**/*.graphql"],
          // transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
          // installSubscriptionHandlers: true,
          plugins: [
            ApolloServerPluginCacheControl({
              defaultMaxAge: 50,
              calculateHttpHeaders: false,
            }),
            responseCachePlugin(),
          ],
        };
        return options;
      },
    }),
  ],
})
export class AppModule {}
