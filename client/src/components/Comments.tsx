import useFetch from "./useFetch";

interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comments = () => {
  const url: string = "https://jsonplaceholder.typicode.com/comments";

  const { data, loading, error } = useFetch(url);
  const convertedData: IComments[] = data as IComments[];

  return (
    <>
      <h2 data-cy="title-comment">Comments</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {convertedData && (
        <div>
          {convertedData.map((item) => (
            <div key={item.id}>
              <h3 data-cy="heading-name">{item.name}</h3>
              <p data-cy="message-email">{item.email}</p>
              <p data-cy="message-body">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
