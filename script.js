* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Inter, Arial, Helvetica, sans-serif;
}

:root {
  --bg: #090b12;
  --card: #141a26;
  --card-2: #1a2231;
  --line: #2b3751;
  --text: #e8edf8;
  --muted: #95a0b8;
  --accent: #6f7cff;
  --accent-2: #29d7a5;
}

body {
  min-height: 100vh;
  background: radial-gradient(circle at 12% 0%, #202f57 0%, #08102a 38%, #050a1a 100%);
  color: var(--text);
  padding: 18px 12px 36px;
}

.page-glow {
  pointer-events: none;
  position: fixed;
  inset: -20vh 40% auto -10vw;
  height: 50vh;
  width: 60vw;
  background: radial-gradient(circle, rgba(111, 124, 255, 0.25), transparent 65%);
  filter: blur(10px);
}

.hidden {
  display: none;
}

header,
nav,
main {
  width: min(980px, 100%);
  margin: 0 auto;
}

header {
  background: rgba(20, 26, 38, 0.9);
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  backdrop-filter: blur(4px);
}

header h1 {
  font-size: clamp(20px, 2.8vw, 34px);
}

.subtitle {
  margin-top: 4px;
  color: var(--muted);
  font-size: 13px;
}

#version {
  color: #b4bdd2;
  background: rgba(111, 124, 255, 0.18);
  border: 1px solid rgba(111, 124, 255, 0.5);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 13px;
  white-space: nowrap;
}

nav {
  display: flex;
  gap: 10px;
  margin-bottom: 14px;
}

.tab-btn,
.filters button {
  border: 1px solid var(--line);
  background: var(--card);
  color: #d6dcef;
  border-radius: 9px;
  padding: 8px 12px;
  cursor: pointer;
  transition: all .2s ease;
}

.tab-btn:hover,
.filters button:hover {
  transform: translateY(-1px);
  border-color: #44577e;
  background: var(--card-2);
}

.tab-btn.active,
.filters button.active {
  border-color: transparent;
  background: linear-gradient(120deg, var(--accent), #8f62ff);
  color: #fff;
  box-shadow: 0 8px 20px rgba(111, 124, 255, 0.3);
}

main {
  background: rgba(12, 16, 26, 0.8);
  border: 1px solid #222e46;
  border-radius: 12px;
  padding: 10px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.update,
.level,
.player {
  background: linear-gradient(160deg, rgba(26, 34, 49, 0.96), rgba(20, 27, 38, 0.96));
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 10px 12px;
  margin-top: 10px;
}

.level {
  display: grid;
  grid-template-columns: 62px 1fr auto;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}

.level:hover,
.player:hover {
  border-color: #4a5d83;
}

.level-rank {
  color: #ffcc7a;
  font-weight: 700;
}

.level-meta {
  color: var(--muted);
  font-size: 12px;
  margin-top: 2px;
}

.badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  border: 1px solid transparent;
}

.badge-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.16);
  font-size: 10px;
}

.badge-top1 {
  background: rgba(255, 208, 97, 0.2);
  color: #ffd061;
  border-color: rgba(255, 208, 97, 0.55);
}

.badge-sequel {
  background: rgba(170, 135, 255, 0.18);
  color: #c8afff;
  border-color: rgba(170, 135, 255, 0.55);
}

.badge-verifier {
  background: rgba(92, 204, 255, 0.18);
  color: #85dbff;
  border-color: rgba(92, 204, 255, 0.5);
}

.badge-creator {
  background: rgba(41, 215, 165, 0.18);
  color: #7ef3cd;
  border-color: rgba(41, 215, 165, 0.55);
}

.player-meta {
  color: #7f8aa7;
  font-size: 12px;
  margin-top: 3px;
}


.avatar {
  width: 54px;
  height: 54px;
  border-radius: 8px;
  object-fit: cover;
  background: #2a3550;
  border: 1px solid #33415f;
}

.avatar-large {
  width: 100%;
  max-height: 240px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid #33415f;
}

.player {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}


.player-points {
  color: #ffd665;
  font-weight: 700;
}

.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 3, 11, 0.8);
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 20;
}

.modal-content {
  width: min(650px, 96vw);
  max-height: 88vh;
  overflow: auto;
  background: #101723;
  border: 1px solid var(--line);
  border-radius: 14px;
  padding: 16px;
}

.info-block {
  margin-top: 12px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 7px;
}

.tag {
  background: #222c3d;
  border: 1px solid #364862;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 13px;
}

@media (max-width: 740px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  nav,
  .filters {
    flex-wrap: wrap;
  }

  .level {
    grid-template-columns: 56px 1fr;
  }
}

