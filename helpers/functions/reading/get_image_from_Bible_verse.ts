import { client } from "../../../apollo-client";
import { GET_IMAGE_FROM_BIBLE_VERSE } from "../../../graphql/reading/read";
import { errorMessages } from "../../../data/error_messages";
const unknownError = errorMessages.unknown.a;

export const getImageFromBibleVerse = async (VERSE_ID: string) => {
   try {
      const { data } = await client.query({
         query: GET_IMAGE_FROM_BIBLE_VERSE,
         variables: {
            VERSE_ID
         }
      });

      console.log(data?.get_Bible_verse_image);
      if (data?.get_Bible_verse_image) {
         if (data?.get_Bible_verse_image?.__typename === "VerseImage") {
            return { data: data?.get_Bible_verse_image, error: null, status: "done" };
         } else if (data?.get_Bible_verse_image?.__typename === "NotAuthorized") {
            return {
               data: null,
               error: "notAuth",
               status: "error"
            };
         }
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
