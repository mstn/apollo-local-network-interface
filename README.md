Use ApolloClient without a GraphQL server. This is a porting of [relay-local-schema](https://github.com/relay-tools/relay-local-schema) for Apollostack.

# Usage

This package implements a common pattern for using ApolloClient without a GraphQL server.
The code is simple, even trivial, and you might prefer to roll up your own version.
You can add this package to your project with:

```
npm install mstn:apollo-local-network-interface#v1.0.0
```

`LocalNetworkInterface` enables ApolloClient to execute GraphQL queries and mutations locally.

```js
import ApolloClient from 'apollo-client';

import schema from './data/schema';

const networkInterface = createLocalNetworkInterface({ schema });
const client = new ApolloClient({ networkInterface });

// ... then you can use client.query or client.mutate as usual (see tests for examples)
```

# Why

As the original package [relay-local-schema](https://github.com/relay-tools/relay-local-schema) for Relay framework, `LocalNetworkInterface` could be useful in a variety of cases:
* testing,
* demos,
* client side wrapper for legacy REST APIs.

# Credits

* Strongly influenced by and based on [relay-local-schema](https://github.com/relay-tools/relay-local-schema).
* Steven Luscher [REST API GraphQL wrapper](http://graphql.org/blog/rest-api-graphql-wrapper/)
* @dalgard @stubailo and @linonetwo in [this discussion](https://github.com/apollostack/apollo-client/issues/379) on GH. In particular @linonetwo implemented a very similar `NetworkInterface` in [his blog](https://linonetwo.github.io/%E6%8A%8AREST%E5%8C%85%E8%A3%85%E6%88%90GraphQL/).

# More info

* @lucasconstantino wrote a very nice [blog post](https://medium.com/taller-team/graphql-today-using-apollo-for-applications-that-still-depend-on-rest-apis-839895ce20d0) about this topic. I recommend it!
