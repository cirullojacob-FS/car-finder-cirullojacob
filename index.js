import './style.css';
import './car-finder-bg.jpg';


const carDataset = [
    { year: 2024, make: "Toyota", model: "Camry" },
    { year: 2024, make: "Toyota", model: "Corolla" },
    { year: 2024, make: "Toyota", model: "RAV4" },
    { year: 2024, make: "Honda", model: "Civic" },
    { year: 2024, make: "Honda", model: "Accord" },
    { year: 2024, make: "Ford", model: "F-150" },
    { year: 2025, make: "Toyota", model: "Camry" },
    { year: 2025, make: "Toyota", model: "Tundra" },
    { year: 2025, make: "Honda", model: "Civic" },
    { year: 2025, make: "Honda", model: "CR-V" },
    { year: 2025, make: "Ford", model: "Mustang" },
    { year: 2025, make: "Ford", model: "Explorer" },
    { year: 2026, make: "Toyota", model: "RAV4" },
    { year: 2026, make: "Honda", model: "Accord" },
    { year: 2026, make: "Ford", model: "Mustang" },
    { year: 2026, make: "Ford", model: "F-150" },
    { year: 2026, make: "Tesla", model: "Model 3" },
    { year: 2026, make: "Tesla", model: "Model Y" }
];

const yearSelect = document.getElementById('year-select');
const makeSelect = document.getElementById('make-select');
const modelSelect = document.getElementById('model-select');
const resetBtn = document.getElementById('reset-btn');

const populateDropdown = (dropdownElement, items, defaultText) => {
    dropdownElement.innerHTML = `<option value="">${defaultText}</option>`;
    const uniqueItems = [...new Set(items)].sort();
    uniqueItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = item;
        dropdownElement.appendChild(option);
    });
};

const initializeApp = () => {
    const allYears = carDataset.map(car => car.year);
    populateDropdown(yearSelect, allYears, '-- All Years --');
 
    makeSelect.innerHTML = '<option value="">-- Select Year First --</option>';
    makeSelect.setAttribute('disabled', 'true');
    modelSelect.innerHTML = '<option value="">-- Select Make First --</option>';
    modelSelect.setAttribute('disabled', 'true');
};

if (yearSelect) {
    yearSelect.addEventListener('change', (e) => {
        const selectedYear = parseInt(e.target.value);
        
        makeSelect.innerHTML = '<option value="">-- Select Make --</option>';
        modelSelect.innerHTML = '<option value="">-- Select Make First --</option>';
        modelSelect.setAttribute('disabled', 'true');

        if (selectedYear) {
            makeSelect.removeAttribute('disabled');
            const filteredMakes = carDataset
                .filter(car => car.year === selectedYear)
                .map(car => car.make);
            populateDropdown(makeSelect, filteredMakes, '-- Select Make --');
        } else {
            makeSelect.setAttribute('disabled', 'true');
        }
    });
}

if (makeSelect) {
    makeSelect.addEventListener('change', (e) => {
        const selectedYear = parseInt(yearSelect.value);
        const selectedMake = e.target.value;

        modelSelect.innerHTML = '<option value="">-- Select Model --</option>';

        if (selectedMake && selectedYear) {
            modelSelect.removeAttribute('disabled');
            const filteredModels = carDataset
                .filter(car => car.year === selectedYear && car.make === selectedMake)
                .map(car => car.model);
            populateDropdown(modelSelect, filteredModels, '-- Select Model --');
        } else {
            modelSelect.setAttribute('disabled', 'true');
        }
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        yearSelect.value = '';
        initializeApp();
    });
}

initializeApp();