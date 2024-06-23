import React, { useEffect, useRef } from "react";

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.appendChild(script);
  });
};

const loadStyle = (href) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.href = href;
    link.rel = "stylesheet";
    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Style load error for ${href}`));
    document.head.appendChild(link);
  });
};

const MapplicComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMapplic = async () => {
      try {
        await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
        await loadStyle("/mapplic/mapplic.css");
        await loadScript("/mapplic/mapplic.js");

        // Перевірте, чи Mapplic доступний
        if (typeof window.$.fn.mapplic === "undefined") {
          throw new Error("Mapplic plugin is not loaded");
        }

        window.$(mapRef.current).mapplic({
          source: "/mapplic/map-data.json",
          height: 600,
        });

        // Лог для перевірки ініціалізації
        console.log("Mapplic has been initialized");

        // Прослуховування події ініціалізації Mapplic
        window.$(mapRef.current).on("mapready", () => {
          console.log("Mapplic map is ready");
        });
      } catch (error) {
        console.error("Error loading Mapplic:", error);
      }
    };

    initializeMapplic();
  }, []);

  return <div ref={mapRef} style={{ height: "600px" }}></div>;
};

export default MapplicComponent;
