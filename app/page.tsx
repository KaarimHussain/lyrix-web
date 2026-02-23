import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="min-h-screen p-5">
        <h1 className="text-2xl font-bold">Hello World From Kaarim Hussain</h1>

        <div className="flex gap-2 flex-col w-fit">
          <Button variant={"default"}>
            Click me
          </Button>

          <Button variant={"secondary"}>
            Click me
          </Button>

          <Button variant={"destructive"}>
            Click me
          </Button>

          <Button variant={"outline"}>
            Click me
          </Button>

          <Button variant={"link"}>
            Click me
          </Button>

          <Button variant={"ghost"}>
            Click me
          </Button>
        </div>
      </div>
    </>
  );
}
