export class HtmlHelper {
	static parseQuery(q:string) {
		if(!q)return q;
		q = q.replace(/\?/g, ""); //Ensure only one ? otherwise breaks query(jQuery is poo)
		q = "?" + q;
		return q;
	}

	static parseEndpoint(endpoint:string, uriParams?:string) {
		if(!endpoint) return "";
		endpoint = endpoint.slice(1);
		if(typeof endpoint !== "string") return "";
		return endpoint.replace(/\{.*\}/g, uriParams || "");
	}

	static build(endpoint:string,query?:string){
		return endpoint + (query || "");
	}
}
