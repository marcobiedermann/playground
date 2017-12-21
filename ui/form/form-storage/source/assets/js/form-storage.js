const defaults = {
  formElements: [
    'input[type="checkbox"]',
    'input[type="date"]',
    'input[type="email"]',
    'input[type="hidden"]',
    'input[type="number"]',
    'input[type="radio"]',
    'input[type="range"]',
    'input[type="search"]',
    'input[type="tel"]',
    'input[type="text"]',
    'input[type="time"]',
    'input[type="url"]',
    'select',
    'textarea',
  ],
  localStorageKey: 'js-form-storage',
};

class FormStorage {
  constructor(element, options) {
    Object.assign(this, defaults, options);
    this.element = element;

    this.onSubmit = this.onSubmit.bind(this);
    this.addEventListeners();

    this.getForm();
  }

  getForm() {
    const { element } = this;
    const formStorageKey = window.localStorage.getItem(`${this.localStorageKey}-${element.name}`);

    if (formStorageKey) {
      JSON.parse(formStorageKey).forEach((field) => {
        const input = element.querySelector(field.id);

        input.checked = field.checked;
        input.value = field.value;
      });
    }
  }

  setForm() {
    const { element } = this;
    const form = [];

    Array.from(element.querySelectorAll(this.formElements.join(', '))).forEach((input) => {
      form.push({
        id: `#${input.id}`,
        checked: input.checked,
        value: input.value,
      });
    });

    window.localStorage.setItem(`${this.localStorageKey}-${element.name}`, JSON.stringify(form));
  }

  onSubmit() {
    this.setForm();
  }

  addEventListeners() {
    this.element.addEventListener('submit', this.onSubmit);
  }
}

export default FormStorage;
