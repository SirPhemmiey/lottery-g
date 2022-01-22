import { getRedis } from ".";

describe('redis ', () => {
    it('should set', () => {
        return getRedis().set("test", { v: "test" }).then((err) => {
            return getRedis().get("test").then((val) => {
                console.log(val)
            });
        });
        
    });

    it('get', () => {
        return getRedis().get("blah").then((val) => {
            console.log(val)
        });
    })
});