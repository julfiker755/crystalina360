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
import { event_t, helpers } from "@/lib";
import { useSingleEventsQuery } from "@/redux/api/operator/opratorApi";

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
  const { data: events_all, isLoading } = useSingleEventsQuery(id);
  const { event_type, id: ids } = events_all?.data?.event || {};

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
            <h2>{helpers.capitalize(event_type)} Event</h2>
          </div>
          <div className="z-10 flex items-center space-x-2">
            <Link
              href={
                event_type === event_t.onetoone
                  ? `/admin/events/edit/one-to-one/${ids}`
                  : event_type === event_t.group
                    ? `/admin/events/edit/group/${ids}`
                    : event_type === event_t.retreat
                      ? `/admin/events/edit/retreat/${ids}`
                      : ""
              }
            >
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
