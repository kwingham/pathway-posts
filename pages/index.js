import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export async function getServerSideProps() {
  const { data: posts } = await supabase.from("posts").select("*");
  return { props: { posts } };
}

const HomePage = ({ posts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content }]);

    if (error) {
      console.error("Error creating post:", error);
    } else {
      console.log("Post created:", data);
      setTitle("");
      setContent("");
      // Optionally, you can refresh the page or update the state to show the new post
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
