const { ApolloServer, gql } = require('apollo-server')

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # This "Book" type can be used in other type declarations.
  type Info {
    count: Int
    pages: Int
    next: String
    prev: String
  }

  type Character {
    id: ID!
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Origin
    location: Location
    image: String
    episode: [String]
    url: String
    created: String
  }

  type Location {
    name: String
    url: String
  }

  type Origin {
    name: String
    url: String
  }

  type Query {
    characters: [Character]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    characters: () => books,
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