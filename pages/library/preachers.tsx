// ************************** PURPOSE **************************** //
// *** This page component will load all the preacher  users ***** //
// *** that are allowed to submit content to the  **************** //
// *** library. The users are selected by the Product owner ****** //

// core
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import HeadContent from "../../layouts/head-content";
import Image from "next/image";
//import { GetServerSideProps } from "next";

// graphql
import client from "../../apollo-client";
import { GET_LIB_APPROVED_USERS } from "../../graphql/library/users";

// components
import Header from "../../layouts/header";
import LibraryPreachers from "../../fragments/library-preachers";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import ResourceNotFoundError from "../../layouts/resource-not-found-error";

//styles
import sermonsByAuthorStyles from "../../styles/pages/library/Authors.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// types
import { TpreacherData } from "../../fragments/library-preachers";
import NavigationMenu from "../../layouts/navigation-menu";

// type sermonsByAuthorProps = {
//    users: TpreacherData[];
// };
const Preachers = () => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");

   const router = useRouter();

   // get the inital data
   const [initialDataState, setInitialDataState] = useState<TpreacherData[]>([]);
   const getInitialData = async () => {
      let { skip } = router.query;
      if (!skip) {
         skip = "0";
      }
      try {
         const { data } = await client.query({
            query: GET_LIB_APPROVED_USERS,
            variables: { skip, userType: "PREACHER" }
         });

         setInitialDataState(data.AuthorizedContentProvider);
         setLoadingState("done");
      } catch (error) {
         console.log(error);
         setLoadingState("error");
         setInitialDataState([]);
      }
   };

   useEffect(() => {
      if (router.isReady) {
         setLoadingState("loading");
         getInitialData();
      }

      return () => {
         setInitialDataState([]);
      };
   }, [router.query]);

   return (
      <>
         <div className={`${sermonsByAuthorStyles.mainWrapper}`}>
            <Head>
               <HeadContent />
            </Head>
            <Header currPage={"PREACHERS"} />
            <h1 className={sermonsByAuthorStyles.title}>Select a preacher</h1>
            <div className={`${sermonsByAuthorStyles.usersGrid}`}>
               {initialDataState &&
                  loadingState == "done" &&
                  initialDataState.map((user: TpreacherData) => {
                     return <LibraryPreachers key={user.id} userData={user} />;
                  })}

               {loadingState == "loading" && (
                  <CardsLazyLoading amount={16} compClass={cardsLazyLoadingStyles.librayUsers} />
               )}
               {loadingState === "error" && <ResourceNotFoundError />}
            </div>
         </div>
         <div className={`large-spacer`}> </div>
         <NavigationMenu />
      </>
   );
};

// // get data
// export const getServerSideProps: GetServerSideProps = async (context) => {
//    let { skip } = context.query;
//    if (!skip) {
//       skip = "0";
//    }
//    const { data } = await client.query({
//       query: gql`
//          query ($skip: String!) {
//             AuthorizedContentProvider(skip: $skip, userType: PREACHER) {
//                id
//                fullName
//                avatar
//                recommended
//                organization
//                userType
//             }
//          }
//       `,
//       variables: { skip: skip }
//    });

//    return {
//       props: {
//          users: data.AuthorizedContentProvider
//       }
//    };
// };

export default Preachers;
