"use client";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import { Button } from "@/components/ui";
import FavIcon from "@/icon/favIcon";
import { Plus } from "lucide-react";
import { ADeletebtn, AEditbtn } from "@/components/view/admin/reuse/btn";
import useConfirmation from "@/provider/confirmation";
import { useGlobalState, useModalState } from "@/hooks";
import Modal2 from "@/components/reuseable/modal2";
import { FieldValues, useForm } from "react-hook-form";
import ModalHeading from "@/components/reuseable/modal-heading";
import Form from "@/components/reuseable/from";
import { FromInput2 } from "@/components/reuseable/form-input2";
import { AudioUpload, MusicPlayer } from "@/components/reuseable/music";
import { helpers } from "@/lib";

const podcasts = [
  {
    id: 1,
    title: "Design Trends 2025",
    date: "8th August 2025",
    duration: "02:15",
  },
  {
    id: 2,
    title: "Web Development Tips",
    date: "8th August 2025",
    duration: "02:15",
  },
  {
    id: 3,
    title: "UX Best Practices",
    date: "8th August 2025",
    duration: "02:15",
  },
  {
    id: 4,
    title: "Modern JavaScript",
    date: "8th August 2025",
    duration: "02:15",
  },
  {
    id: 5,
    title: "React Performance",
    date: "8th August 2025",
    duration: "02:15",
  },
  {
    id: 6,
    title: "Accessibility Guide",
    date: "8th August 2025",
    duration: "02:15",
  },
];

const initState = {
  isStore: false,
  isUpdate: false,
};

export default function Podcast() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Podcast",
      title: "You are going to delete this podcast",
      description:
        "After deleting, user's won't be able to find this podcast in your system.",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <NavTitle
        title="Podcasts"
        subTitle="Manage all of your podcasts from this section"
      />
      <div className="flex-between gap-10 mb-5">
        <SearchBox onChange={(e) => console.log(e)} />
        <Button
          onClick={() => setState("isStore", true)}
          type="button"
          size="lg"
          className="rounded-xl"
        >
          <Plus />
          <span className="hidden md:block">Add More</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {podcasts.map((item, idx) => (
          <div key={idx} className="p-5 space-y-5 rounded-xl bg-figma-sidebar">
            <MusicPlayer custom={false} idx={idx} audioSource="/song.mp3" />
            {/* Bottom Info */}
            <div className="flex  flex-wrap justify-between items-center">
              <ul>
                <li className="text-lg sm:text-xl font-medium">{item.title}</li>
                <li className="text-xs sm:text-sm">{item.date}</li>
              </ul>
              <div className="flex space-x-2 mt-3 md:mt-0 sm:space-x-3">
                <AEditbtn
                  onClick={() => setState("isUpdate", true)}
                  color="#fff"
                  className="bg-primary rounded-md"
                />
                <ADeletebtn
                  onClick={() => handleDelete("1234")}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/*  ============ store the music ========= */}
      <Modal2
        open={state.isStore}
        setIsOpen={(v) => setState("isStore", v)}
        className="sm:max-w-xl"
      >
        <PadcastStore setState={setState} />
      </Modal2>
      {/*  ============ update the music ========= */}
      <Modal2
        open={state.isUpdate}
        setIsOpen={(v) => setState("isUpdate", v)}
        className="sm:max-w-xl"
      >
        <PadcastUpdate setState={setState} />
      </Modal2>
    </div>
  );
}

const initglobalState = {
  preview: "",
  idx: "",
};

//  ========================== PadcastStore  ==============
const PadcastStore = ({ setState }: any) => {
  const [global, updateGlobal] = useGlobalState(initglobalState);
  // const [isPreview, setIsPreview] = useState("");
  const from = useForm({
    // resolver: zodResolver(add_on),
    defaultValues: {
      title: "",
      audio: null,
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div>
      <ModalHeading
        title="Upload Podcast"
        onClose={() => setState("isStore", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <div className="border min-h-20 rounded-xl flex items-center justify-center">
          {global.preview ? (
            <div className="flex items-center w-full space-x-5 justify-between px-3">
              <div className="w-[300px]  flex flex-start">
                <MusicPlayer
                  custom={false}
                  className="py-1 bg-figma-sidebar"
                  idx={global.idx as any}
                  audioSource={global.preview}
                />
              </div>

              <div>
                <AudioUpload
                  onFileSelect={(file) => {
                    updateGlobal("preview", URL.createObjectURL(file));
                    updateGlobal("idx", helpers.randomNumber());
                    from.setValue("audio", file as any);
                  }}
                >
                  <Button className="border bg-transparent text-primary font-medium rounded-full">
                    Change Audio
                  </Button>
                </AudioUpload>
              </div>
            </div>
          ) : (
            <AudioUpload
              onFileSelect={(file) => {
                updateGlobal("preview", URL.createObjectURL(file));
                updateGlobal("idx", helpers.randomNumber());
                from.setValue("audio", file as any);
              }}
            >
              <Button className="bg-[#FEF6F3]">
                {" "}
                <FavIcon color="#99796f" name="upload2" />
                <span className="text-primary"> Upload Podcast Audio</span>
              </Button>
            </AudioUpload>
          )}
        </div>
        <FromInput2
          label="Podcast title"
          name="title"
          placeholder="Enter your  title"
          className="h-10 rounded-xl"
        />

        <Button size="lg" className="w-full rounded-xl">
          Upload
        </Button>
      </Form>
    </div>
  );
};
//  ========================== PadcastUpdate   ================
const PadcastUpdate = ({ setState }: any) => {
  const [global, updateGlobal] = useGlobalState(initglobalState);
  // const [isPreview, setIsPreview] = useState("");
  const from = useForm({
    // resolver: zodResolver(add_on),
    defaultValues: {
      title: "",
      audio: null,
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  return (
    <div>
      <ModalHeading
        title="Update Podcast"
        onClose={() => setState("isUpdate", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <div className="border min-h-20 rounded-xl flex items-center justify-center">
          {global.preview ? (
            <div className="flex items-center w-full space-x-5 justify-between px-3">
              <div className="w-[300px]  flex flex-start">
                <MusicPlayer
                  custom={false}
                  className="py-1 bg-figma-sidebar"
                  idx={global.idx as any}
                  audioSource={global.preview}
                />
              </div>

              <div>
                <AudioUpload
                  onFileSelect={(file) => {
                    updateGlobal("preview", URL.createObjectURL(file));
                    updateGlobal("idx", helpers.randomNumber());
                    from.setValue("audio", file as any);
                  }}
                >
                  <Button className="border bg-transparent text-primary font-medium rounded-full">
                    Change Audio
                  </Button>
                </AudioUpload>
              </div>
            </div>
          ) : (
            <AudioUpload
              onFileSelect={(file) => {
                updateGlobal("preview", URL.createObjectURL(file));
                updateGlobal("idx", helpers.randomNumber());
                from.setValue("audio", file as any);
              }}
            >
              <Button className="bg-[#FEF6F3]">
                {" "}
                <FavIcon color="#99796f" name="upload2" />
                <span className="text-primary"> Upload Podcast Audio</span>
              </Button>
            </AudioUpload>
          )}
        </div>
        <FromInput2
          label="Podcast title"
          name="title"
          placeholder="Enter your  title"
          className="h-10 rounded-xl"
        />

        <Button size="lg" className="w-full rounded-xl">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};
