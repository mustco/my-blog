
import ContactMe from "@/components/ContactMe";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export async function generateMetadata() {
  return {
    title: "MustcoWeb - Contact Me",
    description: "Hubungi kami untuk pertanyaan, kritik, atau kerja sama.",
  };
}

export default function Contact() {
  return (
    <div className="md:w-4/5 p-4 mx-auto card gap-3 my-5 md:p-8 min-h-screen flex flex-col justify-center">
    <ContactMe />
    </div>
  );
}
