import React from "react";
import { ClientOnly } from "~/components/ClientOnly";
import AboutClient from "~/components/aboutClient";

const About = () => {
  return (
    <>
      <ClientOnly fallback={<p>Loading client...</p>}>
        <AboutClient />
      </ClientOnly>
    </>
  );
};

export default About;
