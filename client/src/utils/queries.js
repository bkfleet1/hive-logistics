// import gql from "graphql-tag";
import { gql } from '@apollo/client';

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
      Hive {
        _id
        name
        beeBreed
        AcquisitionSource
        acquisitionDate
      }
      ShareFeeder {
        _id
        name
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      fName
      lName
      email
      username
      address
      city
      state
      zip

      apiary {
        _id
        name
        hive {
          _id
          name
        beeBreed
        AcquisitionSource
        acquisitionDate
          
        }
        ShareFeeder {
          _id
          name
        
          
        }
      }
    }
  }
`;

export const QUERY_APIARY = gql`
  {
    apiary {
      _id
      name
    }
  }
`;

export const QUERY_HIVE = gql`
  {
    hive {
      _id
      name
      beeBreed
      AcquisitionSource
      acquisitionDate
    }
  }
`;
export const QUERY_FEEDER = gql`
  {
    ShareFeeder {
      _id
      name
    }
  }
`;

export const QUERY_APIARY_ALL = gql`
  {
    user {
      _id
      apiary {
        _id
        name
        hive {
          _id
          name
        beeBreed
        AcquisitionSource
        acquisitionDate
          
        }
        ShareFeeder {
          _id
          name
        
          
        }
      }
    }
  }
`;
