import React from "react";
import Hero from "./Hero";
import { Features } from "./Features";
import { Services } from "./Services";
import { Stats } from "./Stats";
import { CallToAction } from "./CAT";

function Home() {
  return (
    <>
      <Hero id="hero" />
      <Features id="features" />
      <Services id="services" />
      <Stats id="stats" />
      <CallToAction id="cta" />
    </>
  );
}

export default Home;
