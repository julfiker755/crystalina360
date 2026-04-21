"use client";
import SvgBox from "@/components/view/oparator/reuse/svg-box";
import NavTitle from "@/components/reuseable/nav-title";
import { BackBtn } from "@/components/reuseable/back-btn";
import { useSingleEventsQuery } from "@/redux/api/operator/opratorApi";
import { useParams } from "next/navigation";
import GroupEdit from "@/components/event-store/edit/group";

export default function EventEdit() {
  const { slug } = useParams();
  const { data: events_all } = useSingleEventsQuery(slug);

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
            <h2>Editing Event</h2>
          </div>
        </div>
      </SvgBox>
      <GroupEdit events_all={events_all} msg="" />
    </div>
  );
}
