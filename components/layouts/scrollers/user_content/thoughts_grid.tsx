/**************************************************************************************** 
- displays a grid of thoughts.
****************************************************************************************/
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// comps
import { GridPrimary } from "../grid_primary";
import { Thought } from "../../../fragments/cards/posts/thought";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { Primary } from "../../../fragments/buttons/primary";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TThought } from "../../../../types/posts";

// helpers
import {
   handleGetThoughts,
   TgetThoughtsVariables
} from "../../../../helpers/functions/posts/thought_get";

export const ThoughtsGrid = () => {
   // router
   const router = useRouter();

   // components
   const [thoughts, setthougts] = useState<TThought[]>([]);
   const [loading, setloading] = useState<string>("loading");
   const [showloadMore, setshowloadMore] = useState<boolean>(true);
   const [smallLoader, setsmallLoader] = useState<boolean>(false);
   const [queryVariables, setqueryVariables] = useState<TgetThoughtsVariables>({
      last_id: 999999999
   });

   // fetch data on first time loading. Only runs on first load
   const fetchData = async (variables: TgetThoughtsVariables) => {
      setloading("loading");
      try {
         const { data, status } = await handleGetThoughts(variables);
         if (data && data.thought) {
            setthougts(data.thought);
            data.thought.length > 0 &&
               setqueryVariables({ last_id: data.thought[data.thought.length - 1].ID });

            data.thought.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
         }
         setloading(status);
      } catch (error) {
         console.error(error);
         setthougts([]);
         setloading("error");
      }
   };

   //fetch data any time any of the query params change.
   const fetchOnQueryChange = async (variables: TgetThoughtsVariables) => {
      setshowloadMore(false);
      setloading("loading");

      try {
         const { data, status } = await handleGetThoughts(variables);
         if (data && data.thought) {
            setthougts(data.thought);
            data.thought.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
            setloading(status);
         }
      } catch (error) {
         setthougts([]);
         setloading("error");
         console.error(error);
      }
   };

   // only fetches more with whatever params are there in the router posts
   const fetchMore = async (variables: TgetThoughtsVariables) => {
      setshowloadMore(false);
      setsmallLoader(true);

      try {
         const { data, status } = await handleGetThoughts(variables);
         if (data && data.thought) {
            // filter tags
            let moreCommentaries = data.thought;

            // update query variables
            moreCommentaries.length > 0 &&
               setqueryVariables({
                  ...queryVariables,
                  last_id: moreCommentaries[moreCommentaries.length - 1].ID
               });

            setthougts((prev) => [...prev, ...moreCommentaries]);
            moreCommentaries.length === 20 ? setshowloadMore(true) : setshowloadMore(false);
            setsmallLoader(false);
         }
      } catch (error) {
         setthougts([]);
         console.error(error);
      }
   };

   // only call fetch data on initial load
   useEffect(() => {
      if (router.isReady)
         router.query.last_id
            ? fetchData({ ...router.query })
            : fetchData({ ...queryVariables, ...router.query });
   }, [router.isReady]);

   //call on query params change
   useEffect(() => {
      if (router.isReady) fetchOnQueryChange({ ...router.query, last_id: 999999999 });
   }, [router.query]);

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && (
            <div className={styles.gridWrapper}>
               <GridPrimary>
                  {thoughts.map((thought: TThought, index: number) => (
                     <div key={index} className={styles.child}>
                        <Thought
                           cta={{
                              handleDelete: () => console.log("handle show post")
                           }}
                           thought={thought}
                        />
                     </div>
                  ))}
               </GridPrimary>
               {showloadMore && (
                  <div className={styles.loadMore}>
                     <Primary
                        title='Load more'
                        type='1'
                        cta={{
                           handleClick: () =>
                              fetchMore({
                                 ...router.query,
                                 last_id: thoughts[thoughts.length - 1].ID
                              })
                        }}
                     />
                  </div>
               )}

               {smallLoader && (
                  <div className={styles.smallLoader}>
                     <SmallLoader />
                  </div>
               )}
            </div>
         )}

         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </div>
   );
};
