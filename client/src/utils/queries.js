// import gql from "graphql-tag";
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      id
      fName
      lName
      address
      city
      zipCode
      username
      email
      apiaryCount
      apiary {
        _id
        username
        name
        hiveCount
        shareFeederCount
        hive {
             _id
            username
            name
            latitude
            longitude
            status
            beeBreed
            acquisitionSource
            acquisitionDate
            boxType
            frameCount
            deploymentDate
          }
          shareFeeder {
            _id
            username
            name
            latitude
            longitude
            status
          }
        }
      }
    }
    `;

// export const QUERY_USER = gql`
//   {
//     user {
//       id
//       fName
//       lName
//       address
//       city
//       zipCode
//       username
//       email
//       apiaryCount
//       apiary {
//         _id
//         username
//         name
//         hiveCount
//         shareFeederCount
//         hive {
//              _id
//             username
//             name
//             latitude
//             longitude
//             status
//             beeBreed
//             acquisitionSource
//             acquisitionDate
//             boxType
//             frameCount
//             deploymentDate
//           }
//           shareFeeder {
//             _id
//             username
//             name
//             latitude
//             longitude
//             status
//           }
//         }
//       }
//     }
//     `;


export const QUERY_APIARY = gql`
{
    apiary {
    _id
    username
    name
    hiveCount
    shareFeederCount
    hive {
         _id
	      username
	      name
	      latitude
	      longitude
	      status
	      beeBreed
	      acquisitionSource
	      acquisitionDate
	      boxType
	      frameCount
	      deploymentDate
      }
      shareFeeder {
        _id
        username
        name
        latitude
        longitude
        status
      }
    }
  }
`;

export const QUERY_APIARIES = gql`
  query apiaries($username) {
    apiaries(username: $username) {
    _id
    username
    name
    hiveCount
    shareFeederCount
    hive {
         _id
	      username
	      name
	      latitude
	      longitude
	      status
	      beeBreed
	      acquisitionSource
	      acquisitionDate
	      boxType
	      frameCount
	      deploymentDate
      }
      shareFeeder {
        _id
        username
        name
        latitude
        longitude
        status
      }
    }
  }
`;


export const QUERY_HIVE = gql`
{
  hive {
      _id
     username
     name
     latitude
     longitude
     status
     beeBreed
     acquisitionSource
     acquisitionDate
     boxType
     frameCount
     deploymentDate
 }
}
`;

export const QUERY_HIVES = gql`
query hives($username) {
  hives(username: $username) {
      _id
     username
     name
     latitude
     longitude
     status
     beeBreed
     acquisitionSource
     acquisitionDate
     boxType
     frameCount
     deploymentDate
 }
}
`;


export const QUERY_FEEDER = gql`
{
  shareFeeder{
      _id
     username
     name
     latitude
     longitude
     status
     beeBreed
     acquisitionSource
     acquisitionDate
     boxType
     frameCount
     deploymentDate
 }
}
`;

export const QUERY_FEEDERS = gql`
query shareFeeders($username) {
  shareFeeders(username: $username) {
      _id
     username
     name
     latitude
     longitude
     status
     beeBreed
     acquisitionSource
     acquisitionDate
     boxType
     frameCount
     deploymentDate
 }
}
`;

export const QUERY_APIARY_ALL = gql`
query apiaries($username) {
  apiaries(username: $username) {
  _id
  username
  name
  hiveCount
  shareFeederCount
  hive {
       _id
      username
      name
      latitude
      longitude
      status
      beeBreed
      acquisitionSource
      acquisitionDate
      boxType
      frameCount
      deploymentDate
    }
    shareFeeder {
      _id
      username
      name
      latitude
      longitude
      status
    }
  }
}
`;