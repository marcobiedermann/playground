[![dependencies Status](https://david-dm.org/marcobiedermann/playground/status.svg?path=ui/form/form-storage)](https://david-dm.org/marcobiedermann/playground?path=ui/form/form-storage) [![devDependencies Status](https://david-dm.org/marcobiedermann/playground/dev-status.svg?path=ui/form/form-storage)](https://david-dm.org/marcobiedermann/playground?path=ui/form/form-storage&type=dev)

# Form Storage

*Form meets LocalStorage* – Save form input to LocalStorage to get prefilled input.

## Installation

### ES2015

* Download `source/assets/js/form-storage.js`
* Import `form-storage.js` in you script file

### ES5

* Download `dist/assets/js/form-storage.js`
* Load `form-storage.js` to your website

## Usage

Make sure each form has a unique `name` attrribute.

Create a new `FormStorage` instance on each form.

## Example

```javascript
import FormStorage form './form-storage';

Array.from(document.querySelectorAll('.js-form-storage')).map(form => {
  new FormStorage(form);
});
```

## API

Create a new instance of `FormStorage` and pass an element selector and an options object to it:

```javascript
new FormStorage(element, options)
```

Load `FormStorage`:

```javascript
import FormStorage form './form-storage';
```

Options:

```javascript
new FormStorage(element, {
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
})
```
