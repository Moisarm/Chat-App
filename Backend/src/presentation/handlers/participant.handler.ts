import type { Server, Socket } from "socket.io";
import type { new_participant_dto } from "../../application/dto/participant.dto";

export class participant_handler {
  constructor(
    private io: Server,
    private socket: Socket,
    //use cases missing
  ) {}

  async handle_events() {
    this.socket.on("add_participant", (data) => {
      console.log(data);
    });
  }

  private async on_add_participant(
    io: Server,
    socket: Socket,
    data: new_participant_dto,
  ) {}
}
