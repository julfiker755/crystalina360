"use client";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#FFBB00",
  inactiveFillColor: "#D9D9D9",
};

export function RatingScore({ value, width = 115, readOnly = true, onChange }) {
  const [rating, setRating] = useState(value);

  const handleChange = (value) => {
    setRating(value);
    onChange(value);
  };

  return (
    <Rating
      style={{ maxWidth: width }}
      value={rating}
      itemStyles={myStyles}
      onChange={handleChange}
      readOnly={readOnly}
    />
  );
}
