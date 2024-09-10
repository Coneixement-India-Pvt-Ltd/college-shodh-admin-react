import React from "react";
import BlogListing from "./BlogListing";

const Blogs = () => {
  return (
    <div className="flex flex-col ml-72 mt-24 mb-5">
      <div className="flex flex-row space-x-8">
        <BlogListing />
        <BlogListing />
        <BlogListing />
      </div>
    </div>
  );
};

export default Blogs;
