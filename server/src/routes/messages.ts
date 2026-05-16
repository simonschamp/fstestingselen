import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// Create message
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required." });
    }

    const msg = new Message({ title, content });
    const saved = await msg.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// Reset all messages (TEST ONLY) Cypress

router.delete("/reset", async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({ success: true, message: "All messages deleted for testing" });
  } catch (err) {
    console.error("Reset failed:", err);
    res.status(500).json({ success: false, message: "Reset failed" });
  }
});

// Get all messages (sorted sorted by drag-and-drop order)
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ order: 1 });
    return res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE message by ID
router.delete("/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Update ordering of messages  route
router.put("/reorder", async (req, res) => {
  try {
    const { orderedIds } = req.body; // array of ids in new order

    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const updates = orderedIds.map((id, index) =>
      Message.findByIdAndUpdate(id, { order: index })
    );

    await Promise.all(updates);

    res.json({ success: true, message: "Order updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// UPDATE a message by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // return updated document
    );

    if (!updated) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
