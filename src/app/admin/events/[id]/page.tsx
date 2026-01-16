"use client";
import { BackBtn } from "@/components/reuseable/back-btn";
import NavTitle from "@/components/reuseable/nav-title";
import EvnetSingle from "@/components/view/common/event-single";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import useConfirmation from "@/provider/confirmation";
import { useParams, useRouter } from "next/navigation";
import { useDeleteEventMutation } from "@/redux/api/admin/eventsApi";
import FavIcon from "@/icon/favIcon";
import Link from "next/link";

export default function EvnetSingleBox() {
  const { confirm } = useConfirmation();
  const { id } = useParams();
  const [deleteEvent] = useDeleteEventMutation();
  const router = useRouter();
  const handleDeleteEvent = async (s_id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Event",
      title: "You are going to delete this event",
      description:
        "After deleting, user's won't be able to find this event on your system",
    });
    if (confirmed) {
      await deleteEvent(s_id).unwrap();
      router.back();
    }
  };

  return (
    <div>
      <NavTitle
        title="Manage events"
        subTitle="Manage all of the events from this section."
      />
      <SvgBox>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <BackBtn className="bg-white rounded-md" />
            <h2>Creating One to one event</h2>
          </div>
          <div className="z-10 flex items-center space-x-2">
            <Link href={`/admin/events/edit/345`}>
              <button aria-label="Edit" className="icon bg-primary">
                <FavIcon color="#fff" name="edit2" />
              </button>
            </Link>

            <button
              onClick={() => handleDeleteEvent(id)}
              aria-label="Delete"
              className="icon bg-figma-danger"
            >
              <FavIcon color="#fff" name="delete_two" />
            </button>
          </div>
        </div>
      </SvgBox>
      <EvnetSingle admin={true} />
    </div>
  );
}
