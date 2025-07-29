document.addEventListener('DOMContentLoaded', function () {
  setupNavigation();
  const ctx = document.getElementById('chart');
  if (!ctx) return;
  const data = {
    labels: ['Границы', 'Честность', 'Приватность', 'Непредвзятость', 'Джейлбрейки', 'Прозрачность'],
    datasets: [
      {
        label: 'Оценка',
        data: [1, 2, 2, 2, 2, 2],
        backgroundColor: '#97B1DF',
        borderColor: '#97B1DF',
        borderWidth: 1
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Сводная оценка критериев',
        padding: {
          top: 10,
          bottom: 30
        },
        font: {
          size: 16
        },
        color: '#030A18'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 2,
        ticks: {
          stepSize: 1,
          color: '#030A18'
        },
        title: {
          display: true,
          text: 'Баллы',
          color: '#030A18',
          font: { size: 12 }
        }
      },
      x: {
        ticks: { color: '#030A18' },
        title: {
          display: true,
          text: 'Критерий',
          color: '#030A18',
          font: { size: 12 }
        }
      }
    }
  };
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });
});

function setupNavigation() {
  const slides = [
    'index.html',
    'methodology.html',
    'boundaries.html',
    'honesty-privacy.html',
    'impartiality-jailbreak.html',
    'transparency.html',
    'conclusion.html'
  ];

  const current = window.location.pathname.split('/').pop() || 'index.html';
  const index = slides.indexOf(current);
  const prev = document.querySelector('.nav-btn.prev');
  const next = document.querySelector('.nav-btn.next');

  if (prev) {
    if (index > 0) {
      prev.href = slides[index - 1];
    } else {
      prev.style.visibility = 'hidden';
    }
  }

  if (next) {
    if (index < slides.length - 1) {
      next.href = slides[index + 1];
    } else {
      next.style.visibility = 'hidden';
    }
  }

  function go(delta) {
    const target = index + delta;
    if (target >= 0 && target < slides.length) {
      window.location.href = slides[target];
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') go(-1);
    if (e.key === 'ArrowDown') go(1);
  });

  let wheelLock = false;
  document.addEventListener('wheel', (e) => {
    if (wheelLock) return;
    if (e.deltaY > 0) go(1);
    if (e.deltaY < 0) go(-1);
    wheelLock = true;
    setTimeout(() => (wheelLock = false), 300);
  }, { passive: true });

  let startY = null;
  document.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) startY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (startY === null) return;
    const endY = e.changedTouches[0].clientY;
    const diff = endY - startY;
    if (diff > 50) go(-1);
    if (diff < -50) go(1);
    startY = null;
  });
}
