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
import boardShot from "../../../assets/images/quench/live-board.webp";
import hubShot from "../../../assets/images/quench/hub-checklist.webp";
import summaryShot from "../../../assets/images/quench/summary.webp";
import planShot from "../../../assets/images/quench/set-up-plan.webp";
import runnerShot from "../../../assets/images/quench/runner.webp";
import volunteerShot from "../../../assets/images/quench/volunteer.webp";

const LIVE_URL = "https://quench.kavyan.dev";
const REPO_URL = "https://github.com/kavyan256/quench";
const ARCH_URL = "https://d3116g1xm6u7mg.cloudfront.net/architecture.html";

const platformTags = ["AWS SAM", "Lambda", "SQS", "Step Functions", "DynamoDB", "Cognito"];

const statTiles = [
  { label: "Taps in 30 s on AWS, 0 lost", value: 500, suffix: "", format: "int" },
  { label: "Tests: unit, API, browser", value: 150, suffix: "", format: "int" },
  { label: "Days, solo", value: 4, suffix: "", format: "int" },
  { label: "Paid for AWS", value: 0, prefix: "$", suffix: "", format: "decimal" },
];

const roles = [
  {
    who: "Organiser",
    what: "Types the crowd size and hours; gets how many 20 L jars and cups to order, stations and runners, QR sheets, and a checklist that ticks itself as volunteers count stock.",
  },
  {
    who: "Volunteer at a station",
    what: "Scans a QR code, no app or login. Three big buttons: Jar swapped, Last jar, Cups low. Works with no signal and in Hindi.",
  },
  {
    who: "Runner",
    what: "Gets one job at a time: take 6 jars to Food court. On my way, then Delivered. Ignore it for three minutes and it goes to someone else.",
  },
  {
    who: "Afterwards",
    what: "Litres served, plastic bottles avoided, dry minutes per station, runner times, a CSV, and “use as next year's plan”.",
  },
];

const tapChain = [
  { label: "Volunteer's phone", detail: "saved to IndexedDB first, sent when there's signal" },
  { label: "API Gateway", detail: "checks the link token, queues, answers 202" },
  { label: "SQS", detail: "absorbs the peak; dead-letter queue after 3 tries" },
  { label: "Consumer Lambda", detail: "one DynamoDB transaction per tap, exactly once" },
];

const dispatchChain = [
  { label: "Every 2 minutes", detail: "EventBridge Scheduler runs the projector" },
  { label: "Run-dry projection", detail: "same code as the live board in the browser" },
  { label: "Step Functions", detail: "assign, wait for On my way, else reassign" },
  { label: "Runner's phone", detail: "Delivered restocks the station" },
];

const services = [
  {
    title: "API Gateway → SQS → Lambda",
    blurb: "Taps are checked and queued, never written inline, so a burst at the peak never waits on the database.",
  },
  {
    title: "SQS dead-letter queue",
    blurb: "A tap that can't be saved after 3 tries is kept for 14 days and fires a CloudWatch alarm the moment it lands.",
  },
  {
    title: "EventBridge Scheduler",
    blurb: "Projects each station's run-dry time even when nobody is tapping, with no server to keep alive.",
  },
  {
    title: "Step Functions",
    blurb: "One execution per runner job. Waits use task tokens, so nothing polls and nothing runs while a runner walks.",
  },
  {
    title: "DynamoDB, on demand",
    blurb: "One table, one partition per event, TTL on everything. Live events come from an index, never a scan.",
  },
  {
    title: "S3 + CloudFront",
    blurb: "Site and /api on one https address, so phones skip CORS preflights and the service worker works offline.",
  },
];

const bill = [
  { service: "Step Functions", cost: "$0.68" },
  { service: "DynamoDB", cost: "$0.02" },
  { service: "S3, API Gateway, CloudFront, CloudWatch", cost: "< $0.01" },
];

