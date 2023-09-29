import * as dotenv from 'dotenv';
import { NotifiClient, NotifiEnvironment, createGraphQLClient, createNotifiService } from '@notifi-network/notifi-node';

const env: NotifiEnvironment = 'Development';
const gqlClient = createGraphQLClient(env);
const notifiService = createNotifiService(gqlClient);
const client = new NotifiClient(notifiService);

dotenv.config();
class App {
  private JWT = '';

  public async start() {
    const result = await client.logIn({
      sid: process.env.MY_SID,
      secret: process.env.MY_SECRET,
    });

    this.JWT = result.token;
  }

  public async sendMessage() {
    await client.sendBroadcastMessage(this.JWT, {
      topicName: 'janedao123__announcements',
      variables: [
        {
          key: 'message',
          value: 'Test Test This is the body of the message I would like my users to receive!',
        },
        {
          key: 'subject',
          value: 'Some Special Announcement',
        },
      ],
    });
  }
}

export default App;