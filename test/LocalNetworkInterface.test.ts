import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
const { assert } = chai;

import {
  GraphQLSchema,
} from 'graphql';

import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import schema, { resetData } from './fixtures/schema';

import {
  createLocalNetworkInterface,
} from '../src/LocalNetworkInterface';

describe('local network interface', () => {

  beforeEach(() => {
    resetData();
  });

  it('should throw without a schema', () => {
    assert.throws(() => {
      createLocalNetworkInterface(null);
    }, /A schema is required for a network layer/);
  });

  it('should create an instance with a given schema', () => {
    const networkInterface = createLocalNetworkInterface({ schema });
    assert.instanceOf(networkInterface.getSchema(), GraphQLSchema);
  });

  it('should fetch data', (done) => {
    const networkInterface = createLocalNetworkInterface({ schema });
    const client = new ApolloClient({ networkInterface });
    const query = gql`
      query {
        widget {
          name
        }
      }
    `;
    client.query({
      query,
    }).then( ({ data, loading }) => {
      assert.isObject( data );
      assert.equal( loading, false );
      assert.deepEqual( data, { widget: {name: 'foo'}} );
      done();
    });
  });

  it('should execute mutation', (done) => {
    const networkInterface = createLocalNetworkInterface({ schema });
    const client = new ApolloClient({ networkInterface });
    const mutation = gql`
      mutation setWidgetName( $name: String! ) {
        setWidgetName(name: $name) {
          name
        }
      }
    `;
    client.mutate({
      mutation,
      variables: {
        name: 'fee',
      },
    }).then( ( { data } ) => {
      assert.deepEqual( data, { setWidgetName: {name: 'fee'}} );
      done();
    });
  });

});
