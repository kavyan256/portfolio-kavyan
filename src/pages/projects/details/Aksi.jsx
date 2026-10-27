import React from "react";
import {
  ProjectPage,
  Section,
  StatRow,
  StatTile,
  Code,
  Bullet,
  BulletList,
  CARD,
  CardTrim,
  ExternalLink,
  ChainDiagram,
  Shot,
} from "../../../components/project/ProjectKit";
import startShot from "../../../assets/images/aksi/start.webp";
import cameraShot from "../../../assets/images/aksi/camera.webp";
import listeningShot from "../../../assets/images/aksi/listening.webp";

const LIVE_URL = "https://aksi.onrender.com";
const REPO_URL = "https://github.com/kavyan256/Aksi";

const platformTags = ["FastAPI", "Sarvam Saaras v3", "Gemma 4", "Bulbul v3", "Docker on Render"];

const statTiles = [
  { label: "Languages, 10 of them Indian", value: 11, suffix: "", format: "int" },
  { label: "Sarvam models, end to end", value: 3, suffix: "", format: "int" },
  { label: "Sentences per answer, at most", value: 2, suffix: "", format: "int" },
  { label: "Buttons to find", value: 1, suffix: "", format: "int" },
];

const askChain = [
  { label: "Hold and ask", detail: "the photo is taken as you let go" },
  { label: "Saaras v3", detail: "speech to text, and which language it was" },
  { label: "Gemma 4", detail: "looks at the photo and answers the question" },
  { label: "Bulbul v3", detail: "speaks the answer in the same language" },
];

const shots = [
  {
    src: startShot,
    alt: "Aksi's start screen: the word AKSI in black on yellow, and 'tap anywhere to start' in Hindi and English",
    caption: "One tap anywhere starts it and asks for the camera and microphone.",
  },
  {
    src: cameraShot,
    alt: "Aksi ready to listen: the camera fills the screen with a repeat button at the top and 'hold to ask' at the bottom",
    caption: "The camera fills the screen (Chrome's test pattern here). Repeat sits at the top edge.",
  },
  {
    src: listeningShot,
    alt: "Aksi listening: a red screen with 'listening' in Hindi and English, sound bars, and 'release to send'",
    caption: "Holding turns the whole screen red: listening, release to send.",
  },
];

const decisions = [
  {
    title: "The whole screen is the button",
    body: "No target to find. Hold to talk, or a short tap to start and another to stop; 400 ms tells them apart.",
  },
  {
    title: "Sound and touch, not a screen reader",
    body: "Tones and vibration mark each step. No aria-live on purpose: a screen reader saying “listening” would end up in the question.",
  },
  {
    title: "Errors that still speak offline",
    body: "“Something went wrong” is pre-recorded with Bulbul in all 11 languages and loaded in advance, so it plays when the network or Sarvam is down.",
  },
  {
    title: "Answers in your language",
    body: "Saaras detects the language you spoke, and the answer comes back in it. Anything Bulbul can't speak falls back to Hindi.",
  },
];

export default function Aksi() {
  return (
    <ProjectPage
      slug="aksi"
      tagline="Point your phone, hold the screen, ask in your own language, and hear what's in front of you."
      tags={platformTags}
    >
      <Section label="Overview" className="max-w-3xl">
        <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
          Aksi (अक्षि) is Sanskrit for eye. It&rsquo;s for blind and low-vision people who
          want to know what&rsquo;s on a medicine strip, which note they&rsquo;re holding, or
          whether there&rsquo;s a step ahead, and who would rather ask in Tamil or Odia than
          in English.
        </p>
        <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
          You hold the screen and ask. When you let go, Aksi takes a photo, works out what
          you said and in which language, looks at the photo, and speaks a short answer
          back in that language. Speech, vision and voice all run on Sarvam AI.
        </p>
      </Section>

      <Section label="Try it">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-[56ch] text-lg leading-8 text-bone">
            Open it on a phone, allow the camera and microphone, then hold anywhere and ask.
            It runs on Render&rsquo;s free tier, so the first visit can take a moment to wake
            up.
          </p>
          <ExternalLink href={LIVE_URL} primary>
            Open Aksi
          </ExternalLink>
        </div>
      </Section>

      <Section label="On the phone">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:max-w-3xl">
          {shots.map((s) => (
            <Shot key={s.caption} src={s.src} w={600} h={1298} alt={s.alt} caption={s.caption} />
          ))}
        </div>
      </Section>

      <Section>
        <StatRow>
          {statTiles.map((tile) => (
            <StatTile key={tile.label} {...tile} />
          ))}
        </StatRow>
      </Section>

      <Section label="One question">
        <ChainDiagram steps={askChain} />
        <p className="mt-4 max-w-2xl text-sm leading-6 text-bone/80">
          A FastAPI server in one Docker image makes the three Sarvam calls and times each
          one. The Sarvam key stays on the server; the phone never sees it.
        </p>
      </Section>

      <Section label="Designed for no sight">
        <div className="grid gap-4 sm:grid-cols-2">
          {decisions.map((d) => (
            <div key={d.title} className={CARD}>
              <CardTrim />
              <h3 className="text-sm font-medium tracking-tight">{d.title}</h3>
              <p className="mt-3 text-sm leading-6 text-bone">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="What it's told" className="max-w-3xl">
        <BulletList>
          <Bullet>
            Danger first. Stairs, a hole, a vehicle or something sharp in the path is said
            before anything else.
          </Bullet>
          <Bullet>
            Directions a blind person can use: left, right or straight ahead, and distance in
            steps (about 70 cm each), not metres.
          </Bullet>
          <Bullet>
            Read printed text exactly (medicine names, labels, signs) and say the amount on an
            Indian currency note clearly.
          </Bullet>
          <Bullet>
            If the photo is blurry, dark or misses what was asked about, say so and say how to
            move the camera. Never guess.
          </Bullet>
        </BulletList>
        <p className="mt-6 max-w-[62ch] text-sm leading-6 text-bone/80">
          At most two short sentences, in the speaker&rsquo;s own script, with no lists or
          markdown: it&rsquo;s going to be read aloud. The whole prompt is in{" "}
          <Code>main.py</Code>.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ExternalLink href={LIVE_URL} primary>
            Open Aksi
          </ExternalLink>
          <ExternalLink href={REPO_URL}>Read the code</ExternalLink>
        </div>
      </Section>
    </ProjectPage>
  );
}
