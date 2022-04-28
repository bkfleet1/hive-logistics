import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedApiary {
        _id
        name
      }
    }
  }
`;
