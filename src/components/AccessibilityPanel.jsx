import { useState, useEffect, useRef, useCallback } from "react";
import {
  Eye,
  Volume2,
  EyeOff,
  MousePointer2,
  X,
  Accessibility,
  BookOpen,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// ─── Constants ────────────────────────────────────────────────────────────────
const LS_KEY = "a11y_settings_v2";

const TEXT_SIZES = ["normal", "large", "xlarge"];

const DEFAULT_SETTINGS = {
  textSize: "normal",      // "normal" | "large" | "xlarge"
  highContrast: false,
  voiceAssistant: false,
  monochrome: false,
  dyslexiaFont: false,
  largeCursor: false,
};

// ─── Static CSS (animations only — injected once) ────────────────────────────
const STATIC_STYLES = `
  @keyframes a11y-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.55); }
    50%       { box-shadow: 0 0 0 10px rgba(59,130,246,0); }
  }
  .a11y-trigger-pulse { animation: a11y-pulse 2.5s ease-in-out infinite; }
  @keyframes a11y-slide-in {
    from { opacity: 0; transform: translateY(12px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .a11y-panel-enter { animation: a11y-slide-in 0.22s cubic-bezier(0.34,1.36,0.64,1) forwards; }
`;

function injectStaticStyles() {
  if (document.getElementById("a11y-static-styles")) return;
  const el = document.createElement("style");
  el.id = "a11y-static-styles";
  el.textContent = STATIC_STYLES;
  document.head.appendChild(el);
}

// ─── Load dyslexia font lazily ────────────────────────────────────────────────
function loadDyslexiaFont() {
  if (document.getElementById("a11y-dyslexia-font")) return;
  const link = document.createElement("link");
  link.id = "a11y-dyslexia-font";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,400;0,700;1,400&display=swap";
  document.head.appendChild(link);
}

// ─── Persist / load ───────────────────────────────────────────────────────────
function loadSettings() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
  } catch { return { ...DEFAULT_SETTINGS }; }
}
function saveSettings(s) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch { /* noop */ }
}

// ─── Apply all settings — uses inline style + dynamic <style> ─────────────────
// This bypasses Tailwind v4 cascade layers entirely.
function applyToDocument(s) {
  const html = document.documentElement;

  // 1. Text size — direct inline style (highest specificity, no cascade issues)
  if (s.textSize === "large")   html.style.fontSize = "110%";
  else if (s.textSize === "xlarge") html.style.fontSize = "125%";
  else html.style.fontSize = "";

  // 2. Rebuild the single dynamic <style> for everything else
  let dynEl = document.getElementById("a11y-dynamic-styles");
  if (!dynEl) {
    dynEl = document.createElement("style");
    dynEl.id = "a11y-dynamic-styles";
    document.head.appendChild(dynEl);
  }

  let css = "";

  if (s.highContrast) {
    css += `
      body, body * {
        background-color: #000 !important;
        color: #fff !important;
        border-color: #555 !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      body a, body a * { color: #ff0 !important; }
      body button { border: 1px solid #ff0 !important; }
      body img { filter: grayscale(100%) contrast(150%) !important; }
    `;
  }

  // Monochrome applies to body so fixed-position panel stays usable
  if (s.monochrome && !s.highContrast) {
    css += `body { filter: grayscale(100%) !important; }`;
  }

  if (s.dyslexiaFont) {
    loadDyslexiaFont();
    css += `
      body, body * {
        font-family: 'Comic Neue', 'Comic Sans MS', cursive !important;
        letter-spacing: 0.06em !important;
        word-spacing: 0.18em !important;
        line-height: 1.75 !important;
      }
    `;
  }

  if (s.largeCursor) {
    /* SVG arrow cursor, URL-encoded */
    const cur = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M6 6 L6 38 L16 28 L22 42 L28 39 L22 25 L36 25 Z' fill='%23111' stroke='%23fff' stroke-width='2.5' stroke-linejoin='round'/%3E%3C/svg%3E") 0 0, auto`;
    css += `*, *::before, *::after { cursor: ${cur} !important; }`;
  }

  dynEl.textContent = css;
}

