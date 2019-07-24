import Mysql from '../mysql/mysql';
import{Router,Request, Response} from 'express';

const router=Router();

router.get('/heroes',(req:Request,res:Response)=>{
    const query=` 
        select 
            * from heroes `
            Mysql.runQuery(query,(err:any,heroes:object[])=>{
                if (err){
                    res.status(400).json({
                        ok:false,
                        error:err
                        
                    })
                }else{
                    res.json({
                        ok:true,
                        heroes,
                
                    })
                }
            })
   
})
router.get('/heroes/:id',(req:Request,res:Response)=>{
    const id=req.params.id;
    const escapeId= Mysql.instance.connection.escape(id);
    const query=` 
        select * 
        from heroes WHERE id= ${escapeId}
        `
        Mysql.runQuery(query,(err:any,heroes:object[])=>{
            if (err){
                res.status(400).json({
                    ok:false,
                    error:err
                    
                })
            }else{
                res.json({
                    ok:true,
                    heroes,
            
                })
            }
        })
})

export default router;