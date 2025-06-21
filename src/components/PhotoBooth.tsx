import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, RotateCcw, Sparkles, AlertTriangle, Settings, Wifi, WifiOff } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt' | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Check camera permission
  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.permissions) {
          const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setCameraPermission(permission.state);
          
          permission.onchange = () => {
            setCameraPermission(permission.state);
          };
        }
      } catch (err) {
        console.log('Permission API not supported');
      }
    };
    
    checkPermission();
  }, []);

  const startCamera = async () => {
    setIsLoading(true);
    setError(null);
    setCapturedPhoto(null);
    
    try {
      // Stop existing stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }

      // Try different camera configurations
      const constraints = {
        video: {
          facingMode: { ideal: 'user' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
          aspectRatio: { ideal: 1 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Wait for video to be ready
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve;
          }
        });
      }
      
      setCameraPermission('granted');
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      
      let errorMessage = "Kamera tidak dapat diakses.";
      
      if (err.name === 'NotAllowedError') {
        errorMessage = "Izin kamera ditolak. Silakan izinkan akses kamera di pengaturan browser.";
      } else if (err.name === 'NotFoundError') {
        errorMessage = "Tidak ada kamera yang ditemukan pada perangkat ini.";
      } else if (err.name === 'NotReadableError') {
        errorMessage = "Kamera sedang digunakan oleh aplikasi lain.";
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = "Kamera tidak mendukung resolusi yang diminta.";
      } else if (err.name === 'TypeError') {
        errorMessage = "Browser tidak mendukung akses kamera.";
      }
      
      setError(errorMessage);
      setCameraPermission('denied');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-start camera when component mounts
  useEffect(() => {
    if (isOnline && cameraPermission !== 'denied') {
      startCamera();
    }
    
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOnline, cameraPermission]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !stream) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Set canvas size to match video dimensions
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    try {
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to data URL and set as captured photo
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedPhoto(dataUrl);

      // Stop the camera stream
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    } catch (err) {
      console.error("Error taking photo:", err);
      setError("Gagal mengambil foto. Silakan coba lagi.");
    }
  };

  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    
    try {
      const link = document.createElement('a');
      link.href = capturedPhoto;
      link.download = `ultah-aca-photobooth-${Date.now()}.jpg`;
      
      // Add frame decoration for download
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        if (!tempCtx) return;
        
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        
        // Draw the photo
        tempCtx.drawImage(img, 0, 0);
        
        // Add text decoration
        const fontSize = Math.max(img.height / 15, 20);
        tempCtx.font = `bold ${fontSize}px Arial, sans-serif`;
        tempCtx.textAlign = 'center';
        tempCtx.fillStyle = 'white';
        tempCtx.shadowColor = 'black';
        tempCtx.shadowBlur = 10;
        tempCtx.shadowOffsetX = 2;
        tempCtx.shadowOffsetY = 2;
        tempCtx.fillText(frames[selectedFrame].decoration, tempCanvas.width / 2, tempCanvas.height - (img.height / 20));
        
        link.href = tempCanvas.toDataURL('image/jpeg', 0.9);
        link.click();
      };
      
      img.src = capturedPhoto;
    } catch (err) {
      console.error("Error downloading photo:", err);
      setError("Gagal mengunduh foto. Silakan coba lagi.");
    }
  };

  const PhotoArea = () => (
    <div className={`relative w-full aspect-square bg-gray-800 rounded-3xl overflow-hidden ${frameStyles[selectedFrame]}`}>
      <div className={selectedFrame === 3 ? "p-2 h-full" : "h-full"}>
        <AnimatePresence>
          {capturedPhoto ? (
            <motion.img 
              key="photo" 
              src={capturedPhoto} 
              alt="Captured" 
              className="w-full h-full object-cover rounded-2xl" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
            />
          ) : (
            <motion.video 
              key="video" 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className="w-full h-full object-cover rounded-2xl" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
            />
          )}
        </AnimatePresence>

        {!capturedPhoto && !error && stream && (
          <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
            <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold">
              {frames[selectedFrame].decoration}
            </span>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
            <p className="text-center">Mengakses kamera...</p>
          </div>
        )}
        
        {error && !stream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-center text-sm sm:text-base mb-4">{error}</p>
            <button 
              onClick={startCamera}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!isOnline && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 text-white p-4">
            <WifiOff className="w-16 h-16 text-yellow-500 mb-4" />
            <p className="text-center text-sm sm:text-base">Tidak ada koneksi internet</p>
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
                  <button 
                    key={index} 
                    onClick={() => setSelectedFrame(index)} 
                    className={`p-1 rounded-2xl transition-all duration-300 ${selectedFrame === index ? 'ring-4 ring-purple-500 shadow-lg' : 'hover:ring-2 hover:ring-purple-300'}`}
                  >
                    <div className={`w-full aspect-square ${frameStyles[index]} flex items-center justify-center text-center p-2`}>
                      <span className="text-xs sm:text-sm font-bold text-gray-700">{frame.name}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!capturedPhoto ? (
                  <motion.button 
                    onClick={takePhoto} 
                    disabled={!stream || isLoading} 
                    className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                    whileHover={{ scale: stream ? 1.05 : 1 }} 
                    whileTap={{ scale: stream ? 0.95 : 1 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Camera className="w-5 h-5" />
                      <span>
                        {isLoading ? 'Mengakses Kamera...' : 
                         stream ? 'Ambil Foto' : 
                         error ? 'Kamera Tidak Tersedia' : 'Mengakses Kamera...'}
                      </span>
                    </div>
                  </motion.button>
                ) : (
                  <>
                    <motion.button 
                      onClick={downloadPhoto} 
                      disabled={!capturedPhoto} 
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50" 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Download className="w-5 h-5" />
                        <span>Unduh Foto</span>
                      </div>
                    </motion.button>
                    <motion.button 
                      onClick={startCamera} 
                      className="bg-gray-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all duration-300" 
                      whileHover={{ scale: 1.05 }} 
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <RotateCcw className="w-5 h-5" />
                        <span>Ambil Ulang</span>
                      </div>
                    </motion.button>
                  </>
                )}
              </div>

              {/* Status indicators */}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {isOnline ? (
                    <Wifi className="w-4 h-4 text-green-500" />
                  ) : (
                    <WifiOff className="w-4 h-4 text-red-500" />
                  )}
                  <span className={isOnline ? 'text-green-600' : 'text-red-600'}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
                
                {cameraPermission && (
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    <span className={
                      cameraPermission === 'granted' ? 'text-green-600' :
                      cameraPermission === 'denied' ? 'text-red-600' : 'text-yellow-600'
                    }>
                      {cameraPermission === 'granted' ? 'Kamera Aktif' :
                       cameraPermission === 'denied' ? 'Kamera Ditolak' : 'Menunggu Izin'}
                    </span>
                  </div>
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