export default class Utils {
    static qsToObject(querystring: string): any {
        let object = {};
        let splitQs: any = querystring.split('&');
        splitQs.forEach(
            item => {
                item = item.split('=');
                object[item[0]] = item[1];
            }
        );
        return object;
    }

    static objectToQs(object: any): string {
        let qs: string = '';
        for(let prop in object){
            if(qs.length > 0) qs += '&';
            qs += encodeURIComponent(prop) + '=' + encodeURIComponent(object[prop]);
        }
        return qs;
    }
}