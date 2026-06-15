import React from 'react';
import styled from 'styled-components';

/**
 * SingleDoodleArrow - renders ONE doodle button.
 * direction: 'prev' | 'next'
 * onClick, disabled props passed directly.
 */
const SingleDoodleArrow = ({ direction, onClick, disabled }) => {
  const isPrev = direction === 'prev';

  return (
    <StyledWrapper>
      {/* SVG Filter - unique ID per direction to avoid conflicts */}
      <svg style={{ visibility: 'hidden', position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={`pencil-${direction}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={3} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={3} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <ul className="doodle-container" style={{ filter: `url(#pencil-${direction})` }}>
        <li className="doodle-icon-content">
          <button
            onClick={onClick}
            disabled={disabled}
            aria-label={isPrev ? 'Previous card' : 'Next card'}
            className={`doodle-link ${isPrev ? 'link-prev' : 'link-next'}`}
          >
            <svg className="doodle-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              {isPrev
                ? <polyline points="15 18 9 12 15 6" />
                : <polyline points="9 18 15 12 9 6" />
              }
            </svg>
          </button>
          <div className={`doodle-tooltip ${isPrev ? 'tooltip-prev' : 'tooltip-next'}`}>
            {isPrev ? 'Prev' : 'Next'}
          </div>
        </li>
      </ul>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .doodle-container {
    list-style: none;
    margin: 0;
    padding: 14px 18px;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #fdfbf7;
    background-image: repeating-linear-gradient(
      transparent,
      transparent 22px,
      #8ef0ce 22px,
      #8ef0ce 24px
    );

    border: 4px solid #1e1e24;
    border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
    box-shadow: 8px 10px 0px rgba(30, 30, 36, 0.15);
  }

  .doodle-icon-content {
    margin: 0;
    position: relative;
    font-family: "Patrick Hand", "Comic Sans MS", cursive;
  }

  .doodle-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 49px;
    height: 50px;
    cursor: pointer;
    outline: none;

    border: 4px solid #1e1e24;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    box-shadow: 3px 4px 0px #1e1e24;

    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .doodle-link:disabled {
    opacity: 0.25;
    cursor: not-allowed;
    pointer-events: none;
  }

  .link-prev { background-color: #a0c4ff; }
  .link-next { background-color: #caffbf; }

  .doodle-svg {
    width: 22px;
    height: 22px;
    stroke: #1e1e24;
    fill: none;
    transform: rotate(-5deg);
    transition: all 0.3s ease;
  }

  .doodle-link:hover {
    transform: translateY(-8px) scale(1.1);
    box-shadow: 6px 10px 0px #1e1e24;
    animation: child-wiggle 0.3s ease-in-out infinite alternate;
  }

  .link-prev:hover { background-color: #00bbf9; border-radius: 60% 40% 40% 60% / 50% 50% 40% 60%; }
  .link-next:hover { background-color: #00f5d4; border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%; }

  .doodle-link:hover .doodle-svg {
    stroke: #ffffff;
    filter: drop-shadow(2px 2px 0px #1e1e24) drop-shadow(-1px -1px 0px #1e1e24);
    transform: rotate(15deg) scale(1.2);
  }

  @keyframes child-wiggle {
    0%   { transform: translateY(-8px) scale(1.1) rotate(-4deg); }
    100% { transform: translateY(-8px) scale(1.1) rotate(4deg); }
  }

  .doodle-tooltip {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%) rotate(-5deg);
    padding: 6px 14px;
    color: #1e1e24;
    border: 4px solid #1e1e24;
    border-radius: 255px 25px 225px 25px / 25px 225px 25px 255px;
    box-shadow: 4px 6px 0px #1e1e24;
    opacity: 0;
    visibility: hidden;
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 1px;
    white-space: nowrap;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    pointer-events: none;
    z-index: 30;
  }

  .doodle-tooltip::after {
    content: "";
    position: absolute;
    bottom: -11px;
    left: 50%;
    transform: translateX(-50%) rotate(15deg) skewX(25deg);
    width: 16px;
    height: 16px;
    border-bottom: 4px solid #1e1e24;
    border-right: 4px solid #1e1e24;
  }

  .tooltip-prev  { background-color: #00bbf9; }
  .tooltip-prev::after  { background-color: #00bbf9; }
  .tooltip-next  { background-color: #00f5d4; }
  .tooltip-next::after  { background-color: #00f5d4; }

  .doodle-icon-content:hover .doodle-tooltip {
    opacity: 1;
    visibility: visible;
    top: -68px;
    transform: translateX(-50%) rotate(3deg);
  }
`;

export default SingleDoodleArrow;
