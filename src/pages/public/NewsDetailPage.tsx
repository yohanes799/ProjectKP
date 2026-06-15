import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { useData } from '../../context/DataContext';

// Regex untuk mendeteksi URL dalam teks
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

// Render teks dengan URL yang diubah jadi link aktif
const renderTextWithLinks = (text: string) => {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 underline hover:text-primary-800 break-all"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { news } = useData();
  const navigate = useNavigate();

  const item = news.find((n) => n.id === id);
  const related = news.filter((n) => n.id !== id).slice(0, 3);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Berita tidak ditemukan</p>
          <button
            onClick={() => navigate('/berita')}
            className="text-primary-600 font-medium hover:underline"
          >
            Kembali ke Berita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link
          to="/berita"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-800 mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Berita</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-64 md:h-80 object-cover" />
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="flex items-center space-x-1 bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                    <Tag className="h-3 w-3" />
                    <span>{item.category}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </span>
                  <span className="flex items-center space-x-1 text-gray-400 text-sm">
                    <User className="h-4 w-4" />
                    <span>{item.author}</span>
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{item.title}</h1>
                <div className="prose prose-gray max-w-none">
                  {item.content.split('\n').map((paragraph, i) =>
                    paragraph.trim() === '' ? (
                      <div key={i} className="h-3" />
                    ) : (
                      <p key={i} className="text-gray-700 leading-relaxed text-base mb-4">
                        {renderTextWithLinks(paragraph)}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Berita Lainnya</h3>
              <div className="space-y-4">
                {related.map((r) => (
                  <Link key={r.id} to={`/berita/${r.id}`} className="group flex space-x-3">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary-700 transition-colors">
                        {r.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(r.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
