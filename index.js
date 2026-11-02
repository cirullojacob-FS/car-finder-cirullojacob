import "./style.css";
import "./car-finder-bg.jpg";

document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("year-dropdown");
  const makeSelect = document.getElementById("make-dropdown");
  const modelSelect = document.getElementById("model-dropdown");

  const yearsArray = carDataset.map((car) => car.year);
  const sortedUniqueYears = [...new Set(yearsArray)].sort((a, b) => b - a);

  sortedUniqueYears.forEach((year) => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  yearSelect.addEventListener("change", () => {
    makeSelect.innerHTML =
      '<option value="" disabled selected>Select Make</option>';
    modelSelect.innerHTML =
      '<option value="" disabled selected>Select Model</option>';
    makeSelect.disabled = true;
    modelSelect.disabled = true;

    const selectedYear = parseInt(yearSelect.value);

    const matchingCars = carDataset.filter((car) => car.year === selectedYear);
    const makesArray = matchingCars.map((car) => car.make);
    const sortedUniqueMakes = [...new Set(makesArray)].sort();

    makeSelect.disabled = false;
    sortedUniqueMakes.forEach((make) => {
      const option = document.createElement("option");
      option.value = make;
      option.textContent = make;
      makeSelect.appendChild(option);
    });
  });

  makeSelect.addEventListener("change", () => {
    modelSelect.innerHTML =
      '<option value="" disabled selected>Select Model</option>';
    modelSelect.disabled = true;

    const selectedYear = parseInt(yearSelect.value);
    const selectedMake = makeSelect.value;

    const matchingCars = carDataset.filter(
      (car) => car.year === selectedYear && car.make === selectedMake,
    );
    const modelsArray = matchingCars.map((car) => car.model);
    const sortedUniqueModels = [...new Set(modelsArray)].sort();

    modelSelect.disabled = false;
    sortedUniqueModels.forEach((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  });

  modelSelect.addEventListener("change", () => {
    const selectedYear = parseInt(yearSelect.value);
    const selectedMake = makeSelect.value;
    const selectedModel = modelSelect.value;

    const finalCarResult = carDataset.find(
      (car) =>
        car.year === selectedYear &&
        car.make === selectedMake &&
        car.model === selectedModel,
    );

    console.log("🚗 Selected Car Specs:", finalCarResult);
  });
});
