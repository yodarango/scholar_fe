import { Primary } from "../../fragments/buttons/primary";
import { Confetti } from "../../fragments/feedback/confetti";
import { Header } from "../../fragments/Typography/header";
import { Parragraph } from "../../fragments/Typography/parragraph";

// styles
import styles from "./success.module.css";

type TSuccessProps = {
   name: string;
   email: string;
};

export const SuccessTemplate = ({ email, name }: TSuccessProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.confetti}>
            <Confetti />
         </div>
         <div className={styles.layer}>
            <div className={styles.graphics}></div>
         </div>
         <div className={styles.message}>
            <div className={styles.title}>
               <Header type={5} text='Thank you!' size='large' align='center' />
            </div>
            <div className={styles.parragraph}>
               <Parragraph
                  text={`thank you ${name} for keeping Scholar alive! a confirmation email has been sent to ${email}`}
                  size='large'
                  align='medium'
               />
            </div>
            <div className={styles.button}>
               <Primary title='Done' href='/users/@me' type='2' />
            </div>
         </div>
      </div>
   );
};
