// ---------- UTIL ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ---------- LOADER ----------
window.addEventListener("load", () => {
  const loader = $("#loader");
  if (loader) loader.style.display = "none";
  $("#year").textContent = new Date().getFullYear();
});

// ---------- THEME TOGGLE ----------
const themeToggle = $("#themeToggle");
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
updateThemeIcon();

themeToggle?.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", current);
  localStorage.setItem("theme", current);
  updateThemeIcon();
});
function updateThemeIcon(){
  const isDark = root.getAttribute("data-theme") === "dark";
  if (themeToggle) themeToggle.textContent = isDark ? "🌙" : "☀️";
}

// ---------- LANGUAGE TOGGLE (EN / SW) ----------
const langToggle = $("#langToggle");
const savedLang = localStorage.getItem("lang") || "en";
let currentLang = savedLang;
applyLang(savedLang);
langToggle?.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "sw" : "en";
  localStorage.setItem("lang", currentLang);
  applyLang(currentLang);
});
function applyLang(lang){
  langToggle && (langToggle.textContent = lang.toUpperCase());
  const dict = translations[lang];
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
}
const translations = {
  en: {
    nav_about:"About", nav_animals:"Animals", nav_products:"Products",
    nav_gallery:"Gallery", nav_visits:"School Visits", nav_contact:"Contact",
    hero_title:"Welcome to My Farm",
    hero_sub:"Fresh • Natural • Sustainable — Molo, Nakuru County",
    hero_cta:"Start Tour",
    about_title:"Our Story",
    about_copy:"We farm with care — raising healthy animals, growing clean food, and welcoming our community.",
    about_cows:"Cows", about_chickens:"Chickens", about_acres:"Acres",
    animals_title:"Meet the Animals", animals_copy:"Tap a card to hear them.",
    animal_cows:"Cows", animal_cows_copy:"Dairy cows — grass-fed, calm, and productive.",
    animal_chickens:"Chickens", animal_chickens_copy:"Free-range hens — fresh eggs daily.",
    animal_goats:"Goats", animal_goats_copy:"Hardy browsers with rich milk.",
    animal_horses:"Horses", animal_horses_copy:"Gentle giants around the farm.",
    products_title:"Farm Fresh Products",
    products_copy:"Pure, local, and responsibly produced.",
    prod_milk:"Fresh Milk", prod_eggs:"Free-range Eggs", prod_cheese:"Handmade Cheese", prod_honey:"Raw Honey",
    gallery_title:"Gallery", gallery_copy:"Hover to zoom.",
    visits_title:"School Visits — Molo Agri-Experience",
    visits_copy:"We welcome local high schools and agri clubs in Molo for guided, hands-on farm tours.",
    visit_crop_title:"Crop Production", visit_crop_copy:"Potatoes, maize, vegetables, soil health & rotation.",
    visit_dairy_title:"Dairy & Poultry", visit_dairy_copy:"Milking, hygiene, poultry housing & feeding.",
    visit_sustain_title:"Sustainability", visit_sustain_copy:"Composting, water conservation, agroforestry.",
    visit_agribiz_title:"Agri-Business", visit_agribiz_copy:"Value chains, branding, and farm careers.",
    visits_cta:"Book a School Tour",
    contact_title:"Contact Us",
    contact_copy:"Questions, bookings, or partnerships? Send us a message.",
    form_name:"Name", form_email:"Email", form_message:"Message",
    form_send:"Send"
  },
  sw: {
    nav_about:"Kuhusu", nav_animals:"Wanyama", nav_products:"Bidhaa",
    nav_gallery:"Picha", nav_visits:"Ziara za Shule", nav_contact:"Mawasiliano",
    hero_title:"Karibu Shambani Kwetu",
    hero_sub:"Safii • Asili • Endelevu — Molo, Kaunti ya Nakuru",
    hero_cta:"Anza Ziara",
    about_title:"Hadithi Yetu",
    about_copy:"Tunafanya kilimo kwa uangalifu — kufuga mifugo wenye afya, kukuza chakula safi, na kukaribisha jamii.",
    about_cows:"Ng’ombe", about_chickens:"Kuku", about_acres:"Aka",
    animals_title:"Wafahamu Wanyama", animals_copy:"Gonga kadi umsikie.",
    animal_cows:"Ng’ombe", animal_cows_copy:"Ng’ombe wa maziwa — hula majani na ni watulivu.",
    animal_chickens:"Kuku", animal_chickens_copy:"Kuku walio huru — mayai mapya kila siku.",
    animal_goats:"Mbuzi", animal_goats_copy:"Wazuri na maziwa mazito.",
    animal_horses:"Farasi", animal_horses_copy:"Marafiki wakubwa wenye upole.",
    products_title:"Bidhaa Safi za Shamba",
    products_copy:"Asili, za hapa, na zinazoheshimu mazingira.",
    prod_milk:"Maziwa Mabichi", prod_eggs:"Mayai ya Kienyeji", prod_cheese:"Jibini la Mkono", prod_honey:"Asali Mbichi",
    gallery_title:"Picha", gallery_copy:"Sogeza kipanya kukuza.",
    visits_title:"Ziara za Shule — Uzoefu wa Kilimo Molo",
    visits_copy:"Tunakaribisha shule za sekondari na vilabu vya kilimo kwa ziara zenye mafunzo ya vitendo.",
    visit_crop_title:"Kilimo cha Mazao", visit_crop_copy:"Viazi, mahindi, mboga, afya ya udongo na mzunguko wa mazao.",
    visit_dairy_title:"Maziwa & Kuku", visit_dairy_copy:"Kukamua, usafi, makazi ya kuku na ulishaji.",
    visit_sustain_title:"Uendelevu", visit_sustain_copy:"Kutengeneza mboji, kuhifadhi maji, misitu ya kilimo.",
    visit_agribiz_title:"Biashara ya Kilimo", visit_agribiz_copy:"Mnyororo wa thamani, chapa, na taaluma za kilimo.",
    visits_cta:"Weka Ziara ya Shule",
    contact_title:"Wasiliana Nasi",
    contact_copy:"Maswali, nafasi za ziara, au ushirikiano? Tutumie ujumbe.",
    form_name:"Jina", form_email:"Barua pepe", form_message:"Ujumbe",
    form_send:"Tuma"
  }
};

// ---------- COUNTERS (on view) ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.getAttribute("data-target") || "0");
    let val = 0;
    const step = Math.max(1, Math.floor(target / 120));
    const tick = () => {
      val += step;
      if (val >= target) { el.textContent = target; return; }
      el.textContent = val;
      requestAnimationFrame(tick);
    };
    tick();
    io.unobserve(el);
  });
}, { threshold: .5 });
$$(".counter").forEach(el => io.observe(el));

// ---------- SMOOTH NAV CURRENT HIGHLIGHT ----------
const sections = ["about","animals","products","gallery","visits","contact"];
const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`header nav a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) link.classList.add("active");
    else link.classList.remove("active");
  });
}, { threshold: .5 });
sections.forEach(id => {
  const sec = document.getElementById(id);
  if (sec) spy.observe(sec);
});

// ---------- ANIMAL SOUNDS ----------
function playSound(path){
  const audio = new Audio(path);
  audio.play().catch(()=>{/* ignore autoplay blocks until user interaction */});
}
$$(".animal").forEach(card => {
  card.addEventListener("click", () => playSound(card.dataset.sound));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playSound(card.dataset.sound); }
  });
});

// ---------- CONTACT FORM (demo only) ----------
$("#contactForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thanks! We'll get back to you soon.");
  e.target.reset();
});
