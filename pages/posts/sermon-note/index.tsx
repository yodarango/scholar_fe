// components
import { PrimaryStackHeader } from "../../../layouts/stacks/headers/primary_stack_header";
import { SermonNotesAll } from "../../../templates/content/sermon_notes_all";

// styles
import styles from "./index.module.css";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <PrimaryStackHeader title='Quotes' />
         <div className={styles.posts}>
            <SermonNotesAll />
         </div>
      </div>
   );
};

export default Index;