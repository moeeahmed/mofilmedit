import Image from "next/image";

export default function Home() {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://djpguts9gwm3x.cloudfront.net/DSC04663.jpg")',

        backgroundColor: "#000",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-200 to-black mix-blend-multiply h-screen" />
      <main className="flex flex-col gap-[32px] row-start-2 items-center ">
        <Image
          className="drop-shadow-2xl"
          src="/mofilmedit.svg"
          alt="mofilmedit logo"
          width={180}
          height={38}
          priority
        />
        <p className="font-mono list-inside list-decimal text-2xl text-center sm:text-left drop-shadow-2xl">
          COMING SOON
        </p>
      </main>
    </div>
  );
}
