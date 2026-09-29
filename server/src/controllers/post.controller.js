
import { posts, updateDataFilePosts } from "../data/postData.js";
import { users } from "../data/userData.js";
import { likes, updateDataFile as updateLikesFile } from "../data/likeData.js";
import { comments, updateDataFileComments } from "../data/commentData.js";
import { Post } from "../models/post.model.js";

const ANON_NAME = "Usuario anónimo";
const ANON_UNIVERSITY = "Universidad de San Carlos de Guatemala";

const sameId = (a, b) => Number(a) === Number(b);

function nextId() {
    return posts.reduce((max, post) => Math.max(max, Number(post.id) || 0), 0) + 1;
}

// Construye la respuesta pública de un post (autor, anonimato y contadores)
function presentPost(post) {
    const author = users.find(user => user.carnet === post.user);
    const likesCount = likes.filter(like => sameId(like.postId, post.id)).length;
    const commentsCount = comments.filter(c => sameId(c.postId, post.id)).length;

    const base = {
        id: post.id,
        category: post.category,
        description: post.description,
        image: post.image,
        anonymous: post.anonymous,
        date: post.date,
        likesCount,
        commentsCount,
    };

    if (post.anonymous) {
        return {
            ...base,
            name: ANON_NAME,
            carrera: ANON_UNIVERSITY,
            facultad: "",
        };
    }

    return {
        ...base,
        name: author ? `${author.nombres} ${author.apellidos}` : (post.name || "Usuario"),
        carrera: author?.carrera || "",
        facultad: author?.facultad || "",
    };
}

export const getPosts = (req, res) => {
    try {
        const ordered = [...posts].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );
        res.json(ordered.map(presentPost));
    } catch (error) {
        res.status(500).json({ error: "Posts could not be retrieved" });
    }
};

// Top 10 por suma de likes + comentarios, descendente
export const getTrending = (req, res) => {
    try {
        const ordered = [...posts]
            .map(presentPost)
            .sort(
                (a, b) =>
                    (b.likesCount + b.commentsCount) -
                    (a.likesCount + a.commentsCount)
            )
            .slice(0, 10);
        res.json(ordered);
    } catch (error) {
        res.status(500).json({ error: "Trending posts could not be retrieved" });
    }
};

export const addPost = (req, res) => {
    const { description, category, image, anonymous } = req.body;

    if (!description) return res.status(400).json(["Description is required"]);
    if (!category) return res.status(400).json(["Category is required"]);

    try {
        const newPost = new Post(
            nextId(),
            req.user.carnet,
            description,
            category,
            typeof image === "string" ? image : "",
            !!anonymous
        );

        posts.push(newPost);
        updateDataFilePosts();

        res.json({
            message: "Post added successfully",
            post: presentPost(newPost),
        });
    } catch (error) {
        res.status(500).json({ error: "The post could not be created" });
    }
};

export const deletePost = (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex(post => sameId(post.id, id));

    if (index === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    posts.splice(index, 1);

    // Elimina en cascada los likes y comentarios del post
    const remainingLikes = likes.filter(like => !sameId(like.postId, id));
    likes.length = 0;
    likes.push(...remainingLikes);

    const remainingComments = comments.filter(c => !sameId(c.postId, id));
    comments.length = 0;
    comments.push(...remainingComments);

    updateDataFilePosts();
    updateLikesFile();
    updateDataFileComments();

    res.json({ message: "Post deleted successfully" });
};
