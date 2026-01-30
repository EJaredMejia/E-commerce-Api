import { Github } from "../../icons/components/github.components";
import { Linkedin } from "../../icons/components/linkedin.components";

export function Footer() {
  return (
    <footer className="relative z-40 flex h-fit flex-col items-center justify-center gap-8 self-end bg-linear-to-t from-gray-600 to-gray-700 p-10 text-white">
      <p>Made by Jared Mejia {new Date().getFullYear()}</p>
      <div className="flex gap-5">
        <a
          target="_blank"
          className="rounded-full bg-gray-800 p-3"
          href="https://github.com/jaredmejia24/E-commerce-Api"
        >
          <Github className="size-8 cursor-pointer fill-white" />
        </a>
        <a
          target="_blank"
          className="rounded-full bg-gray-800 p-3"
          href="https://www.linkedin.com/in/jared-mejia-41b58a23a/"
        >
          <Linkedin className="size-8 cursor-pointer" />
        </a>
      </div>
    </footer>
  );
}
