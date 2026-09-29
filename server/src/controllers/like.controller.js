
import { likes, updateDataFile } from "../data/likeData.js";

const sameId = (a, b) => Number(a) === Number(b);

export const getLikes = (req, res) => {
    const postId = Number(req.query.postId);

    const userIds = likes
        .filter(like => sameId(like.postId, postId))
        .map(like => like.userId);

    return res.status(200).json(userIds);
};

// Altena el like del usuario autenticado sobre un post (toggle)
export const toggleLike = (req, res) => {
    const { postId } = req.body;
    const userId = req.user.carnet;

    if (postId === undefined || postId === null) {
        return res.status(400).json(["postId is required"]);
    }

    const existingIndex = likes.findIndex(
        like => sameId(like.postId, postId) && like.userId === userId
    );

    if (existingIndex !== -1) {
        likes.splice(existingIndex, 1);
        updateDataFile();
        return res.status(200).json({ liked: false });
    }

    likes.push({ postId: Number(postId), userId });
    updateDataFile();
    return res.status(200).json({ liked: true });
};
