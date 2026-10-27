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
import overlayShot from "../../../assets/images/shiori/overlay.webp";
import draftShot from "../../../assets/images/shiori/draft.webp";
import noteShot from "../../../assets/images/shiori/note.webp";
import desksShot from "../../../assets/images/shiori/desks.webp";
import resumedShot from "../../../assets/images/shiori/resumed.webp";

const SITE_URL = "https://kavyan256.github.io/shiori/";
const REPO_URL = "https://github.com/kavyan256/shiori";
const DOWNLOAD_URL = "https://github.com/kavyan256/shiori/releases/latest";

const platformTags = ["Python 3.11", "pywin32 + COM", "pywebview", "Chrome MV3", "PyInstaller"];

const statTiles = [
  { label: "Releases", value: 2, suffix: "", format: "int" },
  { label: "Tests, run on every push", value: 49, suffix: "", format: "int" },
  { label: "Days to v1.1", value: 3, suffix: "", format: "int" },
  { label: "Cloud calls", value: 0, suffix: "", format: "int" },
];

const commands = [
  { say: "save my desk", does: "Everything open, ticked, ready to save" },
  { say: "drop 3 · drop youtube", does: "Leave things out" },
  { say: "I was fixing the login bug, next write the tests", does: "Your note; each “next” becomes a step to tick off" },
  { say: "save as coding", does: "Save it under a name" },
  { say: "save and clear", does: "Save, then close what you saved, with 60 s to undo" },
  { say: "resume coding", does: "Bring it all back and read your note to you" },
  { say: "pin this · start dsa", does: "Turn a desk into a preset you can start any time" },
];

const restored = [
  {
    title: "Apps and folders",
    body: "VS Code, Cursor and Windsurf folders, Explorer windows, Store apps like Claude and Terminal.",
  },
  {
    title: "Browser tabs",
    body: "Reopened as a named tab group in Chrome, Edge, Brave or Opera, with YouTube at the second you left it.",
  },
  {
    title: "Terminals",
    body: "Every Windows Terminal tab in its folder. Dev servers and watchers start again; nothing else re-runs.",
  },
  {
    title: "Office files",
    body: "Excel at the same sheet and cell, Word and PowerPoint at the same slide, read over COM.",
  },
  {
    title: "PDFs and text",
    body: "Opened again in whichever app they were open in, not whatever the default happens to be.",
  },
  {
    title: "Git context",
    body: "Branch, uncommitted changes and last commit, with a warning if you've switched branch since.",
  },
];

const modules = [
  { title: "capture.py", blurb: "What's open: windows, the processes behind them, and the folders they're in." },
  { title: "terminals.py", blurb: "Shell tabs, their folders and the command running in each." },
  { title: "office.py", blurb: "Excel, Word and PowerPoint over COM, with a timeout so a stuck dialog can't hang the bar." },
  { title: "browser.py", blurb: "A local WebSocket bridge to the extension on 127.0.0.1, with a plain HTTP fallback." },
  { title: "commands.py", blurb: "Dictated text to a command, tolerant of filler, half words and misheard ones." },
  { title: "store.py", blurb: "Desks as JSON, with 10 versions each, 30 days of trash and pictures cleaned up." },
];

const gallery = [
  { src: draftShot, w: 1088, h: 836, caption: "\u201csave my desk\u201d: everything open, ticked, grouped by kind.", alt: "Shiori's command bar listing a new desk: a VS Code folder, a PDF, a notepad file, a Jupyter terminal and four Chrome tabs, each ticked" },
  { src: noteShot, w: 1088, h: 560, caption: "Your note, with each \u201cnext\u201d turned into a step.", alt: "The command bar showing a dictated note about tuning a CNN, with two next steps listed under it" },
  { src: desksShot, w: 1088, h: 483, caption: "\u201cshow my desks\u201d: what's saved, and what each one says to do next.", alt: "A list of four saved desks, AI lab, cybersec lab, DSA and portfolio site, each with its next step and age" },
  { src: resumedShot, w: 1088, h: 584, caption: "\u201cresume cybersec lab\u201d: the note, git context and what's reopening.", alt: "The command bar resuming the cybersec lab desk: the note, two unticked steps, the git branch and the four things reopening" },
];

const saveChain = [
  { label: "Ctrl Alt S", detail: "the bar opens on the screen you're using" },
  { label: "“save my desk”", detail: "windows, tabs, terminals and files, gathered" },
  { label: "Your note", detail: "what you were doing, and what's next" },
  { label: "Saved desk", detail: "JSON in %LOCALAPPDATA%, never the cloud" },
];

const resumeChain = [
  { label: "“resume coding”", detail: "or plain “resume” for the last one" },
  { label: "Everything reopens", detail: "apps, tab group, terminals, Office at the same cell" },
  { label: "Your note, full screen", detail: "over the desk it just reopened" },
];

