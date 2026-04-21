import React from 'react';
import { GraduationCap, MapPin, Phone, Mail, Globe, Award, User, Calendar } from 'lucide-react';
import { useData } from '../../context/DataContext';

const ProfilePage: React.FC = () => {
  const { profile } = useData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4">
              <GraduationCap className="h-12 w-12 text-primary-800" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
          <p className="text-primary-200">Profil Sekolah Lengkap</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-lg mb-4 border-b pb-2">Informasi Sekolah</h2>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Alamat</p>
                    <p className="text-gray-700 text-sm">{profile.address}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Telepon</p>
                    <p className="text-gray-700 text-sm">{profile.phone}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email</p>
                    <p className="text-gray-700 text-sm">{profile.email}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Website</p>
                    <p className="text-gray-700 text-sm">{profile.website}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Award className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Akreditasi</p>
                    <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-0.5 rounded-full">
                      {profile.accreditation}
                    </span>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <User className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Kepala Sekolah</p>
                    <p className="text-gray-700 text-sm">{profile.principalName}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Tahun Berdiri</p>
                    <p className="text-gray-700 text-sm">{profile.founded}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4 border-b pb-2">Tentang Sekolah</h2>
              <p className="text-gray-700 leading-relaxed">{profile.description}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4 border-b pb-2">Visi Sekolah</h2>
              <div className="bg-primary-50 border-l-4 border-primary-600 rounded-r-lg p-4">
                <p className="text-gray-700 italic leading-relaxed text-lg">"{profile.vision}"</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4 border-b pb-2">Misi Sekolah</h2>
              <ol className="space-y-3">
                {profile.mission.map((m, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="bg-primary-600 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{m}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
