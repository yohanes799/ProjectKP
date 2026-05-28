import React, { useEffect, useState } from 'react';
import { Search, GraduationCap, Trash2, Pencil, X, Eye, Download } from 'lucide-react';
import { useData } from '../../context/DataContext';
import Modal from '../../components/ui/Modal';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import type { PPDBRegistration } from '../../types';
import { generatePPDBPdf } from '../../utils/generatePPDBPdf';

type EditForm = Omit<PPDBRegistration, 'id' | 'registeredAt' | 'status'>;

const AdminPPDBPage: React.FC = () => {
  const { ppdbRegistrations, fetchRegistrations, deletePPDBRegistration } = useData();
useEffect(() => {
  fetchRegistrations();
}, []); // [] agar hanya dijalankan sekali saat page load
  const [search, setSearch] = useState('');
  const [detailItem, setDetailItem] = useState<PPDBRegistration | null>(null);
  const [editItem, setEditItem] = useState<PPDBRegistration | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Gunakan updatePPDBRegistrationStatus untuk update data lengkap via workaround
  // Tambahkan fungsi update data di context jika belum ada
  const { addPPDBRegistration } = useData();

const filtered = ppdbRegistrations.filter((r) =>
  (r?.nama_lengkap || "").toLowerCase().includes((search || "").toLowerCase()) ||
  (r?.sekolah_asal || "").toLowerCase().includes((search || "").toLowerCase()) ||
  (r?.id || "").toLowerCase().includes((search || "").toLowerCase())
);
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formattanggal_lahir = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const openEdit = (item: PPDBRegistration) => {
    setEditItem(item);
    setEditForm({
      nama_lengkap: item.nama_lengkap,
      nisn: item.nisn,
      nik: item.nik,
      agama: item.agama,
      jenis_kelamin: item.jenis_kelamin,
      tempat_lahir: item.tempat_lahir,
      tanggal_lahir: item.tanggal_lahir,
      alamat_lengkap: item.alamat_lengkap,
      telepon_siswa: item.telepon_siswa,
      nama_wali: item.nama_wali,
      pekerjaan_wali: item.pekerjaan_wali,
      telepon_wali: item.telepon_wali,
      sekolah_asal: item.sekolah_asal,
      alamat_sekolah: item.alamat_sekolah,
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!editItem || !editForm) return;

  const updatedRegistration: PPDBRegistration = {
    id: editItem.id,
    nama_lengkap: editForm.nama_lengkap || "",
    nisn: editForm.nisn || "",
    nik: editForm.nik || "",
    agama: editForm.agama || "",
    jenis_kelamin: editForm.jenis_kelamin as 'Laki-laki' | 'Perempuan',
    tempat_lahir: editForm.tempat_lahir || "",
    tanggal_lahir: editForm.tanggal_lahir || "",
    alamat_lengkap: editForm.alamat_lengkap || "",
    telepon_siswa: editForm.telepon_siswa || "",
    nama_wali: editForm.nama_wali || "",
    pekerjaan_wali: editForm.pekerjaan_wali || "",
    telepon_wali: editForm.telepon_wali || "",
    sekolah_asal: editForm.sekolah_asal || "",
    alamat_sekolah: editForm.alamat_sekolah || "",
    registeredAt: editItem.registeredAt,
    status: editItem.status,
  };

  addPPDBRegistration(updatedRegistration);
  setEditItem(null);
  setEditForm(null);
};
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Data Pendaftar PPDB</h2>
          <p className="text-gray-500 text-sm">{ppdbRegistrations.length} total pendaftar</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-primary-50 border-l-4 border-primary-500 rounded-xl p-4">
        <p className="text-2xl font-bold text-primary-700">{ppdbRegistrations.length}</p>
        <p className="text-sm text-gray-600">Total Pendaftar</p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Cari nama, sekolah, atau nomor pendaftaran..."
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
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">No. Daftar</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Nama Lengkap</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Jenis Kelamin</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Asal Sekolah</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Tanggal Daftar</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    <GraduationCap className="h-10 w-10 mx-auto mb-2 opacity-40" />
                    <p>Belum ada data pendaftar</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 text-xs font-mono text-gray-500">{item.id}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-800 text-sm">{item.nama_lengkap}</p>
                      <p className="text-xs text-gray-400">{item.tempat_lahir}, {formattanggal_lahir(item.tanggal_lahir)}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-600">{item.jenis_kelamin}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">{item.sekolah_asal}</td>
                    <td className="px-5 py-4 text-xs text-gray-500">
  {item.created_at && !isNaN(Date.parse(item.created_at)) 
    ? formatDate(item.created_at) 
    : "Data Tidak Lengkap"}
</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Detail */}
                        <button
                          onClick={() => setDetailItem(item)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {/* Edit */}
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        {/* Hapus */}
                        <button
                          onClick={() => setDeleteId(item.id || null)}
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

      {/* Modal Detail */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDetailItem(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Detail Pendaftar</h3>
                <p className="text-xs text-gray-500 font-mono">{detailItem.id}</p>
              </div>
              <button
                onClick={() => setDetailItem(null)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Nama Lengkap', value: detailItem.nama_lengkap },
                  { label: 'Jenis Kelamin', value: detailItem.jenis_kelamin },
                  { label: 'NISN', value: detailItem.nisn },
                  { label: 'NIK', value: detailItem.nik },
                  { label: 'Agama', value: detailItem.agama },
                  { label: 'Tempat Lahir', value: detailItem.tempat_lahir },
                  { label: 'Tanggal Lahir', value: formattanggal_lahir(detailItem.tanggal_lahir) },
                  { label: 'No. Telepon Siswa', value: detailItem.telepon_siswa },
                  { label: 'Nama Wali', value: detailItem.nama_wali },
                  { label: 'Pekerjaan Wali', value: detailItem.pekerjaan_wali },
                  { label: 'No. Telepon Wali', value: detailItem.telepon_wali },
                  { label: 'Asal Sekolah', value: detailItem.sekolah_asal },
                ].map((field) => (
                  <div key={field.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-0.5">{field.label}</p>
                    <p className="text-sm font-medium text-gray-800">{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-0.5">Alamat Lengkap</p>
                <p className="text-sm font-medium text-gray-800">{detailItem.alamat_lengkap}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-0.5">Alamat Sekolah Asal</p>
                <p className="text-sm font-medium text-gray-800">{detailItem.alamat_sekolah}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
  <p className="text-xs text-gray-400 mb-0.5">Tanggal Mendaftar</p>
  <p className="text-sm font-medium text-gray-800">
    {detailItem?.created_at && !isNaN(Date.parse(detailItem.created_at)) 
      ? formatDate(detailItem.created_at) 
      : "Data tanggal tidak tersedia"}
  </p>
</div>
            </div>
            <div className="p-4 border-t flex gap-3">
              <button
                onClick={() => generatePPDBPdf(detailItem)}
                className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              <button
                onClick={() => setDetailItem(null)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      <Modal
        isOpen={editItem !== null}
        onClose={() => { setEditItem(null); setEditForm(null); }}
        title="Edit Data Pendaftar"
        size="lg"
      >
        {editForm && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
              <input type="text" required value={editForm.nama_lengkap}
                onChange={(e) => setEditForm({ ...editForm, nama_lengkap: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NISN *</label>
                <input type="text" required value={editForm.nisn}
                  onChange={(e) => setEditForm({ ...editForm, nisn: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  maxLength={10} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK *</label>
                <input type="text" required value={editForm.nik}
                  onChange={(e) => setEditForm({ ...editForm, nik: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  maxLength={16} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agama *</label>
                <select required value={editForm.agama}
                  onChange={(e) => setEditForm({ ...editForm, agama: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white">
                  <option value="">-- Pilih Agama --</option>
                  <option value="Islam">Islam</option>
                  <option value="Kristen">Kristen</option>
                  <option value="Katolik">Katolik</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Buddha">Buddha</option>
                  <option value="Konghucu">Konghucu</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin *</label>
                <select required value={editForm.jenis_kelamin}
                  onChange={(e) => setEditForm({ ...editForm, jenis_kelamin: e.target.value as 'Laki-laki' | 'Perempuan' })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white">
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir *</label>
                <input type="text" required value={editForm.tempat_lahir}
                  onChange={(e) => setEditForm({ ...editForm, tempat_lahir: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir *</label>
                <input type="date" required value={editForm.tanggal_lahir}
                  onChange={(e) => setEditForm({ ...editForm, tanggal_lahir: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label>
              <textarea required rows={2} value={editForm.alamat_lengkap}
                onChange={(e) => setEditForm({ ...editForm, alamat_lengkap: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon Siswa *</label>
              <input type="tel" required value={editForm.telepon_siswa}
                onChange={(e) => setEditForm({ ...editForm, telepon_siswa: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Wali *</label>
                <input type="text" required value={editForm.nama_wali}
                  onChange={(e) => setEditForm({ ...editForm, nama_wali: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan Wali *</label>
                <input type="text" required value={editForm.pekerjaan_wali}
                  onChange={(e) => setEditForm({ ...editForm, pekerjaan_wali: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon Wali *</label>
              <input type="tel" required value={editForm.telepon_wali}
                onChange={(e) => setEditForm({ ...editForm, telepon_wali: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
            </div>
           {/* Input untuk Nama Sekolah Asal */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Sekolah Asal *</label>
  <input 
    required 
    type="text"
    value={editForm.sekolah_asal}
    onChange={(e) => setEditForm({ ...editForm, sekolah_asal: e.target.value })}
    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" 
  />
</div>

{/* Input untuk Alamat Sekolah Asal */}
<div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Sekolah Asal *</label>
  <textarea 
    required 
    rows={2} 
    value={editForm.alamat_sekolah}
    onChange={(e) => setEditForm({ ...editForm, alamat_sekolah: e.target.value })}
    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm resize-none" 
  />
</div>
            <div className="flex space-x-3 pt-2">
              <button type="button"
                onClick={() => { setEditItem(null); setEditForm(null); }}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium">
                Batal
              </button>
              <button type="submit"
                className="flex-1 px-4 py-2 bg-primary-700 text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium">
                Simpan Perubahan
              </button>
            </div>
          </form>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteId && deletePPDBRegistration(deleteId)}
        title="Hapus Data Pendaftar"
        message="Apakah Anda yakin ingin menghapus data pendaftar ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
};

export default AdminPPDBPage;
