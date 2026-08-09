//will close or open the menu overlay in homscreen(when x is clicked)
function toggleMenu(open) {
    document.getElementById('menuOverlay').classList.toggle('open', open);
  }
  
// Sticky nav only appears after scrolling past the hero — homepage only
const hero = document.querySelector('.hero');
const stickyNav = document.getElementById('stickyNav');
if (hero && stickyNav) {
  window.addEventListener('scroll', () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    stickyNav.classList.toggle('visible', heroBottom < 0);
  });
}

// Carousel — homepage only
if (document.getElementById('prevArrow')) {
  const carouselLocations = [
    { name: "Tiritiri Matangi Island", blurb: "Predator-free sanctuary, home to kōkako and saddleback.", image: "images/carousel-tiritiri.jpeg" },
    { name: "Waitākere Ranges", blurb: "Dense native bush, kererū and tūī along the tracks.", image: "images/carousel-waitakere.jpg" },
    { name: "One Tree Hill / Maungakiekie", blurb: "Volcanic cone with open grassland, easy to reach by bus.", image: "images/carousel-hill.webp" },
    { name: "Western Springs", blurb: "Pūkeko and eels around the lakeside, right in the city.", image: "images/carousel-springs.jpg" }
  ];

  let carouselIndex = 0;
  const carouselBox = document.getElementById('carouselBox');
  const carouselLabel = document.getElementById('carouselLabel');
  const carouselBlurb = document.getElementById('carouselBlurb');
  const carouselDots = document.getElementById('carouselDots');

  function renderCarousel() {
    const current = carouselLocations[carouselIndex];
    carouselLabel.textContent = current.name;
    carouselBlurb.textContent = current.blurb;
    carouselBox.style.backgroundImage =
      `linear-gradient(100deg, rgba(46,64,31,0.75), rgba(15,26,9,0.75)), url("${current.image}")`;

    carouselDots.innerHTML = '';
    carouselLocations.forEach((location, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === carouselIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        carouselIndex = i;
        renderCarousel();
      });
      carouselDots.appendChild(dot);
    });
  }

  document.getElementById('prevArrow').addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + carouselLocations.length) % carouselLocations.length;
    renderCarousel();
  });
  document.getElementById('nextArrow').addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % carouselLocations.length;
    renderCarousel();
  });

  renderCarousel();
}
  
  // Displays a specific error message under a given field, or hides it if there's no error - specfic error prevention
  //this is reused by every validation function below - takes the field's id and the message to show works for each one showing message
  function showFieldError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + 'Error');
    if (message) {
      errorEl.textContent = message;
      errorEl.classList.add('show');
    } else {
      errorEl.classList.remove('show');
    }
  }
  
  //this bit checks a name field isn't empty-returns true if valid,false if not.
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
  
  // Checks year of birth is a real, sensible year - not just any number(between 1936 and 2021). - might change later to be more narrow or just teens not sure yet
  // Uses the current year so the valid range is never outdated - futureproofing - doesn't need to be constantly upadted
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
  
  //this runs all the vield validations for input when submited
  //will only shows the success message if every single field passes.
  function handleSubscribe(e) {
    e.preventDefault();
  
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const region = document.getElementById('region').value;
    const yob = document.getElementById('yob').value;
    const verified = document.getElementById('verify').checked;
  
    //run every check - each one shows its own specific error if it fails
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





//___________________Species page_________________
// Guarded so this only runs on species.html
if (document.getElementById('grid')) {

 //array
  const species = [
    { en: "Tūī", mi: "Tūī", slug: "tui", freq: 880, category: "bird", status: "native",
      habitat: "Native bush, gardens with flowering trees", threat: "Cats, loss of nectar-bearing trees",
      sound: "Loud, varied — bell-like notes and clicks",
      img: "images/species-tui.jpg"
     },
    { en: "Kererū", mi: "Kererū", slug: "kereru", freq: 220, category: "bird", status: "native",
      habitat: "Forest canopy, suburban trees", threat: "Vehicle strikes, predators at nest",
      sound: "Deep, soft coo; loud wingbeats in flight",
      img: "images/species-kereru.jpg"
    },
    { en: "Fantail", mi: "Pīwakawaka", slug: "fantail", freq: 1200, category: "bird", status: "native",
      habitat: "Bush edges, gardens, almost anywhere with insects", threat: "Cats, especially fledglings",
      sound: "High, sharp 'cheet' repeated",
      img: "images/species-fantail.jpg"
    },
    { en: "Morepork", mi: "Ruru", slug: "morepork", freq: 330, category: "bird", status: "native",
      habitat: "Forest and large gardens, active at night", threat: "Habitat loss, vehicle strikes",
      sound: "Two-note 'more-pork' call at night",
      img: "images/species-owl.jpg"
    },
    { en: "Wētā", mi: "Wētā", slug: "weta", freq: 660, category: "insect", status: "endangered",
      habitat: "Log piles, dense native vegetation, wētā hotels", threat: "Rats, mice, habitat clearance",
      sound: "Leg-rubbing chirp, mostly at night",
      img: "images/species-weta.jpg"
    },
    { en: "Kōtare", mi: "Kōtare", slug: "kotare", freq: 990, category: "bird", status: "native",
      habitat: "Coastal areas, riverbanks, farmland", threat: "Habitat loss along waterways",
      sound: "Sharp, repeated 'kek-kek-kek'",
      img: "images/species-kingfisher.jpg"
    },
    { en: "Monarch butterfly", mi: "—", slug: "monarch", freq: 0, category: "insect", status: "common",
      habitat: "Gardens with swan plants", threat: "Introduced, not native, included for comparison",
      sound: "Silent",
      img: "images/species-butterfly.jpg"
    },
    { en: "Kārearea", mi: "Kārearea", slug: "karearea", freq: 1400, category: "bird", status: "endangered",
      habitat: "Open country, forest edges", threat: "Habitat loss, collisions",
      sound: "Fast, high-pitched 'kek-kek-kek-kek'",
      img: "images/species-hawk.jpg"
    }
  ];

  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const noResults = document.getElementById('noResults');
  let activeFilter = 'all';
//turns status code into display words(small helper)
  function statusLabel(s) {
    if (s === 'native') return 'Native';
    if (s === 'endangered') return 'Threatened';
    return 'Introduced';
  }

  // Falls back to a bg colour until real photos are added to images
  function cardBackground(sp) {
  const placeholderColour = "#2e401f";

  if (sp.img) {
    return `url('${sp.img}') center / cover no-repeat, ${placeholderColour}`;
  }
  return placeholderColour;
}
//rebuilds grid
  function render() {
    const query = searchInput.value.trim().toLowerCase(); // non-trivial string manipulation(upper to lower case no blanks)
    const filtered = species.filter(sp => { //need to fix so that you don't need the macron to search
      const matchesFilter = activeFilter === 'all' || sp.category === activeFilter;
      const matchesSearch = sp.en.toLowerCase().includes(query) || sp.mi.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });

    grid.innerHTML = '';
    noResults.classList.toggle('show', filtered.length === 0);
//for those that are left after search
    filtered.forEach((sp, i) => {
      const card = document.createElement('div');
      card.className = 'species-card';
      card.innerHTML = `
      <div class="species-img" style="background:${cardBackground(sp)};">
          <span class="status-pill status-${sp.status}">${statusLabel(sp.status)}</span>
        </div>
        <div class="species-body">
          <p class="en-name">${sp.en}</p>
          <p class="mi-name">${sp.mi}</p>
        </div>`;
      card.addEventListener('click', () => openModal(sp, i));
      grid.appendChild(card);
    });
  }
//puts into html - formats
  function openModal(sp, i) {
    document.getElementById('modalImg').style.background = cardBackground(sp);
    document.getElementById('modalBody').innerHTML = `
      <p class="en-name">${sp.en}</p>
      <p class="mi-name">${sp.mi}</p>
      <p class="row"><span class="label">Habitat</span>${sp.habitat}</p>
      <p class="row"><span class="label">Main threat</span>${sp.threat}</p>
      <p class="row"><span class="label">Sound</span>${sp.sound}</p>
      <button class="play-btn" id="playBtn" ${sp.freq === 0 ? 'disabled' : ''}>▶ Play call</button>`;
    document.getElementById('modalBackdrop').classList.add('open');
//for music
    const playBtn = document.getElementById('playBtn');
    if (playBtn && sp.freq > 0) {
      playBtn.addEventListener('click', () => playSound(sp.slug, sp.freq, playBtn));
    }
  }

  // Tries a real recording first; if it's missing, falls back to sound
  // placeholder tone so the button always does something rather than failing silently.
  function playSound(slug, freq, btnEl) {
    const audio = document.getElementById('soundPlayer');
    audio.src = `sounds/${slug}.mp3`;
    btnEl.disabled = true;
    btnEl.textContent = '♪ Playing...';

    audio.play()
      .then(() => { audio.onended = () => resetBtn(btnEl); })
      .catch(() => {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
        osc.onended = () => { resetBtn(btnEl); ctx.close(); };
      });
  }

  function resetBtn(btnEl) {
    if (!btnEl) return;
    btnEl.disabled = false;
    btnEl.textContent = '▶ Play call';
  }

  function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
  }
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });

  searchInput.addEventListener('input', render); // GUI event — live filtering as you type
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      render();
    });
  });

  render();
}
// ________________________ Quiz page __________________
//keeps it inside the quiz page only so JS does not apply to other pages
if (document.getElementById('quizWrap')) {

  //array of questions
  const questions = [
    { name: "Tūī", isNative: true, img: "images/quiz-tui.jpg" },
    { name: "Blackbird", isNative: false, img: "images/quiz-blackbird.jpg" },
    { name: "Kererū", isNative: true, img: "images/quiz-kereru.jpg" },
    { name: "House sparrow", isNative: false, img: "images/quiz-sparrow.jpg" },
    { name: "Wētā", isNative: true, img: "images/quiz-weta.jpg" },
    { name: "Magpie", isNative: false, img: "images/quiz-magpie.jpg" },
    { name: "Pīwakawaka (Fantail)", isNative: true, img: "images/quiz-fantail.jpg" },
    { name: "Monarch butterfly", isNative: false, img: "images/quiz-butterfly.jpg" },
  ];

  let current = 0;
  let score = 0;
  const wrap = document.getElementById('quizWrap');

  function renderQuestion() {
    const q = questions[current];
    wrap.innerHTML = `
      <p class="score-line">Question ${current + 1} of ${questions.length} · Score: ${score}</p>
      <div class="quiz-card">
        <div class="quiz-img" style="background-image: url('${q.img}')">
          <span>${q.name}</span>
        </div>
        <div class="quiz-buttons">
          <button id="nativeBtn">Native</button>
          <button id="notNativeBtn">Not native</button>
        </div>
        <p class="feedback" id="feedback"></p>
      </div>
      <button class="next-btn" id="nextBtn">Next →</button>
    `;

    document.getElementById('nativeBtn').addEventListener('click', () => checkAnswer(true));
    document.getElementById('notNativeBtn').addEventListener('click', () => checkAnswer(false));
    document.getElementById('nextBtn').addEventListener('click', goNext);
  }

  function checkAnswer(userSaidNative) {
    const q = questions[current];
    const correct = userSaidNative === q.isNative;
    const feedback = document.getElementById('feedback');

    if (correct) {
      score++;
      feedback.textContent = "Correct!";
      feedback.className = "feedback correct";
    } else {
      feedback.textContent = `Not quite. ${q.name} is ${q.isNative ? "native" : "not native"}.`;
      feedback.className = "feedback wrong";
    }

    document.getElementById('nativeBtn').disabled = true;
    document.getElementById('notNativeBtn').disabled = true;
    document.getElementById('nextBtn').classList.add('show');
  }

  function goNext() {
    current++;
    if (current < questions.length) {
      renderQuestion();
    } else {
      renderEndScreen();
    }
  }

  function renderEndScreen() {
    wrap.innerHTML = `
      <div class="end-screen">
        <p>You scored ${score} / ${questions.length}</p>
        <p>${score === questions.length ? "Perfect score!" : "Take another look at the species page and try again."}</p>
        <button id="restartBtn">Try again</button>
      </div>
    `;
    document.getElementById('restartBtn').addEventListener('click', restartQuiz);
  }

  function restartQuiz() {
    current = 0;
    score = 0;
    renderQuestion();
  }

  renderQuestion();
}



















