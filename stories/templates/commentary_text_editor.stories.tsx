import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CommentaryTextEditor } from "../../templates/content/commentary_text_editor";

export default {
   title: "layouts/Coomentary Text Editor ",
   component: CommentaryTextEditor
} as ComponentMeta<typeof CommentaryTextEditor>;

export const ThoughtPost: ComponentStory<typeof CommentaryTextEditor> = () => (
   <CommentaryTextEditor
      body={`# Title &nbsp; (link)[www.example.com]`}
      postImage='/images/bible_books/1.png'
      userAuthority={1}
      userId='123'
      username='Username'
      avatar='/images/user_avatar'
      postPostedOnDate='08/11/22 09:00'
      postCreatedDate='08/11/22 09:00'
      postCategory='YLW'
      postReferences={["1CO.1.1", "MAT.3.2"]}
      postPrivacy={true}
   />
);