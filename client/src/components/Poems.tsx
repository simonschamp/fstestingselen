import React from "react";
import Poem from "./Poem";

interface PoemProps {
  poems: {
    id: number;
    vip: boolean;
    poem: string;
  }[];
}

const Poems: React.FC<PoemProps> = ({ poems }) => {
  return (
    <div>
      <h1>Poems</h1>
      {poems.map((item) => (
        <Poem key={item.id} vip={item.vip} poem={item.poem} />
      ))}
    </div>
  );
};

export default Poems;
