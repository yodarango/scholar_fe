// graphQl
import { client } from "../../../apollo-client";
import {
   GET_EDIT_THOUGHTS,
   GET_THOUGHTS,
   GET_THOUGHT_IN_24
} from "../../../graphql/posts/thoughts";

// fetch data
export const handleGetThoughtIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_THOUGHT_IN_24,
         variables: {}
      });

      if (!data.thought_in_24) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const thought = data.thought_in_24.map((c: any) => ({
         ...c,
         creator: {
            ID: c.USER_ID,
            signature: c.signature,
            authority_level: c.authority_level,
            approval_rating: c.approval_rating,
            first_name: c.first_name,
            last_name: c.last_name,
            my_church: c.my_church,
            avatar: c.avatar
         },
         comments: {
            total_count: c.total_comment_count
         },
         approvals: {
            average_count: c.average_rating_count,
            total_count: c.total_rating_count
         }
      }));

      return { data: thought, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

export type TgetThoughtsVariables = {
   ID?: string;
   USER_ID?: string | number;
   category_tags?: string;
   body?: string;
   last_id?: number | string;
   isSelf?: boolean;
};

export const handleGetThoughts = async (variables: TgetThoughtsVariables, isEdit?: boolean) => {
   const QUERY = isEdit ? GET_EDIT_THOUGHTS : GET_THOUGHTS;
   try {
      const { data } = await client.query({
         query: QUERY,
         variables
      });

      if (!data.thought) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const thought = data.thought.map((c: any) => ({
         ...c,
         creator: {
            ID: c.USER_ID,
            signature: c.signature,
            authority_level: c.authority_level,
            approval_rating: c.approval_rating,
            first_name: c.first_name,
            last_name: c.last_name,
            my_church: c.my_church,
            avatar: c.avatar
         },
         comments: {
            total_count: c.total_comment_count
         }
      }));

      return { data: thought, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
