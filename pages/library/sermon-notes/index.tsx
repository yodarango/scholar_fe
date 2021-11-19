// ************************** PURPOSE **************************** //
// *** This page component will fetch all the sermon-notes ******* //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/authors page, and returnng to ******* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

// graphql
import client from "../../../apollo-client";
import { GET_SERMON_NOTES } from "../../../graphql/library/sermon_notes";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import SermonCarrousel from "../../../layouts/library-individual-pages/sermons-carrousel";
import LibraryFilter from "../../../fragments/buttons/library-filter";
import SkipContent from "../../../fragments/buttons/skipContent";

// styles
import librarySermonsPageStyles from "../../../styles/pages/library/sermon-notes/LibrarySermons.module.css";

// types
import { sermonProps } from "../../../fragments/library-items/sermon";
import NavigationMenu from "../../../layouts/navigation-menu";

type sermonsPageProps = {
   sermons: sermonProps[];
};
const Sermons = ({ sermons }: sermonsPageProps) => {
   // ============ capitalize and push the new query to router to searh by title ======
   const router = useRouter();
   let newInput: any = "";
   const handleInputSearchReq = (string: string) => {
      if (string) {
         const singleWords = string.split(" ");
         newInput = singleWords.map((word) => word[0].toUpperCase() + word.substr(1));
         console.log(newInput);
      }

      router.replace({ pathname: router.pathname, query: { title: newInput } });
   };
   return (
      <>
         <div className={`${librarySermonsPageStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"SERMONS"} />
            <SkipContent wrapperMaxWidth={"1050px"} content={sermons} />
            <div className='x-large-spacer '></div>
            <LibraryMenu
               handleInputSearchReq={handleInputSearchReq}
               includeCategory={true}
               includeContent={true}
               includeSearch={true}
               contentButtonIcon={"🗣️"}
               currentSlectedContentPage={{ sermons: "#f2f2f2" }}
            />
            <LibraryFilter params={`sermon-notes`} />
            {sermons && <SermonCarrousel sermon={sermons} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load

export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, alphOrd, dateOrd, category, userId, title, id } = context.query;

   const { data } = await client.query({
      query: GET_SERMON_NOTES,
      variables: { skip, category, alphOrd, dateOrd, userId, id, title }
   });
   return {
      props: {
         sermons: data.sermonNotes
      }
   };
};
export default Sermons;
