import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./App.css";

const POSTS = [
  {
    id: "1",
    title: "Post 1",
  },
  {
    id: "2",
    title: "Post 2",
  },
];

function App() {
  const queryClient = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  const newPostMutation = useMutation({
    mutationFn: (title: string) =>
      wait(1000).then(() =>
        POSTS.push({
          id: crypto.randomUUID(),
          title: title,
        })
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;
  return (
    <div>
      {postQuery.data.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
        </div>
      ))}
      <button
        disabled={newPostMutation.isLoading}
        onClick={() => newPostMutation.mutate("New Post")}
      >
        Add new
      </button>
    </div>
  );
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default App;
