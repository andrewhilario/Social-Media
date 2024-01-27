/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Post from "./Post";
import { usePost } from "../../hooks/usePosts";

const SharePostComponent = (props) => {
  const postId = props.postId;
  const { postData } = usePost(postId);

  useEffect(() => {
    return () => {};
  }, [postId, postData]);

  return (
    <>
      {postData && (
        <Post
          key={postData.postId}
          postUser={postData.postUser}
          postUserImage={postData.postUserImage ?? ""}
          post={postData.post}
          postImages={postData.postImages}
          postVisibility={postData.postVisibility}
          postAuthorId={postData.authorId}
          postId={postData.postId}
          isSharePost={true}
        />
      )}
    </>
  );
};

export default SharePostComponent;
