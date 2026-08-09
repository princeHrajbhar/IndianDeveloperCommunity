import { PageHeading, Panel } from "@/src/components/profile/profile-ui";

export function UnavailableFeature({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
}) {
  return (
    <>
      <PageHeading
        eyebrow={eyebrow}
        title={title}
        accent={accent}
        description={description}
      />
      <Panel>
        <div className="relative overflow-hidden px-6 py-16 text-center sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/[0.055] blur-3xl" />
          <span className="relative mx-auto block h-12 w-12 rounded-full border border-dashed border-cyan-300/30" />
          <p className="relative mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/60">
            Empty section
          </p>
          <h2 className="relative mt-3 text-xl font-bold text-white">
            Data not present as of now
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
            There is no saved data for this section yet. Real information will appear here when its backend workflow is available.
          </p>
        </div>
      </Panel>
    </>
  );
}
