import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu() {
  const items = [1, 2, 3, 4, 5, 6];
  return (
    <section className="">
      {/* <div className="absolute h-full right-0 left-0 justify-start">
        <div className="h-48 w-48 absolute left-0">
          <Image
            src={"/salata-1.jpeg"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"salata gorseli"}
          />
        </div>
        <div className="h-48 w-48 absolute right-0">
          <Image
            src={"/salata-1.jpeg"}
            layout={"fill"}
            objectFit={"contain"}
            alt={"salata gorseli"}
          />
        </div>
      </div> */}

      <div className="text-center mb-6">
        <SectionHeaders subHeader={"Checkout"} mainHeader={"Menu"} />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {items.length > 0 &&
          items.map((item, index) => <MenuItem key={index} {...item} />)}
      </div>
    </section>
  );
}
