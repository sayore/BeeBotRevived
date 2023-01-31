class MarrigeHelper {
	jsonObj: any;
	constructor(json: any) {
		this.jsonObj = json;
	}

	addData(uuid: string) {

		if (!!this.jsonObj["MarrigeID"]) {
			return false;
		} else {
			this.jsonObj.MarrigeID = uuid;
			return this.jsonObj;
		}

	}

	removeData() {

		if (!!this.jsonObj["MarrigeID"]) {
			delete this.jsonObj["MarrigeID"];
			return this.jsonObj;
		} else {
			return false;
		}
	}
}
