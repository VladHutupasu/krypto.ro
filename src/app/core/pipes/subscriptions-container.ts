import { Subscription } from "rxjs";

export class SubscriptionsContainer {
  private subscriptions: Array<Subscription> = [];

  set add(s: Subscription) {
    this.subscriptions.push(s);
  }

  dispose() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
