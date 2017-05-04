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

  it('should create an instance with a given schema', () => {
    const networkInterface = createLocalNetworkInterface({ schema });
    assert.instanceOf(networkInterface.getSchema(), GraphQLSchema);
  });

  it('should fetch data', () => {
    const networkInterface = createLocalNetworkInterface({ schema });
    const client = new ApolloClient({ networkInterface, addTypename: false });
    const query = gql`
      query {
        widget {
          name
        }
      }
    `;
    return client.query({
      query,
    }).then( ({ data, loading }: any) => {
      assert.isObject( data );
      assert.equal( loading, false );
      assert.deepEqual( data, { widget: {name: 'foo'}} );
    }).catch( (error) => {
      assert.isNotOk(error, 'Cannot fetch data');
    });
  });

  it('should execute mutation', () => {
    const networkInterface = createLocalNetworkInterface({ schema });
    const client = new ApolloClient({ networkInterface, addTypename: false });
    const mutation = gql`
      mutation setWidgetName( $name: String! ) {
        setWidgetName(name: $name) {
          name
        }
      }
    `;
    return client.mutate({
      mutation,
      variables: {
        name: 'fee',
      },
    }).then( ( { data }: any ) => {
      assert.deepEqual( data, { setWidgetName: {name: 'fee'}} );
    }).catch( (error) => {
      assert.isNotOk(error, 'Cannot mutate data');
    });
  });

});
