/* Password validation rules:
    * Letters & numbers & only these symbols !@#$&*
    * Must have at least 1 letter, 1 number and 1 of the above symbols
    * Can't have 3 consecutive numbers in accending order, example 123 or 890
*/
var MyInput = class extends HTMLElement {
  constructor() {
    super();

    const template = document.getElementById('my-input');
    const templateContent = template.content;

    this.el = this.attachShadow({ mode: 'open' });

    this.el.appendChild(templateContent.cloneNode(true));

    this.inputEl = this.el.querySelector('#input');
  }

  connectedCallback() {
    this.el.querySelector('#input').addEventListener('keyup', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const isValid = this.validate();
    if (!isValid) {
      if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
        this.inputEl.setCustomValidity('Only numbers');
      } else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
        this.inputEl.setCustomValidity('Only letters');
      } else {
        this.inputEl.setCustomValidity('Password check');
      }
      this.inputEl.reportValidity();
    } else {
      this.inputEl.setCustomValidity('');
      this.inputEl.reportValidity();
    }
  }

  validate() {
    if (this.el.querySelector('[name=validation-type]:checked').value === 'number') {
      if (/[^0-9]/.test(this.inputEl.value)) return false;
    } else if (this.el.querySelector('[name=validation-type]:checked').value === 'letter') {
      if (/[^a-zA-Z]/.test(this.inputEl.value)) return false;
    } else { // checking for password conditions
      if (/\d{3,3}/.test(this.inputEl.value)) { //consecutive numbers checks
        let inpVal = this.inputEl.value;
        let result = this.findSequence(inpVal, 3);
        // console.log(result);
        if (result) {
          return false;
        }
      } else {
        // Passwords may contain letters, numbers and at least 1 of the following symbols (!@#&*)
        if (!(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#&*])[A-Za-z\d!@#&*]{1,}$/.test(this.inputEl.value))) {
          return false;
        }
      }
    }
    return true;
  }

  findSequence(input, n) {
    var numRegex = /^(?:0|[1-9][0-9]*)$/;

    // Try every starting position
    for (var i = 0; i < input.length; ++i) {
      // console.log('i--------'+i);
      // At the current starting position, try every length for the 1st number
      for (var firstLen = 1; i + firstLen < input.length - 1; ++firstLen) {
        var afterFirst = i + firstLen;
        var first = input.slice(i, afterFirst);
        // console.log(first);
        // console.log(numRegex.test(first));

        // If the first string isn't an integer, move on
        if (!numRegex.test(first)) {
          continue;
        }

        // Convert the first string to an integer
        var firstInt = parseInt(first, 10);
        // console.log(firstInt);

        // Build what the rest of the string should look like following the
        // first, in order to get a valid sequence
        var rest = "";
        for (var j = 1; j < n; ++j) {
          rest = rest.concat(firstInt + j);
        }
        // console.log("rest------"+rest);
        // console.log('afterFirst------'+afterFirst);
        // console.log('');
        // Compare to what actually follows the starting string; if it
        // matches, then we have our sequence; otherwise, continue on
        if (input.slice(afterFirst, afterFirst + rest.length) === rest) {
          return {
            start: i,
            length: first.length + rest.length,
            first: first
          };
        }
      }
    }
    return null;
  }
}
customElements.define('my-input', MyInput);