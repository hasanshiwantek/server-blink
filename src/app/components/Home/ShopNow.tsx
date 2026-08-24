import Link from "next/link";

const ShopNow = () => {
  return (
    <section className="w-full">
      {/* Mobile (< sm): image only, then text below */}
      <div className="lg:hidden">
  {/* Image */}
  <div
    className="relative w-full h-[280px] md:h-[380px] bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/about/about-us.jpg')" }}
    aria-hidden
  >
    <div className="absolute inset-0 bg-white/35" />
  </div>

  {/* Content */}
  <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-10 md:py-12">
    <div className="w-full max-w-[361px] md:max-w-[700px] text-left text-[#444444]">
      <h2 className="text-[2.66rem] md:text-[3rem] font-bold mb-4">
        ABOUT US
      </h2>

      <p className="text-2xl md:text-[1.6rem] leading-relaxed mb-6 text-[#444444] roboto-font">
        We are a leading online retailer of server parts, committed to
        providing high-quality and reliable products to our customers.
        With a wide range of parts to choose from, we make it easy for
        businesses of all sizes to upgrade and maintain their servers.
        Our team of experts is dedicated to delivering exceptional
        customer service and technical support, ensuring that our
        customers get the best possible experience when shopping with us.
      </p>

      <Link href="/">
        <button
          type="button"
          className="bg-[#444444] text-white px-5 md:px-8 py-3 rounded text-2xl md:text-[1.5rem]"
        >
          SHOP NOW
        </button>
      </Link>
    </div>
  </div>
</div>

      {/* sm+: unchanged — text on image */}
      <div
        className="relative hidden lg:block w-full bg-cover bg-center bg-no-repeat h-[350px] md:h-[490px]"
        style={{
           backgroundImage: "url('/about/about-us-update.webp')",
        }}
      >
        <div className="absolute inset-0 bg-white/35 pointer-events-none" aria-hidden />
        <div className="relative z-10 md:ml-24">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="w-full max-w-[361px] text-center md:text-left text-[#444444]">
              <h2 className="text-3xl md:text-[2.7rem] font-bold md:mb-4">
                ABOUT US
              </h2>

              <p className="text-lg md:text-2xl leading-relaxed md:mb-6 text-[#444444]">
                We are a leading online retailer of server parts, committed to
                providing high-quality and reliable products to our customers.
                With a wide range of parts to choose from, we make it easy for
                businesses of all sizes to upgrade and maintain their servers.
                Our team of experts is dedicated to delivering exceptional
                customer service and technical support, ensuring that our
                customers get the best possible experience when shopping with
                us.
              </p>

              <Link href="/">
                <button
                  type="button"
                  className="bg-[#444444] text-white px-8 py-3 rounded text-xl md:text-[1.76rem]"
                >
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopNow;
