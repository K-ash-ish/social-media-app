import Link from "next/link";

function Footer() {
  return (
    <footer className="rounded-md md:w-1/2  md:mx-auto   h-16 md:p-2 md:flex md:flex-row flex flex-col items-center justify-center gap-2  md:justify-between md:items-center ">
      <div className="">
        Built using{" "}
        <a
          target="_blank"
          href="https://nextjs.org/"
          rel="noopener"
          className="text-blue-500"
        >
          NextJs
        </a>{" "}
        by{" "}
        <span className="underline decoration-blue-400 underline-offset-4">
          Kashish
        </span>
        ❤️
      </div>
      <ul className=" md:flex md:justify-around md:items-center  flex  gap-8">
        <li>
          <a target="_blank" href="https://github.com/K-ash-ish" rel="noopener">
            Github
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/kashish-sondhiya-969120198/"
            rel="noopener"
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
