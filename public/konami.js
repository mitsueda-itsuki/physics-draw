class CommandArray {
  constructor(answerArray = []) {
    this.commandArray = [];
    if (answerArray.length === 0) {
      this.answerArray = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "KeyB",
        "KeyA",
      ];
    } else {
      this.answerArray = answerArray;
    }
  }
  check = () => {
    if (this.commandArray.length !== this.answerArray.length) {
      return false;
    }
    for (let i = 0; i < this.commandArray.length; i++) {
      if (this.commandArray[i] !== this.answerArray[i]) {
	return false;
      }
    }
    return true;
  };
  push = command => {
    if (this.commandArray.length >= this.answerArray.length) {
      this.commandArray.shift();
    }
    this.commandArray.push(command);
  };
}

const commandArray = new CommandArray();

document.addEventListener('keydown', input => {
  commandArray.push(input.code);
  if (commandArray.check()) {
    alert("操作方法: 回転: Enter, 移動: 矢印キー ←/→")
    confirm("Go to Tetris")
    location.href = window.location + "/tetris.html"
  }
});
