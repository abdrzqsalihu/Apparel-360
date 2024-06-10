function Hero() {
  return (
    <div>
      <section className="mt-14">
        <div className="max-w-screen-xl px-4 mx-2 lg:mx-auto py-8 sm:px-6 sm:py-12 bg-gray-900 rounded-3xl">
          <div className="py-4">
            <p className="text-white/90 text-[11px] md:text-sm tracking-tight">
              Limited offer
            </p>
            <h1 className="text-white text-[20px] md:text-3xl mt-4 font-bold font-mono tracking-tight">
              20% Sale Off On Everything
            </h1>
            <p className="text-gray-300 text-[12px] md:text-[13px] mt-2 md:mt-4 tracking-wider line-clamp-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
              excepturi magnam suscipit nobis non? Obcaecati, rerum? Voluptates
              excepturi, itaque autem porro dolorum sint eum, iusto eaque quod
              nulla qui voluptatum.
            </p>
            <a href="">
              <button className="mt-6 md:mt-8 text-white border border-solid rounded-2xl p-2 px-6 text-[12px] md:text-[15px] hover:opacity-80">
                Shop Now
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
