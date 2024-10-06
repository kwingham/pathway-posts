import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useRouter } from "next/router";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const createPost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content }]);
    if (error) console.error(error);
    else router.push("/");
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <button onClick={createPost}>Create Post</button>
    </div>
  );
};

export default CreatePostForm;
