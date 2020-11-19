import Logger from './Logger';
import { Vector3 } from './maths';


//language test
class CodeTests {
    static test(a, b){
        return a == b;
    }
    static async dialogCheck(functions){
        
    }
    static async langTest(functions, entities){
        Logger.log(3, "Started testing!");
        functions[7]();
        
        let detectors = []
        let sources = []
        let guns = []

        //First test case detector creation
        


        //test create and delete
        for(let j = 0;j<10;j++){
            for(let i = 0;i<10;i++){
                let r = Math.floor(1+Math.random() * 3);
                switch(r){
                    case(1):
                        await functions[r]("Cube", 0, 0, 0, 0, 0, 0, 10, 10, 10, "Pb", 'cube', null, new Vector3(1, 1, 1)).then((d)=>{
                            detectors.push(d);
                        });
                        break;
                    case(2):
                        await functions[r]("source",0,0,0,"Co60",null, new Vector3(1,1,1)).then(d=>{
                            sources.push(d);
                        });
                        break;
                    case(3):
                        await functions[r]("gun", 0,0,0,0,1,0,100,null,new Vector3(1,1,1),1).then(d=>{
                            guns.push(d);
                        });
                        break;
                }
            }
            for(let i = 0;i<10;i++){
                let r = Math.floor(4+Math.random() * 3);
                switch(r){
                    case(4):
                        if(detectors.length > 0) functions[r](detectors[Math.floor(Math.random() * detectors.length)][0],detectors[0][1]-1);
                        break;
                    case(5):
                        if(sources.length > 0) functions[r](sources[Math.floor(Math.random() * sources.length)][0],sources[Math.floor(Math.random() * sources.length)][1]-1);
                        break;
                    case(6):
                        if(guns.length > 0) functions[r](guns[Math.floor(Math.random() * guns.length)][0],guns[Math.floor(Math.random() * guns.length)][1]-1);
                        break;
                }
            }
        }
        

        //test detectors
        //functions[1]("Cube", 0, 0, 0, 0, 0, 0, 10, 10, 10, "Pb", 'cube', null, new Vector3(1, 1, 1));
        


        //last step is reseting the setup
        functions[0]();

        //functions[7]();

        Logger.log(3, "Finished testing!");
    }
}

export default CodeTests;