export default function Quench() {
  return (
    <ProjectPage
      slug="quench"
      tagline="A water control room for plastic-free events: refill stations that don't run dry, so nobody goes back to plastic bottles."
      tags={platformTags}
    >
      <Section label="Overview" className="max-w-3xl">
        <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
          Events that ban plastic bottles replace them with refill stations: a 20 L jar on a
          tap, a volunteer, a stack of cups. It works until the food court runs dry at 8 pm,
          the volunteer&rsquo;s WhatsApp message gets buried, and people queue at the stall
          selling bottled water.
        </p>
        <p className="max-w-[64ch] text-lg leading-8 text-bone [&+p]:mt-5">
          Quench plans how many jars and cups each station needs, checks every station is
          stocked before the gates open, predicts which one is about to run dry and sends a
          runner before it does, and gives the organiser the numbers at the end.
        </p>
      </Section>

      <Section label="Try it">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="max-w-[56ch] text-lg leading-8 text-bone">
              Planning and the simulation need no account. To store an event, use the demo
              account; it has two finished sample events to look at straight away.
            </p>
            <dl className="mt-6 max-w-md border-b border-paper/10">
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 border-t border-paper/10 py-3">
                <dt className="font-code text-[11px] uppercase tracking-[0.22em] text-dust">Email</dt>
                <dd className="break-all font-code text-sm text-paper">judge@quench.kavyan.dev</dd>
              </div>
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 border-t border-paper/10 py-3">
                <dt className="font-code text-[11px] uppercase tracking-[0.22em] text-dust">Password</dt>
                <dd className="font-code text-sm text-paper">QuenchJudge2026</dd>
              </div>
            </dl>
          </div>
          <ExternalLink href={LIVE_URL} primary>
            Open Quench
          </ExternalLink>
        </div>
        <p className="mt-8 max-w-[56ch] text-sm leading-6 text-bone/80">
          Built solo in four days for Environmental Hacks (WeMakeDevs × AWS), 8–11 Oct 2026,
          on the Waste and Energy track.
        </p>
      </Section>

      <Section label="The live board">
        <Shot
          src={boardShot}
          w={1280}
          h={1194}
          eager
          alt="Quench live board: Food court needs jars now and a runner has been assigned, Stage has cups low, Library hasn't been counted, Main gate is fine and folded away"
          caption="Problems first. Food court is on its last jar and Step Functions has already assigned Asha; stations nobody has counted are flagged; OK stations fold away."
        />
      </Section>

      <Section>
        <StatRow>
          {statTiles.map((tile) => (
            <StatTile key={tile.label} {...tile} />
          ))}
        </StatRow>
      </Section>

      <Section label="Who gets what">
        <div className="grid gap-4 sm:grid-cols-2">
          {roles.map((r) => (
            <div key={r.who} className={CARD}>
              <CardTrim />
              <h3 className="text-sm font-medium tracking-tight">{r.who}</h3>
              <p className="mt-3 text-sm leading-6 text-bone">{r.what}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="On the phones">
        <div className="grid gap-10">
          <Shot
            src={volunteerShot}
            w={1590}
            h={844}
            alt="Four volunteer screens: an intro, the stock count before the gates open, the tap buttons, and the buttons after a few taps with a list of taps sent"
            caption="The volunteer's page, one step at a time: what the job is, count the stock, then three buttons."
          />
          <div className="grid max-w-xl grid-cols-2 gap-6 sm:gap-10">
            <Shot
              src={planShot}
              w={600}
              h={1298}
              alt="Water plan for a 2,000-person evening: 75 to 150 jars and 7,500 to 15,000 cups, with steppers for stations and runners and a Create event button"
              caption="Set up: the water plan from crowd size and hours."
            />
            <Shot
              src={runnerShot}
              w={600}
              h={1298}
              alt="Runner page for Asha: a new job to take 6 jars to Food court, with On my way and Delivered buttons"
              caption="A runner's job, with On my way and Delivered."
            />
          </div>
        </div>
      </Section>

      <Section label="How a tap travels">
        <p className="mb-8 max-w-[62ch] text-lg leading-8 text-bone">
          The peak is when every station swaps a jar at once, and it&rsquo;s also when the
          signal is worst. Taps are saved on the phone, queued on arrival and written in
          batches.
        </p>
        <div className="grid gap-10">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-dust">A volunteer taps</p>
            <ChainDiagram steps={tapChain} />
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-dust">A station is about to run dry</p>
            <ChainDiagram steps={dispatchChain} />
          </div>
        </div>
      </Section>

      <Section label="Why each service">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className={CARD}>
              <CardTrim />
              <h3 className="text-sm font-medium tracking-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-bone">{s.blurb}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-bone/80">
          One SAM template, Node.js 22 on arm64 Lambdas, no EC2, no RDS and no VPC, so no NAT
          gateway billing by the hour.{" "}
          <a href={ARCH_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-paper/20 underline-offset-4 hover:text-[color:var(--neon)]">
            The full architecture
          </a>
          .
        </p>
      </Section>

      <Section label="Engineering notes" className="max-w-3xl">
        <BulletList>
          <Bullet>
            Taps count exactly once. Each gets an id on the phone, and the tap plus the
            station&rsquo;s counters are written in one DynamoDB transaction that only succeeds
            if the id is new. Offline retries, SQS redelivery and double taps change nothing.
          </Bullet>
          <Bullet>
            SQS doesn&rsquo;t keep order, so a station&rsquo;s &ldquo;last tap&rdquo; and
            &ldquo;stock count&rdquo; times only ever move forward: a late tap is counted but
            never overwrites newer information.
          </Bullet>
          <Bullet>
            The run-dry projection lives in <Code>src/core/projection.js</Code> and runs both
            in the browser and in the scheduled Lambda, so the board and the dispatcher can
            never disagree.
          </Bullet>
          <Bullet>
            The simulation changed the product. Topping a station up by about an hour lost to
            a disciplined WhatsApp group every time, because at the peak runners spent their
            time carrying one or two jars. Runner time is the scarce thing, so a delivery now
            covers about two hours, 2 to 6 jars.
          </Bullet>
        </BulletList>
      </Section>

      <Section label="The bill">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div className="max-w-[62ch] space-y-5 text-lg leading-8 text-bone">
            <p>
              Almost all of it came from one bug on 9 Oct: test events with no runners kept
              re-opening jobs, about 28,000 state transitions against a free tier of 4,000.
            </p>
            <p>
              The fix the next day: events with no runners get no jobs, an execution starts
              only when a runner is free (waiting is free), and the tests delete their own
              events. Credits covered it, so the real spend was $0.00.
            </p>
          </div>
          <div className="overflow-x-auto rounded-[2px] border border-paper/10 bg-carbon">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-paper/10 text-xs uppercase tracking-[0.25em] text-dust">
                  <th className="px-6 py-4 font-medium">1–10 Oct</th>
                  <th className="px-4 py-4 text-right font-medium">Cost</th>
                </tr>
              </thead>
              <tbody>
                {bill.map((b, i) => (
                  <tr key={b.service} className={i !== bill.length - 1 ? "border-b border-paper/5" : ""}>
                    <td className="px-6 py-3 text-bone">{b.service}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">{b.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section label="Before and after">
        <div className="grid gap-10 md:grid-cols-2">
          <Shot
            src={hubShot}
            w={1280}
            h={1000}
            alt="Event hub set-up checklist: stations and runners, send everyone their link, order jars and cups, and the stock check before the gates open"
            caption="Before: the set-up checklist ticks itself as stations are named, the order is sent and volunteers count stock."
          />
          <Shot
            src={summaryShot}
            w={1280}
            h={1396}
            alt="Event summary: 260 litres of water dispensed, up to 520 plastic bottles not bought, stations stocked before the start, runner jobs and a table by station"
            caption="After: water served, bottles avoided, dry minutes and runner times, with a CSV and next year's plan."
          />
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ExternalLink href={LIVE_URL} primary>
            Open Quench
          </ExternalLink>
          <ExternalLink href={REPO_URL}>Read the code</ExternalLink>
        </div>
      </Section>
    </ProjectPage>
  );
}
