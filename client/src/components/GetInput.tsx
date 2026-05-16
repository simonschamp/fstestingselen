import { useState } from "react";

const GetInput = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmit = () => {
    setSubmitted(name);
  };

  return (
    <div>
      <h3>Get Input from the User </h3>

      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      {/* Display after submiting */}

      {submitted && <p>{`Your name is: ${submitted}`}</p>}
    </div>
  );
};

export default GetInput;
