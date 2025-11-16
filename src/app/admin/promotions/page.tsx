"use client";
import { ImgBox } from "@/components/reuseable/Img-box";
import NavTitle from "@/components/reuseable/nav-title";
import SearchBox from "@/components/reuseable/search-box";
import { Button } from "@/components/ui";
import { useModalState } from "@/hooks";
import FavIcon from "@/icon/favIcon";
import useConfirmation from "@/provider/confirmation";
import { Plus } from "lucide-react";

const stash = [
  { icon: "running", title: "Currently Running Promotion", value: "05" },
  { icon: "total_promotion", title: "Total Promotions", value: "60" },
];

const profilesData = [
  {
    id: "1",
    name: "John Doe",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=300&fit=crop",
  },
  {
    id: "2",
    name: "John Doe",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
  },
  {
    id: "3",
    name: "John Doe",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
  },
  {
    id: "4",
    name: "John Doe",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop",
  },
  {
    id: "5",
    name: "John Doe",
    email: "example@gmail.com",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
  },
];

const initState = {
  isStore: false,
  isUpdate: false,
};

export default function Promotions() {
  const { confirm } = useConfirmation();
  const [state, setState] = useModalState(initState);

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      subTitle: "Delete banner",
      title: "You are going to delete this banner",
      description:
        "After deleting, user's won't be able to find this banner in your system.",
    });
    if (confirmed) {
      console.log(id);
    }
  };
  return (
    <div>
      <NavTitle
        title="Manage Promotions"
        subTitle="Manage your promotions from this section"
      />
      <SearchBox onChange={(e) => console.log(e)} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 gap-10">
        {stash.map((item) => (
          <div
            key={item.title}
            className="flex bg-figma-sidebar space-y-1 py-10 rounded-xl flex-col items-center"
          >
            <FavIcon name={item.icon as any} />
            <p className="text-center text-black">{item.title}</p>
            <p className="text-center font-bold text-black text-2xl lg:text-3xl">
              {item.value}
            </p>
          </div>
        ))}
        <div className="flex bg-figma-sidebar py-10 rounded-xl flex-col items-center justify-center">
          <Button type="button" size="lg" className="rounded-xl">
            <Plus />
            <span>Add a New banner</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {profilesData.map((profile) => (
          <div key={profile.id}>
            {/* Background Image */}
            <ImgBox
              src={profile.image}
              className="w-full h-[250px]"
              alt={profile.name}
            >
              <div
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%)",
                }}
                className="absolute inset-0  transition-colors"
              />
              <div>
                <div className="absolute top-3 right-3 flex gap-2  transition-opacity">
                  <button
                    className="bg-[#FFFFFF]/20 grid place-items-center size-11 backdrop-blur-[15px] rounded-md"
                    aria-label="View"
                  >
                    <FavIcon color="#fff" name="preview" />
                  </button>
                  <button
                    className="bg-[#FFFFFF]/20 grid place-items-center size-11 backdrop-blur-[15px] rounded-md"
                    aria-label="View"
                  >
                    <FavIcon color="#fff" name="pencil00" />
                  </button>
                  <button
                    onClick={() => handleDelete("1234")}
                    className="bg-[#FFFFFF]/20 cursor-pointer grid place-items-center size-11 backdrop-blur-[15px] rounded-md"
                    aria-label="View"
                  >
                    <FavIcon color="#ff8080" name="delete_two" />
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 flex flex-col justify-between p-4 text-white">
                <div>
                  <h3 className="font-semibold text-lg text-white">
                    {profile.name}
                  </h3>
                  <p className="text-base text-white">{profile.email}</p>
                </div>
              </div>
            </ImgBox>
          </div>
        ))}
      </div>
    </div>
  );
}
