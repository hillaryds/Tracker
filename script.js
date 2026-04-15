const appState = {
  currentScreen: 'login',
  activeTaskId: 1,
  timerSeconds: 0,
  taskStartedAt: null,
  timerInterval: null,
  student: {
    name: 'Cicrano',
    role: 'Aluno'
  },
  weeklyHours: [
    { day: 'Dom', value: 1.0, highlight: false },
    { day: 'Seg', value: 3.4, highlight: false },
    { day: 'Ter', value: 4.4, highlight: true },
    { day: 'Qua', value: 2.6, highlight: false },
    { day: 'Qui', value: 2.0, highlight: false },
    { day: 'Sex', value: 3.8, highlight: true },
    { day: 'Sáb', value: 0.7, highlight: false }
  ],
  tasks: [
    {
      id: 1,
      tag: 'DEV',
      tagClass: 'badge-dev',
      title: 'Implementar autenticação de usuários',
      deadlineShort: '05 Abr 2026',
      deadlineFull: '05 de Abril, 2026',
      author: 'Fulano de Tal',
      hoursLabel: '02h30',
      accumulatedSeconds: 4920,
      loggedDay: 'Ter',
      status: 'running',
      statusLabel: 'Em andamento',
      createdAt: '28 mar, 09:14',
      currentAccumulated: '01h22',
      log: [
        { text: 'Tarefa atribuída a você por Fulano de Tal', time: '28 mar, 09:14', type: 'default' }
      ],
      progressLog: [
        { text: 'Tarefa iniciada', time: '31 mar, 09:00', type: 'default' }
      ],
      doneLog: []
    },
    {
      id: 2,
      tag: 'TESTES',
      tagClass: 'badge-testes',
      title: 'Escrever testes unitários do módulo',
      deadlineShort: '10 Abr 2026',
      deadlineFull: '10 de Abril, 2026',
      author: 'Fulano de Tal',
      hoursLabel: '00h20',
      accumulatedSeconds: 1200,
      loggedDay: 'Sex',
      status: 'not-started',
      statusLabel: 'Não iniciada',
      createdAt: '29 mar, 10:20',
      currentAccumulated: '00h20',
      log: [
        { text: 'Tarefa atribuída a você por Fulano de Tal', time: '29 mar, 10:20', type: 'default' }
      ],
      progressLog: [],
      doneLog: []
    },
    {
      id: 3,
      tag: 'DOC',
      tagClass: 'badge-dev',
      title: 'Revisar documentação do projeto',
      deadlineShort: '12 Abr 2026',
      deadlineFull: '12 de Abril, 2026',
      author: 'Fulano de Tal',
      hoursLabel: '01h15',
      accumulatedSeconds: 4500,
      loggedDay: 'Qua',
      status: 'paused',
      statusLabel: 'Pausada',
      createdAt: '30 mar, 14:10',
      currentAccumulated: '01h15',
      log: [
        { text: 'Tarefa atribuída a você por Fulano de Tal', time: '30 mar, 14:10', type: 'default' }
      ],
      progressLog: [
        { text: 'Sessão pausada — 01h15m00s acumuladas', time: '12:30', type: 'muted' }
      ],
      doneLog: []
    },
    {
      id: 4,
      tag: 'UI',
      tagClass: 'badge-dev',
      title: 'Ajustar layout responsivo',
      deadlineShort: '08 Abr 2026',
      deadlineFull: '08 de Abril, 2026',
      author: 'Fulano de Tal',
      hoursLabel: '01h40',
      accumulatedSeconds: 6000,
      loggedDay: 'Seg',
      status: 'done',
      statusLabel: 'Concluída',
      createdAt: '27 mar, 08:45',
      currentAccumulated: '01h40',
      log: [
        { text: 'Tarefa concluída com sucesso', time: '08 Abr, 11:15', type: 'success' }
      ],
      progressLog: [],
      doneLog: [
        { text: 'Finalizada com 01h40m00s no total', time: '08 Abr, 11:15', type: 'success' }
      ]
    },
    {
      id: 5,
      tag: 'ENT',
      tagClass: 'badge-testes',
      title: 'Enviar relatório semanal',
      deadlineShort: '14 Abr 2026',
      deadlineFull: '14 de Abril, 2026',
      author: 'Fulano de Tal',
      hoursLabel: '00h00',
      accumulatedSeconds: 0,
      loggedDay: 'Sex',
      status: 'not-started',
      statusLabel: 'Não iniciada',
      createdAt: '13 abr, 18:00',
      currentAccumulated: '00h00',
      log: [
        { text: 'Tarefa atribuída a você por Fulano de Tal', time: '13 abr, 18:00', type: 'default' }
      ],
      progressLog: [],
      doneLog: []
    }
  ]
};

