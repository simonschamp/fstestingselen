import React, { useState } from "react";

interface PoemProps {
  vip: boolean;
  poem: string;
}

const Poem: React.FC<PoemProps> = ({ vip, poem }) => {
  const [likes, setLikes] = useState(0);
  const increaseLikes = () => {
    setLikes(likes + 1);
  };
  return (
    <div>
      <p className={vip ? "vip" : ""}>
        {poem} - <button onClick={increaseLikes}>{likes}❤️</button>
      </p>
    </div>
  );
};
export default Poem;
