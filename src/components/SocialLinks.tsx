// src/components/SocialLinks.tsx
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export function Twitter() {
  return (
    <a
      href="https://twitter.com/mustcoweb"
      target="_blank"
      className="text-blue-500 hover:underline"
    >
      <FaTwitter />
    </a>
  );
}

export function Instagram() {
  return (
    <a
      href="https://instagram.com/mustcoweb"
      target="_blank"
      className="text-pink-500 hover:underline"
    >
      <FaInstagram />
    </a>
  );
}

export function Facebook() {
  return (
    <a
      href="https://facebook.com/mustcoweb"
      target="_blank"
      className="text-blue-700 hover:underline"
    >
      <FaFacebook />
    </a>
  );
}

export function Youtube() {
  return (
    <a
      href="https://youtube.com/mustcoweb"
      target="_blank"
      className="text-red-500 hover:underline"
    >
      <FaYoutube />
    </a>
  );
}

export function Github() {
  return (
    <a
      href="https://github.com/mustcoweb"
      target="_blank"
      className="dark:text-white hover:underline"
    >
      <FaGithub />
    </a>
  );
}
