import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Page() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section id="about" className="text-center my-16">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="max-w-md mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Quisque convallis odio sed quam facilisis, et bibendum est
            hendrerit. Morbi nibh sapien, pellentesque vel mi id, euismod
            sagittis turpis. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Nulla hendrerit vehicula felis eget imperdiet. Nulla non
            cursus diam. Donec posuere erat vitae vehicula dapibus. Aliquam a
            sem fringilla, viverra purus non, placerat enim.
          </p>
        </div>
      </section>
      <section id="contact" className="text-center my-16">
        <SectionHeaders
          subHeader={"Dont\t hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+905343181967"
          >
            +90 534 318 1967
          </a>
        </div>
      </section>
    </>
  );
}
