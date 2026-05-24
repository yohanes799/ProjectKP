import React, { useEffect } from 'react';
import { Trophy, Clock, User } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ExtracurricularPage: React.FC = () => {
  const { extracurriculars, fetchExtracurriculars } = useData();
  useEffect(() => {
    fetchExtracurriculars();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Trophy className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Ekstrakulikuler</h1>
          <p className="text-primary-200">Kembangkan bakat dan minat Anda bersama kami</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {extracurriculars.map((extra) => (
            <div
              key={extra.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden h-48">
                <img
                  src={extra.image}
                  alt={extra.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-2">{extra.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{extra.description}</p>
                <div className="space-y-2 border-t pt-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-primary-500" />
                    <span>{extra.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <User className="h-4 w-4 text-primary-500" />
                    <span>Pembina: {extra.coach}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {extracurriculars.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Trophy className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Belum ada data ekstrakulikuler</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtracurricularPage;
