import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThoughtsOneLineCarrousel } from "../../../layouts/scrollers/thoughts_one_line_carrousel";

export default {
   title: "layouts/scrollers/Thought One Line Carrousel",
   component: ThoughtsOneLineCarrousel
} as ComponentMeta<typeof ThoughtsOneLineCarrousel>;

export const Default: ComponentStory<typeof ThoughtsOneLineCarrousel> = () => (
   <ThoughtsOneLineCarrousel
      thoughts={[
         {
            ID: "32",
            title: "This is a title",
            body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
            category_tags: "#YLW",
            referenced_verses: "1CO.1.1 MATT.2.2",
            posted_on: "11/29/22 22:00",
            date: "11/29/22 22:00",
            total_count: 10,
            postImage: "/images/bible_books/1.png",
            creator: {
               ID: "1",
               signature: "Username",
               authority_level: 1,
               approval_rating: 90,
               avatar: "/imges/user_avatars/default.png",
               first_name: "John",
               last_name: "Doe",
               my_church: "The Chruch of my Lord Jesus Christ"
            },
            comments: [
               {
                  total_count: 34
               }
            ],
            approvals: [
               {
                  average_count: 3,
                  total_count: 34
               }
            ]
         }
      ]}
   />
);
