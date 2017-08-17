import { NetworkInterface, Request } from 'apollo-client';
import { GraphQLSchema, ExecutionResult } from 'graphql';
export interface LocalNetworkInterfaceOptions {
    schema: GraphQLSchema;
}
export declare class LocalNetworkInterface implements NetworkInterface {
    private schema;
    constructor(schema: GraphQLSchema);
    query(request: Request): Promise<ExecutionResult>;
    getSchema(): GraphQLSchema;
}
export declare function createLocalNetworkInterface(options: LocalNetworkInterfaceOptions): LocalNetworkInterface;
