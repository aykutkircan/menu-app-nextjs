import Image from "next/image";
import IconRightCircle from "../icons/IconRightCircle";

export default function Hero() {
  return (
    <section className="hero mt-8 ">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Lezzetin Kalpte Buluştuğu Yer: <br />
          <span className="text-primary">Yöre Mantı!</span>
        </h1>
        <p className="my-4 text-gray-500 text-sm">
          Mantının Yolu Midemizden Geçer: Damaklara Sevdalı Bir Lezzet!.
        </p>
        <div className="flex gap-4 text-xs">
          <button className="bg-primary text-white px-4 py-2 border rounded-full flex gap-2 items-center uppercase">
            Order Now
            <IconRightCircle />
          </button>
          <button className="flex items-center gap-2 py-2 text-gray-500 font-semibold">
            Learn More
            <IconRightCircle />
          </button>
        </div>
      </div>
      <div className="ml-auto my-auto">
        <Image
          src="/1280x720.png"
          width={500}
          height={0}
          alt="Manti Gorsel"
          style={{ width: "auto", height: "auto" }}
          priority={true}
        ></Image>
      </div>
    </section>
  );
}
