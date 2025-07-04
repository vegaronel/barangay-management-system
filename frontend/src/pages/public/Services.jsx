import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { SERVICE_BENEFITS } from "@/lib/constants";
import browsing from "../../assets/browsing.svg";

export function Services({ id }) {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary">How It Works</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Simple Steps to Get What You Need
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Getting barangay services has never been easier. Follow these
                simple steps and get your documents or report issues without
                leaving your home.
              </p>
            </div>

            <ul className="grid gap-4">
              {SERVICE_BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button>Get Started</Button>
              <Button variant="outline">See All Services</Button>
            </div>
          </div>

          <img
            src={browsing}
            width="550"
            height="400"
            alt="Digital Services"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
