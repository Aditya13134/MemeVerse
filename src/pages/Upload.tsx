import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, Image, X } from 'lucide-react';

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the upload to a server
    console.log('Uploading meme:', { image: selectedImage, caption });
    alert('Meme uploaded successfully!');
    setSelectedImage(null);
    setCaption('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Meme</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
          {selectedImage ? (
            <div className="relative">
              <img src={selectedImage} alt="Selected meme" className="max-h-96 mx-auto rounded-lg" />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">Drag and drop your meme here</p>
              <p className="text-sm text-gray-500">or click to select a file</p>
            </motion.div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        <div>
          <label htmlFor="caption" className="block text-sm font-medium mb-2">
            Caption (optional)
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-800"
            rows={3}
            placeholder="Add a funny caption..."
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-primary-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-primary-600"
          disabled={!selectedImage}
        >
          <UploadIcon size={20} />
          <span>Upload Meme</span>
        </motion.button>
      </form>
    </div>
  );
};

export default Upload;