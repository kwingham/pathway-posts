import { supabase } from "../supabaseClient";

export async function getServerSideProps() {
  const { data: posts } = await supabase.from("posts").select("*");
  return { props: { posts } };
}

const HomePage = ({ posts }) => (
  <div>
    {posts.map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>
    ))}
  </div>
);

export default HomePage;
