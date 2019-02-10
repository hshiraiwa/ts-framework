import { Job } from "ts-framework-common";
import MainServer from '../server';
export default class WelcomeJob extends Job {
    run(server: MainServer): Promise<void>;
}
