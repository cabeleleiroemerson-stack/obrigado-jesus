import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export default function MapPreview({ location, size = 'medium' }) {
  if (!location || !location.lat || !location.lng) return null;

  const { lat, lng, address } = location;
  
  // URL do Google Maps para abrir
  const directUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  
  // URL da imagem estática do OpenStreetMap
  const mapImageUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`;
  
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48',
    large: 'h-64'
  };

  return (
    <div className="w-full space-y-2 my-3">
      {/* Mapa Visual */}
      <div className={`${sizeClasses[size] || sizeClasses.medium} rounded-2xl overflow-hidden border-2 border-primary/30 bg-blue-50 relative group cursor-pointer`}
        onClick={() => window.open(directUrl, '_blank')}
      >
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src={mapImageUrl}
          style={{ border: 0 }}
        />
        
        {/* Overlay com ícone */}
        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white rounded-full p-4 shadow-lg">
            <Navigation size={32} className="text-primary" />
          </div>
        </div>
        
        {/* Marcador personalizado */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none">
          <div className="relative">
            <MapPin size={40} className="text-red-500 drop-shadow-lg" fill="currentColor" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500/50 rounded-full blur-sm" />
          </div>
        </div>
      </div>
      
      {/* Info da Localização */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-xl border-2 border-primary/20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="bg-primary/10 p-2 rounded-lg">
              <MapPin size={18} className="text-primary flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-textMuted">Localização</p>
              <p className="text-sm font-medium text-textPrimary truncate">
                {address || `${lat.toFixed(4)}, ${lng.toFixed(4)}`}
              </p>
            </div>
          </div>
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-primary text-white px-3 sm:px-4 py-2 rounded-full hover:bg-primary-hover text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm hover:shadow-md"
          >
            <span className="hidden sm:inline">Ver no</span> Mapa
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
