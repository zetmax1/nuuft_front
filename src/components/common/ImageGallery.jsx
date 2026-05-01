import { useState } from 'react';
import { getImageUrl } from '../../api/newsApi';
import Image from './Image';

const ImageGallery = ({ images }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const selectedImage = images[selectedIndex];

    return (
        <div className="mt-12 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-text-primary mb-6">Foto galereya</h3>
            
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden bg-slate-100 mb-6">
                <img
                    src={getImageUrl(selectedImage.image_url)}
                    alt={selectedImage.caption || `Photo ${selectedIndex + 1}`}
                    className="w-full h-auto block rounded-lg"
                    style={{ maxHeight: '600px', objectFit: 'contain' }}
                />
                {selectedImage.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <p className="text-white text-lg font-medium">{selectedImage.caption}</p>
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {images.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedIndex(index)}
                            className={`relative rounded-lg overflow-hidden aspect-square bg-slate-100 border-2 transition-all ${
                                index === selectedIndex
                                    ? 'border-primary-500 scale-105 shadow-lg'
                                    : 'border-slate-200 hover:border-primary-300 hover:scale-105'
                            }`}
                        >
                            <Image
                                src={getImageUrl(item.image_url)}
                                alt={item.caption || `Photo ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;

