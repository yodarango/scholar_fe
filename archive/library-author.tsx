// core
import React from "react";
import Link from "next/link";

// styles
import libraryAuthorStyles from "../styles/fragments/LibraryAuthor.module.css";

export type IuserData = {
   id: string;
   fullName: string;
   avatar: string;
   trusted: true;
   reputation?: 54;
};

type libraryAuthorProps = {
   userData: IuserData;
   content: string | undefined | string[];
};

const LibraryAuthor = ({ userData, content }: libraryAuthorProps) => {
   return (
      <div className={`${libraryAuthorStyles.mainWrapper}`}>
         {content && (
            <Link href={`/library/${content}?userId=${userData.id}`}>
               <a className={`${libraryAuthorStyles.avatarWrapper}`}>
                  <img
                     src={userData.avatar}
                     alt='user avatar'
                     className={`${libraryAuthorStyles.avatar}`}
                  />
               </a>
            </Link>
         )}
         {!content && (
            <Link href={`/library/authors#`}>
               <a className={`${libraryAuthorStyles.avatarWrapper}`}>
                  <img
                     src={userData.avatar}
                     alt='user avatar'
                     className={`${libraryAuthorStyles.avatar}`}
                  />
               </a>
            </Link>
         )}
         <h3 className={`std-button_gradient-text ${libraryAuthorStyles.userSignature}`}>
            {userData.fullName}
         </h3>
         {content && (
            <Link href={`/profile?userId=${userData.id}`}>
               <a className={`${libraryAuthorStyles.userProfile}`}>profile </a>
            </Link>
         )}
      </div>
   );
};

export default LibraryAuthor;