import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ActorDetailPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const apiKey = 'c45a857c193f6302f2b5061c3b85e743';
  const baseImageUrl = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`)
      .then((res) => setActor(res.data));
  }, [id]);

  if (!actor) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={actor.profile_path ? `${baseImageUrl}${actor.profile_path}` : 'https://via.placeholder.com/300'}
          alt={actor.name}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{actor.name}</h1>
          <p className="mt-2">Birthday: {actor.birthday}</p>
          <p>Place of Birth: {actor.place_of_birth}</p>
          <p className="mt-2">{actor.biography}</p>
        </div>
      </div>
    </div>
  );
};

export default ActorDetailPage;