const screenMap = {
  login: { id: 'screen-login', label: 'Tela 01 / 08' },
  dashboard: { id: 'screen-dashboard', label: 'Tela 04 / 08' },
  'task-start': { id: 'screen-task-start', label: 'Tela 05 / 08' },
  'task-progress': { id: 'screen-task-progress', label: 'Tela 06 / 08' },
  'task-done': { id: 'screen-task-done', label: 'Tela 07 / 08' },
  report: { id: 'screen-report', label: 'Tela 08 / 08' }
};

const flowLinks = document.querySelectorAll('.flow-link');
const screens = document.querySelectorAll('.screen');
const screenLabel = document.getElementById('screenLabel');
const loginForm = document.getElementById('loginForm');
const studentCards = document.getElementById('studentCards');
const weeklyChart = document.getElementById('weeklyChart');
const historyPanel = document.getElementById('historyPanel');
const historyList = document.getElementById('historyList');
const historySummary = document.getElementById('historySummary');
const tabButtons = document.querySelectorAll('.tab-btn');

const startTaskBtn = document.getElementById('startTaskBtn');
const pauseTaskBtn = document.getElementById('pauseTaskBtn');
const finishTaskBtn = document.getElementById('finishTaskBtn');
const reportBtn = document.getElementById('reportBtn');

