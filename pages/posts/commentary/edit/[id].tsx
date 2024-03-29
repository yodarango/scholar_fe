import { useEffect, useState } from "react";

// comps
import { CommentaryTextEditor } from "../../../../components/templates/content/commentary_text_editor";
import { useRouter } from "next/router";
import { handleGetCommentaries } from "../../../../helpers/functions/posts/commentary_get";
import { TCommentary } from "../../../../types/posts";
import { RoundLoader } from "../../../../components/fragments/chunks/round_loader";

// styles
import styles from "./index.module.css";
import global from "../../../page_global.module.css";

// type
import { REQUEST_TYPE_IS_EDIT_COMMENTARY } from "../../../../helpers/functions/posts/content_post";
import { UseIsAuth } from "../../../../hooks/use_check_auth";
import HeadContent from "../../../../SEO/head_content";
import Head from "next/head";

const EditCommentary = () => {
   const router = useRouter();
   const ID: any = router?.query && router?.query.id ? router?.query.id : "1";

   const [commentary, setcommentary] = useState<TCommentary | null>(null);
   const [loading, setloading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await handleGetCommentaries({ ID }, true);

         if (data) setcommentary(data);

         setloading(status);
      } catch (error) {
         setloading("error");
         console.error(error);
      }
   };

   useEffect(() => {
      if (router.isReady) getData();
   }, [router.isReady]);

   useEffect(() => {
      const beforeUnloadEvt = (e: any) => {
         e.preventDefault();
         e.returnValue = "";
      };
      window.addEventListener("beforeunload", beforeUnloadEvt);

      return () => {
         window.removeEventListener("beforeunload", beforeUnloadEvt);
      };
   }, []);

   // post references
   const postReferneces: any =
      commentary?.referenced_verses && commentary.referenced_verses.length > 0
         ? commentary.referenced_verses
         : [];

   return (
      <UseIsAuth redirect='/login'>
         <Head key='commentary-page-edit'>
            <HeadContent title='Edit commentary' />
         </Head>
         <div className={`${styles.mainWrapper} ${global.mainWrapper}`}>
            {loading === "done" && (
               <CommentaryTextEditor
                  requestType={REQUEST_TYPE_IS_EDIT_COMMENTARY}
                  ID={commentary?.ID}
                  verseId={commentary?.VERSE_ID}
                  body={commentary?.body}
                  postImage={commentary?.post_image}
                  userAuthority={
                     commentary?.creator?.authority_level ? commentary?.creator?.authority_level : 1
                  }
                  userId={commentary?.creator?.ID ? commentary?.creator?.ID : "0"}
                  username={commentary?.creator?.signature ? commentary?.creator?.signature : ""}
                  avatar={commentary?.creator?.avatar ? commentary?.creator?.avatar : ""}
                  postPostedOnDate={commentary?.posted_on}
                  postCreatedDate={commentary?.created_date}
                  postCategory={commentary?.category_tags}
                  postReferences={postReferneces}
                  postPrivacy={commentary?.is_private}
                  folderId={commentary?.folder_id}
                  withSticker
                  sticker={commentary?.sticker}
                  cta={{
                     handleCloseModal: () => router.back()
                  }}
               />
            )}
            {loading === "done" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
         </div>
      </UseIsAuth>
   );
};

export default EditCommentary;
