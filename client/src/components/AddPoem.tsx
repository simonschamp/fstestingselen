import React, { useState } from "react";

interface AddPoemProps {
  onAdd: (poem: { vip: boolean; content: string }) => void;
}

const AddPoem: React.FC<AddPoemProps> = ({ onAdd }) => {
  const [content, setContent] = useState<string>("");
  const [vip, setVip] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(vip, content);

    onAdd({ content, vip });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label data-cy="title-poem">Poem</label>
        <textarea
          data-cy="message-textarea"
          placeholder="Add poem..."
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
        <label data-cy="input-vip">
          VIP
          <input
            data-cy="input-checkbox"
            type="checkbox"
            onChange={(event) => setVip(event.target.checked)}
            checked={vip}
          />
        </label>
        <button data-cy="btn-addpoem" type="submit">
          Add Poem
        </button>
      </form>
    </div>
  );
};

export default AddPoem;
