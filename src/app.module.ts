import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { CatsModule } from "./cats/cats.module";
import { upperDirectiveTransformer } from "./common/directives/upper-case.directive";
import { RolesModule } from "./roles/roles.module";
import {ApolloServerPluginCacheControl} from 'apollo-server-core'
import responseCachePlugin from 'apollo-server-plugin-response-cache'

@Module({
  imports: [
    CatsModule,
    RolesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
      installSubscriptionHandlers: true,
      plugins: [
        ApolloServerPluginCacheControl({
          defaultMaxAge: 50,
          calculateHttpHeaders: false,
        }),
        responseCachePlugin(),
      ],
    }),
  ],
})
export class AppModule {}
