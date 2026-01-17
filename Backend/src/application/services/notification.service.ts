export class send_notification_service {
  private readonly user_id: String;
  private readonly event: String;

  constructor(user_id_injection: string, event_injection: string) {
    this.user_id = user_id_injection;
    this.event = event_injection;
  }

  async run() {
    const response = await send_notification(this.user_id, this.event);
    return response;
  }
}
