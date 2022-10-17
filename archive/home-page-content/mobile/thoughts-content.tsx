// core
import { useState, useEffect } from "react";
import Image from "next/image";

//graphQl
import client from "../../../apollo-client";
import { GET_PROFILE_THOUGHTS } from "../../../graphql/users/profile";

// comps
import Thought from "../../../fragments/cards/posts/thought";
import SmallLoader from "../../../fragments/chunks/small_loader";
import CardsLazyLoading from "../../cards-lazy-loading";
import ResourceNotFoundError from "../../../fragments/chunks/error_resource_not_found";

// styles
import homePageContentStyles from "../../../styles/layouts/home-page-content/HomePageContent.module.css";
import cardsLazyLoadingStyles from "../../../styles/layouts/CardsLazyLoading.module.css";

// helpers types
import { Tuser } from "../../../pages/users/[userId]";
import { Tthought } from "../../../fragments/cards/posts/thought";

type thoughtContentProps = {
   user: Tuser;
   handleCloseThoughts: any;
};
const ThoughtsContent = ({ user, handleCloseThoughts }: thoughtContentProps) => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [smallLoadingState, setSmallLoadingState] = useState<boolean>(false);
   const [thoughtsState, setThoughtsState] = useState<Tthought[]>([]);
   const [thoughtLastIdState, setThoughtLastIdState] = useState<string>("99999999999");
   const [hideLoadMoreBttnState, setHideLoadMoreBttnState] = useState<boolean>(false);

   const requestThoughts = async () => {
      setSmallLoadingState(true);
      try {
         const { data } = await client.query({
            query: GET_PROFILE_THOUGHTS,
            variables: { ID: user.ID, totalCountOnly: false, last_id: thoughtLastIdState }
         });

         // add user values to each thought before passing it to the component
         if (data.users[0].all_posts.thoughts) {
            const modifiedThoughts: any = [];
            data.users[0].all_posts.thoughts.map((thought: Tthought) =>
               modifiedThoughts.push({
                  ...thought,
                  creator: {
                     ID: user.ID,
                     avatar: user.avatar,
                     signature: user.signature,
                     approval_rating: user.approval_rating,
                     my_church: user.my_church,
                     first_name: user.first_name,
                     last_name: user.last_name,
                     authority_level: user.authority_level
                  }
               })
            );
            setThoughtsState((thoughtsState) => [...thoughtsState, ...modifiedThoughts]);
            data.users[0].all_posts.thoughts.length < 20 ? setHideLoadMoreBttnState(true) : null;
            setLoadingState("done");
            setSmallLoadingState(false);
         }
      } catch (error) {
         setLoadingState("error");
         setSmallLoadingState(false);
         console.log(error);
      }
   };

   useEffect(() => {
      requestThoughts();
   }, [thoughtLastIdState]);

   return (
      <div className={"dark-bkg"}>
         <span className={"closeModal"} onClick={handleCloseThoughts}>
            X
         </span>
         <section className={homePageContentStyles.popUpContentWrapper}>
            {user.signature && (
               <h1 className={homePageContentStyles.popUpContentWrapper_title}>
                  Thoughts by {user.signature}
               </h1>
            )}
            {thoughtsState && loadingState === "done" && (
               <Thought thoughts={thoughtsState} user_authority_level={user.authority_level} />
            )}
            {thoughtsState?.length === 0 && loadingState === "done" && (
               <h2 className={homePageContentStyles.noNotifications}>
                  No thoughts have been posted yet
               </h2>
            )}
            {loadingState === "loading" && (
               <CardsLazyLoading amount={25} compClass={cardsLazyLoadingStyles.postCardCTSN} />
            )}
            {loadingState == "error" && <ResourceNotFoundError />}

            {!hideLoadMoreBttnState && !smallLoadingState && (
               <button
                  className={"std-button"}
                  onClick={() => setThoughtLastIdState(thoughtsState[thoughtsState.length - 1].ID)}>
                  <p className='std-button_gradient-text'>Load More</p>
               </button>
            )}
            {smallLoadingState && !hideLoadMoreBttnState && <SmallLoader />}
         </section>
      </div>
   );
};

export default ThoughtsContent;