Use ApolloClient without a GraphQL server. This is a porting of [relay-local-schema](https://github.com/relay-tools/relay-local-schema) for Apollostack.

# Usage

`LocalNetworkLayer` enables ApolloClient to execute GraphQL queries and mutations locally.

```js
import ApolloClient from 'apollo-client';

import schema from './data/schema';

const networkInterface = createLocalNetworkInterface({ schema });
const client = new ApolloClient({ networkInterface });

// ... then you can use client.query or client.mutate as usual (see tests for examples)
```

# Why

As the original package [relay-local-schema](https://github.com/relay-tools/relay-local-schema) for Relay framework, `LocalNetworkLayer` could be useful in a variety of cases:
* testing,
* demos,
* client side wrapper for legacy REST APIs.

# Credits

* Strongly influenced by and based on [relay-local-schema](https://github.com/relay-tools/relay-local-schema).
* Steven Luscher [REST API GraphQL wrapper](http://graphql.org/blog/rest-api-graphql-wrapper/)
* @dalgard @stubailo and @linonetwo in [this discussion](https://github.com/apollostack/apollo-client/issues/379) on GH
