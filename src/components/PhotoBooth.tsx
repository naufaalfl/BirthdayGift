import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, RotateCcw, Sparkles, AlertTriangle } from 'lucide-react';

const frames = [
  { name: "Sweet Hearts", decoration: "💕 Sweet Seventeen 💕" },
  { name: "Star Frame", decoration: "⭐ Birthday Star ⭐" },
  { name: "Purple Dream", decoration: "💜 Dream Come True 💜" },
  { name: "Rainbow Love", decoration: "🌈 Colorful Love 🌈" }
];

const frameStyles = [
  "border-8 border-pink-400 rounded-3xl",
  "border-8 border-yellow-400 rounded-3xl",
  "border-8 border-purple-400 rounded-3xl",
  "p-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-3xl"
];

const PhotoBooth = () => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    // Reset state
    setCapturedPhoto(null);
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Kamera tidak dapat diakses. Pastikan Anda telah memberikan izin pada browser.");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert to data URL and set as captured photo
    const dataUrl = canvas.toDataURL('image/jpeg');
    setCapturedPhoto(dataUrl);

    // Stop the camera stream
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    const link = document.createElement('a');
    link.href = capturedPhoto;
    link.download = `ultah-aca-photobooth.jpg`;
    
    // Temporarily draw to canvas to add frame decoration for download
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    const img = new Image();
    img.src = capturedPhoto;
    img.onload = () => {
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      if (!tempCtx) return;
      
      // Draw the photo
      tempCtx.drawImage(img, 0, 0);
      
      // Add text decoration
      tempCtx.font = `bold ${img.height / 15}px sans-serif`;
      tempCtx.textAlign = 'center';
      tempCtx.fillStyle = 'white';
      tempCtx.shadowColor = 'black';
      tempCtx.shadowBlur = 10;
      tempCtx.fillText(frames[selectedFrame].decoration, tempCanvas.width / 2, tempCanvas.height - (img.height / 20));
      
      link.href = tempCanvas.toDataURL('image/jpeg');
      link.click();
    };
  };

  const PhotoArea = () => (
    <div className={`relative w-full aspect-square bg-gray-800 rounded-3xl overflow-hidden ${frameStyles[selectedFrame]}`}>
      <div className={selectedFrame === 3 ? "p-2 h-full" : "h-full"}>
        <AnimatePresence>
          {capturedPhoto ? (
            <motion.img key="photo" src={capturedPhoto} alt="Captured" className="w-full h-full object-cover rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          ) : (
            <motion.video key="video" ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
          )}
        </AnimatePresence>

        {!capturedPhoto && (
            <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
              <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold">
                {frames[selectedFrame].decoration}
              </span>
            </div>
        )}
        
        {error && !stream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-center">{error}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Camera className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-teal-600 bg-clip-text text-transparent">
              Photo Booth
            </h2>
            <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-teal-500" />
          </div>
          <p className="text-lg sm:text-2xl text-gray-600">Abadikan momen serumu dengan bingkai lucu! 📸✨</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div className="w-full max-w-md mx-auto" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <PhotoArea />
          </motion.div>

          <motion.div className="w-full max-w-md mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Pilih Bingkai Favoritmu</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {frames.map((frame, index) => (
                  <button key={index} onClick={() => setSelectedFrame(index)} className={`p-1 rounded-2xl transition-all duration-300 ${selectedFrame === index ? 'ring-4 ring-purple-500 shadow-lg' : ''}`}>
                    <div className={`w-full aspect-square ${frameStyles[index]} flex items-center justify-center text-center p-2`}>
                      <span className="text-xs sm:text-sm font-bold text-gray-700">{frame.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!capturedPhoto ? (
                  <motion.button onClick={takePhoto} disabled={!stream} className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <div className="flex items-center justify-center gap-2">
                      <Camera className="w-5 h-5" />
                      <span>{stream ? 'Ambil Foto' : 'Mengakses Kamera...'}</span>
                    </div>
                  </motion.button>
                ) : (
                  <>
                    <motion.button onClick={downloadPhoto} disabled={!capturedPhoto} className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <div className="flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        <span>Unduh Foto</span>
                      </div>
                    </motion.button>
                    <motion.button onClick={startCamera} className="bg-gray-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <div className="flex items-center justify-center gap-2">
                        <RotateCcw className="w-5 h-5" />
                        <span>Ambil Ulang</span>
                      </div>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PhotoBooth;