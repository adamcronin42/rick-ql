const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # This "Book" type can be used in other type declarations.
  type Info {
    count: Int!
    pages: Int!
    next: String!
    prev: String!
  }

  type CharacterInfo {
    info: Info!
    results: [Character!]!
  }

  type Character {
    id: ID!
    name: String!
    status: String!
    species: String!
    type: String!
    gender: String!
    origin: Origin!
    location: Location!
    image: String!
    episode: [String!]!
    url: String!
    created: String!
  }

  type Location {
    name: String!
    url: String!
  }

  type Origin {
    name: String!
    url: String!
  }

  type Query {
    getAllCharacters(page: String): CharacterInfo!
    getCharacterByID(id: ID!): Character
  }
`;

const baseUrl = `https://rickandmortyapi.com/api`

const resolvers = {
  Query: {
    getAllCharacters: (parent, { page }) => {
      return fetch(`${baseUrl}/character/${page}`).then(res => res.json())
    },
    getCharacterByID: (parent, { id }) => {
      return fetch(`${baseUrl}/character/${id}`).then(res => res.json())
    },
  },
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({url}) => {
  console.log(`Server ready at ${url}`);
});