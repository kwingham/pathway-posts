import { supabase } from "../../utils/supabaseClient";
import CommentForm from "../../components/CommentForm";

export async function getServerSideProps({ params }) {
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", params.postid)
    .single();
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", params.postid);
  return { props: { post, comments } };
}

const PostPage = ({ post, comments }) => (
  <div>
    <h1>{post.title}</h1>
    <p>{post.content}</p>
    <CommentForm postId={post.id} />
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  </div>
);

export default PostPage;
