"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_client_1 = require("apollo-client");
var graphql_1 = require("graphql");
var LocalNetworkInterface = (function () {
    function LocalNetworkInterface(schema) {
        this.schema = schema;
    }
    LocalNetworkInterface.prototype.query = function (request) {
        var query = request.query, variables = request.variables;
        return graphql_1.graphql(this.schema, apollo_client_1.printAST(query), null, null, variables);
    };
    LocalNetworkInterface.prototype.getSchema = function () {
        return this.schema;
    };
    return LocalNetworkInterface;
}());
exports.LocalNetworkInterface = LocalNetworkInterface;
function createLocalNetworkInterface(options) {
    var schema = options.schema;
    return new LocalNetworkInterface(schema);
}
exports.createLocalNetworkInterface = createLocalNetworkInterface;
//# sourceMappingURL=LocalNetworkInterface.js.map