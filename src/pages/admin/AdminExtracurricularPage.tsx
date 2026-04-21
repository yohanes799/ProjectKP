import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search, Trophy } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUpload from '../../components/ui/ImageUpload';
import type { Extracurricular } from '../../types';

const emptyForm: Omit<Extracurricular, 'id'> = {
  name: '',
  description: '',
  schedule: '',
  coach: '',
  image: '',
};

const AdminExtracurricularPage: React.FC = () => {
  const { extracurriculars, addExtracurricular, updateExtracurricular, deleteExtracurricular } = useData();
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Extracurricular | null>(null);
  const [form, setForm] = useState<Omit<Extracurricular, 'id'>>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = extracurriculars.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: Extracurricular) => {
    setEditItem(item);
    setForm({ name: item.name, description: item.description, schedule: item.schedule, coach: item.coach, image: item.image });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      updateExtracurricular(editItem.id, { ...form, id: editItem.id });
    } else {
      addExtracurricular({ ...form, id: Date.now().toString() });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manajemen Ekstrakulikuler</h2>
          <p className="text-gray-500 text-sm">{extracurriculars.length} ekstrakulikuler tersedia</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center space-x-2 bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium">
          <Plus className="h-4 w-4" />
          <span>Tambah Ekstrakulikuler</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Cari ekstrakulikuler..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm text-center py-16 text-gray-400">
          <Trophy className="h-10 w-10 mx-auto mb-2 opacity-40" />
          <p>Tidak ada ekstrakulikuler ditemukan</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="h-40 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-2">{item.description}</p>
                <div className="text-xs text-gray-400 space-y-1 mb-3">
                  <p>🕐 {item.schedule}</p>
                  <p>👤 {item.coach}</p>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => openEdit(item)}
                    className="flex-1 flex items-center justify-center space-x-1 py-1.5 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                    <Pencil className="h-3.5 w-3.5" />
                    <span>Edit</span>
                  </button>
                  <button onClick={() => setDeleteId(item.id)}
                    className="flex-1 flex items-center justify-center space-x-1 py-1.5 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm">
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Ekstrakulikuler' : 'Tambah Ekstrakulikuler Baru'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ekstrakulikuler *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" placeholder="Nama ekstrakulikuler" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none" placeholder="Deskripsi kegiatan..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jadwal *</label>
            <input type="text" required value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" placeholder="Setiap Jumat, 14.00 - 17.00 WIB" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pembina *</label>
            <input type="text" required value={form.coach} onChange={(e) => setForm({ ...form, coach: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" placeholder="Nama pembina" />
          </div>
          <ImageUpload
            label="Gambar Ekstrakulikuler"
            required
            value={form.image}
            onChange={(val) => setForm({ ...form, image: val })}
          />
          <div className="flex space-x-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">Batal</button>
            <button type="submit"
              className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium">
              {editItem ? 'Simpan Perubahan' : 'Tambah Ekstrakulikuler'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={deleteId !== null} onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteExtracurricular(deleteId)}
        title="Hapus Ekstrakulikuler" message="Apakah Anda yakin ingin menghapus ekstrakulikuler ini?" />
    </div>
  );
};

export default AdminExtracurricularPage;
