import Link from "next/link";

function Footer() {
  return (
    <footer className="rounded-md md:w-1/2 md:mx-auto text-lg  mx-2 h-16 p-2 flex justify-between items-end">
      <p>
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
      </p>
      <ul className="w-1/4 flex justify-around items-center">
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
