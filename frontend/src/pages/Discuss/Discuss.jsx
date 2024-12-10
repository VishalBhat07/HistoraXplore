import React, { useState, useEffect } from "react";
import AddPost from "./AddPost";
import PostCard from "./PostCard";
import { getPosts } from "../../../firebaseFunctions/discussion";

function Discuss() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posted = await getPosts();
        if (posted){
          setPosts(posted);
        }
      } catch(error) {
        console.error("Could not fetch posts", error);
      }
    }
    fetchPosts();
  }, [posts]);

  return (
    <>
      <AddPost />
      {posts == null ? null : posts.map((post)=><PostCard postId={post.id}/>)}
    </>
  );
}

export default Discuss;
