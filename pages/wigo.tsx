// core
import React from "react";
import { GetServerSideProps } from "next";

// graphQl
import { gql } from "@apollo/client";
import client from "../apollo-client";

// components
import Head from "next/head";
import Header from "../layouts/header";
import CommentThought from "../layouts/comment-thought";
import RandomDailyVerse from "../fragments/squares/random-daily-verse";
import StoriesCarrousel from "../posts/stories-carrousel";
import SermonsPostCarrousel from "../posts/sermons-post-carrousel";
import NavigationMenu from "../layouts/navigation-menu";
// ----- content of the day
import WonderingWednesday from "../fragments/wigo-content/4.wondering-wednesday";
import SermonSunday from "../fragments/wigo-content/1.sermon-sunday";

// styles
import interactStyles from "../styles/pages/Interact.module.css";

// helpers
import { getNewVerseId } from "../helpers/random-daily-verses";
import { TverseContent } from ".";
import { sermonProps } from "../fragments/library-items/sermon";

// others
const versionId: string = "de4e12af7f28f599-01";

type feedProps = {
   verseContent: TverseContent;
   sermons: sermonProps[];
};

const Feed = ({ verseContent, sermons }: feedProps) => {
   return (
      <>
         <div className={`main-wrapper ${interactStyles.mainWrapper}`}>
            <Head>
               <meta name='keyword' content='tags' />
            </Head>
            <Header currPage={"WIGO TODAY"} />
            <div className='large-spacer'></div>
            <h2 className='std-text-block--small-title'>Quotes</h2>
            <StoriesCarrousel />
            <div className={interactStyles.gridWrapper}>
               <div className={`${interactStyles.gridWrapperRight}`}>
                  <h2 className='std-text-block--small-title'>Today's Verse</h2>
                  <RandomDailyVerse versionId={versionId} verseContent={verseContent} />
                  <div className='std-text-block--small-title'></div>
                  {/*<WonderingWednesday />*/}
                  {<SermonSunday />}
               </div>
               <div className={interactStyles.gridWrapperMiddle}>
                  <h2 className='std-text-block--small-title'>Sermon Notes</h2>
                  <SermonsPostCarrousel sermon={sermons} reportOption={true} />
               </div>
               <div className={`${interactStyles.gridWrapperLeft}`}>
                  <h2 className='std-text-block--small-title'>Writtings</h2>
                  <div className={interactStyles.commentsWrapper}>
                     <CommentThought />
                  </div>
               </div>
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
   let { skip, alphOrd, dateOrd, category, userId, title, id } = context.query;
   const verseReq = await fetch(
      `https://api.scripture.api.bible/v1/bibles/${versionId}/verses/${getNewVerseId()}?content-type=text&include-verse-numbers=false`,
      {
         method: "GET",
         headers: {
            "api-key": `${process.env.NEXT_PUBLIC_BIBLE_API_KEY}`
         }
      }
   );

   const jsonReq = await verseReq.json();
   const verseContent = jsonReq.data;

   const { data } = await client.query({
      query: gql`
         query (
            $skip: String
            $category: String
            $alphOrd: String
            $dateOrd: String
            $userId: ID
            $id: ID
            $title: String
         ) {
            sermonNotes(
               skip: $skip
               category: $category
               alphOrd: $alphOrd
               dateOrd: $dateOrd
               userId: $userId
               id: $id
               title: $title
            ) {
               id
               title
               userId
               categoryTags
               tagColors
               currentRanking
               fileUrl
               user {
                  fullName
                  avatar
               }
            }
         }
      `,
      variables: { skip, category, alphOrd, dateOrd, userId, id, title }
   });

   return {
      props: {
         verseContent,
         sermons: data.sermonNotes
      }
   };
};

export default Feed;
