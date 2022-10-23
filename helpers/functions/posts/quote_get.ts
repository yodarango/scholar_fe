// graphQl
import { client } from "../../../apollo-client";
import { GET_QUOTE_IN_24 } from "../../../graphql/posts/quotes";

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

      return { data, status: "done" };
   } catch (error) {
      console.error(error);
      return { data: null, status: "error" };
   }
};
