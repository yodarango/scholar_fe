// core
import React from "react";
import Head from "next/head";

// components
import Header from "../../layouts/header";
import LibraryAuthor from "../../fragments/library-author";

//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";

// types
import { IuserData } from "../../fragments/library-author";

// fetch data
export const getStaticProps = async () => {
   const req = await fetch("https://scholar-be.herokuapp.com/users");
   const users = await req.json();

   return {
      props: { users },
      revalidate: 60 * 60 * 24 // refresh data every day
   };
};

type sermonsByAuthorProps = {
   users: IuserData[];
};

const SermonsByAuthor = ({ users }: sermonsByAuthorProps) => {
   return (
      <div className={`${sermonsByAuthorStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"AUTHORS"} />
         <div className={`${sermonsByAuthorStyles.usersGrid}`}>
            {users.map((user: IuserData) => {
               return <LibraryAuthor userData={user} content={`library`} />;
            })}
         </div>
      </div>
   );
};

export default SermonsByAuthor;