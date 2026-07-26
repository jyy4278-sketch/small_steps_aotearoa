//will close or open the menu overlay in homscreen(when x is clicked)
function toggleMenu(open) {
    document.getElementById('menuOverlay').classList.toggle('open', open);
  }
  
  //shows the sticky nav once the user scrolls past the hero section using heroBottom < 0
  const hero = document.querySelector('.hero');
  const stickyNav = document.getElementById('stickyNav');
  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    stickyNav.classList.toggle('visible', heroBottom < 0);
  });
  
  // Displays a specific error message under a given field, or hides it if there's no error - specfic error prevention
  //this is reused by every validation function below - takes the field's id and the message to show.
  function showFieldError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    if (message) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    } else {
      errorEl.classList.remove('show');
    }
  }
  
  //This bit checks a name field isn't empty-returns true if valid,false if not.
  function validateName(value, fieldId, label) {
    const trimmed = value.trim();
    if (trimmed === '') {
      showFieldError(fieldId, label + ' is required.');
      return false;
    }
    if (trimmed.length < 2){
      showFieldError(fieldId, label + ' must be at least 2 characters long. "' + trimmed + '" is too short.');
      return false;
    }
    showFieldError(fieldId, '');
    return true;
  }
  
  //checks the email looks like a real email address using a regular expression(some characters @ and .).
  function validateEmail(value) {
    const trimmed = value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (trimmed === '') {
      showFieldError('email', 'Email is required.');
      return false;
    }
    if (!emailPattern.test(trimmed)) {
      showFieldError('email', '"' + trimmed + '" is not a valid email address. Check for a missing @ or domain (e.g. name@example.com).');
      return false;
    }
    showFieldError('email', '');
    return true;
  }
  
  // Checks thata region has actually been selected from the dropdown.
  function validateRegion(value) {
    if (value === '') {
      showFieldError('region', 'Please select your region from the list.');
      return false;
    }
    showFieldError('region', '');
    return true;
  }
  
  // Checks year of birth is a real, sensible year - not just any number(between 1936 and 2021). - might change later to be more narrow or just teens
  // Uses the current year so the valid range is never hardcoded or outdated - doesn't need to be constantly upadted
  function validateYearOfBirth(value) {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 90; // reasonable oldest possible user
    const maxYear = currentYear - 5;   // reasonable youngest possible user
  
    if (value === '' || isNaN(value)) {
      showFieldError('yob', 'Year of birth is required and must be a number.');
      return false;
    }
    const yob = parseInt(value, 10);
    if (yob < minYear || yob > maxYear) {
      showFieldError('yob', 'Enter a year between ' + minYear + ' and ' + maxYear + '. "' + value + '" is outside that range.');
      return false;
    }
    showFieldError('yob', '');
    return true;
  }
  
  //This will checks the confirmation checkbox has been ticked.
  function validateVerify(checked) {
    if (!checked) {
      showFieldError('verify', 'Please confirm your details are correct before submitting.');
      return false;
    }
    showFieldError('verify', '');
    return true;
  }
  
  // Runs all field validations when the form is submitted.
  //This will only shows the success message if every single field passes.
  function handleSubscribe(e) {
    e.preventDefault();
  
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const region = document.getElementById('region').value;
    const yob = document.getElementById('yob').value;
    const verified = document.getElementById('verify').checked;
  
    // Run every check - each one shows its own specific error if it fails
    const fnameValid = validateName(fname, 'fname', 'First name');
    const lnameValid = validateName(lname, 'lname', 'Last name');
    const emailValid = validateEmail(email);
    const regionValid = validateRegion(region);
    const yobValid = validateYearOfBirth(yob);
    const verifyValid = validateVerify(verified);
  
    const allValid = fnameValid && lnameValid && emailValid && regionValid && yobValid && verifyValid;
  
    if (!allValid) {
      return false;
    }
  
    alert('Thanks, ' + fname.trim() + '! (Demo only - nothing was saved.)');
    e.target.reset();
    return false;
  }