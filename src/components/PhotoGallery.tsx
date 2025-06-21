import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { photos } from '../data/photos';

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Kenangan Indah Kita
          </h2>
          <p className="text-xl text-gray-600">Setiap foto menyimpan cerita dan kenangan yang tak terlupakan 📸💕</p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedPhoto(photo.src)}
            >
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">{photo.caption}</p>
                </div>
              </div>

              {/* Heart Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for enlarged photo */}
        {selectedPhoto && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedPhoto}
                alt="Enlarged photo"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;