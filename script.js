let started = false;
let songTimeout;
let balloonInterval;

function startCelebration() {
  if (started) return;
  started = true;

  const audio = document.getElementById('birthdaySong');
  const endMsg = document.getElementById('end-message');
  endMsg.style.display = 'none';

  audio.play().catch(e => {
    console.log('Audio play failed:', e);
  });

  // Stop lagu setelah 20 detik dan tampilkan pesan
  songTimeout = setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
    endMsg.style.display = 'block';
  }, 20000);

  // Mulai muncul balon setiap 300ms
  balloonInterval = setInterval(createBalloon, 300);

  // Mulai confetti
  launchConfetti();
}

function restart() {
  const audio = document.getElementById('birthdaySong');
  const endMsg = document.getElementById('end-message');

  audio.pause();
  audio.currentTime = 0;

  clearTimeout(songTimeout);
  clearInterval(balloonInterval);

  endMsg.style.display = 'none';

  // Kembali ke halaman awal
  window.location.href = 'index.html';
}

function randomColor() {
  const colors = ['#ff4d4d', '#66ccff', '#ffff66', '#cc99ff', '#80ff80', '#ffa07a', '#f08080'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = Math.random() * 100 + 'vw';
  balloon.style.backgroundColor = randomColor();
  balloon.style.animationDuration = (5 + Math.random() * 5) + 's';

  document.getElementById('balloon-container').appendChild(balloon);

  setTimeout(() => balloon.remove(), 10000);
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 2,
      color: randomColor(),
      speed: Math.random() * 3 + 1,
      drift: Math.random() * 2 - 1
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }

  function update() {
    for (let p of particles) {
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    }
  }

  function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
  }

  loop();
}
