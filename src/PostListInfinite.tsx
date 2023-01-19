import { useInfiniteQuery } from "@tanstack/react-query";
import { getPostsPaginated, IPostPaginated } from "./api/posts";

export function PostListInfinite() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    //get next page param from previous data and pass it to queryFn
    getNextPageParam: (prevData: IPostPaginated) => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
  });

  if (status === "loading") return <h1>Loading...</h1>;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;

  return (
    <>
      <h1>Post List Infinite</h1>
      {data.pages
        .flatMap((data) => data.posts)
        .map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
}
