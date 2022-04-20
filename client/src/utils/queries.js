import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      actions {
        _id
        actionType
        resource
        quantity
        uam
        actionDate
        link
      }
    }
  }
`;
