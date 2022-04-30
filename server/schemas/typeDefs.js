// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
type User {
  _id: ID
  fName: String
  lName: String
  address: String
  city: String
  zipCode: String
  username: String
  email: String
  apiary: [Apiary]
  apiaryCount: Int
}

type Apiary {
  _id: ID
  username: String
  name: String
  hive: [Hive]
  shareFeeder: [ShareFeeder]
  hiveCount: Int
  shareFeederCount: Int
}

type Hive {
  _id: ID
  username: String
  name: String
  latitude: String
  longitude: String
  status: String
  beeBreed: String
  acquisitionSource: String
  acquisitionDate: String
  boxType: String
  frameCount: Int
  deploymentDate: String
}

type ShareFeeder {
  _id: ID
  username: String
  name: String
  latitude: String
  longitude: String
  status: String
}


  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    users: [User]
    apiaries(username: String!): [Apiary]
    apiary(_id: ID!): Apiary
    hives(username: String!): [Hive]
    hive(_id: ID!): Hive
    shareFeeders(username: String!): [ShareFeeder]
    shareFeeder(_id: ID!): ShareFeeder
  }

  input apiaryNew {
    name: String
    username: String
  }

  input HiveInput {
    name: String
  }

  input BeeFeederInput {
    name: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addApiary(apiaryNew: String!): Apiary
    addHive(hiveData: HiveInput): Apiary
    addFeeder(feederFormData: String!): ShareFeeder
    removeApiary(_Id: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
