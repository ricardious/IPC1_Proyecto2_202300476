import { likes } from "../data/likeData.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const getLikes =  (req, res) => {
    const postId = req.query.postId; // Obtenemos el ID de la publicación de la consulta

    // Filtramos el array de "likes" para obtener solo los objetos con el postId especificado
    const likesForPost = likes.filter(like => like.postId === parseInt(postId));
  
    // Mapeamos el array filtrado para obtener solo los userId
    const userIds = likesForPost.map(like => like.userId);
  
    // Devolvemos los userId como respuesta
    return res.status(200).json(userIds);
}

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
  
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, TOKEN_SECRET, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const { postId } = req.body;
      const userId = userInfo.carnet;
  
      // Verificar si el usuario ya ha dado "like" a esta publicación
      const existingLike = likes.find(like => like.postId === postId && like.userId === userId);
  
      if (existingLike) {
        return res.status(400).json("You have already liked this post.");
      }
  
      // Agregar un nuevo objeto "like" al array
      likes.push({ postId, userId });
  
      return res.status(200).json("Post has been liked.");
    });
  };

  export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
  
    if (!token) return res.status(401).json("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const postId = req.query.postId;
      const userId = userInfo.id;
  
      // Buscar el índice del objeto "like" que coincida con el postId y userId
      const likeIndex = likes.findIndex(like => like.postId === parseInt(postId) && like.userId === userId);
  
      if (likeIndex === -1) {
        return res.status(400).json("You have not liked this post.");
      }
  
      // Eliminar el objeto "like" del array
      likes.splice(likeIndex, 1);
  
      return res.status(200).json("Post has been disliked.");
    });
  };