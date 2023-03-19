import { gql } from "@apollo/client";

export const GET_USER_STORY = gql`
   query ($ID: ID) {
      users(ID: $ID) {
         ID
         signature
         avatar
         my_story
      }
   }
`;

export const CHECK_IF_USER_PATRON = gql`
   query {
      is_user_patron {
         is_patron
      }
   }
`;

export const CHECK_AUTH = gql`
   query {
      is_user_logged_in
   }
`;