// ________________________ Actions page __________________
//keeps it inside the quiz page only so JS does not apply to other pages
if (document.getElementById('actionsCard')) {

  // Array of objects — each action has the habit itself and why it matters
  const actions = [
    { text: "Keep your cat inside at night", desc: "Cats are one of the biggest threats to fledgling birds and lizards." },
    { text: "Plant a native shrub or tree", desc: "Even one plant gives nectar-feeders like tūī somewhere closer to feed." },
    { text: "Always put rubbish in the bin", desc: "Litter harms wildlife directly and often ends up in streams and harbours." },
    { text: "Don't feed bread to birds", desc: "Bread mostly attracts introduced species and offers native birds no nutrition." },
    { text: "Turn off unnecessary outdoor lights", desc: "Excess light disorients native seabirds and disrupts nocturnal insects." },
    { text: "Keep dogs on a leash near nesting birds", desc: "Ground-nesting birds on beaches are especially vulnerable to off-leash dogs." },
    { text: "Set a trap for pests in your backyard", desc: "Rats and stoats kill tens of millions of native eggs and chicks every year." },
    { text: "Mow the lawn less often", desc: "Longer grass supports more insects, which native birds rely on for food." },
    { text: "Make your windows visible to birds", desc: "Decals or partly open blinds stop birds mistaking glass for open sky." },
    { text: "Let part of your garden grow wild", desc: "A messier corner with layered plants gives more species somewhere to live." }
  ];

  // Holds the actions the user has actually picked — added to and removed from as they click
  let selected = [];
//calling all variables here
  const actionsCard = document.getElementById('actionsCard');
  const planBtn = document.getElementById('planBtn');
  const countLine = document.getElementById('countLine');
  const planOutput = document.getElementById('planOutput');

  // Builds the checklist markup from the actions array and wires up click events
  //firstly turns the array into strings and joins all toghter
  function renderActions() {
    actionsCard.innerHTML = actions.map((action, i) => `
      <div class="action-item" id="item${i}" data-text="${action.text}">
        <span class="action-num">${String(i + 1).padStart(2, '0')}</span>
        <div class="action-content">
          <p class="action-title">${action.text}</p>
          <p class="action-desc">${action.desc}</p>
        </div>
        <div class="action-check">
          <svg viewBox="0 0 24 24" fill="none"><path d="M4 12l6 6L20 6" stroke="#f0ecdf" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <input type="checkbox" id="action${i}">
      </div>
    `).join('');

    document.querySelectorAll('.action-item').forEach(item => {
      item.addEventListener('click', () => handleCheck(item));
    });
  }

  // Toggles one action in/out of the selected list — takes the clicked element, returns nothing
  function handleCheck(item) {
    const text = item.dataset.text;
    const nowChecked = !item.classList.contains('checked'); //checks if item has been checked
    item.classList.toggle('checked', nowChecked);

    if (nowChecked) {
      selected.push(text);
    } else {
      selected = selected.filter(t => t !== text);
    }
    updateButton();
  }


  // Enables/disables the commit button and updates the count line based on selected.length
  function updateButton() {
    if (selected.length === 0) {
      planBtn.disabled = true;
      countLine.textContent = "Select at least one action";
    } else {
      planBtn.disabled = false;
      countLine.textContent = selected.length + " selected";
    }
  }

  // Builds the "you've committed to" summary from whatevers currently in selected
  planBtn.addEventListener('click', () => {
    planOutput.innerHTML = `
      <h2>You've committed to</h2>
      <ul>${selected.map(item => `<li>${item}</li>`).join('')}</ul>
      <button class="reset-btn" id="resetBtn">Start over</button>
    `;
    planOutput.classList.add('show');
    document.getElementById('resetBtn').addEventListener('click', resetPlan);
  });

  // Clears selections and re-renders the checklist from scratch
  function resetPlan() {
    selected = [];
    planOutput.classList.remove('show');
    planOutput.innerHTML = '';
    renderActions();
    updateButton();
  }

  renderActions();

}





// ________________________ FAQ page __________________
// keeps it inside the FAQ page only so JS does not apply to other pages
if (document.querySelector('.faq-wrap')) {

  //grabs every question button on the page and turns it into a real list we can loop through
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      // .closest() walks up from the button to find its parent .faq-item
      const item = button.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

}











