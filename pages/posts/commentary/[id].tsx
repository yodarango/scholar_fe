import Head from "next/head";
import { ViewCommentary } from "../../../components/templates/posts/view_commentary";
import styles from "../../page_global.module.css";
import HeadContent from "../../../SEO/head_content";

const Index = () => {
   return (
      <div className={styles.mainWrapper}>
         <Head key='commentary-single-page'>
            <HeadContent title='Commentary' />
         </Head>
         <ViewCommentary />
      </div>
   );
};
export default Index;
