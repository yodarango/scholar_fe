import { Pagination } from "../fragments/buttons/pagination";
import { DailyVerseCard } from "../fragments/cards/daily_verse_card";
import { DailyVerseImage } from "../fragments/cards/daily_verse_image";
import { CategoryTag } from "../fragments/chunks/category_tag";
import { SeePostInfo } from "../fragments/chunks/see_post_info";
import { NavigationMain } from "../layouts/navigation_main";
import { TextEditorActions } from "../layouts/text_editor_actions";

const Test = () => {
   return (
      <div style={{ padding: "3rem" }}>
         {/* <Pagination goBack='/' goForth='/' type='2' forContent='read' /> */}
         {/* <DailyVerseCard versionId='' /> */}
         {/* <NavigationMain /> */}
         {/* <DailyVerseImage versionId='' /> */}
         {/* <CategoryTag id='CYN' /> */}
         {/* <TextEditorActions /> */}
         <SeePostInfo
            userAuthority={1}
            userId='1'
            username='username'
            avatar='/images/user_avatars/default.png'
            postPostedOnDate='07/08/2022 11:00'
            postCreatedDate='07/08/2022 11:00'
            postCategory='PNK'
         />
      </div>
   );
};
export default Test;
