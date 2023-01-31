import { Environment, Logging } from 'supernode/Base/mod';
import process from 'process';

// Load Environment and return it 
export default function(envFile) : { envV : number , beeToken: string, bobToken: string, domain:string, subdomain:string } {
  var defaultEnv = { envV: 0, beeToken: "NoTokenYet", bobToken: "NoTokenYet", domain:"sayore.de", subdomain:"bee" }
  if (!Environment.checkExists(envFile)) {
    Environment.save(envFile, defaultEnv)
    Logging.log("There was no config File yet, it has been written to: " + Environment.getEnvFilePath(envFile + "\nBe sure to add the Tokens there."));
    process.exit(-1);
  }
  let Env = <{ envV: number, beeToken: string, bobToken: string,domain:string,subdomain:string }>Environment.load("BeeToken.json");
  if (Env.beeToken == "NoTokenYet") {
    Logging.log("There was a config File yet, but it's missing the Tokens, find it here: " + Environment.getEnvFilePath(envFile + "\nBe sure to add the Tokens there."));
    process.exit(-1);
  }
  Env = Object.assign(defaultEnv, Env);

  return Env;
}