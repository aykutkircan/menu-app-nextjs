import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import Socials from "@/config/social.json";

export default function HomeMenu() {
  const items = [1, 2, 3];

  return (
    <section className="">
      <div className="text-center mb-6">
        <SectionHeaders subHeader={"Checkout"} mainHeader={"Best Seller"} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 xs:grid-cols-1">
        {items.length > 0 &&
          items.map((item, index) => <MenuItem key={index} {...item} />)}
      </div>
    </section>
  );
}
