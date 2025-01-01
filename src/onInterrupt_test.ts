import { assertEquals } from "assert";

import { onInterrupt, taskQueue } from "@/src/onInterrupt.ts";

Deno.test("onInterrupt adds tasks to the queue", () => {
  onInterrupt(async () => {});
  assertEquals(taskQueue.length, 1);
});
