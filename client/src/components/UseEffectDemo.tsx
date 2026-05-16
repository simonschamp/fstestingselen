import { useEffect, useState } from "react";

const UseEffectDemo = () => {
  // State
  const [dataType, setDataType] = useState<string>("posts");
  const [data, setData] = useState<string>("");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${dataType}`)
      .then((response) => response.json())
      .then((postData) => setData(JSON.stringify(postData)));
  }, [dataType]);

  return (
    <div data-cy="fetch-div">
      <h2 data-cy="fetch-deader">UseEffectDemo</h2>
      <button data-cy="btn-post" onClick={() => setDataType("posts")}>
        Posts
      </button>
      <button data-cy="btn-comments" onClick={() => setDataType("comments")}>
        Comments
      </button>

      <h3 data-cy="show-data">{dataType}</h3>
      <p data-cy="display-data">{data}</p>
    </div>
  );
};

export default UseEffectDemo;
