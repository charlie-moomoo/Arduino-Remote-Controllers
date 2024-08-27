const send = async (a) => {
  const dict = {
    "0x0": "unknown",
    "0x8C": "light",
    "0x88": "power",
    "0x87": "wind-",
    "0x86": "wind+",
    "0x9C": "plan off",
    "0x95": "plan on",
    "0x83": "mode",
    "0x85": "rotate",
  };
  console.log(`0x${a}`, dict[`0x${a}`]);
  await fetch(
    `${location.protocol}//${location.host}/api/send?command=${a}&protocol=nec`
  );
};
