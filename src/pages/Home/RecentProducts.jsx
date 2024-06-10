import { ArrowRight } from "lucide-react";

function RecentProducts() {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-medium">Featured Products</h1>
            </div>
            <div>
              <a href="" className="flex items-center gap-x-2">
                <span>See All</span> <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RecentProducts;
