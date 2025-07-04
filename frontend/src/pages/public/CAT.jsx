import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CallToAction({ id }) {
  return (
    <section
      id={id}
      className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join Your Digital Barangay Community
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Thousands of residents are already enjoying convenient access to
              barangay services. Join them today and experience the difference.
            </p>
          </div>

          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" variant="secondary" className="h-12">
              Register Now - It's Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Contact Your Barangay
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
