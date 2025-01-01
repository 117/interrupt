/** @module interrupt */

/**
 * Represents a task to be executed with an optional error handler.
 * @interface
 */
type Task = {
  /**
   * The asynchronous task function to execute.
   * @returns {Promise<void>}
   */
  task: () => Promise<void>;

  /**
   * Optional error handler for the task.
   * @param {*} error - The error thrown by the task.
   */
  errorFn?: (error: unknown) => Promise<void>;
};

/** The queue of tasks to be executed before interruption. */
const taskQueue: Task[] = [];

/**
 * Represents options for a task.
 * @interface
 */
type onInterruptOpts = {
  /**
   * Optional error handler for the task.
   * @param {unknown} error - The error thrown by the task.
   */
  errorFn?: (error: unknown) => Promise<void>;
};

/**
 * Adds a task to the task queue to be processed before interruption.
 *
 * @param {() => Promise<void>} task - The asynchronous task function to add.
 * @param {TaskOptions} [options] - Optional settings for the task.
 */
const onInterrupt = (
  task: () => Promise<void>,
  options?: onInterruptOpts,
): number => taskQueue.push({ task, ...options });

/**
 * Processes all tasks in the task queue sequentially.
 * Each task's error is handled by its own error handler if provided.
 * If no error handler is provided, the error is thrown.
 *
 * @async
 * @returns {Promise<void>}
 */
const processTasks = async (): Promise<void> => {
  for (const { task, errorFn } of taskQueue) {
    try {
      await task();
    } catch (error) {
      await errorFn?.(error);
    }
  }
};

/**
 * Handler function to be executed before an interrupt signal causes the process to exit.
 * Processes all tasks and then exits the process.
 *
 * @async
 * @returns {Promise<void>}
 */
const onBeforeInterrupt = async (): Promise<void> =>
  await processTasks().then(() => Deno.exit());

/** Registers the interrupt handlers for SIGINT and SIGTERM signals. */
Deno.addSignalListener("SIGINT", onBeforeInterrupt);
Deno.addSignalListener("SIGTERM", onBeforeInterrupt);

export { onInterrupt, taskQueue };
