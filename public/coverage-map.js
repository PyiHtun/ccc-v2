/* global L */
const parameters = new URLSearchParams(window.location.search);
const theme = parameters.get("theme") || localStorage.getItem("ccc-theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = theme === "dark" ? "dark" : "light";
const language = parameters.get("lang") || "en";
const copy = {
  en: { title: "Greater London and Hertfordshire coverage map", zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset view", note: "Please contact us to confirm availability in your area.", unavailable: "The map could not load. Please contact us to discuss your area." },
  tr: { title: "Greater London ve Hertfordshire bakım bölgesi haritası", zoomIn: "Yakınlaştır", zoomOut: "Uzaklaştır", reset: "Görünümü sıfırla", note: "Bölgenizdeki uygunluğu doğrulamak için bizimle iletişime geçin.", unavailable: "Harita yüklenemedi. Bölgenizi görüşmek için bizimle iletişime geçin." },
  el: { title: "Χάρτης φροντίδας για Greater London και Hertfordshire", zoomIn: "Μεγέθυνση", zoomOut: "Σμίκρυνση", reset: "Επαναφορά προβολής", note: "Επικοινωνήστε μαζί μας για διαθεσιμότητα στην περιοχή σας.", unavailable: "Ο χάρτης δεν φορτώθηκε. Επικοινωνήστε μαζί μας για την περιοχή σας." },
  my: { title: "Greater London နှင့် Hertfordshire စောင့်ရှောက်မှုဒေသ မြေပုံ", zoomIn: "ချဲ့ရန်", zoomOut: "ချုံ့ရန်", reset: "မြင်ကွင်းပြန်သတ်မှတ်ရန်", note: "သင့်ဒေသတွင် ဝန်ဆောင်မှုရရှိနိုင်မှုကို အတည်ပြုရန် ဆက်သွယ်ပါ။", unavailable: "မြေပုံကို မဖွင့်နိုင်ပါ။ သင့်ဒေသအတွက် ဆက်သွယ်မေးမြန်းပါ။" },
}[language] || { title: "Greater London and Hertfordshire coverage map", zoomIn: "Zoom in", zoomOut: "Zoom out", reset: "Reset view", note: "Please contact us to confirm availability in your area.", unavailable: "The map could not load. Please contact us to discuss your area." };
document.documentElement.lang = ["en", "tr", "el", "my"].includes(language) ? language : "en";
document.getElementById("reset-view").textContent = copy.reset;
document.getElementById("map-note").textContent = copy.note;
document.title = copy.title;
document.getElementById("coverage-map").setAttribute("aria-label", copy.title);

const map = L.map("coverage-map", {
  zoomControl: false,
  scrollWheelZoom: false,
  dragging: !L.Browser.mobile,
  touchZoom: true,
}).setView([51.65, -0.2], 8);
L.control.zoom({ zoomInTitle: copy.zoomIn, zoomOutTitle: copy.zoomOut }).addTo(map);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
}).addTo(map);

fetch("/coverage-regions.geojson")
  .then((response) => {
    if (!response.ok) throw new Error("Coverage boundaries unavailable");
    return response.json();
  })
  .then((data) => {
    const regions = L.geoJSON(data, {
      style: (feature) => ({ color: feature.properties.color, weight: 2, fillOpacity: 0.2 }),
      onEachFeature: (feature, layer) => {
        layer.bindTooltip(feature.properties.name, { permanent: true, direction: "center", className: "region-label" });
        layer.bindPopup(feature.properties.name);
      },
    }).addTo(map);
    const reset = () => map.fitBounds(regions.getBounds(), { padding: [24, 24], maxZoom: 9 });
    document.getElementById("reset-view").addEventListener("click", reset);
    new ResizeObserver(() => { map.invalidateSize(); reset(); }).observe(document.getElementById("coverage-map"));
    reset();
  })
  .catch(() => { document.getElementById("map-note").textContent = copy.unavailable; });
