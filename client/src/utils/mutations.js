// import gql from "graphql-tag";
import { gql } from '@apollo/client';

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

// export const ADD_APIARY = gql`
//   mutation addApiary($name: String) {
//     addApiary(name: $name) {
//       Apiary {
//         name
//       }
//     }
//   }
// `;

export const ADD_APIARY = gql`
  mutation addApiary($apiaryData: ApiaryInput) {
    addApiary(apiaryData: $apiaryData) {
      Apiary {
        name
      }
    }
  }
`;

export const ADD_HIVE = gql`
  mutation addHive($hiveData: HiveInput) {
    addHive(hiveData: $hiveData) {
      Hive {
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
      ShareFeeder {
        name
      }
    }
  }
`;

export const REMOVE_APIARY = gql`
  mutation removeApiary($apiaryData: ApiaryInput) {
    removeApiary(_id: $_id) {
      _id
      username
      email
      Apiary {
        _id
        name
      }
    }
  }
`;
