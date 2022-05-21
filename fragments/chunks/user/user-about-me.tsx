// core
import Link from "next/link";

// styles
import usersAboutMeStyles from "../../../styles/fragments/chunks/users/UserAboutMe.module.css";

// helpers / types
import { Tuser } from "../../../pages/users/[userId]";

type userAboutMeProps = {
   user: Tuser;
};

const UserAboutMe = ({ user }: userAboutMeProps) => {
   return (
      <section className={usersAboutMeStyles.aboutMeWrapper}>
         <h3 className={usersAboutMeStyles.aboutMeTitle}>About Me</h3>
         <ul>
            {user.first_name && user.gender === 1 && (
               <li>
                  👨 Full name is {user.first_name} {user.last_name}
               </li>
            )}
            {user.first_name && user.gender === 2 && (
               <li>
                  👩 Full name is {user.first_name} {user.last_name}
               </li>
            )}
            {user.my_church && <li>⛪ I attend {user.my_church}</li>}
            {user.my_favorite_verse && (
               <li>
                  📖 Favorite verse is{" "}
                  <span className={usersAboutMeStyles.favoriteVerseSpan}>
                     {user.my_favorite_verse}
                  </span>
               </li>
            )}
            {user.my_ministry && <li>🧹 My ministry is {user.my_ministry}</li>}
            {user.my_job && <li>👔 I am a full time {user.my_job}</li>}
            {user.my_true_color_personality_test && user.my_true_color_personality_test && (
               <li>📊 My True Color Personality is {user.my_true_color_personality_test}</li>
            )}
            {user.my_favorite_color && <li>🎨 My favorite color is {user.my_favorite_color}</li>}
            <li className={usersAboutMeStyles.myStory}>
               <Link href={`/users/my-story/${user.ID}`}>
                  <a> This is my story </a>
               </Link>
            </li>
         </ul>
      </section>
   );
};

export default UserAboutMe;
