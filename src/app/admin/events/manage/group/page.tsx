"use client";
import { events } from "@/components/view/admin/dummy-json";
import OpEvtCd from "@/components/view/admin/reuse/op-event-cd";
import FavIcon from "@/icon/favIcon";
import useConfirmation from "@/provider/confirmation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Group() {
  const { confirm } = useConfirmation();
  const params = useSearchParams().get("type");
  console.log(params);
  // one to one
  const handleDeleteEvent = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete event",
      title: "You are going to delete this event",
      description:
        "After deleting, user's won't be able to find this event on your system",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-10">
        {events.map((item, idx) => (
          <OpEvtCd key={idx} item={item}>
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center space-x-2 [&_button]:bg-[#FFFFFF]/20 [&_button]:cursor-pointer [&_button]:grid [&_button]:place-items-center [&_button]:size-11 [&_button]:backdrop-blur-[15px] [&_button]:rounded-md">
                <Link href={`/admin/events/345`}>
                  <button aria-label="View">
                    <FavIcon color="#fff" name="preview" />
                  </button>
                </Link>
                {params === "my-events" && (
                  <Link href={`/admin/events/edit/345`}>
                    <button aria-label="Edit">
                      <FavIcon color="#fff" name="edit2" />
                    </button>
                  </Link>
                )}
                <button
                  onClick={() => handleDeleteEvent("1234")}
                  aria-label="Delete"
                >
                  <FavIcon color="#ff8080" name="delete_two" />
                </button>
              </div>
            </div>
          </OpEvtCd>
        ))}
      </div>
    </div>
  );
}
