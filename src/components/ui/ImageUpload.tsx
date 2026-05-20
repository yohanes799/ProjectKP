import React, { useRef, useState } from 'react';
import { Upload, Link, X, Image } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

// Kompres gambar ke JPEG dengan lebar maks 800px dan kualitas 0.75
// Ini memastikan ukuran base64 tetap kecil (~100-200KB) agar tidak memenuhi localStorage
const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let { width, height } = img;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, label = 'Gambar', required = false }) => {
  const [mode, setMode] = useState<'url' | 'file'>('url');
  const [dragOver, setDragOver] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setCompressing(true);
    try {
      const compressed = await compressImage(file);
      onChange(compressed);
    } catch {
      // fallback ke FileReader biasa jika canvas gagal
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) onChange(e.target.result as string);
      };
      reader.readAsDataURL(file);
    } finally {
      setCompressing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const clearImage = () => {
    onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && '*'}
      </label>

      {/* Tab Toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-3 w-fit">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'url'
              ? 'bg-primary-700 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Link className="h-3.5 w-3.5" />
          <span>URL</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'file'
              ? 'bg-primary-700 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Upload className="h-3.5 w-3.5" />
          <span>Upload Lokal</span>
        </button>
      </div>

      {/* URL Input */}
      {mode === 'url' && (
        <input
          type="text"
          required={required && mode === 'url' && !value}
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          placeholder="https://example.com/gambar.jpg"
        />
      )}

      {/* File Upload */}
      {mode === 'file' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          <div
            onClick={() => !compressing && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              compressing
                ? 'border-primary-300 bg-primary-50 cursor-wait'
                : dragOver
                ? 'border-primary-500 bg-primary-50 cursor-pointer'
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50 cursor-pointer'
            }`}
          >
            {compressing ? (
              <>
                <div className="w-7 h-7 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-sm text-primary-600 font-medium">Mengompres gambar...</p>
              </>
            ) : (
              <>
                <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 font-medium">Klik atau drag & drop gambar</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — dikompres otomatis</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-3 relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-24 w-40 object-cover rounded-lg border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
            title="Hapus gambar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
