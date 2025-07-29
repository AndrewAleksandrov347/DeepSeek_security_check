document.addEventListener('DOMContentLoaded', function () {
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