import React from 'react';
import { Eye, Target, CheckCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const VisiMisiPage: React.FC = () => {
  const { profile } = useData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Visi & Misi</h1>
          <p className="text-primary-200">{profile.name}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Visi */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-primary-100 p-3 rounded-full">
              <Eye className="h-7 w-7 text-primary-700" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Visi</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-8 border-l-4 border-primary-600">
            <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed font-medium text-center">
              "{profile.vision}"
            </p>
          </div>
        </div>

        {/* Misi */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Target className="h-7 w-7 text-green-700" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Misi</h2>
          </div>
          <div className="space-y-4">
            {profile.mission.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="bg-primary-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                    {i + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed text-lg">{m}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Tujuan */}
        <div className="mt-12 bg-primary-800 text-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-3">Komitmen Kami</h3>
          <p className="text-primary-200 leading-relaxed">
            Kami berkomitmen untuk terus meningkatkan kualitas pendidikan dan membentuk generasi
            penerus bangsa yang unggul, berkarakter, dan siap menghadapi tantangan global.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisiMisiPage;
