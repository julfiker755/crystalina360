import React from "react";

export default function FeatureCard({
  bgColor,
  shadow,
  title,
  description,
  icon,
  text,
  isText = true,
}: any) {
  return (
    <div
      className={`${bgColor} p-4 rounded-lg transition-transform`}
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div
        className={`w-12 h-12 p-2 ring-4  rounded-lg flex items-center justify-center mb-4 text-gray-700`}
        style={{
          boxShadow: shadow,
        }}
      >
        <picture>
          <img src={icon.src} alt={title} />
        </picture>
      </div>
      <h3 className="text-xl font-semibold  mb-1">{title}</h3>
      {isText ? (
        <p className="text-article">{text}</p>
      ) : (
        <p className="text-article">{description}</p>
      )}
    </div>
  );
}
