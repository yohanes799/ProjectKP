import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Newspaper } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUpload from '../../components/ui/ImageUpload';
import type { NewsItem } from '../../types';

const emptyForm: Omit<NewsItem, 'id'> = {
  title: '',
  excerpt: '',
  content: '',
  date: new Date().toISOString().split('T')[0],
  image: '',
  category: '',
  author: 'Admin Sekolah',
};

const AdminNewsPage: React.FC = () => {
  const { news, fetchNews, addNews, updateNews, deleteNews } = useData();
  useEffect(() => {
    fetchNews();
  }, []);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<NewsItem | null>(null);
  const [form, setForm] = useState<Omit<NewsItem, 'id'>>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

const filtered = news.filter((n) =>
  (n?.title || "").toLowerCase().includes((search || "").toLowerCase()) ||
  (n?.category || "").toLowerCase().includes((search || "").toLowerCase())
);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditItem(item);
    setForm({ title: item.title, excerpt: item.excerpt, content: item.content, date: item.date, image: item.image, category: item.category, author: item.author });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hapus pemaksaan new Date(). Langsung pakai data form.
    const newItem = {
      ...form,
    } as NewsItem; 

    // FIX 2: Cek apakah sedang edit atau tambah
    if (editItem) {
      await updateNews(editItem.id!, newItem);
      alert("Berita berhasil diupdate!");
    } else {
      await addNews(newItem);
      alert("Berita berhasil ditambahkan!");
    }

    // Reset form
    setForm(emptyForm);
    setModalOpen(false);
    setEditItem(null); 
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manajemen Berita</h2>
          <p className="text-gray-500 text-sm">{news.length} berita tersedia</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center space-x-2 bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Berita</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari berita..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Berita</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-12 text-gray-400">
                    <Newspaper className="h-10 w-10 mx-auto mb-2 opacity-40" />
                    <p>Tidak ada berita ditemukan</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-800 text-sm line-clamp-1">{item.title}</p>
                          <p className="text-gray-400 text-xs line-clamp-1">{item.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleteId(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? 'Edit Berita' : 'Tambah Berita Baru'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Berita *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              placeholder="Judul berita"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                placeholder="Prestasi / Kegiatan / Pengumuman"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>
          <ImageUpload
            label="Gambar Berita"
            required
            value={form.image}
            onChange={(val) => setForm({ ...form, image: val })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan *</label>
            <textarea
              required
              rows={2}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
              placeholder="Ringkasan singkat berita..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Isi Berita *</label>
            <textarea
              required
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none"
              placeholder="Isi lengkap berita..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Penulis</label>
            <input
              type="text"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            />
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
            >
              {editItem ? 'Simpan Perubahan' : 'Tambah Berita'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteNews(deleteId)}
        title="Hapus Berita"
        message="Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default AdminNewsPage;
