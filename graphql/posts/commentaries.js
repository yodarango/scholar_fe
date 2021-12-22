import { gql } from "@apollo/client";

export const GET_COMMENTARIES = gql`
   query ($ID: ID, $USER_ID: ID, $VERSE_ID: String, $category_tags: String) {
      commentary(ID: $ID, USER_ID: $USER_ID, VERSE_ID: $VERSE_ID, category_tags: $category_tags) {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
         }
         comments {
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

export const WIGO_REQUEST_MORE_COMMENTARIES = gql`
   query ($last_id: ID) {
      # commentaries
      commentary(last_id: $last_id) {
         ID
         USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
         created_date
         posted_on
         creator {
            ID
            signature
            approval_rating
            authority_level
            avatar
         }
         comments {
            total_count
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

export const SHOW_COMMENTS_OF_COMMENTARY = gql`
   query ($ID: ID, $showComment: Boolean) {
      commentary(ID: $ID) {
         comments(showComment: $showComment) {
            ID
            body
            creator_avatar
            creator_signature
            creator_approval_rate
            posted_on
         }
         approvals {
            average_count
            total_count
         }
      }
   }
`;

//================== POST ================== //
export const CREATE_NEW_COMMENTARY = gql`
   mutation (
      $USER_ID: ID
      $VERSE_ID: String
      $body: String
      $category_tags: String
      $referenced_verses: String
      $verse_citation: String
      $approval_level: AuthorityLevel
   ) {
      commentary(
         data: {
            USER_ID: $USER_ID
            VERSE_ID: $VERSE_ID
            body: $body
            category_tags: $category_tags
            referenced_verses: $referenced_verses
            verse_citation: $verse_citation
            approval_level: $approval_level
         }
      ) {
         ID
         VERSE_ID
         USER_ID
      }
   }
`;
