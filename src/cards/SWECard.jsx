import React from 'react';
import styled from 'styled-components';

/**
 * SWECard — Software Engineering card with Pip-Boy terminal aesthetic.
 * Fills the parent GSAP box (w-full h-full) completely.
 */
const SWECard = () => {
  return (
    <StyledWrapper>
      <div className="pipboy-wrapper">
        <input type="radio" id="swe-tab-stat" name="swe-pip-tabs" defaultChecked />
        <input type="radio" id="swe-tab-inv" name="swe-pip-tabs" />
        <input type="radio" id="swe-tab-data" name="swe-pip-tabs" />
        <div className="pipboy-chassis">
          <div className="screw tl" />
          <div className="screw tr" />
          <div className="screw bl" />
          <div className="screw br" />
          <div className="crt-screen">
            <div className="screen-glass" />
            <div className="scanlines" />
            <div className="boot-sequence">
              <header className="top-bar">
                <div className="dynamic-title flicker-text" />
                <div className="line flexible" />
                <div className="stats-info">
                  <span>HP <span className="bold">348/450</span></span>
                  <span>AP <span className="bold">67/67</span></span>
                  <span className="pulse-icon">⚡</span>
                </div>
              </header>
              <main className="middle-section">
                <div className="tab-content content-stat">
                  <aside className="side-menu">
                    <div>CND</div>
                    <div>RAD</div>
                    <div>EFF</div>
                    <div className="active-box-static">CLK</div>
                  </aside>
                  <section className="clock-display">
                    <div className="terminal-block">
                      <div className="time">08<span className="blink-colon">:</span>40</div>
                    </div>
                    <div className="date">02.23.2026</div>
                  </section>
                  <aside className="right-menu">
                    <div className="hazard-symbol">
                      <div className="hazard-core" />
                    </div>
                    <div className="rad-text">RADS</div>
                  </aside>
                </div>
                <div className="tab-content content-inv">
                  <ul className="inventory-list">
                    <li><span className="item-name">React</span><span className="item-wgt">UI</span></li>
                    <li className="active-terminal-line"><span className="item-name">Node.js</span><span className="item-wgt">BE</span></li>
                    <li><span className="item-name">Python / FastAPI</span><span className="item-wgt">API</span></li>
                    <li><span className="item-name">PostgreSQL / MongoDB</span><span className="item-wgt">DB</span></li>
                    <li><span className="item-name">Redis</span><span className="item-wgt">CACHE</span></li>
                    <li><span className="item-name">Docker</span><span className="item-wgt">OPS</span></li>
                    <li><span className="item-name">AWS</span><span className="item-wgt">CLOUD</span></li>
                    <li><span className="item-name">Git / GitHub</span><span className="item-wgt">VCS</span></li>
                  </ul>
                </div>
                <div className="tab-content content-data">
                  <div className="radar-container">
                    <span />
                    <div className="blip" />
                  </div>
                  <div className="radar-text flicker-fast">SOFTWARE ENGINEER</div>
                </div>
              </main>
              <footer className="bottom-bar">
                <label htmlFor="swe-tab-stat" className="nav-item">STATUS</label>
                <div className="line flexible" />
                <label htmlFor="swe-tab-inv" className="nav-item">TECH</label>
                <div className="line flexible" />
                <label htmlFor="swe-tab-data" className="nav-item">SCAN</label>
                <div className="line flexible" />
                <div className="radio-visualizer">
                  <div className="bar bar-1" />
                  <div className="bar bar-2" />
                  <div className="bar bar-3" />
                  <div className="bar bar-4" />
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .pipboy-wrapper {
    --pip-green: #1aff40;
    --pip-glow: rgba(26, 255, 64, 0.6);
    --bg-dark: #020a02;
    --chassis-dark: #1a1a1a;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Courier New", Courier, monospace;
    text-transform: uppercase;
    width: 100%;
    height: 100%;
    padding: 0.6rem;
    box-sizing: border-box;
    container-type: inline-size;
    container-name: pipboy;
  }

  .pipboy-wrapper input[type="radio"] { display: none; }

  .pipboy-chassis {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
      linear-gradient(135deg, #2b2b2b, #111, #222);
    background-size: 3px 3px, 100% 100%;
    padding: 1.4rem;
    border-radius: 1.6rem;
    box-shadow: inset 0 0 20px #000, 0 20px 40px rgba(0,0,0,0.8),
      0 0 0 2px #333, 0 5px 15px rgba(26,255,64,0.1);
    border: 2px solid #444;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .screw {
    position: absolute;
    width: 10px;
    height: 10px;
    background: linear-gradient(45deg, #555, #111);
    border-radius: 50%;
    border: 1px solid #000;
    box-shadow: inset 1px 1px 2px rgba(255,255,255,0.2);
  }
  .screw::after {
    content: "";
    position: absolute;
    top: 50%; left: 50%;
    width: 7px; height: 1.5px;
    background: #000;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .tl { top: 10px; left: 10px; }
  .tr { top: 10px; right: 10px; transform: rotate(90deg); }
  .bl { bottom: 10px; left: 10px; transform: rotate(180deg); }
  .br { bottom: 10px; right: 10px; transform: rotate(270deg); }

  .crt-screen {
    background-color: var(--bg-dark);
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    border: 5px solid #0a0a0a;
    box-shadow: inset 0 0 60px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8);
    flex: 1;
    cursor: crosshair;
  }

  .screen-glass {
    position: absolute; inset: 0; z-index: 10; pointer-events: none;
    background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.4) 80%);
    box-shadow: inset 0 0 50px rgba(0,0,0,0.9);
  }
  .screen-glass::after {
    content: "";
    position: absolute; top: 0; left: 0;
    width: 100%; height: 15%;
    background: linear-gradient(to bottom, transparent, rgba(26,255,64,0.1), transparent);
    animation: crtScanline 7s linear infinite;
    pointer-events: none; z-index: 11;
  }

  .scanlines {
    position: absolute; inset: 0; z-index: 9; pointer-events: none;
    background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%);
    background-size: 100% 4px;
  }

  .boot-sequence {
    height: 100%;
    padding: 0.9rem;
    box-sizing: border-box;
    display: flex; flex-direction: column;
    color: var(--pip-green);
    text-shadow: 0 0 4px var(--pip-glow);
    animation: turnOnCRT 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
    opacity: 0;
  }

  .bold { font-weight: 900; }
  .line { height: 2px; background-color: var(--pip-green); box-shadow: 0 0 8px var(--pip-glow); opacity: 0.8; }
  .flexible { flex-grow: 1; margin: 0 6px; }

  .top-bar, .bottom-bar { display: flex; align-items: center; font-size: 0.65rem; font-weight: bold; }
  .top-bar { margin-bottom: 0.7rem; }
  .dynamic-title { letter-spacing: 1px; }
  .stats-info { display: flex; gap: 8px; }

  .bottom-bar { margin-top: auto; }
  .nav-item { padding: 2px 6px; cursor: crosshair; border: 1px solid transparent; transition: all 0.2s; }
  .nav-item:hover { background-color: rgba(26,255,64,0.15); }

  .middle-section { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
  .tab-content { display: none; width: 100%; height: 100%; animation: screenGlitch 0.4s ease-out; }

  /* Dynamic title per tab */
  #swe-tab-stat:checked ~ .pipboy-chassis .dynamic-title::before { content: "SOFTWARE.ENG"; }
  #swe-tab-inv:checked  ~ .pipboy-chassis .dynamic-title::before { content: "TECH_STACK"; }
  #swe-tab-data:checked ~ .pipboy-chassis .dynamic-title::before { content: "SYS_SCAN"; }

  /* Show correct tab */
  #swe-tab-stat:checked ~ .pipboy-chassis .content-stat,
  #swe-tab-inv:checked  ~ .pipboy-chassis .content-inv,
  #swe-tab-data:checked ~ .pipboy-chassis .content-data { display: flex; }

  /* Active nav highlight */
  #swe-tab-stat:checked ~ .pipboy-chassis label[for="swe-tab-stat"],
  #swe-tab-inv:checked  ~ .pipboy-chassis label[for="swe-tab-inv"],
  #swe-tab-data:checked ~ .pipboy-chassis label[for="swe-tab-data"] {
    background-color: var(--pip-green); color: var(--bg-dark);
    text-shadow: none; box-shadow: 0 0 10px var(--pip-glow);
  }

  /* STAT tab */
  .content-stat { justify-content: space-between; align-items: center; }
  .side-menu { display: flex; flex-direction: column; gap: 8px; font-size: 0.75rem; }
  .active-box-static { border: 2px solid var(--pip-green); padding: 2px 6px; box-shadow: inset 0 0 10px var(--pip-glow); }
  .clock-display { display: flex; flex-direction: column; align-items: center; }
  .terminal-block {
    background-color: var(--pip-green); border-radius: 4px;
    padding: 6px 14px; margin-bottom: 4px;
    box-shadow: 0 0 25px var(--pip-glow);
    animation: blockPulse 4s infinite alternate;
  }
  .terminal-block .time { color: var(--bg-dark); font-size: 2.4rem; font-weight: bold; text-shadow: none; }
  .date { font-size: 0.75rem; font-weight: bold; letter-spacing: 2px; }
  .right-menu { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .rad-text { font-size: 0.7rem; font-weight: bold; letter-spacing: 2px; }
  .hazard-symbol {
    width: 38px; height: 38px; position: relative;
    background: conic-gradient(var(--pip-green) 0deg 60deg, transparent 60deg 120deg, var(--pip-green) 120deg 180deg, transparent 180deg 240deg, var(--pip-green) 240deg 300deg, transparent 300deg 360deg);
    border-radius: 50%; animation: radarSpin 8s linear infinite; box-shadow: 0 0 15px var(--pip-glow);
  }
  .hazard-core { position: absolute; inset: 8px; background: var(--bg-dark); border-radius: 50%; }
  .hazard-core::after { content: ""; position: absolute; inset: 5px; background: var(--pip-green); border-radius: 50%; }

  /* INV tab */
  .content-inv { flex-direction: column; font-size: 0.75rem; justify-content: flex-start; }
  .inventory-list { list-style: none; padding: 0; margin: 0; width: 100%; }
  .inventory-list li { display: flex; justify-content: space-between; padding: 5px 4px; border-bottom: 1px dashed rgba(26,255,64,0.3); cursor: crosshair; }
  .inventory-list li:hover, .active-terminal-line {
    background-color: var(--pip-green); color: var(--bg-dark);
    font-weight: bold; text-shadow: none; box-shadow: 0 0 10px var(--pip-glow); padding: 5px 9px;
  }

  /* DATA tab */
  .content-data { justify-content: center; align-items: center; flex-direction: column; gap: 10px; }
  .radar-container {
    position: relative; width: 110px; height: 110px;
    background: rgba(26,255,64,0.1); border-radius: 50%;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    box-shadow: inset 0 0 20px var(--pip-glow); border: 2px solid var(--pip-green);
  }
  .radar-container::before { content: ""; position: absolute; inset: 14px; background: rgba(26,255,64,0.15); border-radius: 50%; border: 1px dashed rgba(26,255,64,0.3); }
  .radar-container::after { content: ""; position: absolute; width: 36px; height: 36px; background: rgba(26,255,64,0.25); border-radius: 50%; border: 1px solid var(--pip-green); }
  .radar-container span { position: absolute; top: 50%; left: 50%; width: 100%; height: 100%; background: transparent; transform-origin: top left; animation: angularRotation 2s linear infinite; box-shadow: 6px -100px 40px -30px var(--pip-green); border-top: 2px solid var(--pip-green); z-index: 2; }
  .blip { position: absolute; width: 5px; height: 5px; background: #fff; border-radius: 50%; top: 26px; left: 72px; box-shadow: 0 0 10px #fff, 0 0 20px var(--pip-green); animation: blipFade 2s infinite; z-index: 3; }
  .radar-text { font-size: 0.6rem; }

  /* Equalizer */
  .radio-visualizer { display: flex; gap: 3px; align-items: flex-end; height: 12px; margin-left: 8px; }
  .bar { width: 3px; background-color: var(--pip-green); animation: eqBounce 1s infinite alternate; }
  .bar-1 { animation-delay: 0.1s; }
  .bar-2 { animation-delay: 0.3s; }
  .bar-3 { animation-delay: 0s; }
  .bar-4 { animation-delay: 0.4s; }

  /* Animations */
  @keyframes screenGlitch {
    0%   { opacity: 0; filter: contrast(200%); transform: translateY(-2px); text-shadow: 3px 0 rgba(255,0,0,0.7), -3px 0 rgba(0,0,255,0.7); }
    20%  { opacity: 0.8; text-shadow: -3px 0 rgba(255,0,0,0.7), 3px 0 rgba(0,0,255,0.7); }
    50%  { opacity: 0.5; filter: contrast(150%) hue-rotate(20deg); transform: translateY(2px); }
    100% { opacity: 1; filter: contrast(100%); transform: translateY(0); text-shadow: 0 0 4px var(--pip-glow); }
  }
  @keyframes crtScanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(800%); } }
  @keyframes turnOnCRT {
    0%   { transform: scale(1, 0.005); opacity: 0; filter: brightness(10); }
    30%  { transform: scale(1, 0.005); opacity: 1; filter: brightness(5); }
    60%  { transform: scale(1, 1); filter: brightness(2); }
    100% { transform: scale(1, 1); opacity: 1; filter: brightness(1); }
  }
  @keyframes angularRotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes radarSpin { 100% { transform: rotate(360deg); } }
  @keyframes blipFade { 0%, 85% { opacity: 0; } 90% { opacity: 1; transform: scale(1.5); } 100% { opacity: 0; } }
  @keyframes eqBounce { 0% { height: 2px; } 100% { height: 12px; } }
  @keyframes blockPulse { 0% { box-shadow: 0 0 15px var(--pip-glow); } 100% { box-shadow: 0 0 35px var(--pip-glow); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

  .blink-colon { animation: blink 1s step-end infinite; }
  .flicker-text { animation: flicker 0.15s infinite; }
  .flicker-fast { animation: flicker 0.08s infinite; }
  .pulse-icon { animation: pulse 1.5s infinite ease-in-out; }
`;

export default SWECard;
