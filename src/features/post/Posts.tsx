import { useMemo, useState } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { dataPostAsync, completedTasksSelector } from "./postSlice";

export function Posts() {
  const [userId, setUserId] = useState<number | undefined>();
  const [title, setTitle] = useState("");

  const postMemo = useMemo(
    () => completedTasksSelector(userId, title),
    [title, userId]
  );
  const posts = useAppSelector(postMemo);
  const dispatch = useAppDispatch();

  const getData = () => {
    dispatch(dataPostAsync());
  };

  const onChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(Number(e.currentTarget.value) || undefined);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  console.log(posts);

  return (
    <>
      <button onClick={getData}>get posts</button>
      <input type="number" placeholder="userId" onChange={onChangeUserId} />
      <input type="text" placeholder="title" onChange={onChangeTitle} />

      {posts.loading === "loading" ? (
        <div>loading...</div>
      ) : (
        <div className="container">
          <div className="row row-cols-4">
            {posts.loading === "idle" &&
              posts?.value.map((post) => (
                <div className="card col" key={post.id}>
                  <div>id: {post.id}</div>
                  <div>userId: {post.userId}</div>
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