// ─── Reset all ────────────────────────────────────────────────────────────────
function resetAll() {
  document.documentElement.style.fontSize = "";
  const dynEl = document.getElementById("a11y-dynamic-styles");
  if (dynEl) dynEl.textContent = "";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Text-size card (Aa + label) */
function SizeCard({ label, sizeLabel, active, onClick, id }) {
  const sizes = { normal: "text-sm", large: "text-base", xlarge: "text-xl" };
  return (
    <button
      id={id}
      onClick={onClick}
      aria-pressed={active}
      className={`
        flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-xl
        border-2 font-semibold transition-all duration-200 focus:outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
        ${active
          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
          : "bg-white border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500"
        }
      `}
    >
      <span className={`font-bold ${sizes[sizeLabel]}`}>Aa</span>
      <span className="text-[10px] tracking-wide uppercase leading-none mt-0.5">{label}</span>
    </button>
  );
}

/** Feature row — clickable row that acts as a toggle */
function FeatureRow({ icon, title, subtitle, checked, onToggle, id }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left
        transition-all duration-200 group
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1
        ${checked
          ? "bg-blue-50 border border-blue-200"
          : "bg-gray-50 border border-transparent hover:bg-gray-100 hover:border-gray-200"
        }
      `}
    >
      {/* Icon badge */}
      <div className={`
        flex h-9 w-9 shrink-0 items-center justify-center rounded-xl
        transition-colors duration-200
        ${checked ? "bg-blue-100 text-blue-600" : "bg-white text-gray-500 shadow-sm"}
      `}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug transition-colors duration-200 ${checked ? "text-blue-700" : "text-gray-800"}`}>
          {title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 leading-snug">{subtitle}</p>
      </div>

      {/* Pill indicator */}
      <div className={`
        w-8 h-4 rounded-full flex items-center transition-all duration-300 shrink-0 px-0.5
        ${checked ? "bg-blue-600 justify-end" : "bg-gray-300 justify-start"}
      `}>
        <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AccessibilityPanel() {
  const { t } = useLanguage();
  const [isOpen,       setIsOpen]       = useState(false);
  const [settings,     setSettings]     = useState(loadSettings);
  const [announcement, setAnnouncement] = useState("");
  const panelRef   = useRef(null);
  const triggerRef = useRef(null);

  // Boot
  useEffect(() => { injectStaticStyles(); }, []);

  // Apply + persist on every settings change
  useEffect(() => {
    applyToDocument(settings);
    saveSettings(settings);
  }, [settings]);

  // Keyboard: Escape + focus-trap
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") { setIsOpen(false); triggerRef.current?.focus(); return; }
      if (e.key !== "Tab") return;
      const focusable = panelRef.current?.querySelectorAll(
        'button:not([disabled]), [href], input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const [first, last] = [focusable[0], focusable[focusable.length - 1]];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last)  { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("[data-close-btn]")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Click-outside
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e) => {
      if (!panelRef.current?.contains(e.target) && !triggerRef.current?.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  // Voice announcer helper
  const announce = useCallback((text) => {
    setAnnouncement("");
    requestAnimationFrame(() => setAnnouncement(text));
  }, []);

  // Toggle boolean setting
  const toggle = (key, onMsg, offMsg) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      announce(next[key] ? onMsg : offMsg);
      return next;
    });
  };

  // Set text size
  const setTextSize = (size) => {
    setSettings(prev => ({ ...prev, textSize: size }));
    const label = size === "normal" ? t("common.a11y.sizeNormal") : size === "large" ? t("common.a11y.sizeLarge") : t("common.a11y.sizeXLarge");
    announce(`${t("common.a11y.textSizeLabel")}: ${label}`);
  };

  // Reset all
  const handleReset = () => {
    resetAll();
    setSettings({ ...DEFAULT_SETTINGS });
    announce(t("common.a11y.resetBtn"));
  };

  const activeCount = [
    settings.textSize !== "normal",
    settings.highContrast,
    settings.voiceAssistant,
    settings.monochrome,
    settings.dyslexiaFont,
    settings.largeCursor,
  ].filter(Boolean).length;

  return (
    <>
      {/* ── aria-live announcer ── */}
      <div
        role="status"
        aria-live={settings.voiceAssistant ? "assertive" : "polite"}
        aria-atomic="true"
        className="sr-only"
        id="a11y-announcer"
      >
        {announcement}
      </div>

      {/* ── Floating trigger ── */}
      <button
        ref={triggerRef}
        id="a11y-panel-trigger"
        aria-label={t("common.a11y.triggerBtn")}
        aria-expanded={isOpen}
        aria-controls="a11y-panel"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(v => !v)}
        className={`
          fixed bottom-6 right-6 z-[9998]
          flex items-center gap-2.5 px-4 h-12 rounded-full
          text-white text-sm font-semibold
          shadow-lg transition-all duration-300
          focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/60
          ${isOpen
            ? "bg-blue-700 scale-95"
            : "bg-blue-600 hover:bg-blue-500 hover:scale-105 active:scale-95 a11y-trigger-pulse"
          }
        `}
        style={{ boxShadow: "0 6px 24px rgba(37,99,235,0.45)" }}
      >
        <Accessibility size={20} className="shrink-0" />
        <span>{t("common.a11y.triggerBtn")}</span>
        {activeCount > 0 && (
          <span className="
            flex items-center justify-center w-5 h-5 rounded-full
            bg-white text-blue-700 text-[10px] font-bold -mr-1
          ">
            {activeCount}
          </span>
        )}
      </button>

      {/* ── Panel ── */}
      <div
        id="a11y-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t("common.a11y.title")}
        aria-hidden={!isOpen}
        className={`
          fixed bottom-[5.5rem] right-6 z-[9999]
          w-[22rem] rounded-2xl overflow-hidden
          shadow-2xl
          transition-all duration-300 origin-bottom-right
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto a11y-panel-enter"
            : "opacity-0 scale-95 translate-y-3 pointer-events-none"
          }
        `}
        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)" }}
      >
        {/* ── Gradient Header ── */}
        <div
          className="px-5 pt-5 pb-4 flex items-start gap-3"
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)" }}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Accessibility size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-white leading-tight">
              {t("common.a11y.title")}
            </h2>
            <p className="text-xs text-blue-200 font-medium uppercase tracking-widest mt-0.5">
              {t("common.a11y.subtitle")}
            </p>
          </div>
          <button
            data-close-btn
            aria-label={t("common.a11y.closeBtn")}
            onClick={() => { setIsOpen(false); triggerRef.current?.focus(); }}
            className="
              flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
              text-white/70 hover:text-white hover:bg-white/20
              transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60
            "
          >
            <X size={17} strokeWidth={2.5} />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="bg-white px-4 pb-4 pt-4 space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar">

          {/* Text size */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              {t("common.a11y.textSizeLabel")}
            </p>
            <div className="flex gap-2">
              {TEXT_SIZES.map(sz => (
                <SizeCard
                  key={sz}
                  id={`a11y-size-${sz}`}
                  sizeLabel={sz}
                  label={sz === "normal" ? t("common.a11y.sizeNormal") : sz === "large" ? t("common.a11y.sizeLarge") : t("common.a11y.sizeXLarge")}
                  active={settings.textSize === sz}
                  onClick={() => setTextSize(sz)}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Feature rows */}
          <div className="space-y-2">
            <FeatureRow
              id="a11y-toggle-contrast"
              icon={<Eye size={17} strokeWidth={1.8} />}
              title={t("common.a11y.highContrast")}
              subtitle={t("common.a11y.highContrastSub")}
              checked={settings.highContrast}
              onToggle={() => toggle("highContrast", t("common.a11y.highContrast"), t("common.a11y.highContrast"))}
            />
            <FeatureRow
              id="a11y-toggle-voice"
              icon={<Volume2 size={17} strokeWidth={1.8} />}
              title={t("common.a11y.voiceAssistant")}
              subtitle={t("common.a11y.voiceAssistantSub")}
              checked={settings.voiceAssistant}
              onToggle={() => toggle("voiceAssistant", t("common.a11y.voiceAssistant"), t("common.a11y.voiceAssistant"))}
            />
            <FeatureRow
              id="a11y-toggle-mono"
              icon={<EyeOff size={17} strokeWidth={1.8} />}
              title={t("common.a11y.monochrome")}
              subtitle={t("common.a11y.monochromeSub")}
              checked={settings.monochrome}
              onToggle={() => toggle("monochrome", t("common.a11y.monochrome"), t("common.a11y.monochrome"))}
            />
            <FeatureRow
              id="a11y-toggle-dyslexia"
              icon={<BookOpen size={17} strokeWidth={1.8} />}
              title={t("common.a11y.dyslexiaFont")}
              subtitle={t("common.a11y.dyslexiaFontSub")}
              checked={settings.dyslexiaFont}
              onToggle={() => toggle("dyslexiaFont", t("common.a11y.dyslexiaFont"), t("common.a11y.dyslexiaFont"))}
            />
            <FeatureRow
              id="a11y-toggle-cursor"
              icon={<MousePointer2 size={17} strokeWidth={1.8} />}
              title={t("common.a11y.largeCursor")}
              subtitle={t("common.a11y.largeCursorSub")}
              checked={settings.largeCursor}
              onToggle={() => toggle("largeCursor", t("common.a11y.largeCursor"), t("common.a11y.largeCursor"))}
            />
          </div>

          {/* Reset button */}
          {activeCount > 0 && (
            <button
              id="a11y-reset-btn"
              onClick={handleReset}
              className="
                w-full mt-1 py-2.5 rounded-xl text-xs font-semibold
                text-red-500 border border-red-200 bg-red-50
                hover:bg-red-100 hover:border-red-300
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-1
              "
            >
              {t("common.a11y.resetBtn")}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
