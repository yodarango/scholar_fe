import { AddContent } from "../fragments/buttons/add_content";
import { CastYourVote } from "../layouts/wigo/cast_your_vote";
import { FastFacts } from "../layouts/wigo/fast_facts";
import { WigoCommentaries } from "../layouts/wigo/wigo_commentaries";
import { WigoDailVerse } from "../layouts/wigo/wigo_daily_verse";
import { WigoQuotes } from "../layouts/wigo/wigo_quotes";
import { WigoSermons } from "../layouts/wigo/wigo_sermons";
import { WigoThoughts } from "../layouts/wigo/wigo_thoughts";
import styles from "./wigo.module.css";

export const Wigo = () => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.addButton}>
            <AddContent />
         </div>
         <div className={styles.quote}>
            <WigoQuotes
               quotes={[
                  {
                     ID: "0",
                     body: "This is  a body",
                     category_tags: "#BR",
                     author: "Matt",
                     background: "quote-bkg--14",
                     posted_on: "07/05/22 21:00",
                     date: "07/05/22 21:00",
                     total_count: 23,
                     creator: {
                        ID: "23",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 87,
                        avatar: ""
                     },
                     comments: [
                        {
                           total_count: 34
                        }
                     ],
                     approvals: [{ average_count: 23, total_count: 23 }]
                  },
                  {
                     ID: "11",
                     body: "This is  a body",
                     category_tags: "#BR",
                     author: "Matt",
                     background: "quote-bkg--14",
                     posted_on: "07/05/22 21:00",
                     date: "07/05/22 21:00",
                     total_count: 23,
                     creator: {
                        ID: "23",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 87,
                        avatar: ""
                     },
                     comments: [
                        {
                           total_count: 34
                        }
                     ],
                     approvals: [{ average_count: 23, total_count: 23 }]
                  },
                  {
                     ID: "76",
                     body: "This is  a body",
                     category_tags: "#BR",
                     author: "Matt",
                     background: "quote-bkg--14",
                     posted_on: "07/05/22 21:00",
                     date: "07/05/22 21:00",
                     total_count: 23,
                     creator: {
                        ID: "23",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 87,
                        avatar: ""
                     },
                     comments: [
                        {
                           total_count: 34
                        }
                     ],
                     approvals: [{ average_count: 23, total_count: 23 }]
                  },
                  {
                     ID: "2",
                     body: "This is  a body",
                     category_tags: "#BR",
                     author: "Matt",
                     background: "quote-bkg--14",
                     posted_on: "07/05/22 21:00",
                     date: "07/05/22 21:00",
                     total_count: 23,
                     creator: {
                        ID: "23",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 87,
                        avatar: ""
                     },
                     comments: [
                        {
                           total_count: 34
                        }
                     ],
                     approvals: [{ average_count: 23, total_count: 23 }]
                  },
                  {
                     ID: "233",
                     body: "This is  a body",
                     category_tags: "#BR",
                     author: "Matt",
                     background: "quote-bkg--14",
                     posted_on: "07/05/22 21:00",
                     date: "07/05/22 21:00",
                     total_count: 23,
                     creator: {
                        ID: "23",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 87,
                        avatar: ""
                     },
                     comments: [
                        {
                           total_count: 34
                        }
                     ],
                     approvals: [{ average_count: 23, total_count: 23 }]
                  }
               ]}
            />
         </div>
         <div className={styles.fastFacts}>
            <FastFacts
               images={[
                  "/images/bible_books/1.png",
                  "/images/bible_books/2.png",
                  "/images/bible_books/3.png",
                  "/images/bible_books/4.png",
                  "/images/bible_books/5.png"
               ]}
            />
         </div>
         <div className={styles.dailyVerse}>
            <WigoDailVerse />
         </div>
         <div className={styles.thoughts}>
            <WigoThoughts
               thoughts={[
                  {
                     title: "Title",
                     ID: "32",
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
                  },
                  {
                     title: "Title",
                     ID: "32",
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
                  },
                  {
                     title: "Title",
                     ID: "32",
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
                  },
                  {
                     title: "Title",
                     ID: "32",
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
                  },
                  {
                     title: "Title",
                     ID: "32",
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
         </div>
         <div className={styles.polls}>
            <CastYourVote />
         </div>
         <div className={styles.commentaries}>
            <WigoCommentaries
               commentaries={[
                  {
                     ID: "32",
                     body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                     category_tags: "#YLW",
                     referenced_verses: "1CO.1.1 MATT.2.2",
                     posted_on: "11/29/22 22:00",
                     date: "11/29/22 22:00",
                     VERSE_ID: "MAT.1.1",
                     verse_citation: "Matthew 12:1",
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
                  },
                  {
                     ID: "32",
                     body: "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                     category_tags: "#YLW",
                     referenced_verses: "1CO.1.1 MATT.2.2",
                     posted_on: "11/29/22 22:00",
                     VERSE_ID: "MAT.1.1",
                     verse_citation: "Matthew 12:1",
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
                  },
                  {
                     ID: "32",
                     VERSE_ID: "MAT.1.1",
                     verse_citation: "Matthew 12:1",
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
                  },
                  {
                     ID: "32",
                     VERSE_ID: "MAT.1.1",
                     verse_citation: "Matthew 12:1",
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
                  },
                  {
                     ID: "32",
                     VERSE_ID: "MAT.1.1",
                     verse_citation: "Matthew 12:1",
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
         </div>
         <div className={styles.sermonNotes}>
            <WigoSermons
               sermonNotes={[
                  {
                     ID: "32",
                     content: "This is a title",
                     DROPBOX_ID:
                        "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                     category_tags: "#YLW",
                     posted_on: "07/29/22 22:00",
                     date: "07/29/22 22:00",
                     title: "title",
                     file_url: "#",
                     creator: {
                        ID: "1",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 90,
                        avatar: "/imges/user_avatars/default.png",
                        first_name: "John",
                        last_name: "Doe",
                        my_church: "The Chruch of my Lord Jesus Christ"
                     }
                  },
                  {
                     ID: "32",
                     content: "This is a title",
                     DROPBOX_ID:
                        "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                     category_tags: "#YLW",
                     posted_on: "07/29/22 22:00",
                     date: "07/29/22 22:00",
                     title: "title",
                     file_url: "#",
                     creator: {
                        ID: "1",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 90,
                        avatar: "/imges/user_avatars/default.png",
                        first_name: "John",
                        last_name: "Doe",
                        my_church: "The Chruch of my Lord Jesus Christ"
                     }
                  },
                  {
                     ID: "32",
                     content: "This is a title",
                     DROPBOX_ID:
                        "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                     category_tags: "#YLW",
                     posted_on: "07/29/22 22:00",
                     date: "07/29/22 22:00",
                     title: "title",
                     file_url: "#",
                     creator: {
                        ID: "1",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 90,
                        avatar: "/imges/user_avatars/default.png",
                        first_name: "John",
                        last_name: "Doe",
                        my_church: "The Chruch of my Lord Jesus Christ"
                     }
                  },
                  {
                     ID: "32",
                     content: "This is a title",
                     DROPBOX_ID:
                        "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                     category_tags: "#YLW",
                     posted_on: "07/29/22 22:00",
                     date: "07/29/22 22:00",
                     title: "title",
                     file_url: "#",
                     creator: {
                        ID: "1",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 90,
                        avatar: "/imges/user_avatars/default.png",
                        first_name: "John",
                        last_name: "Doe",
                        my_church: "The Chruch of my Lord Jesus Christ"
                     }
                  },
                  {
                     ID: "32",
                     content: "This is a title",
                     DROPBOX_ID:
                        "this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body this is the body",
                     category_tags: "#YLW",
                     posted_on: "07/29/22 22:00",
                     date: "07/29/22 22:00",
                     title: "title",
                     file_url: "#",
                     creator: {
                        ID: "1",
                        signature: "Username",
                        authority_level: 1,
                        approval_rating: 90,
                        avatar: "/imges/user_avatars/default.png",
                        first_name: "John",
                        last_name: "Doe",
                        my_church: "The Chruch of my Lord Jesus Christ"
                     }
                  }
               ]}
            />
         </div>
      </div>
   );
};