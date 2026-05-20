import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { Upload, Link, X, ZoomIn, ZoomOut, RotateCw, Check } from 'lucide-react';

interface ImageCropUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  aspect?: number; // default 1 (square)
}

// Utility: crop gambar menggunakan canvas
const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<string> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(pixelCrop.width, pixelCrop.height);
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;

      // Lingkaran crop
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        size,
        size
      );
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
  });
};

const ImageCropUpload: React.FC<ImageCropUploadProps> = ({
  value,
  onChange,
  label = 'Foto',
  aspect = 1,
}) => {
  const [mode, setMode] = useState<'url' | 'file'>('file');
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setRawImage(e.target.result as string);
        setZoom(1.2);
        setRotation(0);
        setCrop({ x: 0, y: 0 });
      }
    };
    reader.readAsDataURL(file);
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

  const handleConfirmCrop = async () => {
    if (!rawImage || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(rawImage, croppedAreaPixels);
    onChange(cropped);
    setRawImage(null);
  };

  const handleCancelCrop = () => {
    setRawImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearImage = () => {
    onChange('');
    setRawImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Crop UI ──────────────────────────────────────────────
  if (rawImage) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-900">
          {/* Crop area */}
          <div className="relative w-full" style={{ height: 280 }}>
            <Cropper
              image={rawImage}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          {/* Controls */}
          <div className="bg-gray-800 px-4 py-3 space-y-2">
            {/* Zoom */}
            <div className="flex items-center space-x-3">
              <ZoomOut className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-primary-500"
              />
              <ZoomIn className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span className="text-xs text-gray-400 w-8 text-right">{zoom.toFixed(1)}x</span>
            </div>

            {/* Rotation */}
            <div className="flex items-center space-x-3">
              <RotateCw className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="flex-1 accent-primary-500"
              />
              <span className="text-xs text-gray-400 w-10 text-right">{rotation}°</span>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2 pt-1">
              <button
                type="button"
                onClick={handleCancelCrop}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                <X className="h-4 w-4" />
                <span>Batal</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmCrop}
                className="flex-1 flex items-center justify-center space-x-1.5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                <Check className="h-4 w-4" />
                <span>Gunakan Foto</span>
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          Geser & zoom untuk mengatur posisi wajah, lalu klik "Gunakan Foto"
        </p>
      </div>
    );
  }

  // ── Normal Upload UI ─────────────────────────────────────
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>

      {/* Tab Toggle */}
      <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-3 w-fit">
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'url' ? 'bg-primary-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Link className="h-3.5 w-3.5" />
          <span>URL</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
            mode === 'file' ? 'bg-primary-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
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
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          placeholder="https://example.com/foto.jpg"
        />
      )}

      {/* File Upload */}
      {mode === 'file' && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleInputChange}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              dragOver
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }`}
          >
            <Upload className="h-7 w-7 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600 font-medium">Klik atau drag & drop foto</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP — akan di-crop otomatis</p>
          </div>
        </>
      )}

      {/* Preview hasil crop */}
      {value && (
        <div className="mt-3 flex items-center space-x-3">
          <div className="relative">
            <img
              src={value}
              alt="Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-primary-200 shadow"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors shadow"
              title="Hapus foto"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700">Foto berhasil di-crop</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-primary-600 hover:underline mt-0.5"
            >
              Ganti foto
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropUpload;
