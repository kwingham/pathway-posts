import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

const PostForm = () => {
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
    }
  };

  return (
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
  );
};

export default PostForm;
