import Avatars from "@/components/reuseable/avater";
import { Button, Input } from "@/components/ui";
import { RandomImg } from "@/lib";
import { useEmailFindQuery } from "@/redux/api/authApi";
import { X } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";

export default function EmailCollect() {
  const [email, setEmail] = useState("");
  const [items, setItems] = useState<{ img: string; email: string }[]>([]);

  const { data: emailItem } = useEmailFindQuery({
    email: email,
  });

  console.log(emailItem)

  //   useEffect(() => {}, [emailItem, items]);

  // Handle adding email with avatar (if exists)
  const handleAddEmail = useCallback(() => {
    if (email) {
      setItems((prevItems) => [...prevItems, { img: "", email }]);
      setEmail("");
    }
  }, [email]);

  const handleDeleteEmail = (emailToDelete: string) => {
    setItems(items.filter((item) => item.email !== emailToDelete));
  };

  return (
    <div className="flex items-center gap-5">
      <div className="border w-full rounded-md h-10 flex items-center">
        {items?.slice(0, 1)?.map((item) => (
          <div className="flex items-center space-x-1 px-2">
            <Avatars
              className="size-8!"
              src={item.img || RandomImg(50, 50)}
              alt="Attendees"
              fallback="A"
            />
            <span>{item.email}</span>
            <span>
              <X
                onClick={() => handleDeleteEmail(item.email)}
                className="size-4 cursor-pointer"
              />
            </span>
          </div>
        ))}
        {items?.length > 1 && (
          <div className="w-10 px-1 text-sm  bg-figma-primary text-white rounded-md grid place-items-center">
            {items?.length}+
          </div>
        )}

        <Input
          type="email"
          className="border-none"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type recipients email here"
          value={email}
        />
      </div>
      <Button className="w-fit" type="button" onClick={handleAddEmail}>
        Add
      </Button>
    </div>
  );
}
