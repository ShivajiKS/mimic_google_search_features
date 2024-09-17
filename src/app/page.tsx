import SearchBar from "@/components/home-search";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center mt-40">
      <Link href={"/"}>
        <img
          src="vs-search-engine-high-resolution-logo-transparent.png"
          alt="google image..."
          className="h-8 sm:h-12 md:h-20"
        />
      </Link>
      <SearchBar />
    </div>
  );
}
