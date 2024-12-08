import React, { useState } from "react";
import "./Discuss.css";

const Discuss = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "The Industrial Revolution: A Turning Point",
      author: "John Doe",
      date: "2024-12-07",
      content:
        "The Industrial Revolution radically changed the way society functioned, introducing mass production and changing labor dynamics.",
    },
    {
      id: 2,
      title: "Ancient Civilizations: The Pyramids of Egypt",
      author: "Jane Smith",
      date: "2024-12-06",
      content:
        "The Pyramids of Egypt are one of the greatest achievements of ancient civilizations. Let's discuss their historical and cultural significance.",
    },
    {
      id: 3,
      title: "World War II: Causes and Impact",
      author: "Mark Taylor",
      date: "2024-12-05",
      content:
        "World War II was a devastating conflict that reshaped global politics and economies. What were the main causes, and how did it impact the world?",
    },
  ]);

  return (
    <div className="discussion-forum">
      <div className="hero">
        <h1>Discussion Forum</h1>
        <p>
          Welcome to the official discussion forum of Histora Xplore, one stop
          destination for all your thoughts on history.
        </p>
      </div>
      <div className="forum-posts">
        {posts.map((post) => (
          <div key={post.id} className="forum-post">
            <h2>{post.title}</h2>
            <p className="post-info">
              <strong>{post.author}</strong> - {post.date}
            </p>
            <p>{post.content}</p>
            <button className="read-more-button">Read More</button>
          </div>
        ))}
      </div>
      <div className="create-post">
        <h2>Create a New Discussion</h2>
        <textarea placeholder="Write your post here..."></textarea>
        <button className="create-post-button">Post Discussion</button>
      </div>
    </div>
  );
};

export default Discuss;
