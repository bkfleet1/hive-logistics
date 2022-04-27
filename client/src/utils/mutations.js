import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_APIARY = gql`
  mutation addApiary($apiaryData: ApiaryInput) {
    addApiary(apiaryData: $apiaryData) {
      savedApiary{
        name
      
    }
  }
  }
`;

export const ADD_HIVE = gql`
  mutation addHive($hiveData: HiveInput) {
    addHive(hiveData: $hiveData) {
      savedHive{
        name
        BeeFeeder
        acquisitionSource
        acquisitionDate
      
    }
  }
  }
`;

export const ADD_BEEFEEDER = gql`
  mutation addBeeFeeder($beeFeederData: BeeFeederInput) {
    addBeeFeeder(beeFeederData: $beeFeederData) {
      savedBeeFeeder{
        name
      
    }
  }
  }
`;

export const REMOVE_APIARY = gql`
  mutation removeApiary($apiary: NAME!) {
    removeApiary(_id: $_id) {
      _id
      username
      email
      savedApiary {
        apiaryId
        name
      }
    }
  }
`;


