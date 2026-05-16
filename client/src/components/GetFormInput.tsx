// src/components/GetFormInput.tsx
import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

interface Message {
  _id?: string;
  //id?: number; // just in case backend returns different id
  title: string;
  content: string;
  createdAt?: string;
  order?: number;
}

const API_URL = "http://localhost:8000/api";

const GetFormInput: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/messages`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data: Message[] = await res.json();
      // ensure messages are sorted by order server-side; fallback to createdAt
      setMessages(data);
    } catch (err: unknown) {
      console.error(err);
      setError(err.message || "Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // give the new message an order at the end (optimistic)
      const payload = { title: title.trim(), content: content.trim() };
      const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to create message");
      }

      const newMessage: Message = await res.json();

      // Prepend new message for immediate UI feedback
      setMessages((prev) => [...prev, newMessage]);

      // reset form
      setTitle("");
      setContent("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // deleting indicator (optional)
  const [deletingId, setDeletingId] = useState<string | null>(null);

  //Handle delete
  const deleteMessage = async (_id: string) => {
    try {
      const res = await fetch(`${API_URL}/messages/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to delete message");
      }

      setMessages((prev) => prev.filter((msg) => msg._id !== _id));
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  //Updating the title and the content
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const updateMessage = async (id: string) => {
    try {
      if (!editTitle.trim() || !editContent.trim()) {
        setError("Title and content cannot be empty.");
        return;
      }
      const res = await fetch(`${API_URL}/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim(),
          content: editContent.trim(),
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to update message");
      }
      const updated = await res.json();

      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? updated : msg))
      );

      setEditId(null);
      setEditTitle("");
      setEditContent("");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Update failed");
    }
  };

  // Handdle drag and drop logic
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return; // dropped outside
    const src = result.source.index;
    const dst = result.destination.index;

    if (src === dst) return;

    // create new array and move the item
    const reordered = Array.from(messages);
    const [moved] = reordered.splice(src, 1);
    reordered.splice(dst, 0, moved);

    // assign order indexes
    const updated = reordered.map((msg, index) => ({
      ...msg,
      order: index,
    }));

    // optimistic UI update
    setMessages(updated);

    // persist order (send only ids for minimal payload)
    try {
      const res = await fetch(`${API_URL}/messages/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: updated.map((m) => m._id) }),
      });

      if (!res.ok) {
        throw new Error("Failed to save order");
      }
      // optionally you can re-fetch to be sure, but not necessary
    } catch (err) {
      console.error("Order save failed, refetching", err);
      // rollback by re-fetching server state
      fetchMessages();
    }
  };

  return (
    <div className="form-div">
      <h2>Form to Get User Input</h2>

      <form onSubmit={handleSubmission}>
        <label>
          Title
          <input
            className="form-input"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            data-cy="message-title"
            placeholder="Enter title..."
            disabled={submitting}
          />
        </label>
        <label>
          Content
          <textarea
            className="form-textarea"
            onChange={(e) => setContent(e.target.value)}
            data-cy="message-content"
            placeholder="Enter message..."
            value={content}
            disabled={submitting}
          />
        </label>
        <button
          className="form-btn"
          type="submit"
          disabled={submitting}
          data-cy="submit-message"
        >
          {submitting ? "Submitting..." : "Submit Message"}
        </button>
      </form>

      <h2>All Messages</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages submitted.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="messages-droppable">
            {(provided) => (
              <ul
                className="ul-style"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {messages.map((msg, index) => (
                  <Draggable
                    key={msg._id}
                    draggableId={String(msg._id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        data-cy="message-item"
                        data-id={msg._id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        tabIndex={0}
                        className={`message-item ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        {editId === msg._id ? (
                          <>
                            <input
                              data-cy="edit-title"
                              className="form-input"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <textarea
                              data-cy="edit-content"
                              className="form-textarea"
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                            />
                            <button
                              data-cy="save-message"
                              className="form-btn"
                              onClick={() => updateMessage(msg._id!)}
                            >
                              💾 Save
                            </button>
                            <button
                              className="form-btn cancel"
                              style={{ background: "gray" }}
                              onClick={() => {
                                setEditId(null);
                                setEditTitle("");
                                setEditContent("");
                              }}
                            >
                              X Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <h3 data-cy="message-title-text">
                              <strong>{msg.title}</strong>
                            </h3>

                            <p className="p-msg">{msg.content}</p>
                            <small>
                              {msg.createdAt
                                ? new Date(msg.createdAt).toLocaleString()
                                : ""}
                            </small>
                            <br />
                            <button
                              data-cy="edit-message"
                              onClick={() => {
                                setEditId(msg._id!);
                                setEditTitle(msg.title);
                                setEditContent(msg.content);
                              }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              data-cy="delete-message"
                              onClick={() => deleteMessage(msg._id!)}
                              disabled={deletingId === msg._id}
                            >
                              {deletingId === msg._id
                                ? "Deleting..."
                                : "❌ Delete"}
                            </button>
                          </>
                        )}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default GetFormInput;
