
import React from 'react';

const InfoCards = ({ data, position }) => {
  const sentences = data?.historical_summary?.match(/[^.!?]+[.!?]+/g) || [];

  return (
    <div
      className="absolute z-[1000] max-w-md"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="flex overflow-x-auto gap-4 p-2 snap-x">
        {sentences.map((sentence, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-64 bg-white rounded-lg shadow-lg p-4 snap-center"
          >
            <h3 className="text-sm font-semibold mb-2">{data.area}</h3>
            <p className="text-sm">{sentence.trim()}</p>
            <p className="text-xs text-gray-500 mt-2">Year: {data.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCards;