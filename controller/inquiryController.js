import Inquiry from "../models/inquiry.js";
import {isItAdmin, isItCustomer} from "../controller/userController.js"; 

export async function addInquiry(req,res)
{
        try{

            if(isItCustomer(req)){
                const data = req.body;
                data.email = req.user.email;
                data.Phone = req.user.Phone;

                let id = 0;

                const inquiries = await Inquiry.find
                ().sort({id: -1}).limit(1);

                if(inquiries.length ==  0)
                {
                    id = 1
                }else{
                    id = inquiries[0].id + 1;
                }

                data.id = id;
                const newInquiry = new Inquiry(data);
                await newInquiry.save();
                res.status(200).send({
                    message: "Inquiry added successfully",
                    id: id,
                });


            }

        }
        catch(error)
        {
            console.log("cannot add inquiry", error);
        }

} 


export async function getInquiries(req,res){


  try{
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email: req.user.email});
            res.status(200).send(inquiries);
            return;
        }
        else if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            res.status(200).send(inquiries);
            return;

        }
        else{
            res.status(401).send("you are not authorized to view inquiries");
            return;
        }
  }

  catch(error){
      console.log("cannot get inquiries", error);
  }
        
   
}



export async function deleteInquiry(req, res) {
    try {
        if (isItAdmin(req)) {
            const id = req.params.id;
        
            const inquiry = await Inquiry.findOne({ id: id });
            if (!inquiry) {
                res.status(404).json({
                    message: "Inquiry not found",
                });
                return;
            }
        
            await Inquiry.deleteOne({ id: id });
            res.status(200).json({
                message: "Inquiry deleted successfully",
            });
            return;
        }
         else if (isItCustomer(req)) {
            const id = req.params.id;
            const inquiry = await Inquiry.findOne({ id: id });

            if (inquiry == null) {
                res.status(404).json({
                    message: "Inquiry not found",
                });
                return;
            } else {
                if (inquiry.email == req.user.email) {
                    await Inquiry.deleteOne({ id: id });
                    res.status(200).json({
                        message: "Inquiry deleted successfully",
                    });
                    return;
                }
            }
        } 
        res.status(401).json({
            message: "You are not authorized to delete this inquiry",
        });
    } catch (error) {
        res.status(400).json({
            message: "Cannot delete inquiry",
        });
    }
}


export async function updateInquiry(req,res){

    try{
        if(isItAdmin(req)){
            const id = req.params.id;
            const inquiry = await Inquiry.findOne({id: id});
            if(inquiry == null){
                res.status(404).json({
                    message: "Inquiry not found",
                });
                return;
            }
            const data = req.body;
            await Inquiry.updateOne({id: id}, data);
            res.status(200).json({
                message: "Inquiry updated successfully",
            });
            return;
        }
        
        else if (isItCustomer(req)) {

            const id = req.params.id;
            const inquiry = await Inquiry.findOne({ id: id });

            if (inquiry == null) {
                res.status(404).json({
                    message: "Inquiry not found",
                });
                return;
            } else {
                if (inquiry.email == req.user.email) {
                    const data = req.body;
                    await Inquiry.updateOne({ id: id },{message: data.message});
                    res.status(200).json({
                        message: "Inquiry updated successfully",
                    });
                    return;
                }
            }
            res.status(401).json({
                message: "You are not authorized to update this inquiry",
            });

        }
        else{
            res.status(401).json({
                message: "You are not authorized to update this inquiry",
            });
        }
    }




    catch(error){
        res.status(400).json({
            message: "Cannot update inquiry",
        });
    }

}


