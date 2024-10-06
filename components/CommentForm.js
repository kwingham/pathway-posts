import { useState } from "react";
import { supabase } from "../supabaseClient";

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");

  const addComment = async () => {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, content }]);
    if (error) console.error(error);
    else setContent("");
  };

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default CommentForm;
