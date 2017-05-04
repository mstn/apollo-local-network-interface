import { printAST, NetworkInterface, Request } from 'apollo-client';

import { GraphQLSchema, ExecutionResult, graphql } from 'graphql';

export interface LocalNetworkInterfaceOptions {
  schema: GraphQLSchema;
}

export class LocalNetworkInterface implements NetworkInterface {
  private schema: GraphQLSchema;
  public constructor(schema: GraphQLSchema) {
    this.schema = schema;
  }
  public query(request: Request): Promise<ExecutionResult> {
    const { query, variables } = request;
    return graphql(
      this.schema,
      printAST(query),
      null,
      null,
      variables,
    );
  }
  public getSchema(): GraphQLSchema {
    return this.schema;
  }
}

export function createLocalNetworkInterface(options: LocalNetworkInterfaceOptions): LocalNetworkInterface {
  const { schema } = options;
  return new LocalNetworkInterface(schema);
}
