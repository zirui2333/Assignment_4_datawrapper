import React, { useState, useEffect, useRef } from 'react';
import "./App.css";
import { initializeMenu, handleResize, toggleMenu } from './menu';
import * as csv from 'csv-parser';
import fs from 'fs';


const Calendar = () => {
  const tooltipRef = useRef(null);
  const [randomRow, setRandomRow] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    adjustedX: 0,
    adjustedY: 0
  });

  useEffect(() => {
    initializeMenu();

    return () => {
      if (document.getElementById('ham_menu')) {
        document.getElementById('ham_menu').removeEventListener('click', toggleMenu);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const [weatherMemory, setWeatherMemory] = useState(Array(12).fill(null).map(() =>
    Array(31).fill(null)
  ));
  const handleMouseOver = (e) => {
    const rect = e.target.getBoundingClientRect();
    const tooltipWidth = 250; // Increased estimated width
    const tooltipHeight = 70; // Increased estimated height
    const padding = 10; // Spatial buffer zone

    // Compute initial positioning
    let x = rect.left;
    let y = rect.top - tooltipHeight - padding;

    // Boundary detection: A topological tango of spatial awareness!
    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth - padding;
    }

    // Vertical boundary check
    if (y < 0) {
      y = rect.bottom + padding; // Pirouette below if too close to top
    }


    const monthIndex = Math.floor(e.target.parentElement.parentElement.getAttribute('data-month'));
    const dayIndex = Array.from(e.target.parentElement.children).indexOf(e.target);

    let randomWeather;
    let warm_notice = "";
    let rating = Math.floor(Math.random() * (63726 - 12345 + 1)) + 12345;
    // Check if weather already exists in memory
    if (weatherMemory[monthIndex][dayIndex]) {
      randomWeather = weatherMemory[monthIndex][dayIndex].weather;
      warm_notice = weatherMemory[monthIndex][dayIndex].notice;
      rating = weatherMemory[monthIndex][dayIndex].rating;
    } else {
      // Generate new weather if not in memory
      const Weather = ["Stormy", "Rainy", "Cloudy", "Windy", "Cool", "Warm", "Sunny"];
      randomWeather = Weather[Math.floor(Math.random() * Weather.length)];

      if (["Stormy", "Rainy", "Windy"].includes(randomWeather)) {
        const notices = [
          "Why not stay at home and enjoy a cup of coffee? ☕",
          "Perfect time to read a book! 📚",
          "Movie weather! 🎬",
          "Time for some indoor activities! 🏠"
        ];
        warm_notice = notices[Math.floor(Math.random() * notices.length)];
      } else if (randomWeather === "Cloudy") {
        const notices = [
          "A perfect day for photography! 📸",
          "Great weather for a peaceful walk! 🚶‍♂️",
          "Time to watch the clouds drift by! ☁️",
          "Cozy weather for a picnic outdoors! 🧺"
        ];
        warm_notice = notices[Math.floor(Math.random() * notices.length)];
      } else if (randomWeather === "Cool") {
        const notices = [
          "Perfect weather for a light jacket! 🧥",
          "Great time for outdoor exercise! 🏃‍♂️",
          "Enjoy the crisp air! 🍂",
          "Time for a brisk walk! 🚶‍♀️"
        ];
        warm_notice = notices[Math.floor(Math.random() * notices.length)];
      } else if (randomWeather === "Warm") {
        const notices = [
          "Ice cream weather! 🍦",
          "Perfect for a beach day! 🏖️",
          "Time for outdoor dining! 🍽️",
          "Great day for a picnic! 🧺"
        ];
        warm_notice = notices[Math.floor(Math.random() * notices.length)];
      } else if (randomWeather === "Sunny") {
        const notices = [
          "Don't forget your sunscreen! 🧴",
          "Perfect day for the pool! 🏊‍♂️",
          "Time to wear your shades! 😎",
          "Great day for outdoor activities! 🌞"
        ];
        warm_notice = notices[Math.floor(Math.random() * notices.length)];
      }

      // Store in memory
      const newWeatherMemory = [...weatherMemory];
      newWeatherMemory[monthIndex][dayIndex] = {
        weather: randomWeather,
        notice: warm_notice,
        rating: rating
      };
      setWeatherMemory(newWeatherMemory);
    }


    setTooltip({
      visible: true,
      x: rect.left,
      y: rect.top - 30,
      adjustedX: Math.max(padding, x),
      adjustedY: y,
      content: (
        <div className="tooltip-content">
          <div className="weather-info">
            <span className="weather-label">Weather: </span>
            <span className="weather-value">{randomWeather}</span>
          </div>
          <div className="weather-notice">
            <span className="weather-label">Notice: </span>
            {warm_notice}
          </div>
          <div className="weather-rating">
            <span className="weather-label">Note: </span>
            <span className="weather-value">{rating} people like this weather</span>
          </div>
        </div>
      )
    });
  };

  const handleMouseOut = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  return (
    <div className="calendar-container">
      <nav>
        <div className="left">
          <a href="https://zirui2333.github.io/WDB-education/">Home</a>
        </div>
        <div id="ham_menu" className="hamburger">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className="right nav-links">
          <a href="https://zirui2333.github.io/WDB-education/calculator.html">GPA Calculator</a>
          <a href="index.html">Music Calendar</a>
          <a href="https://zirui2333.github.io/WDB-education/project.html">Interest</a>
          <a href="https://zirui2333.github.io/WDB-education/contact.html">Contact Me</a>
        </div>
      </nav>

      <h3>My Datawrapper Chart 2023</h3>
      <div className="calendar-grid">
        {months.map((month, index) => (
          <div key={index} className="month">
            <h4>{month}</h4>
            <div className="days">
              {Array.from({ length: daysInMonth(index + 1, 2023) }).map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="day-block"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {tooltip.visible && (
        <div
          ref={tooltipRef}
          className="tooltip"
          style={{
            left: `${tooltip.x + 5}px`, // Small offset from cursor
            top: `${tooltip.y - 10}px`,
            opacity: tooltip.visible ? 1 : 0
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default Calendar;