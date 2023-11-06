import Link from "next/link";

function Footer() {
  return (
    <footer className="rounded-md md:w-1/2 md:mx-auto  my-2 mx-2 h-10 flex justify-between items-center">
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
        by Kashish
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
