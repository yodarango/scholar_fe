import client from "../../../apollo-client";
import { CREATE_NEW_COMMENTARY } from "../../../graphql/posts/commentaries";

// data
import { errorMessages } from "../../../data/error_messages";

export const handlePostCommentary = async (
   verseId: string,
   body: string,
   isPrivate: boolean,
   categoryTags: string[],
   referencedVerses: string[],
   verseCitation: string
) => {
   try {
      const { data } = await client.mutate({
         mutation: CREATE_NEW_COMMENTARY,
         variables: {
            VERSE_ID: verseId,
            body,
            is_private: isPrivate,
            category_tags: categoryTags.toString().replaceAll(", ", ""),
            referenced_verses: referencedVerses.toString().replaceAll(", ", ""),
            verse_citation: verseCitation
         }
      });

      if (data.commentary.__typename === "Commentary") {
         return data.commentary;
      } else if (data.commentary.__typename === "ExceedsPostCount") {
         return errorMessages.posts.maxPostCount;
      } else {
         return errorMessages.posts.failToPostCommentary;
      }
   } catch (error: any) {
      console.log(error);
      return errorMessages.posts.failToPostCommentary;
   }
};
