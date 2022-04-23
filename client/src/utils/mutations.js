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
  mutation addApiary($apiaryData: ApiaryInput!) {
    addApiary(apiaryData: $apiaryData) {
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

// export const ADD_ACTION = gql`
//     mutation addAction($id: String!, $actionType: String!, $resource: String!,$quantity: Int!,$uam: String!,$actionDate: Date!) {
//          addAction(id: String!, actionType: String!, resource: String!,quantity: Int!,uam: String!,actionDate: Date!) {
//             token
//             action {
//                 _id
//                 actionsType
//                 actionDate
//             }
//         }
//     }
// `;
