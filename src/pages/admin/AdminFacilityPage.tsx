import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, Building2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import ImageUpload from '../../components/ui/ImageUpload';
import ErrorBoundary from '../../components/ui/ErrorBoundary';
import type { Facility } from '../../types';

const emptyForm: Omit<Facility, 'id'> = {
  name: '',
  description: '',
  image: '',
  capacity: '',
};

const AdminFacilityPage: React.FC = () => {
  return (
    <ErrorBoundary>
      <AdminFacilityContent />
    </ErrorBoundary>
  );
};

const AdminFacilityContent: React.FC = () => {
  const { facilities, addFacility, updateFacility, deleteFacility, fetchFacilities } = useData();
  useEffect(() => {
  fetchFacilities();
}, []); // Array kosong [] memastikan ini hanya jalan 1x saat halaman dibuka
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Facility | null>(null);
  const [form, setForm] = useState<Omit<Facility, 'id'>>(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);

const filtered = facilities.filter((f) =>
  (f?.name || "").toLowerCase().includes((search || "").toLowerCase())
);
  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (item: Facility) => {
    setEditItem(item);
    setForm({ name: item.name, description: item.description, image: item.image, capacity: item.capacity || '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 1. Jika ada editItem, berarti kita sedang UPDATE
  if (editItem) {
    await updateFacility(editItem.id, form as Facility);
  } else {
    // 2. Jika tidak ada, berarti kita sedang ADD (tambah baru)
    await addFacility(form as Omit<Facility, 'id'>);
  }

  // 3. Reset form dan tutup modal setelah database selesai memproses
  setModalOpen(false);
  setEditItem(null);
  setForm(emptyForm);
};

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Manajemen Fasilitas</h2>
          <p className="text-gray-500 text-sm">{facilities.length} fasilitas tersedia</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center space-x-2 bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium">
          <Plus className="h-4 w-4" />
          <span>Tambah Fasilitas</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input type="text" placeholder="Cari fasilitas..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
        </div>
      </div>

      {/* Grid View */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm text-center py-16 text-gray-400">
          <Building2 className="h-10 w-10 mx-auto mb-2 opacity-40" />
          <p>Tidak ada fasilitas ditemukan</p>
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
                {item.capacity && (
                  <p className="text-xs text-primary-600 mb-3">Kapasitas: {item.capacity}</p>
                )}
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Fasilitas *</label>
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" placeholder="Nama fasilitas" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none" placeholder="Deskripsi fasilitas..." />
          </div>
          <ImageUpload
            label="Gambar Fasilitas"
            required
            value={form.image}
            onChange={(val) => setForm({ ...form, image: val })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas</label>
            <input type="text" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" placeholder="40 siswa / 200 orang" />
          </div>
          <div className="flex space-x-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">Batal</button>
            <button type="submit"
              className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium">
              {editItem ? 'Simpan Perubahan' : 'Tambah Fasilitas'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog isOpen={deleteId !== null} onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deleteFacility(deleteId)}
        title="Hapus Fasilitas" message="Apakah Anda yakin ingin menghapus fasilitas ini?" />
    </div>
  );
};

export default AdminFacilityPage;
