export class ResponseHelper {
	static PrettyfieResponse(response:any) {
		if (typeof response === 'string') {
			response = ResponseHelper.TryParseToObject(response);
		}
		if(response.responseJSON){
			if(response.responseText){
				delete response.responseText;
			}
			if(response.responseJSON.message){
				response.responseJSON.message = ResponseHelper.TryParseToObject(response.responseJSON.message);
			}
		}
		return JSON.stringify(response,null,4);
	}

	static TryParseToObject(response:string) {
		var result;
		try {
			result = JSON.parse(response);
		} catch (e) {
			return response;
		}
		return result;
	}
}