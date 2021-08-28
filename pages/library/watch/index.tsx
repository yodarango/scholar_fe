// ************************** PURPOSE **************************** //
// *** This page component will fetch all the watch found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/watch page, and returnng to ********* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import WatchCarrousel from "../../../layouts/library-individual-pages/watch-carrousel";

// styles
import libraryWatchStyles from "../../../styles/pages/library/watch/LibraryWatch.module.css";

// types
import { watchProps } from "../../../fragments/library-items/watch";

type watchPageProps = {
   watch: watchProps[];
};

const Watch = ({ watch }: watchPageProps) => {
   return (
      <div className={`${libraryWatchStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"WATCH"} />
         <div className='x-large-spacer'></div>
         <LibraryMenu
            includeCategory={true}
            includeContent={true}
            includeSearch={true}
            contentButtonIcon={"📺"}
            currentSlectedContentPage={{ watch: "#f2f2f2" }}
         />
         {watch && <WatchCarrousel watch={watch} />}
      </div>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library");
   const parsedData = await data.json();

   return {
      props: {
         watch: parsedData.watch,
         revalidate: 60 * 50 * 24 //everyday
      }
   };
};

export default Watch;
