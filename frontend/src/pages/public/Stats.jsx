import { STATS } from "@/lib/constants";

export function Stats({ id }) {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center space-y-2 text-center"
            >
              <div className="text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
