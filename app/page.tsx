import { Features, Intro, Reasons, Steps } from "@/components";





export default function Home() {
  return (
    <div className="bg-white">
      <div>
        <Intro />
        <Features/>
        <Steps/>
        <Reasons/>
      </div>
    </div>
  );
}
