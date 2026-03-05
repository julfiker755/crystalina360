import Avatars from "@/components/reuseable/avater";
import { Button, Input } from "@/components/ui";
import { X } from "lucide-react";
import React, { useState, useCallback } from "react";

export default function EmailCollect({ emailAll, setAllEmail }: any) {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  // ✅ Email validation
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // ✅ Add email function

  const handleAddEmail = () => {
    setError("");
    const email_V = email.trim();

    if (!email_V) {
      setError("Email is required");
      return;
    }
    if (!isValidEmail(email_V)) {
      setError("Email not Vaild");
      return;
    }

    setAllEmail((prev: any) => [...prev, email_V]);
    setEmail(""); // clear input after adding
    setError("");
  };

  // ✅ Delete email
  const handleDeleteEmail = useCallback(
    (emailToDelete: string) => {
      setAllEmail((prev: any) =>
        prev.filter((item: any) => item !== emailToDelete),
      );
    },
    [setAllEmail],
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-5">
        <div className="border w-full rounded-md min-h-10 flex items-center flex-wrap px-2 gap-2">
          {emailAll?.slice(0, 1).map((item: any) => (
            <div
              key={item.id}
              className="flex items-center space-x-1 bg-gray-100 rounded-md px-2 py-0.5"
            >
              <Avatars
                className="size-5!"
                src={"avater.png"}
                alt="Attendees"
                fallback={item?.charAt(0)?.toUpperCase()}
              />
              <span className="text-sm">{item}</span>
              <X
                onClick={() => handleDeleteEmail(item)}
                className="size-4 cursor-pointer"
              />
            </div>
          ))}

          {emailAll?.length > 1 && (
            <div className="px-2 text-sm bg-figma-primary text-white rounded-md">
              +{emailAll?.length - 1}
            </div>
          )}

          <Input
            type="email"
            className="border-none flex-1"
            value={email}
            placeholder="Type recipient email here"
            onChange={(e) => {
              setEmail(e.target.value);
              setError(""); // clear error while typing
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddEmail();
              }
            }}
          />
        </div>

        <Button type="button" onClick={handleAddEmail}>
          Add
        </Button>
      </div>

      {/* 🔴 Error Message Below Input */}
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
    </div>
  );
}
