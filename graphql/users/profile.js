import { gql } from "@apollo/client";

// user summary the show in the profile
export const GET_MY_USER_SUMMARY = gql`
   query ($ID: ID) {
      user_summary(ID: $ID) {
         has_new_notifications
         authority_level
         approval_rating
         total_ratings
         total_posts
         signature
         avatar
         ID
      }
   }
`;

// data fro the stats in the profile
export const GET_POSTS_SUMMARY = gql`
   query ($ID: ID) {
      get_posts_summary(ID: $ID) {
         commentary_count
         article_count
         sermon_count
         quote_count
      }
   }
`;

// settings that appear in the profile
export const GET_USER_ABOUT_ME = gql`
   query ($ID: ID) {
      get_user_about_me(ID: $ID) {
         my_true_color_personality_test
         my_favorite_color
         my_favorite_verse
         is_Bible_public
         my_ministry
         my_church
         about_me
         my_job
      }
   }
`;

export const GET_USER_ABOUT_ME_PAGE = gql`
   query ($ID: ID) {
      get_user_about_me_page(ID: $ID) {
         authority_level
         signature
         about_me
         avatar
         ID
      }
   }
`;

// all notifications
export const GET_USER_NOTIFICATIONS = gql`
   query ($last_id: ID) {
      notifications(last_id: $last_id) {
         CONTENT_TYPE
         CREATED_BY
         read_date
         posted_on
         USER_ID
         POST_ID
         body
         ID
      }
   }
`;

// these are the general settings under the settings page
export const GET_USER_GENERAL_SETTINGS = gql`
   query {
      get_user_general_settings {
         my_true_color_personality_test
         my_favorite_color
         my_favorite_verse
         my_ministry
         signature
         my_church
         about_me
         avatar
         my_job
      }
   }
`;

export const GET_USER_PRIVACY_SETTINGS = gql`
   query {
      get_user_privacy_settings {
         first_name
         birth_date
         last_name
         email
         gender
      }
   }
`;
export const GET_USER_PREFERENCE_SETTINGS = gql`
   query {
      get_user_preference_settings {
         is_Bible_public
      }
   }
`;

// updates user settings
export const UPDATE_GENERAL_SETTINGS = gql`
   mutation (
      $my_true_color_personality_test: String
      $my_favorite_color: String
      $my_favorite_verse: String
      $my_ministry: String
      $my_church: String
      $my_job: String
   ) {
      update_general_settings(
         data: {
            my_true_color_personality_test: $my_true_color_personality_test
            my_favorite_color: $my_favorite_color
            my_favorite_verse: $my_favorite_verse
            my_ministry: $my_ministry
            my_church: $my_church
            my_job: $my_job
         }
      ) {
         ... on User {
            my_true_color_personality_test
            my_favorite_color
            my_favorite_verse
            my_ministry
            my_church
            my_job
         }

         ... on DatabaseError {
            message
         }
      }
   }
`;

export const UPDATE_PRIVACY_SETTINGS = gql`
   mutation (
      $first_name: String
      $birth_date: String
      $last_name: String
      $email: String
      $gender: Int
   ) {
      update_privacy_settings(
         data: {
            first_name: $first_name
            birth_date: $birth_date
            last_name: $last_name
            email: $email
            gender: $gender
         }
      ) {
         ... on UserUpdated {
            update_successful
         }

         ... on DatabaseError {
            message
         }
      }
   }
`;

export const UPDATE_PREFERENCE_SETTINGS = gql`
   mutation ($is_Bible_public: Boolean) {
      update_preference_settings(data: { is_Bible_public: $is_Bible_public }) {
         ... on UserUpdated {
            update_successful
         }

         ... on DatabaseError {
            message
         }
      }
   }
`;

// updates user avatar
export const UPDATE_MY_AVATAR = gql`
   mutation ($avatar: String) {
      update_user_avatar(data: { avatar: $avatar }) {
         avatar
      }
   }
`;

// updates user signature
export const UPDATE_MY_SIGNATURE = gql`
   mutation ($signature: String) {
      update_signature(data: { signature: $signature }) {
         ... on User {
            signature
         }

         ... on SignatureAlreadyTaken {
            message
         }
      }
   }
`;

// updates user signature
export const UPDATE_MY_EMAIL = gql`
   mutation ($email: String) {
      update_email(data: { email: $email }) {
         ... on User {
            email
         }

         ... on EmailExists {
            message
         }
      }
   }
`;

// updates user signature
export const UPDATE_ABOUT_ME = gql`
   mutation ($body: String) {
      update_about_me(body: $body)
   }
`;
