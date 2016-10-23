import { printAST } from 'apollo-client';
import { NetworkInterface, Request } from 'apollo-client/networkInterface';

import { GraphQLSchema, GraphQLResult, graphql } from 'graphql';

export interface LocalNetworkInterfaceOptions {
  schema: GraphQLSchema;
  opts?: RequestInit;
}

export class LocalNetworkInterface implements NetworkInterface {
  private schema: GraphQLSchema = null;
  public constructor(schema: GraphQLSchema, opts: RequestInit = {}) {
    this.schema = schema;
  }
  public query(request: Request): Promise<GraphQLResult> {
    const { query, variables } = request;
    return graphql(
      this.schema,
      printAST(query),
      null,
      null,
      variables
    );
  }
  public getSchema(): GraphQLSchema {
    return this.schema;
  }
}

export function createLocalNetworkInterface(interfaceOpts: LocalNetworkInterfaceOptions): LocalNetworkInterface {
  const {
    opts = {},
    schema,
  } = interfaceOpts || {} as LocalNetworkInterfaceOptions;
  if (!schema) {
    throw 'A schema is required for a network layer';
  }
  return new LocalNetworkInterface(schema, opts);
}
