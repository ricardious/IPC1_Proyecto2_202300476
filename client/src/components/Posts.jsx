import Post from "./Post";
import React, { useState } from 'react';
import { useEffect } from "react";
import { getPostsRequest } from "../api/auth";
import instance from "../api/axios";
import { useQuery } from "@tanstack/react-query";

function Posts(){

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => instance.get("/posts").then((res) => {
      console.log(res.data); // Log the data
      return res.data; // Return the data
    })
  });

  return (
    <div className="flex flex-col gap-8">
      {error // Si hay un error, mostramos un mensaje de error
        ? "Something went wrong!"
        : isLoading // Si la solicitud está cargando, mostramos un mensaje de carga
        ? "loading"
        : Array.isArray(data) ? data.map((post) => <Post post={post} key={post.id} />) : null // Si la solicitud ha terminado y no hay errores, mapeamos los datos a componentes Post
      }
    </div>
  );
};

export default Posts;