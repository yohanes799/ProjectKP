import React, { useEffect } from 'react';
import { Building2, Users } from 'lucide-react';
import { useData } from '../../context/DataContext';

const FacilityPage: React.FC = () => {
  const { facilities, fetchFacilities } = useData();

  // Tambahkan useEffect ini
  useEffect(() => {
    fetchFacilities();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Building2 className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Fasilitas Sekolah</h1>
          <p className="text-primary-200">Fasilitas modern untuk mendukung proses belajar mengajar</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-2">{facility.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{facility.description}</p>
                {facility.capacity && (
                  <div className="flex items-center space-x-2 text-sm text-primary-600">
                    <Users className="h-4 w-4" />
                    <span>Kapasitas: {facility.capacity}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {facilities.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Belum ada data fasilitas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacilityPage;
