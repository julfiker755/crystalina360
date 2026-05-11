"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";




type FeatureCardProps = {
  bgColor: string;
  shadow: string;
  title: string;
  description?: string[];
  icon: any;
  text?: string;
  isText?: boolean;
  href?: any;
  btn?: string;
  subDescription?: string;
  handleOpenModal?: () => void;
  btnColor?: string;
};



export default function FeatureCard({
  bgColor,
  shadow,
  title,
  description,
  icon,
  text,
  isText = true,
  href,
  btn,
  subDescription,
  handleOpenModal,
  btnColor,
}: FeatureCardProps) {
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
        <>
          {Array.isArray(description) &&
            description.map((item: string, index: number) => (
              <p key={index} className="text-article mt-1.5">
                {item}
              </p>
            ))}
          <p className="text-article mt-1">
            {/* {subDescription} */}
            <span>
              {btn === "link" ? (
                <button
                  className="py-1 rounded-full text-figma-black/90 hover:underline"
                  style={{
                    color: btnColor
                  }}
                >
                  <Link href={href} className="flex items-center">
                    {subDescription} <ArrowRight className="w-4 mt-px h-4" />
                  </Link>
                </button>
              ) : (
                btn === "click" && (
                  <button
                    className="py-1 cursor-pointer flex items-center rounded-full text-figma-black/90 hover:underline"
                    style={{
                      color: btnColor
                    }}
                    onClick={handleOpenModal}
                  >
                    {subDescription}
                    <ArrowRight className="w-4 mt-px h-4" />
                  </button>
                )
              )}
            </span>
          </p>
        </>
      )}
    </div>
  );
}
