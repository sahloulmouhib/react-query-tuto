import { useQuery } from "@tanstack/react-query";
import { getPost } from "./api/posts";
import { getUser } from "./api/users";

/**
 * fetchStatus :
 * 1. idle :not doing anything
 * 2. loading : fetching data
 * 3. paused : lost connection
 *
 * Status :
 * 1. loading : fetching data
 * 2. error : error fetching data
 * 3. success : data fetched successfully
 */

export default function Post({ id }: { id: number }) {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    //run this function when the below condition is true, when a query depends on another query
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery.data!.userId),
  });

  if (postQuery.status === "loading") return <h1>Loading...</h1>;
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>;
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  );
}
