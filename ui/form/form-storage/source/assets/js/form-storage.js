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
    'textarea'
  ],
  localStorageKey: 'js-form-storage'
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
    if (window.localStorage.getItem(`${this.localStorageKey}-${this.element.name}`)) {
      JSON.parse(window.localStorage.getItem(`${this.localStorageKey}-${this.element.name}`)).map(field => {
        const element = this.element.querySelector(field.id);

        element.checked = field.checked;
        element.value = field.value;
      });
    }
  }

  setForm() {
    const form = [];

    Array.from(this.element.querySelectorAll(this.formElements.join(', '))).map(element => {
      form.push({
        id: `#${element.id}`,
        checked: element.checked,
        value: element.value
      });
    })

    window.localStorage.setItem(`${this.localStorageKey}-${this.element.name}`, JSON.stringify(form));
  }

  onSubmit() {
    this.setForm();
  }

  addEventListeners() {
    this.element.addEventListener('submit', this.onSubmit);
  }

}

export default FormStorage;
