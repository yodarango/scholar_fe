import { client } from "../../../apollo-client";
import { CREATE_NEW_ARTICLE } from "../../../graphql/posts/articles";

// data
import { errorMessages } from "../../../data/error_messages";
import { notificationMessages } from "../../../data/notification_messages";

// constants
import { DEFAULT_ARTICLE_IMAGE } from "../../../constants/defaults";

export type THandlePostArticle = {
   title: string;
   body: string;
   categoryTag: string;
   referencedVerses: string[];
   postImage: string; // not in DB implement this field
};

export const dataHandler = async (post: THandlePostArticle) => {
   let { body, title, categoryTag, referencedVerses, postImage } = post;

   if (!postImage) postImage = DEFAULT_ARTICLE_IMAGE;
   try {
      const { data } = await client.mutate({
         mutation: CREATE_NEW_ARTICLE,
         variables: {
            body,
            title,
            category_tags: categoryTag,
            post_image: postImage,
            referenced_verses: referencedVerses.toString().replaceAll(", ", "")
         }
      });

      if (data.article.__typename === "Article") {
         return { success: notificationMessages.postSuccess };
      } else if (data.article.__typename === "ExceedsPostCount") {
         return { error: errorMessages.posts.maxPostCount };
      } else {
         return { error: errorMessages.posts.failToPostCommentary };
      }
   } catch (error: any) {
      console.error(error);
      return { error: errorMessages.posts.failToPostCommentary };
   }
};

export const handlePostArticle = async (post: THandlePostArticle) => {
   try {
      if (!post.categoryTag) return { error: errorMessages.posts.missingCategoryTag };
      if (!post.title) return { error: errorMessages.posts.missingTitle };
      if (!post.body || post.body === "") return { error: errorMessages.posts.emptyBody };
      return await dataHandler(post);
   } catch (error) {
      console.error(error);
   }
};
