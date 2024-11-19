import { Features, Intro, Reasons, Steps } from "@/components";





export default function Home() {
  return (
    <div className="pt-32 bg-gray-50">
      <div>
        <Intro />
        <Features/>
        <Steps/>
        <Reasons/>
      </div>
    </div>
  );
}
