"use client";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import { Button, Skeleton } from "@/components/ui";
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
import {
  useDeletePodcastMutation,
  useGetPodcastQuery,
  useStorePodcastMutation,
} from "@/redux/api/admin/podcastApi";
import { Repeat } from "@/components/reuseable/repeat";
import { Pagination } from "@/components/reuseable/pagination";
import { useDebounce } from "use-debounce";
import { zodResolver } from "@hookform/resolvers/zod";
import { add_on, audio_sc } from "@/schema";
import { ErrorInput } from "@/components/reuseable/error";
import sonner from "@/components/reuseable/sonner";

const initState = {
  isStore: false,
  isUpdate: false,
};

const intState: any = {
  page: 1,
  isPreview: false,
  search: "",
};

export default function Podcast() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);
  const [global, updateGlobal] = useGlobalState(intState);
  const [value] = useDebounce(global.search, 1000);
  const { data: padcast, isLoading } = useGetPodcastQuery({
    page: global.page,
    ...(value && { search: value }),
  });
  const [deletePodcast] = useDeletePodcastMutation();

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete Podcast",
      title: "You are going to delete this podcast",
      description:
        "After deleting, user's won't be able to find this podcast in your system.",
    });
    if (confirmed) {
      await deletePodcast(id).unwrap();
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
        {isLoading ? (
          <Repeat count={10}>
            <Skeleton className="w-full h-[180px] rounded-xl" />
          </Repeat>
        ) : (
          padcast?.data?.map((item: any, idx: any) => (
            <div
              key={idx}
              className="p-5 space-y-5 rounded-xl bg-figma-sidebar"
            >
              <MusicPlayer
                custom={true}
                idx={idx}
                audioSource={item?.audio_file}
              />
              {/* Bottom Info */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_100px]">
                <ul className="w-full">
                  <li className="text-lg line-clamp-2 font-medium">
                    {item.title}
                  </li>
                  <li className="text-xs sm:text-sm">
                    {helpers.formatDate(item?.created_at)}
                  </li>
                </ul>
                <div className="flex space-x-2 mt-3 md:mt-0 sm:space-x-3">
                  <AEditbtn
                    onClick={() => setState("isUpdate", true)}
                    color="#fff"
                    className="bg-primary rounded-md"
                  />
                  <ADeletebtn
                    onClick={() => handleDelete(item?.id)}
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {padcast?.meta?.total > 10 && (
        <ul className="flex items-center flex-wrap justify-between py-3">
          <li className="flex">
            Total:
            <sup className="font-medium text-2xl relative -top-3 px-2">
              {padcast?.meta?.total}
            </sup>
            podcasts
          </li>
          <li>
            <Pagination
              onPageChange={(v: any) => updateGlobal("page", v)}
              {...padcast?.meta}
            />
          </li>
        </ul>
      )}
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

  const [storePodcast, { isLoading }] = useStorePodcastMutation();

  const from = useForm({
    resolver: zodResolver(audio_sc),
    defaultValues: {
      title: "",
      audio: null,
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
    const value = {
      title: values.title,
      audio_file: values.audio,
    };
    try {
      const data = helpers.fromData(value);
      const res = await storePodcast(data).unwrap();
      if (res.status) {
        sonner.success(
          "Upload Complete",
          "Music uploaded successfully.",
          "bottom-right"
        );
        setState("isStore", false);
        from.reset();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <ModalHeading
        title="Upload Podcast"
        onClose={() => setState("isStore", false)}
      />
      <Form className="space-y-5 pt-5" from={from} onSubmit={handleSubmit}>
        <div>
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
                    <Button
                      type="button"
                      className="border bg-transparent text-primary font-medium rounded-full"
                    >
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
                <Button type="button" className="bg-[#FEF6F3]">
                  {" "}
                  <FavIcon color="#99796f" name="upload2" />
                  <span className="text-primary"> Upload Podcast Audio</span>
                </Button>
              </AudioUpload>
            )}
          </div>

          {from.watch("audio") === null && (
            <ErrorInput
              className="text-sm mt-px"
              error={from?.formState?.errors?.audio?.message as string}
            />
          )}
        </div>
        <FromInput2
          label="Podcast title"
          name="title"
          placeholder="Enter your  title"
          className="h-10 rounded-xl"
        />

        <Button disabled={isLoading} size="lg" className="w-full rounded-xl">
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