function formatSecondsToClock(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}h${String(minutes).padStart(2, '0')}m${String(seconds).padStart(2, '0')}s`;
}

function parseClockToSeconds(clock) {
  const hourMatch = clock.match(/(\d+)h/);
  const minuteMatch = clock.match(/(\d+)m/);
  const secondMatch = clock.match(/(\d+)s/);
  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  let minutes = 0;
  if (minuteMatch) {
    minutes = parseInt(minuteMatch[1], 10);
  } else if (hourMatch) {
    const afterH = clock.split('h')[1] || '';
    const fallbackMinutes = afterH.match(/^(\d{1,2})(?![a-zA-Z])/);
    if (fallbackMinutes) {
      minutes = parseInt(fallbackMinutes[1], 10);
    }
  }
  const seconds = secondMatch ? parseInt(secondMatch[1], 10) : 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function getActiveTask() {
  return appState.tasks.find(task => task.id === appState.activeTaskId);
}

function getTaskWorkedSeconds(task) {
  return task.accumulatedSeconds || parseClockToSeconds(task.hoursLabel || '00h00');
}

function getTotalWorkedSeconds() {
  return appState.tasks.reduce((sum, task) => sum + getTaskWorkedSeconds(task), 0);
}

function hasRunningTask(excludeTaskId = null) {
  return appState.tasks.some(task => task.status === 'running' && task.id !== excludeTaskId);
}

function renderChart() {
  weeklyChart.innerHTML = '';
  const dayMap = appState.weeklyHours.reduce((map, item) => {
    map[item.day] = item.value;
    return map;
  }, {});

  appState.tasks.forEach(task => {
    if (task.loggedDay && dayMap[task.loggedDay] !== undefined) {
      dayMap[task.loggedDay] += getTaskWorkedSeconds(task) / 3600;
    }
  });

  const chartItems = appState.weeklyHours.map(item => ({
    day: item.day,
    value: dayMap[item.day] || 0,
    highlight: item.highlight
  }));

  const max = Math.max(...chartItems.map(item => item.value), 1);

  chartItems.forEach(item => {
    const wrap = document.createElement('div');
    wrap.className = 'chart-bar-wrap';

    const bar = document.createElement('div');
    bar.className = `chart-bar ${item.highlight ? 'is-highlight' : ''}`;
    bar.style.height = `${Math.max(24, (item.value / max) * 102)}px`;
    bar.title = `${item.day}: ${item.value.toFixed(1)}h`;

    const label = document.createElement('div');
    label.className = 'chart-label';
    label.textContent = item.day;

    wrap.append(bar, label);
    weeklyChart.appendChild(wrap);
  });
}

function buildStatePill(task) {
  const pill = document.createElement('span');
  const stateClass = task.status === 'running'
    ? 'state-running'
    : task.status === 'paused'
      ? 'state-paused'
      : 'state-not-started';
  pill.className = `state-pill ${stateClass}`;
  pill.textContent = `● ${task.statusLabel}`;
  return pill;
}

function renderHistory() {
  historyList.innerHTML = '';

  appState.tasks.forEach(task => {
    const card = document.createElement('article');
    card.className = 'history-card';

    const title = document.createElement('strong');
    title.textContent = task.title;

    const subtitle = document.createElement('span');
    let statusLabel = '';

    if (task.status === 'done') {
      statusLabel = `Concluída — ${formatSecondsToClock(getTaskWorkedSeconds(task))}`;
    } else if (task.status === 'running') {
      const runningSeconds = getTaskWorkedSeconds(task) + appState.timerSeconds;
      statusLabel = `Em andamento — ${formatSecondsToClock(runningSeconds)} acumuladas`;
    } else if (task.status === 'paused') {
      statusLabel = `Pausada — ${formatSecondsToClock(getTaskWorkedSeconds(task))}`;
    } else {
      statusLabel = `Aguardando início — ${task.deadlineShort}`;
    }

    subtitle.textContent = statusLabel;
    card.append(title, subtitle);
    historyList.appendChild(card);
  });

  const totalWorked = formatSecondsToClock(getTotalWorkedSeconds());
  historySummary.textContent = `Total registrado: ${totalWorked}`;
}

function renderCards() {
  studentCards.innerHTML = '';

  appState.tasks.forEach(task => {
    const card = document.createElement('article');
    card.className = 'student-task-card card';

    const topLine = document.createElement('div');
    topLine.className = 'task-card-topline';

    const badge = document.createElement('span');
    badge.className = `badge ${task.tagClass}`;
    badge.textContent = task.tag;

    const hours = document.createElement('strong');
    hours.className = 'task-hours';
    const taskSeconds = task.status === 'running'
      ? getTaskWorkedSeconds(task) + appState.timerSeconds
      : getTaskWorkedSeconds(task);
    hours.textContent = formatSecondsToClock(taskSeconds);

    topLine.append(badge, hours);

    const title = document.createElement('h4');
    title.textContent = task.title;

    const meta = document.createElement('div');
    meta.className = 'task-meta';
    meta.innerHTML = `
      <div>
        <strong>Prazo</strong>
        <span>${task.deadlineShort}</span>
      </div>
    `;

    const status = buildStatePill(task);

    card.append(topLine, title, meta, status);

    card.addEventListener('click', () => {
      appState.activeTaskId = task.id;

      if (task.status === 'not-started') showScreen('task-start');
      else if (task.status === 'done') showScreen('task-done');
      else showScreen('task-progress');
    });

    studentCards.appendChild(card);
  });

  document.getElementById('activeCount').textContent = `${appState.tasks.filter(task => task.status !== 'done').length} ativos`;
  document.getElementById('progressCount').textContent =
    String(appState.tasks.filter(task => task.status === 'running').length);
}

function showDashboardView(view) {
  historyPanel.classList.toggle('is-hidden', view !== 'history');
  document.getElementById('cardsHeaderRow').classList.toggle('is-hidden', view === 'history');
  studentCards.classList.toggle('is-hidden', view === 'history');
  tabButtons.forEach(button => {
    button.classList.toggle('is-active', button.dataset.view === view);
  });
  if (view === 'history') {
    renderHistory();
  }
}

function renderLogs(listElementId, items) {
  const list = document.getElementById(listElementId);
  list.innerHTML = '';

  items.forEach(item => {
    const li = document.createElement('li');
    li.classList.add(item.type === 'success' ? 'success' : item.type === 'muted' ? 'muted' : 'default');
    li.innerHTML = `${item.text}<small>${item.time}</small>`;
    list.appendChild(li);
  });
}

function renderTaskScreens() {
  const task = getActiveTask();
  if (!task) return;

  document.getElementById('taskStartTitle').textContent = task.title;
  document.getElementById('taskStartDeadline').textContent = task.deadlineShort;
  document.getElementById('taskStartAuthor').textContent = task.author;
  document.getElementById('taskStartDateFull').textContent = task.deadlineFull;

  document.getElementById('taskProgressTitle').textContent = task.title;
  document.getElementById('taskProgressAuthor').textContent = task.author;
  document.getElementById('taskProgressDateFull').textContent = task.deadlineFull;

  document.getElementById('taskDoneTitle').textContent = task.title;
  document.getElementById('taskDoneAuthor').textContent = task.author;
  document.getElementById('taskDoneDateFull').textContent = task.deadlineFull;
  document.getElementById('taskDoneDate').textContent = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).replace('.', '');

  const currentRunningSeconds = task.status === 'running'
    ? getTaskWorkedSeconds(task) + appState.timerSeconds
    : getTaskWorkedSeconds(task);
  const totalClock = formatSecondsToClock(currentRunningSeconds);

  document.getElementById('startTimer').textContent = task.status === 'done' ? totalClock : '00h00m00s';
  document.getElementById('progressTimer').textContent = totalClock;
  document.getElementById('doneTimer').textContent = totalClock;
  document.getElementById('doneStatusHours').textContent = totalClock;

  const progressSubtitle = document.querySelector('#screen-task-progress .task-subtitle');
  const progressStatusBox = document.querySelector('#screen-task-progress .status-box');
  const isPaused = task.status === 'paused';
  const isRunning = task.status === 'running';

  progressSubtitle.textContent = isRunning ? 'Em execução agora' : isPaused ? 'Pausada agora' : 'Em andamento';
  progressSubtitle.classList.toggle('success-text', isRunning);
  progressSubtitle.classList.toggle('warning-text', isPaused);

  progressStatusBox.textContent = isRunning ? '● Em execução' : isPaused ? '● Pausada' : '● Em pausa';
  progressStatusBox.classList.toggle('running', isRunning);
  progressStatusBox.classList.toggle('paused', isPaused);
  progressStatusBox.classList.toggle('done', false);

  const pauseButton = document.getElementById('pauseTaskBtn');
  pauseButton.textContent = isPaused ? '▶ Retomar tarefa' : '❚❚ Pausar';

  renderLogs('startLog', task.log);
  renderLogs('progressLog', task.progressLog);
  renderLogs('doneLog', task.doneLog.length ? task.doneLog : [
    { text: 'Tarefa iniciada', time: '31 mar, 09:00', type: 'default' },
    { text: 'Sessão pausada — 02h30m00s acumuladas', time: '31 mar, 11:47', type: 'muted' },
    { text: `Finalizada com ${totalClock} no total`, time: '31 mar, 10:22', type: 'success' }
  ]);
}

function renderReportScreen() {
  const task = getActiveTask();
  if (!task) return;

  document.getElementById('reportTitle').textContent = task.title;
  document.getElementById('reportTaskTitle').textContent = task.title;
  document.getElementById('reportTaskHours').textContent = formatSecondsToClock(getTaskWorkedSeconds(task));
  document.getElementById('reportTaskStatus').textContent = task.statusLabel;
  document.getElementById('reportClock').textContent = formatSecondsToClock(getTaskWorkedSeconds(task));
  renderLogs('reportLog', task.progressLog.length ? task.progressLog : task.doneLog);
}

function showScreen(screenKey) {
  appState.currentScreen = screenKey;

  screens.forEach(screen => screen.classList.remove('is-visible'));
  const target = document.getElementById(screenMap[screenKey].id);
  if (target) target.classList.add('is-visible');

  flowLinks.forEach(link => {
    link.classList.toggle('is-active', link.dataset.screen === screenKey);
  });

  screenLabel.textContent = screenMap[screenKey].label;
  renderTaskScreens();
  if (screenKey === 'report') renderReportScreen();
  renderCards();
}

function updateDashboardNumbers() {
  document.getElementById('weekHours').textContent = formatSecondsToClock(getTotalWorkedSeconds());
  document.getElementById('doneCount').textContent = String(appState.tasks.filter(task => task.status === 'done').length);
  renderChart();
}

function startTimer() {
  if (appState.timerInterval) clearInterval(appState.timerInterval);

  appState.timerInterval = setInterval(() => {
    appState.timerSeconds += 1;
    const clock = formatSecondsToClock(appState.timerSeconds);
    document.getElementById('progressTimer').textContent = clock;
    document.getElementById('doneTimer').textContent = clock;
    document.getElementById('doneStatusHours').textContent = clock;
    renderCards();
  }, 1000);
}

function resetTimer() {
  appState.timerSeconds = 0;
}

function stopTimer() {
  if (appState.timerInterval) {
    clearInterval(appState.timerInterval);
    appState.timerInterval = null;
  }
}

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  updateDashboardNumbers();
  renderChart();
  renderCards();
  showScreen('dashboard');
});

flowLinks.forEach(link => {
  link.addEventListener('click', () => {
    const screen = link.dataset.screen;
    if (!screenMap[screen]) return;
    showScreen(screen);
  });
});

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    showDashboardView(button.dataset.view);
  });
});

document.querySelectorAll('.icon-close').forEach(button => {
  button.addEventListener('click', () => showScreen(button.dataset.screen));
});

startTaskBtn.addEventListener('click', () => {
  const task = getActiveTask();
  if (hasRunningTask(task.id)) {
    const runningTask = appState.tasks.find(t => t.status === 'running');
    alert(`Já existe uma tarefa em andamento: "${runningTask.title}". Pausa ou finalize ela antes de iniciar outra.`);
    return;
  }

  task.status = 'running';
  task.statusLabel = 'Em andamento';
  resetTimer();
  task.progressLog = task.progressLog || [];
  task.progressLog.push(
    { text: 'Tarefa iniciada', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), type: 'default' },
    { text: 'Sessão ativa — 00h00m00s acumuladas', time: 'Agora', type: 'success' }
  );
  task.log = task.log || [];
  task.log.push({ text: 'Tarefa iniciada', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), type: 'default' });
  startTimer();
  showScreen('task-progress');
});

pauseTaskBtn.addEventListener('click', () => {
  const task = getActiveTask();

  if (task.status === 'running') {
    stopTimer();
    task.accumulatedSeconds = getTaskWorkedSeconds(task) + appState.timerSeconds;
    const total = formatSecondsToClock(task.accumulatedSeconds);
    task.hoursLabel = total;
    task.status = 'paused';
    task.statusLabel = 'Pausada';
    task.progressLog = task.progressLog || [];
    task.progressLog.push({
      text: `Sessão pausada — ${total} acumuladas`,
      time: 'Agora',
      type: 'muted'
    });
    task.log = task.log || [];
    task.log.push({ text: `Sessão pausada — ${total} acumuladas`, time: 'Agora', type: 'muted' });
    alert(`Sessão pausada com ${total} acumuladas.`);
  } else if (task.status === 'paused') {
    if (hasRunningTask(task.id)) {
      const runningTask = appState.tasks.find(t => t.status === 'running');
      alert(`Não é possível retomar esta tarefa enquanto "${runningTask.title}" estiver em andamento. Pause ou finalize a outra antes de retomar.`);
    } else {
      task.status = 'running';
      task.statusLabel = 'Em andamento';
      task.progressLog = task.progressLog || [];
      task.progressLog.push({
        text: 'Retomada da tarefa',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        type: 'default'
      });
      task.progressLog.push({
        text: `Sessão ativa — ${formatSecondsToClock(getTaskWorkedSeconds(task))} acumuladas`,
        time: 'Agora',
        type: 'success'
      });
      task.log = task.log || [];
      task.log.push({ text: 'Retomada da tarefa', time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), type: 'default' });
      resetTimer();
      startTimer();
    }
  }

  renderTaskScreens();
  renderCards();
  updateDashboardNumbers();
});

finishTaskBtn.addEventListener('click', () => {
  const task = getActiveTask();
  stopTimer();
  task.accumulatedSeconds = getTaskWorkedSeconds(task) + appState.timerSeconds;
  const total = formatSecondsToClock(task.accumulatedSeconds);

  task.status = 'done';
  task.statusLabel = 'Concluída';
  task.hoursLabel = total;
  task.doneLog = task.doneLog || [];
  task.doneLog.push({
    text: `Finalizada com ${total} no total`,
    time: 'Agora',
    type: 'success'
  });
  task.log = task.log || [];
  task.log.push({ text: `Finalizada com ${total} no total`, time: 'Agora', type: 'success' });

  updateDashboardNumbers();
  renderCards();
  showScreen('task-done');
});

reportBtn.addEventListener('click', () => {
  renderReportScreen();
  showScreen('report');
});

renderChart();
renderCards();
renderTaskScreens();
showScreen('login');

window.addEventListener('load', () => {
  showScreen('login');
});
