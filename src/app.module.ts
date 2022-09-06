import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
// import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { RolesModule } from "./roles/roles.module";
import {
  ApolloServerPluginCacheControl,
  // ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
// import responseCachePlugin from "apollo-server-plugin-response-cache";
// import Keyv from "keyv";
// import KeyvRedis from "@keyv/redis";
// import Redis from "ioredis";
// import { KeyvAdapter } from "@apollo/utils.keyvadapter";
@Module({
  imports: [
    CatsModule,
    RolesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => {
        // const cluster = new Redis.Cluster([{ host: "localhost", port: 6379 }]);
        const options = {
          typePaths: ["./**/*.graphql"],
          // transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
          // installSubscriptionHandlers: true,
          plugins: [
            ApolloServerPluginCacheControl({
              defaultMaxAge: 50,
              calculateHttpHeaders: false,
            }),
            // responseCachePlugin(),
            // ApolloServerPluginLandingPageLocalDefault({ embed: true }),
          ],
          // cache: new KeyvAdapter(new Keyv({ store: new KeyvRedis(cluster) }), {
          //   disableBatchReads: true,
          // }),
        };
        return options;
      },
    }),
  ],
})
export class AppModule {}
