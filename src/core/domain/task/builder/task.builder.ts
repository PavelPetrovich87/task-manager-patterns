import { Task, TaskPriority, TaskStatus, Tag } from '../types';
import { ITaskBuilder } from './task.builder.interface';
import { TaskValidationError } from '../task.errors';

/**
 * TaskBuilder implements the Builder Pattern to construct Task objects step by step.
 * 
 * The Builder Pattern is used here to:
 * 1. Simplify construction of complex objects
 * 2. Enforce validation during construction
 * 3. Allow optional parameters without constructor overloading
 * 4. Make the code more maintainable and readable
 * 
 * Key Builder Pattern Elements:
 * - Builder Interface (ITaskBuilder): Defines the construction steps
 * - Concrete Builder (TaskBuilder): Implements the construction steps
 * - Product (Task): The complex object being built
 * - Fluent Interface: Method chaining with 'return this'
 * 
 * @example
 * ```typescript
 * // Example of the fluent interface provided by the Builder Pattern
 * const task = new TaskBuilder('user-123')
 *   .withTitle('Complete project')
 *   .withPriority(TaskPriority.HIGH)
 *   .withDueDate(new Date('2024-12-31'))
 *   .build();
 * 
 * // Without Builder Pattern, we would need to do this:
 * const task = {
 *   id: { value: crypto.randomUUID() },
 *   title: 'Complete project',
 *   priority: TaskPriority.HIGH,
 *   status: TaskStatus.TODO,
 *   dueDate: new Date('2024-12-31'),
 *   createdAt: new Date(),
 *   updatedAt: new Date(),
 *   creatorId: 'user-123'
 * };
 * ```
 */
export class TaskBuilder implements ITaskBuilder {
  /**
   * The partially constructed task object.
   * Builder Pattern allows us to work with a partial object
   * until we're ready to produce the final, validated product.
   */
  private task: Partial<Task>;

  /**
   * Initialize a new TaskBuilder with required fields and defaults.
   * The Builder Pattern allows us to set sensible defaults while
   * still allowing them to be overridden later if needed.
   * 
   * @param creatorId - ID of the user creating the task
   */
  constructor(creatorId: string) {
    this.task = {
      id: { value: crypto.randomUUID() },
      status: TaskStatus.TODO,
      priority: TaskPriority.MEDIUM,
      createdAt: new Date(),
      updatedAt: new Date(),
      creatorId
    };
  }

  /**
   * Each 'with' method in the Builder Pattern:
   * 1. Validates the input
   * 2. Updates the partial product
   * 3. Returns 'this' for method chaining
   * 
   * This approach ensures that each piece of the object
   * is valid before it becomes part of the final product.
   */
  public withTitle(title: string): this {
    this.validateTitle(title);
    this.task.title = title;
    return this;
  }

  public withDescription(description: string): this {
    if (description.length > 1000) {
      throw new TaskValidationError('Description must not exceed 1000 characters');
    }
    this.task.description = description;
    return this;
  }

  public withPriority(priority: TaskPriority): this {
    this.validatePriority(priority);
    this.task.priority = priority;
    return this;
  }

  public withDueDate(date: Date): this {
    this.validateDueDate(date);
    this.task.dueDate = date;
    return this;
  }

  public withAssignee(assigneeId: string): this {
    if (!assigneeId.trim()) {
      throw new TaskValidationError('Assignee ID cannot be empty');
    }
    this.task.assigneeId = assigneeId;
    return this;
  }

  public withTags(tags: Tag[]): this {
    this.validateTags(tags);
    this.task.tags = tags;
    return this;
  }

  /**
   * The build method is where the Builder Pattern completes its work.
   * It performs final validation and returns the completed product.
   * 
   * This is a crucial part of the pattern as it ensures that the
   * object is fully constructed and valid before it can be used.
   * 
   * @throws TaskValidationError if required fields are missing or invalid
   * @returns The fully constructed and validated Task object
   */
  public build(): Task {
    this.validateRequiredFields();
    return this.task as Task;
  }

  /**
   * Private validation methods are another benefit of the Builder Pattern.
   * They encapsulate validation logic and can be reused across different
   * construction steps.
   */
  private validateRequiredFields(): void {
    if (!this.task.title) {
      throw new TaskValidationError('Title is required');
    }
    if (!this.task.creatorId) {
      throw new TaskValidationError('Creator ID is required');
    }
  }

  private validateTitle(title: string): void {
    if (!title.trim()) {
      throw new TaskValidationError('Title cannot be empty');
    }
    if (title.length > 100) {
      throw new TaskValidationError('Title must not exceed 100 characters');
    }
  }

  private validatePriority(priority: TaskPriority): void {
    if (!Object.values(TaskPriority).includes(priority)) {
      throw new TaskValidationError('Invalid priority value');
    }
  }

  private validateDueDate(date: Date): void {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new TaskValidationError('Invalid due date');
    }
    if (date < new Date()) {
      throw new TaskValidationError('Due date cannot be in the past');
    }
  }

  private validateTags(tags: Tag[]): void {
    if (!Array.isArray(tags)) {
      throw new TaskValidationError('Tags must be an array');
    }
    
    tags.forEach(tag => {
      if (!tag.id || !tag.name) {
        throw new TaskValidationError('Each tag must have an id and name');
      }
      if (tag.name.length > 50) {
        throw new TaskValidationError('Tag name must not exceed 50 characters');
      }
    });
  }
} 