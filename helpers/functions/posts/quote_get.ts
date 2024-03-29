// graphQl
import { client } from "../../../apollo-client";
import { GET_EDIT_QUOTE, GET_QUOTE, GET_QUOTE_IN_24 } from "../../../graphql/posts/quotes";

// field types
export type TgetQuoteVariables = {
   ID?: string | number;
   USER_ID?: string | number;
   body?: string;
   category_tags?: string;
   last_id?: string | number;
};

// fetch data
export const handleGetQuotesIn24 = async () => {
   try {
      const { data } = await client.query({
         query: GET_QUOTE_IN_24,
         variables: {}
      });

      if (!data.quote_in_24) {
         return { data: null, status: "error" };
      }

      //  format the data into commentary: { user:{}}
      const quote = data.quote_in_24.map((c: any) => ({
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

      return { data: quote, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};

const mapTheUser = (c: any) => {
   return {
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
   };
};

export const handleGetQuote = async (variables: TgetQuoteVariables, isEdit?: boolean) => {
   const QUERY = isEdit ? GET_EDIT_QUOTE : GET_QUOTE;

   try {
      const { data } = await client.query({
         query: QUERY,
         variables
      });

      if (!data.quote && !data.edit_quote) {
         return { data: null, status: "error" };
      } else {
         let quote: any = [];

         if (isEdit) {
            quote = mapTheUser(data.edit_quote);
         } else {
            quote = data.quote.map(mapTheUser);
         }

         return { data: quote, status: "done" };
      }
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
