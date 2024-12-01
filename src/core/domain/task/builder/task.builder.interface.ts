import { Tag, Task, TaskPriority } from "../types";

/**
 * Interface defining the contract for building Task objects.
 * Following the Builder Pattern, this interface provides methods for setting
 * individual task properties and a final build method.
 */
export interface ITaskBuilder {
  /**
   * Sets the task title
   * @param title - The title of the task
   */
  withTitle(title: string): this;

  /**
   * Sets the task description
   * @param description - Optional description of the task
   */
  withDescription(description: string): this;

  /**
   * Sets the task priority
   * @param priority - Priority level of the task
   */
  withPriority(priority: TaskPriority): this;

  /**
   * Sets the task due date
   * @param date - Due date for the task
   */
  withDueDate(date: Date): this;

  /**
   * Sets the task assignee
   * @param assigneeId - ID of the user assigned to the task
   */
  withAssignee(assigneeId: string): this;

  /**
   * Adds tags to the task
   * @param tags - Array of tags to be added to the task
   */
  withTags(tags: Tag[]): this;

  /**
   * Builds and returns the final Task object
   * @throws ValidationError if required fields are missing or invalid
   */
  build(): Task;
} 