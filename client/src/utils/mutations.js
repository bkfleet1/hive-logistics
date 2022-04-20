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
