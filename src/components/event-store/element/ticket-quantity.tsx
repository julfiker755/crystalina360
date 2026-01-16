import { ErrorInput } from "@/components/reuseable/error";
import { FromInput } from "@/components/reuseable/form-input";
import FavIcon from "@/icon/favIcon";
import React from "react";

export default function TicketQuantity({ from, read = true }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="h-10 flex items-center justify-between px-2 border rounded-md">
        <span className="flex items-center">
          <FavIcon className="size-5" name="tiket" />
          <span className="ml-1"> Ticket quantity</span>
        </span>
        <FromInput
          name="ticket_quantity"
          className="w-[100px] h-10 text-end bg-transparent p-0"
          type="number"
          placeholder="quantity hare"
          readOnly={read}
        />
      </div>
      <div>
        <div className="h-10 flex items-center justify-between px-2 border rounded-md">
          <span className="flex items-center">
            <FavIcon className="size-5" name="price22" />
            <span className="ml-1">Ticket Price</span>
          </span>
          <FromInput
            name="price"
            className="w-[100px] h-10 bg-transparent p-0"
            type="number"
            placeholder="Price here"
            err={false}
          />
        </div>
        <ErrorInput error={from?.formState?.errors?.price?.message} />
      </div>
    </div>
  );
}
