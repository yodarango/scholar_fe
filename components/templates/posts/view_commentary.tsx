import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { WithTextContentStack } from "../../layouts/stacks/with_text_content_stack";
import { handleGetCommentaries } from "../../../helpers/functions/posts/commentary_get";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../fragments/chunks/error_resource_not_found";

// types
import { TCommentary } from "../../../types/posts";

// styles
import styles from "./view_commentary.module.css";

export const ViewCommentary = () => {
   const router = useRouter();
   const ID = router?.query && router?.query.id ? router?.query.id : "1";

   const [commentary, setcommentary] = useState<TCommentary | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async (variables: any) => {
      try {
         const { data, status } = await handleGetCommentaries(variables);
         if (data?.commentary) setcommentary(data.commentary[0]);

         setloading(status);
      } catch (error) {
         setloading("error");
         console.error(error);
      }
   };

   useEffect(() => {
      if (router.isReady) getData({ ID });
   }, [router.isReady]);

   // post references
   const postReferneces: any =
      commentary?.referenced_verses && commentary.referenced_verses.length > 0
         ? commentary.referenced_verses
         : [];
   return (
      <>
         {commentary && (
            <div className={styles.mainWrapper}>
               <WithTextContentStack
                  title={commentary.verse_citation}
                  postReferences={postReferneces}
                  body={commentary.body}
                  cta={{ handleCloseModal: () => router.back() }}
                  postImage={commentary.post_image}
                  userAuthority={commentary.creator.authority_level}
                  userId={commentary.creator.ID}
                  username={commentary.creator.signature}
                  avatar={commentary.creator.avatar}
                  postPostedOnDate={commentary.posted_on}
                  postCreatedDate={commentary.created_date}
                  postCategory={commentary.category_tags}
               />
            </div>
         )}
         {/* loader */}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {/* error */}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </>
   );
};
