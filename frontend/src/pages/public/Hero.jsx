import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle } from "lucide-react";
import kids from "../../assets/kids.jpg";
import { useEffect } from "react";
const HERO_BENEFITS = ["No setup fees", "24/7 Support", "Secure & Compliant"];

export default function Hero({ id }) {
useEffect(() => {
 const fetchData = async() => {
  const response = await fetch("http://localhost:3000/");

  const data = await response.json();
  console.log(data);
 };
 fetchData();
}, []);

  return (
    <section
      id={id}
      className="w-full py-12 md:py=24 lg:py-32 md:py-24 xl:py-48 bg-gradient-to-b from-muted/50 to-background"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                Your Digital Barangay
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Barangay Services at Your Fingertips
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Get barangay documents, report issues, and stay connected with
                your community - all from your phone or computer. Making
                government services accessible to everyone.
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="h-12">
                Access Services Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 bg-transparent"
              >
                Learn How
              </Button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {HERO_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={kids}
              width="600"
              height="400"
              alt="Community members using barangay services on their phones"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
