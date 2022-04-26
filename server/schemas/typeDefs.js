// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    fName: String
    lName: String
    address: String
    city: String
    zipCode: String
    apiaryCount: Int
    savedApiary: [Apiary]
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
    name: String

    # savedHive: [Hive]
    #savedHive: [ShareFeeder]
  }

  input ApiaryInput {
    name: String
    # apiaryId: String
  }

  # type Hive {
  #   name: String
  #   latitude: String
  #   longitude: String
  #   status: String
  #   beeBreed: String
  #   ApplicationSource: String
  #   AcquisitionDate: date
  #   boxType: String
  #   frameCount: Int
  #   DeploymentDate: date
  # }
  # type ShareFeeder {
  #   name: String
  #   latitude: String
  #   longitude: String
  #   status: String
  # }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addApiary(apiaryData: ApiaryInput): User
    removeApiary(apiaryId: ID!): User
  }
`;

// export the typeDefs
module.exports = typeDefs;
