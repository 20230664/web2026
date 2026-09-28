// 타이머 시간 설정 (초 단위)
const FOCUS_TIME = 25 * 60; // 25분
const BREAK_TIME = 5 * 60;  // 5분

// 변수 초기화
let timeLeft = FOCUS_TIME;
let timerId = null;
let isWorkMode = true; // true: 작업 모드, false: 휴식 모드

// DOM 요소 가져오기
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const modeTitle = document.getElementById('mode-title');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// 화면에 시간 표시
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // 두 자릿수로 맞춤 (예: 5 -> 05)
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
  
  // 브라우저 탭 타이틀도 변경
  const modeText = isWorkMode ? '집중' : '휴식';
  document.title = `(${minutesDisplay.textContent}:${secondsDisplay.textContent}) ${modeText} - 뽀모도로`;
}

// 타이머 시작
function startTimer() {
  if (timerId !== null) return;

  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    // 시간이 다 되었을 때
    if (timeLeft === 0) {
      clearInterval(timerId);
      timerId = null;
      
      // 모드 전환 (작업 <-> 휴식)
      isWorkMode = !isWorkMode;
      timeLeft = isWorkMode ? FOCUS_TIME : BREAK_TIME;
      
      // UI 업데이트
      updateTheme();
      alert(isWorkMode ? "휴식 시간이 끝났습니다! 다시 집중해볼까요?" : "작업 시간이 끝났습니다! 잠시 쉬어주세요.");
      
      updateDisplay();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  }, 1000);
}

// 타이머 일시정지
function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

// 타이머 리셋
function resetTimer() {
  pauseTimer();
  isWorkMode = true;
  timeLeft = FOCUS_TIME;
  updateTheme();
  updateDisplay();
  document.title = "뽀모도로 타이머";
}

// 모드에 따른 테마(UI) 변경
function updateTheme() {
  if (isWorkMode) {
    modeTitle.textContent = "Focus Time";
    document.body.classList.remove("break-mode");
  } else {
    modeTitle.textContent = "Break Time";
    document.body.classList.add("break-mode");
  }
}

// 이벤트 리스너 등록
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// 초기 화면 설정
updateDisplay();