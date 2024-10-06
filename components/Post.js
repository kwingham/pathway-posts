import { supabase } from "../supabaseClient";

const Post = ({ post }) => {
  const deletePost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post.id);
    if (error) console.error(error);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
};

export default Post;
