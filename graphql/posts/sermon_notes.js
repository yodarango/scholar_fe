import { gql } from "@apollo/client";

export const GET_SERMON_NOTES = gql`
   query ($ID: ID, $USER_ID: ID, $category_tags: String) {
      sermon_notes(ID: $ID, USER_ID: $USER_ID, category_tags: $category_tags) {
         ID
         content
         USER_ID
         category_tags
         creator {
            ID
            signature
            authority_level
            approval_rating
         }
      }
   }
`;