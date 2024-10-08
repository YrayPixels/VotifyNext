import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex gap-6 items-center">

      <Link href='/'>
        <h2 className="font-semibold text-[#fdefd8] text-[2rem] camar-text ">Votify</h2>
      </Link>

    </div>
  );
}
