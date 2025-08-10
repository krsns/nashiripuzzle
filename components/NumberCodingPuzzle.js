import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Star, Heart, Trophy, Award } from 'lucide-react';

const NumberCodingPuzzle = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState('');
  const [stars, setStars] = useState(0);
  const [celebration, setCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const numbers = [
    { number: 1, color: 'bg-red-500', emoji: '1️⃣' },
    { number: 2, color: 'bg-blue-500', emoji: '2️⃣' },
    { number: 3, color: 'bg-yellow-500', emoji: '3️⃣' },
    { number: 4, color: 'bg-green-500', emoji: '4️⃣' },
    { number: 5, color: 'bg-purple-500', emoji: '5️⃣' },
    { number: 6, color: 'bg-orange-500', emoji: '6️⃣' },
    { number: 7, color: 'bg-pink-500', emoji: '7️⃣' },
    { number: 8, color: 'bg-indigo-500', emoji: '8️⃣' },
    { number: 9, color: 'bg-teal-500', emoji: '9️⃣' }
  ];

  const levels = [
    { level: 1, title: "Mulai Mudah", target: [1, 2], instruction: "1 → 2", maxMoves: 2, hint: "Dua angka berturut-turut!" },
    { level: 2, title: "Tiga Angka", target: [1, 2, 3], instruction: "1 → 2 → 3", maxMoves: 3, hint: "Urutan angka dari kecil!" },
    { level: 3, title: "Mundur", target: [3, 2, 1], instruction: "3 → 2 → 1", maxMoves: 3, hint: "Kebalikan dari sebelumnya!" },
    { level: 4, title: "Empat Angka", target: [1, 2, 3, 4], instruction: "1 → 2 → 3 → 4", maxMoves: 4, hint: "Terus naik!" },
    { level: 5, title: "Mundur Lagi", target: [4, 3, 2, 1], instruction: "4 → 3 → 2 → 1", maxMoves: 4, hint: "Terus turun!" },
    { level: 6, title: "Loncat Satu", target: [1, 3, 5], instruction: "1 → 3 → 5", maxMoves: 3, hint: "Loncat satu angka!" },
    { level: 7, title: "Genap Kecil", target: [2, 4, 6], instruction: "2 → 4 → 6", maxMoves: 3, hint: "Hanya angka genap!" },
    { level: 8, title: "Loncat Dua", target: [1, 4, 7], instruction: "1 → 4 → 7", maxMoves: 3, hint: "Loncat dua angka!" },
    { level: 9, title: "Genap Mundur", target: [6, 4, 2], instruction: "6 → 4 → 2", maxMoves: 3, hint: "Genap dari besar!" },
    { level: 10, title: "Ganjil Mundur", target: [7, 5, 3, 1], instruction: "7 → 5 → 3 → 1", maxMoves: 4, hint: "Ganjil turun!" },
    { level: 11, title: "Merah Berulang", target: [1, 1, 1], instruction: "Merah → Merah → Merah", maxMoves: 3, hint: "Angka 1 (merah) tiga kali!" },
    { level: 12, title: "Biru Ganda", target: [2, 2, 3], instruction: "Biru → Biru → Kuning", maxMoves: 3, hint: "Dua kali biru, lalu kuning!" },
    { level: 13, title: "Hijau Triple", target: [4, 4, 4, 2], instruction: "Hijau → Hijau → Hijau → Biru", maxMoves: 4, hint: "Tiga hijau, lalu biru!" },
    { level: 14, title: "Ungu Berulang", target: [5, 5, 1, 5], instruction: "Ungu → Ungu → Merah → Ungu", maxMoves: 4, hint: "Ungu-ungu-merah-ungu!" },
    { level: 15, title: "Orange Mix", target: [6, 3, 6, 3], instruction: "Orange → Kuning → Orange → Kuning", maxMoves: 4, hint: "Bergantian orange-kuning!" },
    { level: 16, title: "Merah Panjang", target: [1, 1, 1, 1, 2], instruction: "4x Merah → Biru", maxMoves: 5, hint: "Empat merah berturut!" },
    { level: 17, title: "Warna Sama", target: [3, 3, 2, 2, 1, 1], instruction: "2x Kuning → 2x Biru → 2x Merah", maxMoves: 6, hint: "Setiap warna dua kali!" },
    { level: 18, title: "Hijau Dominan", target: [4, 4, 4, 1, 4], instruction: "3x Hijau → Merah → Hijau", maxMoves: 5, hint: "Hijau banyak sekali!" },
    { level: 19, title: "Pink Power", target: [7, 7, 3, 7, 7], instruction: "2x Pink → Kuning → 2x Pink", maxMoves: 5, hint: "Pink mengelilingi kuning!" },
    { level: 20, title: "Rainbow Repeat", target: [1, 2, 3, 1, 2, 3], instruction: "Merah→Biru→Kuning→Merah→Biru→Kuning", maxMoves: 6, hint: "Pola berulang dua kali!" }
  ];

  const currentLevelData = levels[currentLevel - 1] || levels[0];

  const addNumberToSequence = (number) => {
    if (isPlaying || playerSequence.length >= currentLevelData.maxMoves) return;
    
    setPlayerSequence(prev => [...prev, number]);
  };

  const removeLastNumber = () => {
    if (isPlaying) return;
    setPlayerSequence(prev => prev.slice(0, -1));
  };

  const runSequence = () => {
    if (playerSequence.length === 0) return;
    
    setIsPlaying(true);
    setShowResult('');
    
    const timer = setTimeout(() => {
      checkResult();
    }, 1500);

    // Cleanup function for timeout
    return () => clearTimeout(timer);
  };

  const checkResult = () => {
    const isCorrect = JSON.stringify(playerSequence) === JSON.stringify(currentLevelData.target);
    
    if (isCorrect) {
      setShowResult('success');
      setStars(prev => prev + 1);
      setCelebration(true);
      
      const celebrationTimer = setTimeout(() => setCelebration(false), 2000);
      
      const levelTimer = setTimeout(() => {
        if (currentLevel < levels.length) {
          nextLevel();
        }
      }, 2500);

      // Return cleanup function
      return () => {
        clearTimeout(celebrationTimer);
        clearTimeout(levelTimer);
      };
    } else {
      setShowResult('error');
    }
    
    setIsPlaying(false);
  };

  const nextLevel = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(prev => prev + 1);
      resetLevel();
    }
  };

  const resetLevel = () => {
    setPlayerSequence([]);
    setShowResult('');
    setIsPlaying(false);
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setStars(0);
    resetLevel();
  };

  const getNumberObj = (number) => {
    return numbers.find(n => n.number === number) || numbers[0];
  };

  const getDifficultyBadge = () => {
    if (currentLevel <= 5) return { text: "MUDAH", color: "bg-green-500", emoji: "🌱" };
    if (currentLevel <= 10) return { text: "SEDANG", color: "bg-yellow-500", emoji: "⭐" };
    if (currentLevel <= 15) return { text: "SULIT", color: "bg-orange-500", emoji: "🔥" };
    return { text: "MASTER", color: "bg-red-500", emoji: "👑" };
  };

  const difficulty = getDifficultyBadge();

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Personal Header */}
        <div className="text-center mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
              🌟 Halo Nashiri, mari belajar coding sederhana 🌟
            </h1>
            <p className="text-lg text-gray-700">Game Coding Angka & Warna Spesial untuk Kamu!</p>
          </div>
          
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className={`${difficulty.color} text-white px-4 py-2 rounded-full font-bold flex items-center gap-2`}>
              <span>{difficulty.emoji}</span>
              <span>{difficulty.text}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full font-bold text-purple-800 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>{stars} Bintang</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-1">
            {Array.from({length: Math.min(stars, 10)}, (_, i) => (
              <Star key={`star-${i}`} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
            {stars > 10 && <span className="text-white font-bold">+{stars - 10}</span>}
          </div>
        </div>

        {/* Level Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-4 mb-3">
              <h2 className="text-2xl font-bold text-purple-800">
                Level {currentLevel}/{levels.length}: {currentLevelData.title}
              </h2>
              {currentLevel === levels.length && <Award className="w-8 h-8 text-yellow-500" />}
            </div>
            <p className="text-lg text-gray-700 mb-2">
              {currentLevelData.instruction}
            </p>
            <p className="text-sm text-blue-600 italic">
              💡 {currentLevelData.hint}
            </p>
          </div>

          {/* Target Pattern */}
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Pola Target:</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {currentLevelData.target.map((number, index) => {
                const numberObj = getNumberObj(number);
                return (
                  <div key={`target-${index}-${number}`} className="text-center relative">
                    <div className={`w-12 h-12 ${numberObj.color} rounded-xl shadow-lg border-4 border-white flex items-center justify-center`}>
                      <span className="text-lg font-bold text-white">{number}</span>
                    </div>
                    <span className="text-lg mt-1 block">{numberObj.emoji}</span>
                    {index < currentLevelData.target.length - 1 && (
                      <span className="absolute -right-0.5 top-4 text-lg text-purple-600">→</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress Level:</span>
              <span>{currentLevel}/{levels.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{width: `${(currentLevel / levels.length) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>

        {/* Number Palette */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
            Pilih Angka untuk Robot Nashiri 🤖
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-w-2xl mx-auto">
            {numbers.slice(0, 9).map((numberObj) => (
              <button
                key={`number-${numberObj.number}`}
                onClick={() => addNumberToSequence(numberObj.number)}
                disabled={isPlaying || playerSequence.length >= currentLevelData.maxMoves}
                className={`
                  ${numberObj.color} w-16 h-16 rounded-xl shadow-lg border-4 border-white
                  transform transition-all duration-200 hover:scale-110 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex flex-col items-center justify-center
                `}
              >
                <span className="text-xl font-bold text-white">{numberObj.number}</span>
                <span className="text-sm">{numberObj.emoji}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Player Sequence */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-center text-gray-800 mb-4">
            Kode Nashiri 👨‍💻
          </h3>
          <div className="min-h-[120px] bg-gray-100 rounded-xl p-4 mb-4">
            {playerSequence.length === 0 ? (
              <p className="text-center text-gray-500 text-lg py-8">
                Klik angka untuk membuat kode! 🔢
              </p>
            ) : (
              <div className="flex justify-center gap-2 flex-wrap">
                {playerSequence.map((number, index) => {
                  const numberObj = getNumberObj(number);
                  return (
                    <div key={`player-${index}-${number}`} className="text-center relative">
                      <div className={`w-14 h-14 ${numberObj.color} rounded-xl shadow-lg border-4 border-white flex items-center justify-center`}>
                        <span className="text-lg font-bold text-white">{number}</span>
                      </div>
                      <span className="text-lg mt-1 block">{numberObj.emoji}</span>
                      <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      {index < playerSequence.length - 1 && (
                        <span className="absolute -right-0.5 top-5 text-lg text-purple-600">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Kode Progress:</span>
              <span>{playerSequence.length}/{currentLevelData.maxMoves}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{width: `${(playerSequence.length / currentLevelData.maxMoves) * 100}%`}}
              ></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={runSequence}
              disabled={isPlaying || playerSequence.length === 0}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full transition-colors shadow-lg"
            >
              <Play className="w-5 h-5" />
              {isPlaying ? 'Robot Bekerja...' : 'Jalankan Robot!'}
            </button>
            
            <button
              onClick={removeLastNumber}
              disabled={isPlaying || playerSequence.length === 0}
              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-full transition-colors shadow-lg text-sm"
            >
              Hapus
            </button>
            
            <button
              onClick={resetLevel}
              disabled={isPlaying}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-full transition-colors shadow-lg text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Result Messages */}
        {showResult && (
          <div className={`
            text-center p-6 rounded-2xl shadow-xl mb-6 text-white text-xl font-bold
            ${showResult === 'success' ? 'bg-green-500' : 'bg-red-500'}
          `}>
            {showResult === 'success' ? (
              <div className="flex items-center justify-center gap-2">
                <Star className="w-8 h-8 text-yellow-300 fill-current" />
                <span>Hebat Nashiri! Robot berhasil! 🎉</span>
                <Heart className="w-8 h-8 text-pink-300 fill-current" />
              </div>
            ) : (
              <span>Belum tepat! Coba lagi ya Nashiri! 😊</span>
            )}
          </div>
        )}

        {/* Completion */}
        {currentLevel > levels.length && (
          <div className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-4">🏆 LUAR BIASA NASHIRI! 🏆</h2>
            <p className="text-xl mb-4">Kamu telah menyelesaikan semua {levels.length} level!</p>
            <p className="text-lg mb-4">Sekarang kamu sudah jadi Master Programmer Muda! 🤓✨</p>
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({length: 10}, (_, i) => (
                <Star key={`completion-star-${i}`} className="w-6 h-6 text-yellow-300 fill-current" />
              ))}
            </div>
            <button
              onClick={resetGame}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg"
            >
              Main Lagi dari Awal! 🎮
            </button>
          </div>
        )}

        {/* Celebration Animation */}
        {celebration && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
            <div className="text-8xl animate-bounce">
              {currentLevel <= 5 ? '🎊' : currentLevel <= 10 ? '🎉' : currentLevel <= 15 ? '🌟' : '👑'}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NumberCodingPuzzle;
