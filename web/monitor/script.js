const send = async (a) => {
  const dict = {
    "0x0": "unknown",
    "0xE6": "power",
    "0xB9": "pause",
    "0x79": "home",
    "0x58": "back",
    "0x68": "ok",
    "0x7": "vol+",
    "0xB": "vol-",
    "0xF": "vmute",
    "0x60": "up",
    "0x61": "down",
    "0x62": "right",
    "0x65": "left",
    "0x10": "channel-",
    "0x12": "channel+",
    "0x6B": "channel list",
    "0x28": "graphic mode",
  };
  console.log(`0x${a}`, dict[`0x${a}`]);
  if (dict[`0x${a}`] == "unknown")
    return alert("I don't know how to make that button :(");
  await fetch(`${location.protocol}//${location.host}/api/send?command=${a}&protocol=samsung`);
};

var dragged = false;
var oldY = 0;
globalThis.detectWay = false;
window.addEventListener("mousedown", function (e) {
  oldY = e.pageY;
  dragged = true;
});
document.addEventListener("mousemove", function () {
  dragged = true;
});
window.addEventListener("mouseup", function (e) {
  console.log(e.pageX, e.pageY);
  if (globalThis.detectWay) {
    if (!dragged) return;
    if (Math.abs(e.pageY - oldY) <= 20) return;
    if (e.pageY < oldY) {
      direction = "up";
    } else if (e.pageY > oldY) {
      direction = "down";
    }
    if (globalThis.detectWay == 1) {
      send(direction == "up" ? "7" : "B");
    } else {
      send(direction == "up" ? "12" : "10");
    }
    globalThis.detectWay = false;
  }
});
window.addEventListener("touchstart", (e) => {
  oldY = e.changedTouches[0].pageY;
  dragged = true;
});
window.addEventListener("touchend", function (e) {
  if (!e.target.classList.contains("bar")) return;
  if (e.target.classList.contains("left")) {
    globalThis.detectWay = 1;
  } else {
    globalThis.detectWay = 2;
  }
  e = e.changedTouches[0];
  console.log(e.pageX, e.pageY);
  if (globalThis.detectWay) {
    if (!dragged) return;
    if (Math.abs(e.pageY - oldY) <= 20) return;
    if (e.pageY < oldY) {
      direction = "up";
    } else if (e.pageY > oldY) {
      direction = "down";
    }
    console.log(direction);
    if (globalThis.detectWay == 1) {
      send(direction == "up" ? "7" : "B");
    } else {
      send(direction == "up" ? "12" : "10");
    }
    globalThis.detectWay = false;
  }
});
const detectWay = (a) => {
  globalThis.detectWay = a;
};
