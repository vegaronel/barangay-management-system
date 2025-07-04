import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FEATURES } from "@/lib/constants";

export function Features({ id }) {
  return (
    <section id={id} className="w-full py-12 md:py=24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="secondary">Community Services</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need from Your Barangay
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Access essential barangay services easily and conveniently. No
              more long lines or complicated processes - everything you need is
              just a click away.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title}>
                <CardHeader>
                  <IconComponent className="h-10 w-10 text-primary" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
