// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    fName: String
    lName: String
    address: String
    city: String
    zipCode: String
    apiaryCount: Int
    Apiary: [Apiary]
    # SavedApiary: [Apiary]
    # savedApiary: [new Apiary().schema]
  }

  type Hive {
    _id: ID
    name: String
    lat: String
    lng: String
    status: String
    beeBreed: String
    ApplicationSource: String
    AcquisitionDate: String
    boxType: String
    frameCount: Int
    DeploymentDate: String
  }

  type ShareFeeder {
    _id: ID
    name: String
    lat: String
    lng: String
    status: String
  }



  # type Actions {
  #   _id: ID!
  #   actionType: String
  #   resource: String
  #   quantity: Int
  #   uam: String
  #   actionDate: date
  #   link: String
  #   savedUsers: [User]
  # }

  type Apiary {
    _id: ID
    name: String
     Hive: [Hive]
     ShareFeeder: [ShareFeeder]
  }

  input ApiaryInput {
    name: String
  }

  input HiveInput {
    name: String
  }

  input BeeFeederInput {
    name: String
  }

  

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }
  #  type Query {
  #   Apiary: User
  # }
  #  type Query {
  #   Hive: User
  # }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addApiary(apiaryData: ApiaryInput): User
    addHive(hiveData: HiveInput): User
    addBeeFeeder(beeFeederData: BeeFeederInput): User
    removeApiary(_Id: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
