let count = 0;

const countEl = document.getElementById("count");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");

function render() {
  // 숫자를 업데이트
  countEl.textContent = count;
  
  // "Pop" 애니메이션 트리거 (클래스 제거 후 다시 추가)
  countEl.classList.remove("pop");
  void countEl.offsetWidth; // 브라우저 리플로우 강제 (애니메이션 재시작용)
  countEl.classList.add("pop");

  // 버튼 상태 관리 (옵션: 0 미만으로 못 내려가게 하려면)
  decBtn.disabled = count <= 0;
}

incBtn.addEventListener("click", () => {
  count++;
  render();
});

decBtn.addEventListener("click", () => {
  if (count > 0) {
    count--;
    render();
  }
});

resetBtn.addEventListener("click", () => {
  count = 0;
  render();
});

// 초기 실행
render();
