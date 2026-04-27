const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const ratioWidthInput = document.getElementById("ratioWidth");
const ratioHeightInput = document.getElementById("ratioHeight");
const presetSelect = document.getElementById("preset");
const scaleInput = document.getElementById("scale");
const scaleValue = document.getElementById("scaleValue");
const currentRatio = document.getElementById("currentRatio");
const scaledDimensions = document.getElementById("scaledDimensions");
const cropDimensions = document.getElementById("cropDimensions");
const previewFrame = document.getElementById("previewFrame");
const resetScaleButton = document.getElementById("resetScale");

function gcd(a, b) {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));

  while (y) {
    [x, y] = [y, x % y];
  }

  return x || 1;
}

function parsePositiveNumber(input, fallback) {
  const value = Number(input.value);
  return value > 0 ? value : fallback;
}

function setPresetRatio(value) {
  if (value === "custom") {
    return;
  }

  const [w, h] = value.split(":").map(Number);
  ratioWidthInput.value = w;
  ratioHeightInput.value = h;
}

function updateCalculator() {
  const width = parsePositiveNumber(widthInput, 1);
  const height = parsePositiveNumber(heightInput, 1);
  const ratioWidth = parsePositiveNumber(ratioWidthInput, 1);
  const ratioHeight = parsePositiveNumber(ratioHeightInput, 1);
  const scale = Number(scaleInput.value) / 100;

  const simplified = gcd(width, height);
  const ratioText = `${Math.round(width / simplified)}:${Math.round(height / simplified)}`;
  currentRatio.textContent = ratioText;

  const scaledWidth = Math.round(width * scale);
  const scaledHeight = Math.round(height * scale);
  scaledDimensions.textContent = `${scaledWidth} x ${scaledHeight}`;
  scaleValue.textContent = `${scaleInput.value}%`;

  const targetRatio = ratioWidth / ratioHeight;
  let cropWidth = width;
  let cropHeight = Math.round(width / targetRatio);

  if (cropHeight > height) {
    cropHeight = height;
    cropWidth = Math.round(height * targetRatio);
  }

  cropDimensions.textContent = `${cropWidth} x ${cropHeight}`;
  previewFrame.style.aspectRatio = `${ratioWidth} / ${ratioHeight}`;
}

if (
  widthInput &&
  heightInput &&
  ratioWidthInput &&
  ratioHeightInput &&
  presetSelect &&
  scaleInput &&
  scaleValue &&
  currentRatio &&
  scaledDimensions &&
  cropDimensions &&
  previewFrame &&
  resetScaleButton
) {
  presetSelect.addEventListener("change", () => {
    setPresetRatio(presetSelect.value);
    updateCalculator();
  });

  [widthInput, heightInput, ratioWidthInput, ratioHeightInput, scaleInput].forEach((element) => {
    element.addEventListener("input", updateCalculator);
  });

  resetScaleButton.addEventListener("click", () => {
    scaleInput.value = 100;
    updateCalculator();
  });

  updateCalculator();
}
