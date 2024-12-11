import { assertEquals } from "assert";

import { addTask, taskQueue } from "@/src/addTask.ts";

Deno.test("addTask adds tasks to the queue", () => {
  addTask(async () => {});
  assertEquals(taskQueue.length, 1);
});
