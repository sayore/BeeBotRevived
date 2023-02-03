import { Logging } from 'supernode/Base/Logging';
import { TypeOfApplication, SafetyMode } from 'supernode/Base/Application';
import { ExpressApplication } from 'supernode/Base/mod';
import { Env } from '../app';


export class BeeWebserverApplication extends ExpressApplication {
	subdomain = Env.subdomain;
	domain = Env.domain;
	standalone = false;
	Type: TypeOfApplication.Express;
	uid = `BeeWebserver (${this.subdomain}.${this.domain})`;
	error?(eventdata?: any): void {
		Logging.log(eventdata);
	}
	exit?(eventdata?: any): void {
		Logging.log(eventdata);
	}
	needsSafeMode?: SafetyMode = SafetyMode.NeedsCatch;

	init(eventdata?: any): void {
		this.app.get('/', (req, res) => {
			res.send('Hello World!');
		});
	}
	typeOfApplication = TypeOfApplication.Express;
}
