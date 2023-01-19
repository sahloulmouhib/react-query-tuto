import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import "./App.css";

function PostsList1() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    //initialData is not used when staleTime is set and is considered as real data
    //if you want to have placeholder data, you can use placeholderData
    // staleTime: 1000 * 5 * 60,
    // initialData: [
    //   {
    //     userId: 1,
    //     id: 1,
    //     title: "initial data",
    //     body: "empty",
    //   },
    // ],
    placeholderData: [],
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <h1>{JSON.stringify(postQuery.error)}</h1>;
  return (
    <div>
      <h1>Posts List 1</h1>
      <ol>
        {postQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  );
}

export default PostsList1;
