const { default: mongoose } = require("mongoose");
const equipmentModel=require("../models/equipment.model");
const userModel = require("../models/user.model");
const uploadFile=require("../services/storage.service")


async function addEquipment(req,res){
    try{
            const {name,category,price,location,description,availability,vehicleNo}=req.body;
            const image=req.file
    if(!name || !category || !price || !location || !description || !image || !vehicleNo){
        return res.status(400).json({
            message:"All required fields must be provided"
        })
    }
    if(req.user.status !== "approved"){
        return res.status(403).json({
            message:"User approval is pending , not allowed to add equipments"
        })
    }
    // IMAGEKIT 
    const result=await uploadFile(req.file.buffer)
    const equipment = await equipmentModel.create({
        name,category,price,location,vehicleNo,description,availability,image:result.url
        ,owner:req.user.id
    })
    return res.status(201).json({
        message:"Equipment Added Successfully",
        equipment,
        ownerName:req.user.name
    })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}
async function getAll(req, res) {
  try {
    
//     const filter = {};
//  //  filtering based on different categories
//     if (req.query.category) {
//       filter.category = req.query.category; 
//     }

//     if (req.query.location) {
//       filter.location = req.query.location;
//     }

//     if (req.query.price) {
//       filter.price = req.query.price;
//     }

    const equipment = await equipmentModel.find();

    if (equipment.length === 0) {
      return res.status(404).json({
        message: "No equipment found"
      });
    }

    return res.status(200).json({
      message: "Equipments fetched",
      equipment
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
async function getSingleEquipment(req,res){

  try{
    const {id}=req.params; //we get data from frontend ,the id of equipment
  
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({
        message:"Invalid Equipment Id"
      })
    }
    const equipment=await equipmentModel.findById(id).populate("owner","username email contact") //taking the required details
    if(!equipment){
      return res.status(404).json({
        message:"Equipment not found"
      });
    }

    return res.status(200).json({
      message:"Equipment fetched successfully",
      equipment
    });
  }
  catch(err){
    console.log(err)
      return res.status(500).json({
        message:"Internal Server Error"
      });
  }
}
//getting the logged-in userid  and comparing it with equipment ownerId
//if matches returns the array of equipment 
 async function getMyEquipment(req,res){
      try{
            const userId=req.user.id
            const equipment=await equipmentModel.find({owner:userId})//returns the equipments with userId 
            //find returns an array
       
            if(equipment.length===0){
              return res.status(200).json({
                message:"Equipment Not Found"
              })
            }
            return res.status(200).json({
              message:"Equipments Related the user",
              equipment
            })

      }
      catch(err){
        console.log(err)
        return res.status(500).json({
          message:"Internal Server Error"
        })
      }

 }
async function updateEquipment(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const { price, description, location } = req.body;

    // 1. Find equipment
    const equipment = await equipmentModel.findById(id).select("-__v ");
    
    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    // 2. Ownership check
    if (equipment.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this equipment"
      });
    }
    

    // 3. Check if at least one field is provided
    if (
      price === undefined &&
      description === undefined &&
      location === undefined
    ) {
      return res.status(400).json({
        message: "No data provided to update"
      });
    }

    // 4. Update fields (partial update)

    // Price validation
    if (price !== undefined) {
      if (price < 0) {
        return res.status(400).json({
          message: "Price cannot be negative"
        });
      }
      equipment.price = price;
    }
   
    // Description update
    if (description !== undefined) {
      equipment.description= description;
    }
  

    // Location update
    if (location !== undefined) {
      equipment.location = location;
    }

    // 5. Save changes
    await equipment.save();

    // 6. Response
    return res.status(200).json({
      message: "Equipment updated successfully",
      equipment
    });

  } catch (err) {
    console.log("Update Equipment Error:", err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}
async function deleteEquipment(req, res) {
  try {

    const { id } = req.params;
    const userId = req.user._id;

    // find equipment
    const equipment = await equipmentModel.findById(id);

    if (!equipment) {
      return res.status(404).json({
        message: "Equipment not found"
      });
    }

    // ownership check
    if (equipment.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this equipment"
      });
    }

    // delete equipment
    await equipmentModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Equipment deleted successfully"
    });

  } catch (err) {
    console.log("Delete Equipment Error:", err);

    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
}



module.exports={addEquipment,getAll,getSingleEquipment,getMyEquipment,updateEquipment,deleteEquipment}