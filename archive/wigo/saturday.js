import { gql } from "@apollo/client";

export const GET_SATURDAY_CONTENT = gql`
   query ($last_id: ID) {
      saturday {
         id
         title
         context
         html
         image
         link
      }

      # commentaries
      commentary(last_id: $last_id) {
         ID
         # USER_ID
         VERSE_ID
         body
         category_tags
         referenced_verses
         verse_citation
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

      # thought
      thought(last_id: $last_id) {
         ID
         title
         body
         # USER_ID
         category_tags
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

      # quote
      quote_stories(last_id: $last_id) {
         ID
         approvals {
            total_count
            average_count
         }
         creator {
            ID
            avatar
            signature
            approval_rating
            authority_level
            my_church
            first_name
            last_name
         }
      }

      # sermon notes
      sermon_notes(last_id: $last_id) {
         ID
         content
         # USER_ID
         category_tags
         file_url
         title
         posted_on
         creator {
            ID
            signature
            authority_level
            approval_rating
         }
      }
   }
`;