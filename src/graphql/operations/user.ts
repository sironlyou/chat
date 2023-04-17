/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";
export default {
  Queries: {
    searchUsers: gql`
      query SearchUsers($username: String!) {
        searchUsers(username: $username) {
          id
          username
          avatar
        }
      }
    `,
  },
  Mutations: {
    createUsername: gql`
      mutation CreateUsername($username: String!, $avatar: String) {
        createUsername(username: $username, avatar: $avatar) {
          success
          error
        }
      }
    `,
  },
  Subscriptions: {},
};
