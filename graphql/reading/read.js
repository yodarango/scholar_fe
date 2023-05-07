import { gql } from "@apollo/client";

// requests highlights by CHAPTER_ID
export const GET_HIGHILGHTED_VERSES = gql`
   query ($ID: ID, $VERSE_ID: String, $last_id: ID) {
      highlighted_verses(ID: $ID, VERSE_ID: $VERSE_ID, last_id: $last_id) {
         ID
         VERSE_ID
         highlight_type
         color
      }
   }
`;

export const GET_CHAPTER_DATA = gql`
   query ($ID: ID, $CHAPTER_ID: String) {
      chapter_data(ID: $ID, CHAPTER_ID: $CHAPTER_ID) {
         ... on Highlight {
            HIGHLIGHT_ID
            VERSE_ID
            highlight_type
            highlight_color
         }

         ... on Commentary {
            ID
         }
      }
   }
`;

// creates new verse highlight by VERSE_ID
export const POST_HIGHILGHTED_VERSES = gql`
   mutation ($VERSE_ID: ID, $highlight_type: Int, $color: String) {
      new_highlighted_verse(
         data: { VERSE_ID: $VERSE_ID, highlight_type: $highlight_type, color: $color }
      ) {
         VERSE_ID
         highlight_type
         color
      }
   }
`;

// Removes all highlighted verses by VERSE_ID to avoid redundancy
export const REMOVE_HIGHILGHTED_VERSE = gql`
   mutation ($VERSE_ID: ID) {
      remove_highlighted_verse(VERSE_ID: $VERSE_ID) {
         VERSE_ID
      }
   }
`;

// requests bookmarks by CHAPTER_ID
export const GET_BOOKMARKS = gql`
   query ($ID: ID, $CHAPTER_ID: String, $USER_ID: ID, $last_id: ID) {
      bookmarks(ID: $ID, CHAPTER_ID: $CHAPTER_ID, USER_ID: $USER_ID, last_id: $last_id) {
         ID
         CHAPTER_ID
         USER_ID
      }
   }
`;

// creates a bookmark by CHAPTER_ID
export const POST_BOOKMARK = gql`
   mutation ($CHAPTER_ID: String) {
      new_bookmark(CHAPTER_ID: $CHAPTER_ID) {
         CHAPTER_ID
      }
   }
`;

// removes a bookmark by CHAPTER_ID
export const REMOVE_BOOKMARK = gql`
   mutation ($CHAPTER_ID: String) {
      remove_bookmark(CHAPTER_ID: $CHAPTER_ID) {
         CHAPTER_ID
      }
   }
`;
