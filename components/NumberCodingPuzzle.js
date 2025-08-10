import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Star, Heart, Trophy, Award, Crown, Zap } from 'lucide-react';

const NumberCodingPuzzle = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState('');
  const [stars, setStars] = useState(0);
  const [celebration, setCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration - FIXED
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

  const generateLevels = () => {
    const levels = [];
    
    // Level 1-15: Basic patterns
    const basicLevels = [
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
      { level: 11, title: "Merah Triple", target: [1, 1, 1], instruction: "Merah → Merah → Merah", maxMoves: 3, hint: "Angka 1 (merah) tiga kali!" },
      { level: 12, title: "Biru Ganda", target: [2, 2, 3], instruction: "Biru → Biru → Kuning", maxMoves: 3, hint: "Dua kali biru, lalu kuning!" },
      { level: 13, title: "Hijau Dominan", target: [4, 4, 4, 2], instruction: "Hijau → Hijau → Hijau → Biru", maxMoves: 4, hint: "Tiga hijau, lalu biru!" },
      { level: 14, title: "Ungu Mix", target: [5, 5, 1, 5], instruction: "Ungu → Ungu → Merah → Ungu", maxMoves: 4, hint: "Ungu-ungu-merah-ungu!" },
      { level: 15, title: "Orange Pattern", target: [6, 3, 6, 3], instruction: "Orange → Kuning → Orange → Kuning", maxMoves: 4, hint: "Bergantian orange-kuning!" }
    ];
    
    levels.push(...basicLevels);

    // Level 16-30: Intermediate patterns
    const intermediatePatterns = [
      { target: [1, 1, 1, 1, 2], hint: "Empat merah berturut!" },
      { target: [3, 3, 2, 2, 1, 1], hint: "Setiap warna dua kali!" },
      { target: [4, 4, 4, 1, 4], hint: "Hijau banyak sekali!" },
      { target: [7, 7, 3, 7, 7], hint: "Pink mengelilingi kuning!" },
      { target: [1, 2, 3, 1, 2, 3], hint: "Pola berulang dua kali!" },
      { target: [9, 8, 7, 6], hint: "Turun dari 9!" },
      { target: [1, 3, 5, 7, 9], hint: "Semua ganjil naik!" },
      { target: [2, 4, 6, 8], hint: "Semua genap naik!" },
      { target: [5, 5, 5, 5, 5], hint: "Lima ungu berturut!" },
      { target: [1, 9, 2, 8, 3], hint: "Naik-turun bergantian!" },
      { target: [7, 1, 7, 1, 7], hint: "Pink-merah bergantian!" },
      { target: [3, 6, 9, 6, 3], hint: "Naik lalu turun!" },
      { target: [4, 2, 6, 2, 8], hint: "Hijau-biru-orange pattern!" },
      { target: [1, 2, 1, 2, 1, 2], hint: "Merah-biru terus!" },
      { target: [9, 7, 5, 3, 1], hint: "Ganjil turun semua!" }
    ];

    for (let i = 16; i <= 30; i++) {
      const pattern = intermediatePatterns[i - 16];
      levels.push({
        level: i,
        title: `Intermediate ${i}`,
        target: pattern.target,
        instruction: pattern.target.join(' → '),
        maxMoves: pattern.target.length,
        hint: pattern.hint
      });
    }

    // Level 31-45: Advanced patterns
    const advancedPatterns = [
      { target: [2, 4, 8, 4, 2], hint: "Naik ke 8 lalu turun!" },
      { target: [6, 6, 3, 3, 9, 9], hint: "Double pattern 3 warna!" },
      { target: [1, 4, 7, 4, 1], hint: "Diamond pattern!" },
      { target: [5, 1, 5, 9, 5], hint: "Ungu di tengah semua!" },
      { target: [8, 6, 4, 2], hint: "Genap turun!" },
      { target: [1, 2, 3, 4, 5, 6], hint: "Straight line naik!" },
      { target: [6, 5, 4, 3, 2, 1], hint: "Straight line turun!" },
      { target: [1, 3, 5, 7, 9, 7, 5, 3, 1], hint: "Mountain ganjil!" },
      { target: [9, 1, 9, 1, 9, 1], hint: "Zigzag ekstrem!" },
      { target: [5, 4, 5, 6, 5, 4, 5], hint: "Ungu center dance!" },
      { target: [2, 4, 6, 8, 6, 4, 2], hint: "Even mountain!" },
      { target: [1, 1, 2, 2, 3, 3, 4, 4], hint: "Double staircase!" },
      { target: [9, 8, 7, 1, 2, 3], hint: "Turun lalu naik!" },
      { target: [7, 7, 7, 1, 1, 1, 7, 7, 7], hint: "Pink sandwich!" },
      { target: [3, 6, 9, 3, 6, 9], hint: "Triple kelipatan!" }
    ];

    for (let i = 31; i <= 45; i++) {
      const pattern = advancedPatterns[i - 31];
      levels.push({
        level: i,
        title: `Advanced ${i}`,
        target: pattern.target,
        instruction: pattern.target.join(' → '),
        maxMoves: pattern.target.length,
        hint: pattern.hint
      });
    }

    // Level 46-50: Master patterns
    const masterPatterns = [
      { target: [1, 2, 3, 4, 5, 4, 3, 2, 1], hint: "Perfect pyramid!" },
      { target: [9, 1, 8, 2, 7, 3, 6, 4, 5], hint: "Spiral inward!" },
      { target: [5, 5, 1, 1, 9, 9, 5, 5], hint: "Center-edge dance!" },
      { target: [1, 3, 5, 7, 9, 8, 6, 4, 2], hint: "Ganjil naik genap turun!" },
      { target: [5, 5, 5, 1, 9, 1, 9, 1, 9, 5, 5, 5], hint: "🏆 LEGENDARY FINALE! 🏆" }
    ];

    for (let i = 46; i <= 50; i++) {
      const pattern = masterPatterns[i - 46];
      levels.push({
        level: i,
        title: i === 50 ? "🏆 MASTER FINALE 🏆" : `Master ${i}`,
        target: pattern.target,
        instruction: pattern.target.join(' → '),
        maxMoves: pattern.target.length,
        hint: pattern.hint
      });
    }

    return levels;
  };

  const levels = generateLevels();
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
    if (currentLevel <= 15) return { text: "MUDAH", color: "bg-green-500", emoji: "🌱" };
    if (currentLevel <= 30) return { text: "SEDANG", color: "bg-yellow-500", emoji: "⭐" };
    if (currentLevel <= 45) return { text: "SULIT", color: "bg-orange-500", emoji: "🔥" };
    return { text: "MASTER", color: "bg-gradient-to-r from-purple-500 to-pink-500", emoji: "👑" };
  };

  const difficulty = getDifficultyBadge();

  const getMilestoneReward = () => {
    if (currentLevel === 15) return "🎉 Selamat! Kamu naik ke level SEDANG!";
    if (currentLevel === 30) return "🔥 Luar biasa! Kamu naik ke level SULIT!";
    if (currentLevel === 45) return "👑 Hebat sekali! Kamu jadi MASTER!";
    if (currentLevel === 50) return "🏆 ULTIMATE CHAMPION NASHIRI! 🏆";
    return null;
  };

  // Prevent hydration mismatch - SIMPLIFIED
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-4 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-purple-800">Loading...</h1>
          <p className="text-gray-600 mt-4">Sedang memuat game untuk Nashiri...</p>
        </div>
      </div>
    );
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
            <p className="text-lg text-gray-700">Game Coding 50 Level - Spesial untuk Kamu!</p>
          </div>
          
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className={`${difficulty.color} text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg`}>
              <span>{difficulty.emoji}</span>
              <span>{difficulty.text}</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full font-bold text-purple-800 flex items-center gap-2 shadow-lg">
              <Trophy className="w-5 h-5" />
              <span>{stars} Bintang</span>
            </div>
            {currentLevel >= 45 && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                <Crown className="w-5 h-5" />
                <span>MASTER</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-center items-center gap-1 mb-4">
            {Array.from({length: Math.min(stars, 15)}, (_, i) => (
              <Star key={`star-${i}`} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            {stars > 15 && <span className="text-white font-bold bg-yellow-500 px-2 py-1 rounded-full text-sm">+{stars - 15}</span>}
          </div>

          {/* Milestone Reward */}
          {getMilestoneReward() && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-xl mb-4 animate-pulse">
              <p className="text-lg font-bold">{getMilestoneReward()}</p>
            </div>
          )}
        </div>

        {/* Level Info */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-4 mb-3">
              <h2 className="text-2xl font-bold text-purple-800">
                Level {currentLevel}/{levels.length}: {currentLevelData.title}
              </h2>
              {currentLevel === 50 && <Crown className="w-8 h-8 text-yellow-500" />}
            </div>
            <p className="text-lg text-gray-700 mb-2">
              {currentLevelData.target.length > 8 ? 
                `${currentLevelData.target.slice(0, 8).join(' → ')}...` : 
                currentLevelData.instruction
              }
            </p>
            <p className="text-sm text-blue-600 italic">
              💡 {currentLevelData.hint}
            </p>
          </div>

          {/* Target Pattern */}
          <div className="text-center mb-4">
            <p className="text-sm font-medium text-gray-600 mb-2">Pola Target:</p>
            <div className="flex justify-center gap-1 flex-wrap max-w-full">
              {currentLevelData.target.map((number, index) => {
                const numberObj = getNumberObj(number);
                return (
                  <div key={`target-${index}-${number}`} className="text-center relative">
                    <div className={`w-8 h-8 ${numberObj.color} rounded-lg shadow-lg border-2 border-white flex items-center justify-center`}>
                      <span className="text-sm font-bold text-white">{number}</span>
                    </div>
                    {index < currentLevelData.target.length - 1 && index < 10 && (
                      <span className="absolute -right-0.5 top-2 text-sm text-purple-600">→</span>
                    )}
                  </div>
                );
              })}
              {currentLevelData.target.length > 11 && (
                <div className="text-center">
                  <div className="w-8 h-8 bg-gray-400 rounded-lg shadow-lg border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-bold text-white">...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress Game:</span>
              <span>{currentLevel}/50</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${currentLevel >= 45 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 
                  currentLevel >= 30 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                  currentLevel >= 15 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-green-400 to-purple-500'} h-3 rounded-full transition-all duration-500`}
                style={{width: `${(currentLevel / 50) * 100}%`}}
              ></div>
            </div>
          </div>
        </div>

        {/* Player Sequence Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-purple-800 mb-2">Urutan Kamu:</h3>
            <div className="flex justify-center gap-2 flex-wrap min-h-[60px] items-center">
              {playerSequence.length === 0 ? (
                <div className="text-gray-400 text-lg">Belum ada angka yang dipilih...</div>
              ) : (
                playerSequence.map((number, index) => {
                  const numberObj = getNumberObj(number);
                  return (
                    <div key={`player-${index}-${number}`} className="text-center relative">
                      <div className={`w-12 h-12 ${numberObj.color} rounded-xl shadow-lg border-3 border-white flex items-center justify-center transform transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'hover:scale-110'}`}>
                        <span className="text-lg font-bold text-white">{number}</span>
                      </div>
                      {index < playerSequence.length - 1 && (
                        <span className="absolute -right-1 top-4 text-lg text-purple-600 font-bold">→</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {playerSequence.length}/{currentLevelData.maxMoves} langkah
            </div>
          </div>
        </div>

        {/* Number Buttons Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-purple-800 text-center mb-4">Pilih Angka:</h3>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            {numbers.map((numberObj) => (
              <button
                key={`button-${numberObj.number}`}
                onClick={() => addNumberToSequence(numberObj.number)}
                disabled={isPlaying || playerSequence.length >= currentLevelData.maxMoves}
                className={`
                  ${numberObj.color} text-white font-bold text-xl p-4 rounded-xl shadow-lg border-3 border-white
                  transform transition-all duration-200
                  ${isPlaying || playerSequence.length >= currentLevelData.maxMoves 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-110 hover:shadow-2xl active:scale-95 cursor-pointer'
                  }
                  flex flex-col items-center justify-center gap-1
                `}
              >
                <span className="text-2xl">{numberObj.emoji}</span>
                <span>{numberObj.number}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={runSequence}
              disabled={playerSequence.length === 0 || isPlaying}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
                ${playerSequence.length === 0 || isPlaying
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 active:scale-95'
                }
              `}
            >
              <Play className="w-6 h-6" />
              {isPlaying ? 'Mengecek...' : 'Jalankan!'}
            </button>

            <button
              onClick={removeLastNumber}
              disabled={playerSequence.length === 0 || isPlaying}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
                ${playerSequence.length === 0 || isPlaying
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-105 active:scale-95'
                }
              `}
            >
              <RotateCcw className="w-6 h-6" />
              Hapus Terakhir
            </button>

            <button
              onClick={resetLevel}
              disabled={isPlaying}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
                ${isPlaying
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105 active:scale-95'
                }
              `}
            >
              <RotateCcw className="w-6 h-6" />
              Reset Level
            </button>

            {currentLevel > 1 && (
              <button
                onClick={resetGame}
                disabled={isPlaying}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-200
                  ${isPlaying
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-105 active:scale-95'
                  }
                `}
              >
                <Crown className="w-6 h-6" />
                Reset Game
              </button>
            )}
          </div>
        </div>

        {/* Result Display */}
        {showResult && (
          <div className={`
            fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50
            ${celebration ? 'animate-pulse' : ''}
          `}>
            <div className={`
              rounded-3xl p-8 shadow-2xl text-center transform transition-all duration-500
              ${showResult === 'success' 
                ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white scale-110' 
                : 'bg-gradient-to-r from-red-400 to-pink-500 text-white scale-110'
              }
            `}>
              {showResult === 'success' ? (
                <>
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold mb-2">BENAR!</h2>
                  <p className="text-xl mb-4">Kamu hebat sekali, Nashiri!</p>
                  <div className="flex justify-center gap-2 mb-4">
                    {Array.from({length: 5}, (_, i) => (
                      <Star key={`success-star-${i}`} className="w-8 h-8 text-yellow-300 fill-current animate-bounce" style={{animationDelay: `${i * 0.1}s`}} />
                    ))}
                  </div>
                  <p className="text-lg">Bersiap untuk level selanjutnya...</p>
                </>
              ) : (
                <>
                  <div className="text-6xl mb-4">😅</div>
                  <h2 className="text-3xl font-bold mb-2">Belum Tepat!</h2>
                  <p className="text-xl mb-4">Coba lagi ya, Nashiri!</p>
                  <p className="text-lg">Lihat pola target sekali lagi...</p>
                  <button
                    onClick={() => setShowResult('')}
                    className="mt-4 bg-white text-red-500 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors"
                  >
                    Coba Lagi
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Celebration Effects */}
        {celebration && (
          <div className="fixed inset-0 pointer-events-none z-40">
            <div className="absolute top-10 left-10 text-4xl animate-bounce">🎊</div>
            <div className="absolute top-20 right-10 text-4xl animate-bounce" style={{animationDelay: '0.2s'}}>🎉</div>
            <div className="absolute bottom-20 left-20 text-4xl animate-bounce" style={{animationDelay: '0.4s'}}>⭐</div>
            <div className="absolute bottom-10 right-20 text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>🏆</div>
            <div className="absolute top-1/2 left-1/4 text-4xl animate-bounce" style={{animationDelay: '0.8s'}}>🌟</div>
            <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce" style={{animationDelay: '1s'}}>💎</div>
          </div>
        )}

        {/* Game Complete */}
        {currentLevel > levels.length && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-95">
            <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-2xl mx-4">
              <div className="text-8xl mb-6">🏆</div>
              <h1 className="text-4xl font-bold text-purple-800 mb-4">
                SELAMAT NASHIRI!
              </h1>
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                🌟 MASTER CODING CHAMPION! 🌟
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                Kamu telah menyelesaikan semua 50 level!
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Total bintang yang kamu kumpulkan: <span className="font-bold text-yellow-600">{stars} ⭐</span>
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold">
                  <Crown className="w-6 h-6 inline mr-2" />
                  MASTER STATUS
                </div>
              </div>
              <p className="text-base text-gray-600 mb-4">
                Kamu sudah belajar pola-pola coding yang amazing!
              </p>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105"
              >
                🎮 Main Lagi dari Awal!
              </button>
            </div>
          </div>
        )}

        {/* Level Selection */}
        {currentLevel > 5 && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-purple-800 text-center mb-4">Lompat ke Level:</h3>
            <div className="flex justify-center gap-2 flex-wrap">
              {[1, 5, 10, 15, 20, 25, 30, 35, 40, 45].map((level) => (
                level <= currentLevel && (
                  <button
                    key={`jump-${level}`}
                    onClick={() => {
                      setCurrentLevel(level);
                      resetLevel();
                    }}
                    disabled={isPlaying}
                    className={`
                      px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200
                      ${level === currentLevel
                        ? 'bg-purple-600 text-white'
                        : isPlaying
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-200 text-purple-800 hover:bg-purple-300 hover:scale-105'
                      }
                    `}
                  >
                    {level}
                  </button>
                )
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-purple-800 text-center mb-4">💡 Tips untuk Nashiri:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">🔍 Cari Pola</h4>
              <p className="text-sm text-blue-700">Lihat angka-angka target. Apakah naik, turun, atau berulang?</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-green-800 mb-2">🎨 Lihat Warna</h4>
              <p className="text-sm text-green-700">Setiap angka punya warna. Kadang polanya dari warna!</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-yellow-800 mb-2">🔢 Hitung Loncat</h4>
              <p className="text-sm text-yellow-700">Berapa jarak antar angka? 1, 2, atau 3 langkah?</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-800 mb-2">🔄 Coba Berulang</h4>
              <p className="text-sm text-purple-700">Kalau salah, coba lagi! Setiap coba adalah belajar.</p>
            </div>
          </div>
        </div>

        {/* Fun Facts */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-purple-800 text-center mb-4">🌟 Tahukah Kamu?</h3>
          <div className="text-center text-gray-700">
            {currentLevel <= 15 && (
              <p className="text-sm">🌱 Level MUDAH mengajarkan urutan dasar - ini fondasi coding!</p>
            )}
            {currentLevel > 15 && currentLevel <= 30 && (
              <p className="text-sm">⭐ Level SEDANG mengajarkan pola berulang - seperti loop dalam programming!</p>
            )}
            {currentLevel > 30 && currentLevel <= 45 && (
              <p className="text-sm">🔥 Level SULIT mengajarkan pola kompleks - seperti algoritma canggih!</p>
            )}
            {currentLevel > 45 && (
              <p className="text-sm">👑 Level MASTER mengajarkan pola mahir - kamu sudah seperti programmer sejati!</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 mb-4">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <p className="text-gray-600">
              💝 Game ini dibuat khusus untuk Nashiri yang hebat! 
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Terus berlatih dan jadilah programmer yang amazing! 🚀
            </p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-400">
              <span>🎯 50 Level Total</span>
              <span>🌟 {stars} Bintang Terkumpul</span>
              <span>🎮 Level {currentLevel}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NumberCodingPuzzle;
