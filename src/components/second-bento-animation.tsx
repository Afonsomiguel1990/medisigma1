import { Icons } from "@/components/icons";
import { OrbitingCircles } from "@/components/ui/orbiting-circle";
import { Droplet, ShieldCheck, Microscope, FileText, AlertTriangle, UserCheck, Wind, Building, Thermometer } from "lucide-react";

export function SecondBentoAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
      <div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-20"></div>

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 size-24 bg-white p-0 rounded-full z-30 md:bottom-0 md:top-auto md:translate-y-0">
        <Icons.logo className="h-[200px] w-[200px] object-contain" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
          <OrbitingCircles
            index={0}
            iconSize={60}
            radius={100}
            reverse
            speed={1}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <Droplet className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <Microscope className="w-6 h-6" />
            </div>
          </OrbitingCircles>

          <OrbitingCircles index={1} iconSize={60} speed={0.5}>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <UserCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <Wind className="w-6 h-6" />
            </div>
          </OrbitingCircles>

          <OrbitingCircles
            index={2}
            iconSize={60}
            radius={230}
            reverse
            speed={0.5}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <Building className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <Thermometer className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow-md text-secondary">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}
