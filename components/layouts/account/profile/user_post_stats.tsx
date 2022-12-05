import { useEffect, useState } from "react";
import {
   getPostsSummary,
   TgetPostsSummaryVariables
} from "../../../../helpers/functions/users/profile_get_posts_summary";
import { TpostSummary, TuserSummary } from "../../../../types/user";

// comps
import { ProfileStatsGraph } from "../../../fragments/chunks/profile_stats_graph";

//helpers
import { ProfilePostStats } from "../../../fragments/profile_post_stats";

// styles
import styles from "./user_post_stats.module.css";

type TUserPostStatsProps = {
   userID?: string;
};

export const UserPostStats = ({ userID }: TUserPostStatsProps) => {
   const contentStats = [
      {
         icon: "comment",
         iconColor: "#B293FE",
         totalPosts: "commentary_count",
         contentType: "commentaries"
      },
      {
         icon: "think",
         iconColor: "#533CA3",
         totalPosts: "thought_count",
         contentType: "thoughts"
      },
      {
         icon: "quote",
         iconColor: "#F1EAFF",
         totalPosts: "quote_count",
         contentType: "quote"
      },
      {
         icon: "folder",
         iconColor: "#7350EC",
         totalPosts: "sermon_count",
         contentType: "sermon notes"
      }
   ];

   // get data
   const [data, setdata] = useState<TpostSummary | any>({
      commentary_count: 0,
      thought_count: 0,
      quote_count: 0,
      sermon_count: 0
   });

   const { commentary_count, thought_count, quote_count, sermon_count } = data;

   const getData = async (variables: TgetPostsSummaryVariables) => {
      try {
         const { data, status } = await getPostsSummary(variables);
         console.log(data);
         setdata(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (userID) {
         getData({ ID: userID });
      } else {
         getData({ isSelf: true });
      }
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.graph}>
            <ProfileStatsGraph
               content={{ commentary_count, thought_count, quote_count, sermon_count }}
            />
         </div>
         <div className={styles.stats}>
            {contentStats.map((item, index) => (
               <div className={styles.stat} key={index}>
                  <ProfilePostStats
                     contentType={item.contentType}
                     icon={item.icon}
                     iconColor={item.iconColor}
                     totalPosts={data[item.totalPosts]}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};
