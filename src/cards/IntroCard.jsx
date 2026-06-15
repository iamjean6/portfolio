import React from 'react';
import styled from 'styled-components';

const IntroCard = () => {
  return (
    <StyledWrapper>
      <div className="card-profile">
        <div className="prof-photo">
          <div className="prof-photo-num">JP</div>
          <div className="prof-avatar">JP</div>
          <div className="prof-status-badge">● ONLINE</div>
        </div>
        <div className="prof-body">
          <div className="prof-handle">@i.amjean_</div>
          <div className="prof-name">JEAN<br />POWELL</div>
          <div className="prof-bio">
            Web Designer, Software Engineer, Data Scientist  &amp; Devops Engineers. Makes ugly things that
            work perfectly. The power of code and design in the palm of my hands. Always learning, always creating.
          </div>
        </div>
        <div className="prof-stats">
          <div className="pstat">
            <span className="psv">482</span>
            <span className="psl">Projects</span>
          </div>
          <div className="pstat">
            <span className="psv">28k</span>
            <span className="psl">Followers</span>
          </div>
          <div className="pstat">
            <span className="psv">★ 4.9</span>
            <span className="psl">Rating</span>
          </div>
        </div>
        <button className="prof-btn">+ FOLLOW PROFILE</button>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  
  .card-profile {
    background: #f5f5f0;
    border: 5px solid #0a0a0a;
    box-shadow: 8px 8px 0 #0a0a0a;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    container-type: inline-size;
  }

  .prof-photo {
    height: 160px;
    background: #4296f5ff;
    border-bottom: 5px solid #0a0a0a;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    flex-shrink: 0;
  }
  .prof-photo::before {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent 0px,
      transparent 8px,
      rgba(0, 0, 0, 0.12) 8px,
      rgba(0, 0, 0, 0.12) 10px
    );
  }
  .prof-photo-num {
    font-family: "Bebas Neue", sans-serif;
    font-size: 7rem;
    line-height: 0.85;
    color: rgba(0, 0, 0, 0.08);
    position: absolute;
    right: -8px;
    bottom: -10px;
    letter-spacing: -0.02em;
    pointer-events: none;
  }
  .prof-avatar {
    width: 72px;
    height: 72px;
    background: #0a0a0a;
    border: 5px solid #0a0a0a;
    border-bottom: none;
    border-left: none;
    margin-left: 20px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Bebas Neue", sans-serif;
    font-size: 2rem;
    color: #f5e652;
    flex-shrink: 0;
  }
  .prof-status-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 2;
    background: #00e060;
    border: 3px solid #0a0a0a;
    box-shadow: 3px 3px 0 #0a0a0a;
    font-size: 0.55rem;
    font-weight: 800;
    letter-spacing: 0.18em;
    padding: 3px 8px;
    text-transform: uppercase;
  }

  .prof-body {
    padding: 16px 18px 0;
    flex-grow: 1;
  }
  .prof-handle {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #a8a49a;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .prof-name {
    font-family: "Bebas Neue", sans-serif;
    font-size: 2.4rem;
    line-height: 0.88;
    color: #0a0a0a;
    letter-spacing: -0.01em;
    margin-bottom: 10px;
  }
  .prof-bio {
    font-size: 0.72rem;
    font-weight: 500;
    color: #0a0a0a;
    border-left: 5px solid #e8180a;
    padding-left: 10px;
    line-height: 1.55;
    margin-bottom: 14px;
  }

  .prof-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 3px solid #0a0a0a;
    flex-shrink: 0;
  }
  .pstat {
    padding: 12px 10px;
    border-right: 3px solid #0a0a0a;
    text-align: center;
  }
  .pstat:last-child {
    border-right: none;
  }
  .pstat .psv {
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.8rem;
    line-height: 1;
    color: #0a0a0a;
    display: block;
  }
  .pstat .psl {
    font-size: 0.48rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: #a8a49a;
    text-transform: uppercase;
    display: block;
    margin-top: 2px;
  }

  .prof-btn {
    display: block;
    width: 100%;
    padding: 13px;
    background: #0a0a0a;
    color: #f5e642;
    border: none;
    border-top: 5px solid #0a0a0a;
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.1rem;
    letter-spacing: 0.2em;
    cursor: pointer;
    text-align: center;
    transition:
      background 0.15s,
      color 0.15s;
    flex-shrink: 0;
  }
  .prof-btn:hover {
    background: #f5e642;
    color: #0a0a0a;
  }

  /* Responsive Mobile Container Query */
  @container (max-width: 300px) {
    .prof-photo {
      height: 90px;
    }
    .prof-photo-num {
      font-size: 4.5rem;
      right: -4px;
      bottom: -6px;
    }
    .prof-avatar {
      width: 50px;
      height: 50px;
      font-size: 1.4rem;
      margin-left: 12px;
      border-width: 3px;
    }
    .prof-status-badge {
      top: 8px;
      right: 8px;
      font-size: 0.45rem;
      padding: 2px 6px;
      border-width: 2px;
      box-shadow: 2px 2px 0 #0a0a0a;
    }
    .prof-body {
      padding: 10px 12px 0;
    }
    .prof-handle {
      font-size: 0.45rem;
    }
    .prof-name {
      font-size: 1.6rem;
      margin-bottom: 6px;
    }
    .prof-bio {
      font-size: 0.58rem;
      line-height: 1.35;
      margin-bottom: 8px;
      border-left-width: 3px;
      padding-left: 6px;
    }
    .pstat {
      padding: 8px 4px;
    }
    .pstat .psv {
      font-size: 1.2rem;
    }
    .pstat .psl {
      font-size: 0.4rem;
    }
    .prof-btn {
      padding: 10px;
      font-size: 0.95rem;
      border-top-width: 3px;
    }
    .card-profile, .prof-photo {
      border-width: 3px;
    }
    .card-profile {
      box-shadow: 4px 4px 0 #0a0a0a;
    }
    .prof-stats {
      border-top-width: 3px;
    }
    .pstat {
      border-right-width: 3px;
    }
  }
`;

export default IntroCard;
