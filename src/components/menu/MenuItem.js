import Image from "next/image";

export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25">
      <div className="text-center">
        <Image
          className="block mx-auto"
          src="/600x600.png"
          alt="Manti Menu Item Gorsel"
          width={200}
          height={0}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <h4 className="my-3 text-xl font-semibold">Lorem Ipsum</h4>
      <p className="text-gray-500 text-sm">
        freestar freestar Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Maecenas sed aliquam diam, et fermentum lorem.
      </p>
      <button className="mt-4 bg-primary text-white px-8 py-2 rounded-full">
        Detay - $8
      </button>
    </div>
  );
}