export default function Shiori() {
  return (
    <ProjectPage
      slug="shiori"
      tagline="Save your whole desk by voice when you have to switch tasks, and come back to exactly where your head was."
      tags={platformTags}
    >
      <Section label="Overview" className="max-w-3xl">
        <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
          Switching tasks costs more than the switch. Coming back to a half-finished thing
          means finding the folder, the twelve tabs, the terminal that was running the dev
          server, the spreadsheet cell you were checking, and then remembering what you were
          actually about to do. Shiori (栞, the ribbon bookmark you leave in a book) keeps
          that for you.
        </p>
        <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
          Press <Code>Ctrl Alt S</Code> and say &ldquo;save my desk&rdquo;. Shiori gathers
          everything open, you say what you were doing and what&rsquo;s next, and it saves
          under a name. Later, &ldquo;resume coding&rdquo; brings it all back and shows your
          note full screen over the desk it just reopened. Every step works by voice with
          Wispr Flow, and typing works the same.
        </p>
      </Section>

      <Section label="Try it">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="max-w-[56ch] text-lg leading-8 text-bone">
            Windows 10 or 11, about 25 MB, no admin rights needed. Extract the zip, run{" "}
            <Code>Install Shiori.cmd</Code>, and look for the blue S in the tray.
          </p>
          <div className="flex flex-wrap gap-3">
            <ExternalLink href={DOWNLOAD_URL} primary>
              Download Shiori
            </ExternalLink>
            <ExternalLink href={SITE_URL}>Project site</ExternalLink>
          </div>
        </div>
        <p className="mt-8 max-w-[56ch] text-sm leading-6 text-bone/80">
          Built for the No Hands: Wispr Challenge (WeMakeDevs), October 2026. First release
          on 25 Oct, v1.1 the next day after testing with three users.
        </p>
      </Section>

      <Section label="Coming back">
        <Shot
          src={overlayShot}
          w={1600}
          h={900}
          eager
          alt="After a resume: the note about capturing the TCP handshake in Wireshark, in large type over the dimmed desk, with two next steps and the git branch underneath"
          caption="After a resume, your note fills the screen over the desk it just reopened. Click or press any key to get to work."
        />
      </Section>

      <Section>
        <StatRow>
          {statTiles.map((tile) => (
            <StatTile key={tile.label} {...tile} />
          ))}
        </StatRow>
      </Section>

      <Section label="Save, then resume">
        <div className="grid gap-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-dust">Leaving</p>
            <ChainDiagram steps={saveChain} />
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-dust">Coming back</p>
            <ChainDiagram steps={resumeChain} />
          </div>
        </div>
      </Section>

      <Section label="The command bar">
        <div className="grid gap-10 md:grid-cols-2">
          {gallery.map((g) => (
            <Shot key={g.caption} {...g} />
          ))}
        </div>
      </Section>

      <Section label="What you say">
        <div className="overflow-x-auto rounded-[2px] border border-paper/10 bg-carbon">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-paper/10 text-xs uppercase tracking-[0.25em] text-dust">
                <th className="px-6 py-4 font-medium">Say (or type)</th>
                <th className="px-4 py-4 font-medium">What happens</th>
              </tr>
            </thead>
            <tbody>
              {commands.map((c, i) => (
                <tr key={c.say} className={i !== commands.length - 1 ? "border-b border-paper/5" : ""}>
                  <td className="px-6 py-3">
                    <code className="text-xs">{c.say}</code>
                  </td>
                  <td className="px-4 py-3 text-bone">{c.does}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section label="What comes back">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {restored.map((r) => (
            <div key={r.title} className={CARD}>
              <CardTrim />
              <h3 className="text-sm font-medium tracking-tight">{r.title}</h3>
              <p className="mt-3 text-sm leading-6 text-bone">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="How it's built">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((m) => (
            <div key={m.title} className={CARD}>
              <CardTrim />
              <code className="block text-sm font-medium tracking-tight">{m.title}</code>
              <p className="mt-3 text-sm leading-6 text-bone">{m.blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-bone/80">
          The command bar is HTML drawn by Windows&rsquo; own Edge WebView2 through pywebview,
          so Python stays the backend and the app ships as one PyInstaller executable.
        </p>
      </Section>

      <Section label="Engineering notes" className="max-w-3xl">
        <BulletList>
          <Bullet>
            Speech-to-text doesn&rsquo;t hear what you said. Wispr turns &ldquo;desk&rdquo;
            into &ldquo;disk&rdquo; and &ldquo;parks&rdquo; into &ldquo;parts&rdquo;, and
            silence becomes &ldquo;Thanks for watching!&rdquo;. The parser accepts the
            mishearings, strips polite lead-ins like &ldquo;can you&rdquo;, and throws away
            the phrases transcription invents from nothing.
          </Bullet>
          <Bullet>
            Re-running a terminal&rsquo;s last command is dangerous: it might be{" "}
            <Code>git push</Code> or a script that deletes files. Only commands that look like
            a dev server or watcher (<Code>npm run dev</Code>, <Code>vite</Code>,{" "}
            <Code>uvicorn</Code>, <Code>docker compose up</Code>) start again; everything else
            just reopens in its folder.
          </Bullet>
          <Bullet>
            The browser extension holds a live WebSocket to Shiori so it never falls asleep
            mid-save. If the browser was closed, resume opens a one-time local URL that the
            extension spots and turns into a tab group.
          </Bullet>
          <Bullet>
            Office over COM can block forever on an open dialog or an offline network drive.
            Every call now gives up after a few seconds instead of freezing the bar.
          </Bullet>
        </BulletList>
      </Section>

      <Section label="Private by design" className="max-w-3xl">
        <p className="max-w-[62ch] text-lg leading-8 text-bone">
          Everything stays on your PC in <Code>%LOCALAPPDATA%\Shiori</Code>. No account, no
          cloud, no API key, and the extension only talks to <Code>127.0.0.1</Code>. Each save
          keeps a small picture of your screen, which you can turn off (and delete) from the
          tray menu.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ExternalLink href={DOWNLOAD_URL} primary>
            Download Shiori
          </ExternalLink>
          <ExternalLink href={REPO_URL}>Read the code</ExternalLink>
        </div>
      </Section>
    </ProjectPage>
  );
}
