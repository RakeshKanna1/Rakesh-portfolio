import React from 'react';
import './GlassTiles.css';

export default function GlassTiles({ items = [] }) {
  return (
    <div className="glass-tiles-container">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-tile"
        >
          <div className="glass-tile-glow" style={{ backgroundColor: item.color }} />
          <div className="glass-tile-content">
            <span className="glass-tile-icon" style={{ color: item.color }}>
              {item.node}
            </span>
            <span className="glass-tile-title">{item.title}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
