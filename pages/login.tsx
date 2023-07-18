// styles
import Head from "next/head";
import LoginTemplate from "../components/templates/users/login";
import { UseIsNotAuth } from "../hooks/use_check_auth";

// styles
import styles from "./page_global.module.css";
import HeadContent from "../SEO/head_content";

export default function Login() {
   return (
      <UseIsNotAuth redirect='/users/@me'>
         <Head key='login-page'>
            <HeadContent title='Login' />
         </Head>
         <div className={styles.mainWrapper}>
            <LoginTemplate />
         </div>
      </UseIsNotAuth>
   );
}
