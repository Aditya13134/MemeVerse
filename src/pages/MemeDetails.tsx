import React from 'react';
import { useParams } from 'react-router-dom';

const MemeDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meme Details</h1>
      {/* Content will be implemented in the next iteration */}
    </div>
  );
};

export default MemeDetails;