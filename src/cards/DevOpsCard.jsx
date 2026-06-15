import React from 'react';
import styled from 'styled-components';

/**
 * DevOpsCard — index 5 in the interests slider.
 * Fills the parent GSAP box (w-full h-full) completely.
 */
const DevOpsCard = () => {
  return (
    <StyledWrapper>
      <div className="container">
        <div className="terminal_toolbar">
          <div className="butt">
            <button className="btn btn-color" />
            <button className="btn btn-color" />
            <button className="btn btn-color" />
          </div>
          <p className="user">DevOps: ~</p>
          <button className="add_tab">+</button>
        </div>
        <div className="terminal_body">
          <div className="terminal_promt">
            <span className="terminal_user">root@devops:</span>
            <span className="terminal_location">/etc/nginx</span>
            <span className="terminal_bling">#</span>
            <span className="terminal_cmd"> nginx -t</span>
          </div>
          <div className="terminal_output">
            <p>nginx: the configuration file /etc/nginx/nginx.conf syntax is ok</p>
            <p>nginx: configuration file /etc/nginx/nginx.conf test is successful</p>
          </div>
          
          <div className="terminal_promt mt-2">
            <span className="terminal_user">root@devops:</span>
            <span className="terminal_location">/etc/nginx</span>
            <span className="terminal_bling">#</span>
            <span className="terminal_cmd"> systemctl restart nginx</span>
          </div>
          <div className="terminal_output">
            <p style={{color: '#27c93f', marginTop: '4px'}}>* Starting nginx... [ OK ]</p>
          </div>
          
          <div className="terminal_promt mt-2">
            <span className="terminal_user">root@devops:</span>
            <span className="terminal_location">~</span>
            <span className="terminal_bling">#</span>
            <span className="terminal_cursor" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: 100%;
    background: #1e1e1e;
    border-radius: 1.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .terminal_toolbar {
    display: flex;
    height: 35px;
    align-items: center;
    padding: 0 15px;
    background: #2d2d2d;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .butt {
    display: flex;
    align-items: center;
  }

  .btn {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    margin-right: 8px;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn-color:nth-child(1) { background: #ff5f56; }
  .btn-color:nth-child(2) { background: #ffbd2e; }
  .btn-color:nth-child(3) { background: #27c93f; }

  .add_tab {
    border: none;
    color: #ffffff;
    background: #3a3a3a;
    padding: 4px 8px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .add_tab:hover {
    background: #4a4a4a;
  }

  .user {
    color: #a0a0a0;
    font-size: 13px;
    font-weight: 500;
    font-family: "Consolas", monospace;
  }

  .terminal_body {
    background: #1e1e1e;
    flex-grow: 1;
    padding: 15px;
    font-family: "Consolas", monospace;
    font-size: 13px;
    line-height: 1.6;
    overflow-y: auto;
    color: #e0e0e0;
  }

  .terminal_promt {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .mt-2 {
    margin-top: 12px;
  }

  .terminal_promt span {
    margin-right: 6px;
  }

  .terminal_user { color: #00ff9c; font-weight: bold; }
  .terminal_location { color: #0066ff; font-weight: bold; }
  .terminal_bling { color: #ff00ff; font-weight: bold; }
  .terminal_cmd { color: #ffffff; }

  .terminal_output {
    margin-top: 4px;
    margin-bottom: 4px;
  }
  
  .terminal_output p {
    margin: 0;
  }

  .terminal_cursor {
    display: inline-block;
    width: 8px;
    height: 15px;
    background: #ffffff;
    animation: blink 1s step-end infinite;
    vertical-align: middle;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

export default DevOpsCard;
