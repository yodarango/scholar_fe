import { AddContent } from "../fragments/buttons/add_content";
import { CastYourVote } from "../layouts/wigo/cast_your_vote";
import { FastFacts } from "../layouts/wigo/fast_facts";
import { WigoCommentaries } from "../layouts/wigo/wigo_commentaries";
import { WigoDailVerse } from "../layouts/wigo/wigo_daily_verse";
import { WigoQuotes } from "../layouts/wigo/wigo_quotes";
import { WigoSermons } from "../layouts/wigo/wigo_sermons";
import { WigoThoughts } from "../layouts/wigo/wigo_thoughts";

// styles
import styles from "./wigo.module.css";

export const Wigo = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.addButton}>
            <AddContent />
         </div>
         <div className={styles.quote}>
            <WigoQuotes />
         </div>
         <div className={styles.fastFacts}>
            <FastFacts />
         </div>
         <div className={styles.dailyVerse}>
            <WigoDailVerse />
         </div>
         <div className={styles.thoughts}>
            <WigoThoughts />
         </div>
         <div className={styles.polls}>
            <CastYourVote />
         </div>
         <div className={styles.commentaries}>
            <WigoCommentaries />
         </div>
         <div className={styles.sermonNotes}>
            <WigoSermons />
         </div>
      </div>
   );
};
