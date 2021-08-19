// ************************** PURPOSE **************************** //
// *** This page component will fetch all the blogs found ******** //
// *** in the library if no param is pased in the query. ********* //
// *** however, users can filter the results by author by ******** //
// *** going to the /library/blogs page, and returnng to ********* //
// *** same page with the userId and content type in the query *** //

// core
import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";

// components
import LibraryMenu from "../../../fragments/buttons/library-menu";
import Header from "../../../layouts/header";
import BlogCarrousel from "../../../layouts/library-individual-pages/blogs-carrousel";

// styles
import libraryBlogsStyles from "../../../styles/pages/library/blogs/LibraryBlogs.module.css";

// types
import { blogProps } from "../../../fragments/library-items/blog";

type watchPageProps = {
   blogs: blogProps[];
};

const Blogs = ({ blogs }: watchPageProps) => {
   return (
      <div className={`${libraryBlogsStyles.mainWrapper}`}>
         <Head>
            <meta name='keyword' content='tags' />
         </Head>
         <Header currPage={"BLOGS"} />
         <div className='x-large-spacer'></div>
         <LibraryMenu
            includeCategory={true}
            includeContent={true}
            includeSearch={true}
            contentButtonIcon={"📑"}
            currentSlectedContentPage={{ blogs: "#f2f2f2" }}
         />
         {blogs && <BlogCarrousel blogs={blogs} />}
      </div>
   );
};

// ============== FUNCTION 1: Make a call to the library API to get all the content to load
export const getStaticProps: GetStaticProps = async () => {
   const data = await fetch("https://scholar-be.herokuapp.com/library");
   const parsedData = await data.json();

   return {
      props: {
         blogs: parsedData.blogs,
         revalidate: 60 * 50 * 24 //everyday
      }
   };
};

export default Blogs;