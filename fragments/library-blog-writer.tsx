// core
import React from "react";
import Link from "next/link";

// styles
import libraryAuthorStyles from "../styles/fragments/LibraryAuthor.module.css";

export type ThostData = {
   id: string;
   name: string;
   avatar: string;
   recommended: boolean;
};

type libraryPodcastHostsProps = {
   userData: ThostData;
};

const LibraryBlogWriter = ({ userData }: libraryPodcastHostsProps) => {
   return (
      <div className={`${libraryAuthorStyles.mainWrapper}`}>
         <Link href={`/library/blogs?userid=${userData.id}`}>
            <a className={`${libraryAuthorStyles.avatarWrapper}`}>
               <img
                  src={userData.avatar}
                  alt='user avatar'
                  className={`${libraryAuthorStyles.avatar}`}
               />
            </a>
         </Link>

         <h3 className={`std-button_gradient-text ${libraryAuthorStyles.userSignature}`}>
            {userData.name}
         </h3>
      </div>
   );
};

export default LibraryBlogWriter;
