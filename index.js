const { ApolloServer, gql } = require('apollo-server')
const fetch = require('node-fetch')

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
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
    getMultipleCharactersByID(ids: String!): [Character!]!
  }
`;

const baseUrl = `https://rickandmortyapi.com/api`

const resolvers = {
  Query: {
    async getAllCharacters(parent, { page }) {
      let response = await fetch(`${baseUrl}/character/${page}`);
      let characters = await response.json();
      // the R&M api still returns a 200 even if nothing is found, it only returns an error field
      if(characters.error) {
        throw new Error(characters.error);
      }      
      return characters;    
    },
    //need to add error handling: i.e. if they pass in an id that doesn't exist
    async getCharacterByID(parent, { id }) {
      let response = await fetch(`${baseUrl}/character/${id}`);
      let character = await response.json();
      // the R&M api still returns a 200 even if nothing is found, it only returns an error field
      if(character.error) {
        throw new Error(character.error);
      }   
      return character; 
    },
    async getMultipleCharactersByID(parent, { ids }) {
      let response = await fetch(`${baseUrl}/character/${ids}`);
      let characters = await response.json();
      if(!characters || !characters.length) {
        // the R&M api doesn't throw any errors, it only returns an empty array
        throw new Error("No characters found");
      } 
      return characters;         
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