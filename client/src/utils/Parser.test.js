import { Vector3 } from './Maths';
import Parser from './Parser';

test("Format test", ()=>{
    expect(Parser.checkFloat("0,0,0",new Vector3(),1)).toBe(true);
    expect(Parser.checkFloat("a,0,0",new Vector3(),1)).toBe(false);
});