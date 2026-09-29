
import { comments, updateDataFileComments } from "../data/commentData.js";
import { users } from "../data/userData.js";
import { Comment } from "../models/comment.model.js";

const sameId = (a, b) => Number(a) === Number(b);

function nextId() {
    return comments.reduce((max, c) => Math.max(max, Number(c.id) || 0), 0) + 1;
}

function presentComment(comment) {
    const author = users.find(user => user.carnet === comment.user);
    return {
        id: comment.id,
        postId: comment.postId,
        name: author ? `${author.nombres} ${author.apellidos}` : "Usuario",
        carrera: author?.carrera || "",
        facultad: author?.facultad || "",
        text: comment.text,
        date: comment.date,
    };
}

export const getComments = (req, res) => {
    const postId = Number(req.query.postId);

    const filtered = comments
        .filter(comment => sameId(comment.postId, postId))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json(filtered.map(presentComment));
};

export const postComment = (req, res) => {
    const { postId, text } = req.body;

    if (!text) return res.status(400).json(["Comment text is required"]);
    if (postId === undefined || postId === null)
        return res.status(400).json(["postId is required"]);

    try {
        const newComment = new Comment(
            nextId(),
            Number(postId),
            req.user.carnet,
            text
        );

        comments.push(newComment);
        updateDataFileComments();

        res.json(presentComment(newComment));
    } catch (error) {
        res.status(500).json({ error: "The comment could not be created" });
    }
};
