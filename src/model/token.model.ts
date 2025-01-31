

export class TokenModel{
    token:string;
    identity:string;

    getToken():string{
        return this.token;
    }

    getIdentity():string{
        return this.identity;
    }

    setToken(token:string):void{
        this.token = token;
    }

    setIdentity(identity:string):void{
        this.identity = identity;
    }
}

