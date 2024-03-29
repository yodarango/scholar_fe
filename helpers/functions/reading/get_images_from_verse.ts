import { client } from "../../../apollo-client";
import { GET_IMAGES_FROM_VERSE } from "../../../graphql/reading/read";
import { errorMessages } from "../../../data/error_messages";
const unknownError = errorMessages.unknown.a;

type TGetImagesFromVerseProps = {
   VERSE_ID?: string;
   USER_ID?: string;
   last_id?: number;
   is_self?: boolean;
};
export const getImagesFromVerse = async (variables: TGetImagesFromVerseProps) => {
   try {
      const { data } = await client.query({
         query: GET_IMAGES_FROM_VERSE,
         variables
      });

      if (data?.get_images_from_verse) {
         return { data: data?.get_images_from_verse, error: null, status: "done" };
      }
      return {
         data: null,
         error: { ...unknownError, type: "4" },
         status: "error"
      };
   } catch (error) {
      console.error(error);
      return {
         data: null,
         error: { ...unknownError, type: "4" },
         status: "error"
      };
   }
};
