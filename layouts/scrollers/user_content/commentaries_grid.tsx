import { useEffect, useState } from "react";

// comps
import { Header } from "../../../fragments/Typography/header";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import { GridPrimary } from "../grid_primary";
import { Commentary } from "../../../fragments/cards/posts/commentary";

// styles
import styles from "./commentaries_grid.module.css";

// types
import { TCommentary } from "../../../types/posts";

type TCommentariesGridProps = {
   verseCitation: string;
   verseId: string;
   verse: string;
};

export const CommentariesGrid = ({ verseCitation, verseId, verse }: TCommentariesGridProps) => {
   const [commentaries, setcommentaries] = useState<TCommentary[]>([]);

   // fetch commentaris based on ID
   useEffect(() => {
      setcommentaries(
         [...Array(20)].map(() => ({
            ID: "1",
            VERSE_ID: "1",
            body: "This is my post",
            category_tags: "#CYN #BLK",
            referenced_verses: "!CO.1.2",
            posted_on: "12/24/2022",
            date: "07/07/2022 02:00",
            verse_citation: "1 Corinthians 1:2",
            total_count: 5,
            postImage: "/images/icons/logo.png",
            creator: {
               ID: "1",
               signature: "Myusername",
               authority_level: 1,
               approval_rating: 100,
               first_name: "Mario",
               last_name: "Pineda",
               my_church: "FAC",
               avatar: "/images/logo.png"
            },
            comments: [{ total_count: 20 }],
            approvals: [
               {
                  total_count: 5,
                  average_count: 5
               }
            ]
         }))
      );
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.verseWrapper}>
            <div className={styles.citation}>
               <Header text={verseCitation} quiet={true} type={4} size='main' />
            </div>
            <div className={styles.verse}>
               <Parragraph text={verse} size='main' />
            </div>
         </div>
         <div className={styles.gridWrapper}>
            <GridPrimary>
               {commentaries.map((commentary: TCommentary, index: number) => (
                  <div key={index} className={styles.child}>
                     <Commentary
                        customWidth={true}
                        cta={{
                           handleDelete: () => console.log("handle show post")
                        }}
                        commentary={{
                           ID: commentary.ID,
                           VERSE_ID: commentary.VERSE_ID,
                           body: commentary.body,
                           category_tags: commentary.category_tags,
                           referenced_verses: commentary.referenced_verses,
                           posted_on: commentary.posted_on,
                           date: commentary.date,
                           verse_citation: commentary.verse_citation,
                           total_count: 5,
                           postImage: commentary.postImage,
                           creator: {
                              ID: commentary.creator.ID,
                              signature: commentary.creator.signature,
                              authority_level: commentary.creator.authority_level,
                              approval_rating: commentary.creator.approval_rating,
                              first_name: commentary.creator.first_name,
                              last_name: commentary.creator.last_name,
                              my_church: commentary.creator.my_church,
                              avatar: commentary.creator.avatar
                           },
                           comments: [{ total_count: 20 }],
                           approvals: [
                              {
                                 total_count: 5,
                                 average_count: 5
                              }
                           ]
                        }}
                     />
                  </div>
               ))}
            </GridPrimary>
         </div>
      </div>
   );
};