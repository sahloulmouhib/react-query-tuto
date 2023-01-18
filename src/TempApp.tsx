import { useQuery } from "@tanstack/react-query";
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
/**** Query Key *******/
// /posts -> ['posts']
// /posts/1 -> ['posts', post.id]
// /posts?authorId=1 -> ['posts', { authorId: 1 }]
// /posts/2/comments -> ['posts', post.id, 'comments']

function App() {
  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
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
    </div>
  );
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default App;
