// ************************** PURPOSE **************************** //
// *** This page component will load all the authorixed ********** //
// *** users that are allowed to submit content to the  ********** //
// *** library. The users are selected by the Product owner ****** //

// core
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

// components
import Header from "../../layouts/header";
import LibraryAuthor from "../../fragments/library-author";

//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";

// types
import { IuserData } from "../../fragments/library-author";

type sermonsByAuthorProps = {
   users: IuserData[];
};
const SermonsByAuthor = ({ users }: sermonsByAuthorProps) => {
   const router = useRouter();
   const { content } = router.query;

   return (
      <div className={`${sermonsByAuthorStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"AUTHORS"} />
         <h1 className={sermonsByAuthorStyles.title}>Select an author</h1>
         <div className={`${sermonsByAuthorStyles.usersGrid}`}>
            {users.map((user: IuserData) => {
               return <LibraryAuthor key={user.id} userData={user} content={content} />;
            })}
         </div>
      </div>
   );
};

export default SermonsByAuthor;

// fetch data
export const getStaticProps: GetStaticProps = async () => {
   const req = await fetch("https://scholar-be.herokuapp.com/users");
   const users = await req.json();

   return {
      props: { users },
      revalidate: 60 * 60 * 24 // refresh data every day
   };
};
