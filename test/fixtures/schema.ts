// adapted from
// https://github.com/relay-tools/relay-local-schema/blob/master/test/fixtures/schema.js

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const widget: { name: string } = {
  name: '',
};

export function resetData() {
  widget.name = 'foo';
}

const Widget = new GraphQLObjectType({
  name: 'Widget',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
});

const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    widget: {
      type: Widget,
      resolve: () => widget,
    },
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    setWidgetName: {
      type: Widget,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve: (root, { name }) => {
        widget.name = name;
        return widget;
      },
    },
  },
});

export default new GraphQLSchema({ query, mutation });
