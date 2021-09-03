// ************************** PURPOSE **************************** //
// *** This page component will fetch all the congregations ****** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/congregations page, and returnng **** //
// *** to same page with the userId and content type in the ****** //
// *** congregationProps ***************************************** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import CongregationCarrousel from "../../../layouts/library-individual-pages/congregation-carrousel";

// styles
import libraryCongregationsStyles from "../../../styles/pages/library/locations/LibraryCongregations.module.css";

// types
import { congregationProps } from "../../../fragments/library-items/congregation";
import NavigationMenu from "../../../layouts/navigation-menu";

type congregationPageProps = {
   congregations: congregationProps[];
};

const Congregations = ({ congregations }: congregationPageProps) => {
   return (
      <>
         <div className={`${libraryCongregationsStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"CONGREGATIONS"} />
            <div className='x-large-spacer'></div>
            <LibraryMenu
               includeCategory={false}
               includeContent={true}
               includeSearch={false}
               contentButtonIcon={"⛪"}
               currentSlectedContentPage={{ congregations: "#f2f2f2" }}
            />
            <div className={`${libraryCongregationsStyles.searchWapper}`}>
               <input
                  type='text'
                  maxLength={40}
                  className={`${libraryCongregationsStyles.search} std-input`}
                  placeholder='🔎 Name, City, or State '
               />
            </div>
            {congregations && <CongregationCarrousel congregation={congregations} />}
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library");
   const parsedData = await data.json();

   return {
      props: {
         congregations: parsedData.congregations,
         revalidate: 60 * 50 * 24 //everyday
      }
   };
};

export default Congregations;
