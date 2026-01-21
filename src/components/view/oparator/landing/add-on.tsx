import AddOnCard from "../reuse/addon-card";
import { addOns } from "../../user/dummy-json";

export default function AddOn() {
  return (
    <div id="add-on" className="py-16 container px-10">
      <h1 className="mb-10">Add on services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {addOns.slice(0, 3).map((item, index) => (
          <AddOnCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
