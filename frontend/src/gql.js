import { gql } from "apollo-boost";

export const GET_USERS = gql`
  {
    users {
      uuid
      firstName
      lastName
      avatar
      Signs {
        date
      }
    }
  }
`;

export const GET_AVATAR = gql`
  query User($id: String!) {
    user(id: $id) {
      avatar
    }
  }
`;

export const GET_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      uuid
      email
      firstName
      lastName
      avatar
    }
  }
`;

export const GET_STUDENTS = gql`
  {
    users {
      firstName
      lastName
      Signs {
        signature
        createdAt
      }
    }
  }
`;

export const FETCH_USER_WEEKLY = gql`
  query userWeekly($start: Int!, $end: Int!) {
    signsUsersWeekly(start: $start, end: $end) {
      uuid
      firstName
      lastName
      Signs {
        uuid
        date
        signature
      }
    }
  }
`;

export const SIGN_USER = gql`
  mutation createSign($userId: String!, $signature: String!) {
    createSign(userId: $userId, signature: $signature) {
      uuid
      signature
      User {
        email
      }
    }
  }
`;
