export abstract class Tracker {
  abstract trackError(error: Error): void;
}
