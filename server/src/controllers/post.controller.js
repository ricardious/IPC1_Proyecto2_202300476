
import { posts, updateDataFilePosts } from "../data/postData.js";
import { users } from "../data/userData.js";
import { Post } from "../models/post.model.js";

var id_Post = 0;

export const getPosts = async (req, res) => {
    try {
        for (const post of posts) {
            const userFind = users.find(user => user.carnet === post.user);
   
            if (userFind) {
                const posts = {
                    id: post.id,
                    name: userFind.nombres,
                    description: post.description,
                    image: post.image,
                    date: post.date
                }
                posts.push(posts);
                updateDataFilePosts();
            }
            
        }

        posts.reverse();
        res.json(posts)

    } catch (error) {
        return res.json(
            {
                error: "The user deletion encountered an error"
            }
        )
    }
}

export const addPost = async (req, res) => {
    try {
        const userId = req.body.userId;
        const name = req.body.name;
        const description = req.body.description;
        const image = req.body.image;

        id_Post = id_Post + 1;
        const newPost = new Post(id_Post, name, userId, description, image);

        posts.push(newPost);
        updateDataFilePosts();

        res.json(
            {
                message: "Post added successfully"
            }
        )

    } catch (error) {
        return res.json(
            {
                error: "The user deletion encountered an error"
            }
        )
    }
}

