import useFetch from "./useFetch";

interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const url: string = "https://jsonplaceholder.typicode.com/posts";

  const { data, loading, error } = useFetch(url);
  const convertedData: IPosts[] = data as IPosts[];

  return (
    <>
      <h2 data-cy="posts-heading">Posts</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {convertedData && (
        <div>
          {convertedData.map((item) => (
            <div data-cy="post-item" key={item.id}>
              <h3 data-cy="post-title">{item.title}</h3>
              <p data-cy="post-body">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
