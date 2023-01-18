import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { createPost } from "./api/posts";
import Post from "./Post";

/* Status :
 * 1. idle : not doing anything
 * 2. loading : sending data
 * 3. error : failed to send
 * 4. success : data mutated successfully
 */

export function CreatePost({
  setCurrentPage,
}: {
  setCurrentPage: (page: JSX.Element) => void;
}) {
  const titleRef = useRef<any>();
  const bodyRef = useRef<any>();

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      //this is needed to update the posts list after adding a new post this will trigger for every query key that starts with["posts"]
      //   queryClient.invalidateQueries(["posts"]);

      //this will only trigger for the exact query key which is get one post by id and cache it with the created post
      queryClient.setQueryData(["posts", data.id], data);
      //this will only trigger for the exact query key
      queryClient.invalidateQueries(["posts"], { exact: true });
      setCurrentPage(<Post id={data.id} />);
    },
  });

  function handleSubmit(e: any) {
    e.preventDefault();
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    });
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  );
}
