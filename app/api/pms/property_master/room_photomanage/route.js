import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { Type } from 'lucide-react';
import {Pms_Propertymaster_Roomphotomanage} from "@/_lib/model/pms/property_master/room_photomanage/room_photomanage";
import { Pms_Propertymaster_Roomdetails } from "@/_lib/model/pms/property_master/room_details/room_details";

const initialCreateFunction = async (hotelName, roomName, room_result) => {
 try {

    let imgDirectory = path.join(process.cwd(), 'public', 'img', hotelName, roomName);

    const imgNames = fs.readdirSync(imgDirectory);

 } catch(error) {

  if (error.message.includes('no such file or directory')) {

    const folderPath = path.join(process.cwd(), 'public', 'img', hotelName);
      
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 });
      } else {
        return NextResponse.json({ message: 'Folder created successfully' }, { status: 200 });
      }
    });

    console.log("Room Result:::::>",room_result)

    room_result?.map((item,index) => {

      const folderPath = path.join(process.cwd(), 'public', 'img', hotelName, item.room_name + "-" + item.id);

      fs.mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
          return NextResponse.json({ error: 'Failed to create room folder' }, { status: 500 });
        } else {
          return NextResponse.json({ message: 'Room folder created successfully' }, { status: 200 });
        }
      });
    })

  }else {
    console.error('Error occurred:', error);
  }

 }
}


const imgwriter = async (file, hotelName, roomName, last_num, index) => {

  try {

    let last_number = index + last_num;

    console.log("Last number of file: ",last_number, index, last_num)
    let imgDirectoryy = path.join(process.cwd(), 'public', 'img', hotelName, roomName);

    const buffer = Buffer.from(await file.arrayBuffer());

    const filename =  file.name.replaceAll(" ", "_");
      
    const extensionIndex = filename.lastIndexOf('.');

    let fileExtensions = filename.substring(extensionIndex);

    //const uniqueFilename = uuidv4();
    //const filenamee = `${lastImgNumber}-${uniqueFilename}${fileExtensions}`;
    const filenamee = `${last_number.toString()}${fileExtensions}`;

    await writeFile(
      path.join(imgDirectoryy, filenamee),
      buffer
    );
    
    console.log(`File ${file.name} written successfully.`);

  } catch(error) {

    console.error("Error occurred while writing file:", error);

    throw error;

  }
}

export async function POST(req,res) {

  let operationnn = req.nextUrl.searchParams.get('operationnn');

  if(operationnn !== "addImageTag") {

    if(operationnn === "deleteImageTag") {
      console.log("Delete Image Tag")
        const payload = await req.json();
        console.log("Payload: ", payload);
       
        let search = await Pms_Propertymaster_Roomphotomanage.find({
          Hotel_Id: payload.Hotel_Id,
          selected_room: { $regex: new RegExp(payload.selected_room, 'i'), },
          img_id: payload.img_id,
      });
    
      if(search.length === 0) {
        return NextResponse.json({ Message: "Success", status: 200 });
      }else{
        const imageeeee = await Pms_Propertymaster_Roomphotomanage.updateOne({Hotel_Id: payload.Hotel_Id, selected_room:payload.selected_room,img_id: payload.img_id},{img_tags: payload.img_tags});
        return NextResponse.json({ Message: "Success", status: 200 });
      }
    }else if(operationnn === "addImageChecks"){

      console.log("Add Image Checks")
      const payload = await req.json();

      if(payload.action === "updateIncludeInMain") {
        await Pms_Propertymaster_Roomphotomanage.updateOne({Hotel_Id: payload.Hotel_Id, selected_room:payload.selected_room,img_id: payload.img_id}, {include_in_main: payload.include_in_main});
        return NextResponse.json({ Message: "Success", status: 200 });
      }else {
        let search = await Pms_Propertymaster_Roomphotomanage.find({
          Hotel_Id: payload.Hotel_Id,
          selected_room: { $regex: new RegExp(payload.selected_room, 'i'), },
          img_id: payload.img_id,
        });
      
        if(search.length === 0) {
    
          if(payload.img_checks.includes('PM00001')) {
            
            payload.img_checks = [...new Set(payload.img_checks)];
            payload.img_checks = payload.img_checks.filter((item) => !(item === 'PM00001'))
          }
    
          console.log("Payload456: ", payload);
    
          const property_area = await Pms_Propertymaster_Roomphotomanage.create(payload);
          return NextResponse.json({ Message: "Success", status: 200 });
        }else{
          const imageeeee = await Pms_Propertymaster_Roomphotomanage.findOne({Hotel_Id: payload.Hotel_Id, selected_room:payload.selected_room,img_id: payload.img_id});
    
          payload.img_checks = payload.img_checks.filter((img) => !imageeeee.img_checks.includes(img))
    
          // if(imageeeee.img_checks[imageeeee.img_checks.length - 1] === payload.img_checks[payload.img_checks.length - 1]) {
    
          // }else {
            payload.img_checks.map((item) => {
              imageeeee.img_checks.push(item)
            })
            
          //}
          
          const result = await imageeeee.save();
          //const property_area = await Pms_Propertymaster_Roomphotomanage.updateOne({ Hotel_Id: payload.Hotel_Id, selected_room:payload.selected_room,img_id: payload.img_id  }, {img_tags: img_tags.push(payload.img_tags[0])});
          return NextResponse.json({ Message: "Success", status: 200 });
        }
      }
      
    }else if (operationnn === "deleteImageChecks") {
      const payload = await req.json();
      console.log("payload111: ",payload)

      if(payload.operation === "updateIncludeMain") {

        const imageeeee = await Pms_Propertymaster_Roomphotomanage.updateOne({
          Hotel_Id: payload.Hotel_Id,
          selected_room: payload.selected_room,
          img_id: payload.img_id
        }, {include_in_main: payload.include_in_main});
      
        return NextResponse.json({ Message: "Success", status: 200 });
        
      }else {
        const imageeeee = await Pms_Propertymaster_Roomphotomanage.findOne({
          Hotel_Id: payload.Hotel_Id,
          selected_room: payload.selected_room,
          img_id: payload.img_id
        });
      
        payload.img_checks.forEach(item => {
          // Remove the specific item from img_checks
          imageeeee.img_checks = imageeeee.img_checks.filter(imgCheckItem => imgCheckItem !== item);
        });
        
        const result = await imageeeee.save();
      
        return NextResponse.json({ Message: "Success", status: 200 });
      }



    }else{

      const formData = await req.formData();
      const files = formData.getAll("file");
      const hotel_id = formData.get("hotel_id");
      const hotel_name = formData.get("hotel_name");
      const room_result1 = formData.get("room_result");
      const room_result = JSON.parse(room_result1);
      const selectedRoom = formData.get("selectedRoom");
      const selectedRoomId = formData.get("selectedRoomId");
  
      const hotel_Name = formData.get("hotel_Name");
      const room_Name = formData.get("room_Name");
      const activeId = formData.get("activeId");
      const overId = formData.get("overId");
      const operation = formData.get("operation");
      const a = formData.get("formattedFilesNew");
      let formattedFilesNew = JSON.parse(a);
  
      const action = formData.get("action");
      const b = formData.get("filteredChecks");
      let filteredChecks = JSON.parse(b);
      const selectedImageTitle = formData.get("selectedImageTitle");
      const selectedImageID = formData.get("selectedImageID");

      let imgDelId = formData.get("imgDelId")
      let imgDelTitle = formData.get("imgDelTitle")
      let sub_operation = formData.get("sub_operation")
      let ss = formData.get("img_checks_del")
      let dd = formData.get("img_tags_del")
      let img_include_in_main = formData.get("img_include_in_main")

      let selectedCheckboxesfordeleteee = formData.get("selectedCheckboxesfordelete")

      let selectedCheckboxesfordelete = JSON.parse(selectedCheckboxesfordeleteee)

      let img_checks_del;
      let img_tags_del;

      console.log("Datasss01:::::::>",imgDelId,
      imgDelTitle,
      operation,
      hotel_Name,
room_Name)
      
      if(sub_operation === "deleteWithoutRoom") {

      }else{
        
  
        img_checks_del = JSON.parse(ss);
        img_tags_del = JSON.parse(dd);

        console.log("img_include_in_main: ",img_include_in_main, img_checks_del)

        if(img_include_in_main) {
          if(img_checks_del) {
            img_checks_del.push("PM00001")
            console.log("img_checks_del: ",img_checks_del)
          }
        }
      }

      if(action === "copyFile") {
        console.log("Copy File:::::::>",filteredChecks)
        filteredChecks?.map(async(ite) => {
          let resss = await Pms_Propertymaster_Roomdetails.findOne({id: ite})
          console.log("Datasss:::::::>", resss)

          let imgDirectory;
  
          if(ite === "PM00001") {
            imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_name, "Property Main" + "-" + ite);
          }else {
            imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_name, resss.room_name + "-" + ite);
          }
        
  
        let imgNames = fs.readdirSync(imgDirectory);
  
        let imgNumbers = imgNames.map(name => parseInt(name));
  
        imgNumbers.sort((a, b) => a - b);
  
        console.log("Img num:::>",imgNumbers)
        let last_nummm = 1;
        if(imgNumbers.length !== 0) {
          last_nummm = imgNumbers[imgNumbers.length - 1] + 1;
        }

        const extensionIndex = selectedImageTitle.lastIndexOf(".");
        const fileExtensions = selectedImageTitle.substring(extensionIndex);
  
        const numberPart = selectedImageTitle.match(/\d+/)[0];
        const [roomtext, roomid] = selectedRoom.split("-");
  
        const sourceFilePath = path.join(process.cwd(), 'public', 'img', hotel_name, selectedRoom, selectedImageTitle);
        let destinationFilePath;

        if(ite === "PM00001") {
          destinationFilePath = path.join(process.cwd(), 'public', 'img', hotel_name, "Property Main" + "-" + ite, last_nummm.toString() + "-" + numberPart.toString() + roomid.toString() + fileExtensions);
        }else{
          destinationFilePath = path.join(process.cwd(), 'public', 'img', hotel_name, resss.room_name + "-" + ite, last_nummm.toString() + "-" + numberPart.toString() + roomid.toString() + fileExtensions);
        }
        
  
          fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
            if (err) {
              console.error('Error copying file:', err);
              //return NextResponse.json({ Message: "Failed", status: 500 });
            } else {
              console.log('File copied successfully');
              //return NextResponse.json({ Message: "Success", status: 200 });
            }
          });
        })
       
     

        return NextResponse.json({ Message: "Success", status: 200 });

      }else if (operation === "single_delete_img") {
        console.log("Delete Single Image", imgDelId, imgDelTitle, img_checks_del, img_tags_del, operation, hotel_Name, room_Name);
    
        let selectedImageID = imgDelId;
        const [roomtext, roomid] = room_Name.split("-");
        const [hoteltextt, hotelidd] = hotel_Name.split("-");
        let imgNamessss;

        const renameFile = (oldPath, newPath) => {
          return new Promise((resolve, reject) => {
              fs.rename(oldPath, newPath, (err) => {
                  if (err) {
                      reject(err);
                  } else {
                      console.log('Rename complete!');
                      resolve();
                  }
              });
          });
      };
  
      const deleteFile = (filePath) => {
          return new Promise((resolve, reject) => {
              fs.unlink(filePath, (err) => {
                  if (err) {
                      reject(err);
                  } else {
                      console.log('File deleted successfully');
                      resolve();
                  }
              });
          });
      };

      if(sub_operation === "deleteWithoutRoom") {
        console.log("Trueeeeee", imgDelTitle)
        
        const jkhasd = async() => {
          let filePathh = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, imgDelTitle);
          await deleteFile(filePathh);

          if(imgDelTitle.includes("-")) {
            const [id, text] = imgDelTitle.split("-")
            const [sec, ext] = text.split(".")
            let extension = "." + ext;

            const separateParts = (input) => {

              const index = input.search(/\D/);

              const numberPart = index === -1 ? input : input.slice(0, index);
              const alphanumericPart = input.slice(index);
              
              return { numberPart, alphanumericPart };
            };
          
      
            const { numberPart, alphanumericPart } = separateParts(sec);

            console.log("Found: ",id, alphanumericPart, extension)

            await Pms_Propertymaster_Roomphotomanage.updateOne({Hotel_Id: parseInt(hotelidd), selected_room: alphanumericPart.toString(),img_id: parseInt(numberPart)}, {include_in_main: false});
            
          }


  
          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
          let imgNames = fs.readdirSync(imgDirectory);
          const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedImageID.toString()));
          let imgNumbers = imgNames.map(name => parseInt(name));
          imgNumbers.sort((a, b) => a - b);
  
          console.log("Img num last:::>", imgNumbers, imgNames, filteredImgNames);
  
          let index = parseInt(imgDelTitle);
          filteredImgNames.forEach((item) => {
              const [id, text] = item.split("-");
              if (text === pqr) {
                  index = imgNames.indexOf(item);
              }
          });
  
          const filesAfterTarget = imgNames.slice(index - 1);
          console.log("DAtassss:::last", filesAfterTarget);
          
  
          await Promise.all(
              filesAfterTarget.map(async (fileName, index) => {
                  const [prefix, suffix] = fileName.split('.');
                  const fileNumber = parseInt(prefix);
  
                  if (!isNaN(fileNumber)) {
                      const newFileName = `${fileNumber - 1}.${suffix}`;
                      let fileId = parseInt(fileName);
                      const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, fileName);
                      let imgDirectoryNew = '';
  
                      if (fileName.includes("-")) {
                          const [prefix, suffixx] = fileName.split('-');
                          console.log(prefix, suffixx);
                          const newFileNamee = `${fileNumber - 1}${"-"}${suffixx}`;
                          imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileNamee);
                      } else {
                          imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileName);

                          const pqrttt = async() => {
                            

                            console.log("file.title1sdfsd: ",fileId, fileName)
        
                            let  [hoteltext, hotelid] = hotel_Name.split("-");
                            let  [roomtext, roomid] = room_Name.split("-");

                            const extensionIndex = fileName.lastIndexOf(".");
                            const fileExtensions = fileName.substring(extensionIndex);
        
                            let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                              Hotel_Id: hotelid,
                              selected_room: { $regex: new RegExp(roomid, 'i'), },
                              img_id: parseInt(fileId),
                  });
                  
                  console.log("without room: ",data)
                  
        
                          if(data) {
                            let renamePromisesss = '';
                            if(data.img_id === parseInt(fileId)) {
        
                              await Pms_Propertymaster_Roomphotomanage.updateOne({
                                id: data.id,
                                Hotel_Id: hotelid,
                                selected_room: roomid.toString(),
                                img_id: parseInt(fileId),
                              },{img_id: parseInt((fileId - 1)), img_title: (fileId - 1).toString() + fileExtensions})
                            }
                            
          
                            console.log("Data Actisdfsdfve::::::::>", data, fileId)
        
                            data.img_checks.map((item) => {
        
                              const ltt = async () => {
          
                                let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                                console.log("Datasss78dsfsdf9:::::::>", resss)
          
                                let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                  
                                let imgNames = await fs.readdirSync(imgDirectory);
          
                                console.log("imgNamesimsdfsdfgNames: ",imgNames)
                                
                                renamePromisesss = imgNames.map((itemm) => {
                                  console.log("Itemmsdfmmm: ",itemm, `${fileId}${roomid}`)
                                  if(itemm.includes(`${fileId}${roomid}`)) {
                                    console.log("imgNamsdfestttt: ", itemm)
          
                                    function renameFile(oldPath, newPath) {
                                      return new Promise((resolve, reject) => {
                                        fs.rename(oldPath, newPath, (err) => {
                                          if (err) {
                                            reject(err);
                                          } else {
                                            console.log('Rensdfame complete!');
                                            resolve();
                                          }
                                        });
                                      });
                                    }
          
                                    const regex = /-(\d+)(?=[a-zA-Z])/;
                                    //const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1)}`);
        
                                    const modifiedStr = itemm.replace(regex, `-${fileId + "_" + (parseInt(fileId) - 1) + "_" + fileId}`);
          
                                    let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                    let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                    console.log("imgDirectsdforyOld: ", imgDirectoryOld,
                                    imgDirectoryNew)
          
                                    renameFile(imgDirectoryOld, imgDirectoryNew)
                                      .then(() => {
                                          console.log(`Renasdfmed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);

                                          const xyz = async () => {
  
                                            console.log("XYZ Called::::::::>")
  
                                            function transformFilename(filename) {
                                              
                                              let parts = filename.split('_')
        
                                              if(parts.length === 2) {
                                                console.log("Partsll: ",parts)
        
                                                let thirdPart = parts[1];
          
                                                console.log("thirdPartll: ",thirdPart)
          
                                                let part2 = parts[0].split("-")
        
                                                
                                                let finalres =  part2[0] + "-" + parts[1]; 
          
                                                console.log("finalresll: ",finalres)
          
                                              return finalres;
        
                                              }else {
                                                console.log("Parts: ",parts)
        
                                                let fileid = filename.split("-")
        
                                                let thirdPart = parts[2];
          
                                                console.log("thirdPart: ",thirdPart)
          
                                                let result = thirdPart.replace(/^\d+/, '');
          
                                                console.log("result: ",result)
                                                
                                                let finalres = fileid[0] + "-" +parts[1] + result; 
          
                                                console.log("finalres: ",finalres)
          
                                              return finalres;
                                              }
        
                                             
                                          }
        
                                            let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                                            let imgNames = await fs.readdirSync(imgDirectory);
                        
                                            console.log("imgNames654: ", imgNames, activeId ,overId)
        
                                            imgNames.map((item) => {
                                              if(item.includes("_")) {
        
                                                console.log("Final item: ",item)
                                                
                                                const regex = /-(\d+)_/;
                                                let modifiedStrrr = transformFilename(item);
          
        
                                                // const regex = /-(\d+)_/;
                                                // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
                                              let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                              let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
                                              console.log("imgDirectoryOld35: ", imgDirectoryOld,
                                              imgDirectoryNew)
                        
                                              renameFile(imgDirectoryOld, imgDirectoryNew)
                                                .then(() => {
                                                    console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                })
                                                .catch(error => {
                                                    console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                });
                                              }
                                            })
        
                                            
                                          
                                         
        
                             
                                              
                                      }
                                      xyz()
                          
                          
                           })
                                      .catch(error => {
                                          console.error(`Errorsdf renaming ${imgDirectoryOld}:`, error);
                                      });
          
          
                                  }
                                })
        
          
                                
                              }
          
                              ltt()
                             
                            })
                          }
        
        
        
            
        
                          }
        
                          pqrttt()


                      }
  
                      console.log("fileItems4: ", imgDirectoryOld, imgDirectoryNew);
                      await renameFile(imgDirectoryOld, imgDirectoryNew);
                      console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                  } else {
                      console.error(`Invalid file name: ${fileName}`);
                  }
              })
          );

        }
        jkhasd()
      }else {
        const deleteAndRenameImages = async () => {

          await Promise.all(

              img_checks_del.map(async (ite) => {
                  console.log("Ite::::::>", ite, selectedImageID);

                  let resss;

                  if(ite === "PM00001") {
                    
                  }else{

                    resss = await Pms_Propertymaster_Roomdetails.findOne({ id: ite });
                    
                  }

                  console.log("Datasss:::::::>", resss);

                  let imgDirectory;
  
                  if(ite === "PM00001") {
                    imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite);
                  }else {
                    imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite);
                  }
                  
                  let imgNames = fs.readdirSync(imgDirectory);
                  const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedImageID.toString()));
                  let imgNumbers = imgNames.map(name => parseInt(name));
                  imgNumbers.sort((a, b) => a - b);
  
                  console.log("Img num:::>", imgNumbers, imgNames, filteredImgNames);
  
                  const [imagetext, fileExtensionss] = imgDelTitle.split(".");
                  let filePath = '';
                  let pqr = selectedImageID.toString() + roomid.toString() + "." + fileExtensionss;
                  console.log("pqr: ", pqr);
  
                  let index = "";
                  filteredImgNames.forEach((item) => {
                      const [id, text] = item.split("-");
                      if (text === pqr) {

                        if(ite === "PM00001") {
                          filePath = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, item);
                        }else {
                          filePath = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, item);
                        }
                          
                          index = imgNames.indexOf(item);
                      }
                  });

                  console.log("FilePathhh:::>>>",filePath)

                  if(filePath === "") {

                  }else {
                    await deleteFile(filePath);
                  
  

                  const filesAfterTarget = imgNames.slice(index + 1);
                  console.log("DAtassss:::", filesAfterTarget, img_checks_del);
  
                  await Promise.all(
                      filesAfterTarget.map(async (fileName, index) => {
                          const [prefix, suffix] = fileName.split('.');
                          const fileNumber = parseInt(prefix);
  
                          if (!isNaN(fileNumber)) {
                              const newFileName = `${fileNumber - 1}.${suffix}`;

                              let imgDirectoryOld;

                              if(ite === "PM00001") {
                                imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, fileName);
                              }else {
                                imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, fileName);
                              }
                              
                              let imgDirectoryNew = '';
  
                              if (fileName.includes("-")) {
                                  const [prefix, suffixx] = fileName.split('-');
                                  console.log(prefix, suffixx);
                                  const newFileNamee = `${fileNumber - 1}${"-"}${suffixx}`;

                                  if(ite === "PM00001") {
                                    imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, newFileNamee);
                                  }else{
                                    imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, newFileNamee);
                                  }
                                  
                              } else {

                                if(ite === "PM00001") {
                                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, newFileName);
                                }else {
                                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, newFileName);
                                }
                                  
                              }
  
                              console.log("fileItems4: ", imgDirectoryOld, imgDirectoryNew);
                              await renameFile(imgDirectoryOld, imgDirectoryNew);
                              console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                          } else {
                              console.error(`Invalid file name: ${fileName}`);
                          }
                      })
                  );

                }
              })
          );
  
          let filePathh = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, imgDelTitle);
          console.log("FilePAthhh: ",filePathh)
          await deleteFile(filePathh);

          if(imgDelTitle.includes("-")) {
            const [id, text] = imgDelTitle.split("-")
            const [sec, ext] = text.split(".")
            let extension = "." + ext;

            const separateParts = (input) => {

              const index = input.search(/\D/);

              const numberPart = index === -1 ? input : input.slice(0, index);
              const alphanumericPart = input.slice(index);
              
              return { numberPart, alphanumericPart };
            };
          
      
            const { numberPart, alphanumericPart } = separateParts(sec);

            console.log("Found: ",id, alphanumericPart, extension)

            await Pms_Propertymaster_Roomphotomanage.updateOne({Hotel_Id: parseInt(hotelidd), selected_room: alphanumericPart.toString(),img_id: parseInt(numberPart)}, {include_in_main: false});
            
          }
  
          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
          let imgNames = fs.readdirSync(imgDirectory);
          const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedImageID.toString()));
          let imgNumbers = imgNames.map(name => parseInt(name));
          imgNumbers.sort((a, b) => a - b);
  
          console.log("Img num last:::>", imgNumbers, imgNames, filteredImgNames);
  
          let index = parseInt(imgDelTitle);
          filteredImgNames.forEach((item) => {
              const [id, text] = item.split("-");
              if (text === pqr) {
                  index = imgNames.indexOf(item);
              }
          });
  
          const filesAfterTarget = imgNames.slice(index - 1);
          console.log("DAtassss:::last", filesAfterTarget);
  
          await Promise.all(
              filesAfterTarget.map(async (fileName, index) => {
                  const [prefix, suffix] = fileName.split('.');
                  const fileNumber = parseInt(prefix);
  
                  if (!isNaN(fileNumber)) {
                      const newFileName = `${fileNumber - 1}.${suffix}`;
                      let fileId = parseInt(fileName);
                      const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, fileName);
                      let imgDirectoryNew = '';
  
                      if (fileName.includes("-")) {
                          const [prefix, suffixx] = fileName.split('-');
                          console.log(prefix, suffixx);
                          const newFileNamee = `${fileNumber - 1}${"-"}${suffixx}`;
                          imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileNamee);
                      } else {
                          imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileName);

                          const pqrttt = async() => {

                            console.log("file.title1sdfsd: ",fileId, fileName)
        
                            let  [hoteltext, hotelid] = hotel_Name.split("-");
                            let  [roomtext, roomid] = room_Name.split("-");

                            const extensionIndex = fileName.lastIndexOf(".");
                            const fileExtensions = fileName.substring(extensionIndex);
        
                            let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                              Hotel_Id: hotelid,
                              selected_room: { $regex: new RegExp(roomid, 'i'), },
                              img_id: parseInt(fileId),
                  });
        
                          if(data) {
                            if(data.img_id === parseInt(fileId)) {
        
                              await Pms_Propertymaster_Roomphotomanage.updateOne({
                                id: data.id,
                                Hotel_Id: hotelid,
                                selected_room: roomid.toString(),
                                img_id: parseInt(fileId),
                              },{img_id: parseInt((fileId - 1)), img_title: (fileId - 1).toString() + fileExtensions})
                            }
                            
          
                            console.log("Data Actisdfsdfve::::::::>", data, fileId)
        
                            data.img_checks.map((item) => {
        
                              const ltt = async () => {
          
                                let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                                console.log("Datasss78dsfsdf9:::::::>", resss)
          
                                let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                  
                                let imgNames = await fs.readdirSync(imgDirectory);
          
                                console.log("imgNamesimsdfsdfgNames: ",imgNames)
          
                                renamePromisesss = imgNames.map((itemm) => {
                                  console.log("Itemmsdfmmm: ",itemm, `${fileId}${roomid}`)
                                  if(itemm.includes(`${fileId}${roomid}`)) {
                                    console.log("imgNamsdfestttt: ", itemm)
          
                                    function renameFile(oldPath, newPath) {
                                      return new Promise((resolve, reject) => {
                                        fs.rename(oldPath, newPath, (err) => {
                                          if (err) {
                                            reject(err);
                                          } else {
                                            console.log('Rensdfame complete!');
                                            resolve();
                                          }
                                        });
                                      });
                                    }
          
                                    const regex = /-(\d+)(?=[a-zA-Z])/;
                                    //const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1)}`);
        
                                    const modifiedStr = itemm.replace(regex, `-${fileId + "_" + (parseInt(fileId) - 1) + "_" + fileId}`);
          
                                    let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                    let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                    console.log("imgDirectsdforyOld: ", imgDirectoryOld,
                                    imgDirectoryNew)
          
                                    renameFile(imgDirectoryOld, imgDirectoryNew)
                                      .then(() => {
                                          console.log(`Renasdfmed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);

                                          const xyz = async () => {
  
                                            console.log("XYZ Called::::::::>")
  
                                            function transformFilename(filename) {
                                              
                                              let parts = filename.split('_')
        
                                              if(parts.length === 2) {
                                                console.log("Partsll: ",parts)
        
                                                let thirdPart = parts[1];
          
                                                console.log("thirdPartll: ",thirdPart)
          
                                                let part2 = parts[0].split("-")
        
                                                
                                                let finalres =  part2[0] + "-" + parts[1]; 
          
                                                console.log("finalresll: ",finalres)
          
                                              return finalres;
        
                                              }else {
                                                console.log("Parts: ",parts)
        
                                                let fileid = filename.split("-")
        
                                                let thirdPart = parts[2];
          
                                                console.log("thirdPart: ",thirdPart)
          
                                                let result = thirdPart.replace(/^\d+/, '');
          
                                                console.log("result: ",result)
                                                
                                                let finalres = fileid[0] + "-" +parts[1] + result; 
          
                                                console.log("finalres: ",finalres)
          
                                              return finalres;
                                              }
        
                                             
                                          }
        
                                            let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                                            let imgNames = await fs.readdirSync(imgDirectory);
                        
                                            console.log("imgNames654: ", imgNames, activeId ,overId)
        
                                            imgNames.map((item) => {
                                              if(item.includes("_")) {
        
                                                console.log("Final item: ",item)
                                                
                                                const regex = /-(\d+)_/;
                                                let modifiedStrrr = transformFilename(item);
          
        
                                                // const regex = /-(\d+)_/;
                                                // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
                                              let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                              let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
                                              console.log("imgDirectoryOld35: ", imgDirectoryOld,
                                              imgDirectoryNew)
                        
                                              renameFile(imgDirectoryOld, imgDirectoryNew)
                                                .then(() => {
                                                    console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                })
                                                .catch(error => {
                                                    console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                });
                                              }
                                            })
        
                                            
                                          
                                         
        
                             
                                              
                                      }
                                      xyz()
                          
                          
                           })
                                      .catch(error => {
                                          console.error(`Errorsdf renaming ${imgDirectoryOld}:`, error);
                                      });
          
          
                                  }
                                })
        
          
                                
                              }
          
                              ltt()
                             
                            })
                          }
        
        
        
            
        
                          }
        
                          pqrttt()
                      }
  
                      console.log("fileItems4: ", imgDirectoryOld, imgDirectoryNew);
                      await renameFile(imgDirectoryOld, imgDirectoryNew);
                      console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                  } else {
                      console.error(`Invalid file name: ${fileName}`);
                  }
              })
          );
  
          const deletefromdb = async () => {
              let result = await Pms_Propertymaster_Roomphotomanage.deleteOne({ Hotel_Id: parseInt(hotelidd), selected_room: roomid.toString(), img_id: parseInt(imgDelId) });
              let imgDirectoryy = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
              imgNamessss = fs.readdirSync(imgDirectoryy);
              console.log("Result: ", result, imgNamessss);
          };
  
          await deletefromdb();
      };
  
      deleteAndRenameImages().then(() => {
          console.log("Result2: ", imgNamessss);
  
      }).catch(error => {
          console.error("Error in deleteAndRenameImages: ", error);
  
      });
      }
    


    console.log("Result3: ", imgNamessss);

    return NextResponse.json({ Message: "Success", res: imgNamessss, status: 200 });

    }else if(operation === "multiple_delete_img") {

      console.log("Delete Multiple Image", imgDelId, imgDelTitle, img_checks_del, img_tags_del, operation, hotel_Name, room_Name);
    
        let selectedImageID = imgDelId;
        const [roomtext, roomid] = room_Name.split("-");
        const [hoteltextt, hotelidd] = hotel_Name.split("-");
        let imgNamessss;

        const renameFile = (oldPath, newPath) => {
          return new Promise((resolve, reject) => {
              fs.rename(oldPath, newPath, (err) => {
                  if (err) {
                      reject(err);
                  } else {
                      console.log('Rename complete!');
                      resolve();
                  }
              });
          });
      };
  
      const deleteFile = (filePath) => {
          return new Promise((resolve, reject) => {
              fs.unlink(filePath, (err) => {
                  if (err) {
                      reject(err);
                  } else {
                      console.log('File deleted successfully');
                      resolve();
                  }
              });
          });
      };

      if(sub_operation === "deleteWithoutRoom") {
        console.log("Trueeeeee", imgDelTitle, selectedCheckboxesfordelete[selectedCheckboxesfordelete.length - 1])

        
        
        const jkhasd = async() => {
          let filePathh = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, imgDelTitle);
          await deleteFile(filePathh);

          if(imgDelTitle.includes("-")) {
            const [id, text] = imgDelTitle.split("-")
            const [sec, ext] = text.split(".")
            let extension = "." + ext;

            const separateParts = (input) => {

              const index = input.search(/\D/);

              const numberPart = index === -1 ? input : input.slice(0, index);
              const alphanumericPart = input.slice(index);
              
              return { numberPart, alphanumericPart };
            };
          
      
            const { numberPart, alphanumericPart } = separateParts(sec);

            console.log("Found: ",id, alphanumericPart, extension)

            await Pms_Propertymaster_Roomphotomanage.updateOne({Hotel_Id: parseInt(hotelidd), selected_room: alphanumericPart.toString(),img_id: parseInt(numberPart)}, {include_in_main: false});
            
          }


  
          // let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
          // let imgNames = fs.readdirSync(imgDirectory);
          // const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedImageID.toString()));
          // let imgNumbers = imgNames.map(name => parseInt(name));
          // imgNumbers.sort((a, b) => a - b);
  
          // console.log("Img num last:::>", imgNumbers, imgNames, filteredImgNames);
  
          // let index = parseInt(imgDelTitle);
          // filteredImgNames.forEach((item) => {
          //     const [id, text] = item.split("-");
          //     if (text === pqr) {
          //         index = imgNames.indexOf(item);
          //     }
          // });
  
          // const filesAfterTarget = imgNames.slice(index - 1);
          // console.log("DAtassss:::last", filesAfterTarget);
          
  
          // await Promise.all(
          //     filesAfterTarget.map(async (fileName, index) => {
          //         const [prefix, suffix] = fileName.split('.');
          //         const fileNumber = parseInt(prefix);
  
          //         if (!isNaN(fileNumber)) {
          //             const newFileName = `${fileNumber - 1}.${suffix}`;
          //             let fileId = parseInt(fileName);
          //             const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, fileName);
          //             let imgDirectoryNew = '';
  
          //             if (fileName.includes("-")) {
          //                 const [prefix, suffixx] = fileName.split('-');
          //                 console.log(prefix, suffixx);
          //                 const newFileNamee = `${fileNumber - 1}${"-"}${suffixx}`;
          //                 imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileNamee);
          //             } else {
          //                 imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileName);

          //                 const pqrttt = async() => {
                            

          //                   console.log("file.title1sdfsd: ",fileId, fileName)
        
          //                   let  [hoteltext, hotelid] = hotel_Name.split("-");
          //                   let  [roomtext, roomid] = room_Name.split("-");

          //                   const extensionIndex = fileName.lastIndexOf(".");
          //                   const fileExtensions = fileName.substring(extensionIndex);
        
          //                   let data = await Pms_Propertymaster_Roomphotomanage.findOne({
          //                     Hotel_Id: hotelid,
          //                     selected_room: { $regex: new RegExp(roomid, 'i'), },
          //                     img_id: parseInt(fileId),
          //         });
                  
          //         console.log("without room: ",data)
                  
        
          //                 if(data) {
          //                   let renamePromisesss = '';
          //                   if(data.img_id === parseInt(fileId)) {
        
          //                     await Pms_Propertymaster_Roomphotomanage.updateOne({
          //                       id: data.id,
          //                       Hotel_Id: hotelid,
          //                       selected_room: roomid.toString(),
          //                       img_id: parseInt(fileId),
          //                     },{img_id: parseInt((fileId - 1)), img_title: (fileId - 1).toString() + fileExtensions})
          //                   }
                            
          
          //                   console.log("Data Actisdfsdfve::::::::>", data, fileId)
        
          //                   data.img_checks.map((item) => {
        
          //                     const ltt = async () => {
          
          //                       let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
          //                       console.log("Datasss78dsfsdf9:::::::>", resss)
          
          //                       let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                  
          //                       let imgNames = await fs.readdirSync(imgDirectory);
          
          //                       console.log("imgNamesimsdfsdfgNames: ",imgNames)
                                
          //                       renamePromisesss = imgNames.map((itemm) => {
          //                         console.log("Itemmsdfmmm: ",itemm, `${fileId}${roomid}`)
          //                         if(itemm.includes(`${fileId}${roomid}`)) {
          //                           console.log("imgNamsdfestttt: ", itemm)
          
          //                           function renameFile(oldPath, newPath) {
          //                             return new Promise((resolve, reject) => {
          //                               fs.rename(oldPath, newPath, (err) => {
          //                                 if (err) {
          //                                   reject(err);
          //                                 } else {
          //                                   console.log('Rensdfame complete!');
          //                                   resolve();
          //                                 }
          //                               });
          //                             });
          //                           }
          
          //                           const regex = /-(\d+)(?=[a-zA-Z])/;
          //                           //const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1)}`);
        
          //                           const modifiedStr = itemm.replace(regex, `-${fileId + "_" + (parseInt(fileId) - 1) + "_" + fileId}`);
          
          //                           let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
          //                           let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
          //                           console.log("imgDirectsdforyOld: ", imgDirectoryOld,
          //                           imgDirectoryNew)
          
          //                           renameFile(imgDirectoryOld, imgDirectoryNew)
          //                             .then(() => {
          //                                 console.log(`Renasdfmed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);

          //                                 const xyz = async () => {
  
          //                                   console.log("XYZ Called::::::::>")
  
          //                                   function transformFilename(filename) {
                                              
          //                                     let parts = filename.split('_')
        
          //                                     if(parts.length === 2) {
          //                                       console.log("Partsll: ",parts)
        
          //                                       let thirdPart = parts[1];
          
          //                                       console.log("thirdPartll: ",thirdPart)
          
          //                                       let part2 = parts[0].split("-")
        
                                                
          //                                       let finalres =  part2[0] + "-" + parts[1]; 
          
          //                                       console.log("finalresll: ",finalres)
          
          //                                     return finalres;
        
          //                                     }else {
          //                                       console.log("Parts: ",parts)
        
          //                                       let fileid = filename.split("-")
        
          //                                       let thirdPart = parts[2];
          
          //                                       console.log("thirdPart: ",thirdPart)
          
          //                                       let result = thirdPart.replace(/^\d+/, '');
          
          //                                       console.log("result: ",result)
                                                
          //                                       let finalres = fileid[0] + "-" +parts[1] + result; 
          
          //                                       console.log("finalres: ",finalres)
          
          //                                     return finalres;
          //                                     }
        
                                             
          //                                 }
        
          //                                   let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
          //                                   let imgNames = await fs.readdirSync(imgDirectory);
                        
          //                                   console.log("imgNames654: ", imgNames, activeId ,overId)
        
          //                                   imgNames.map((item) => {
          //                                     if(item.includes("_")) {
        
          //                                       console.log("Final item: ",item)
                                                
          //                                       const regex = /-(\d+)_/;
          //                                       let modifiedStrrr = transformFilename(item);
          
        
          //                                       // const regex = /-(\d+)_/;
          //                                       // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
          //                                     let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
          //                                     let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
          //                                     console.log("imgDirectoryOld35: ", imgDirectoryOld,
          //                                     imgDirectoryNew)
                        
          //                                     renameFile(imgDirectoryOld, imgDirectoryNew)
          //                                       .then(() => {
          //                                           console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          //                                       })
          //                                       .catch(error => {
          //                                           console.error(`Error renaming ${imgDirectoryOld}:`, error);
          //                                       });
          //                                     }
          //                                   })
        
                                            
                                          
                                         
        
                             
                                              
          //                             }
          //                             xyz()
                          
                          
          //                  })
          //                             .catch(error => {
          //                                 console.error(`Errorsdf renaming ${imgDirectoryOld}:`, error);
          //                             });
          
          
          //                         }
          //                       })
        
          
                                
          //                     }
          
          //                     ltt()
                             
          //                   })
          //                 }
        
        
        
            
        
          //                 }
        
          //                 pqrttt()


          //             }
  
          //             console.log("fileItems4: ", imgDirectoryOld, imgDirectoryNew);
          //             await renameFile(imgDirectoryOld, imgDirectoryNew);
          //             console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
          //         } else {
          //             console.error(`Invalid file name: ${fileName}`);
          //         }
          //     })
          // );

        }
        jkhasd()
      }else {
        const deleteAndRenameImages = async () => {

          await Promise.all(

              img_checks_del.map(async (ite) => {
                  console.log("Ite::::::>", ite, selectedImageID);

                  let resss;

                  if(ite === "PM00001") {
                    
                  }else{

                    resss = await Pms_Propertymaster_Roomdetails.findOne({ id: ite });
                    
                  }

                  console.log("Datasss:::::::>", resss);

                  let imgDirectory;
  
                  if(ite === "PM00001") {
                    imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite);
                  }else {
                    imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite);
                  }
                  
                  let imgNames = fs.readdirSync(imgDirectory);
                  const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedImageID.toString()));
                  let imgNumbers = imgNames.map(name => parseInt(name));
                  imgNumbers.sort((a, b) => a - b);
  
                  console.log("Img num:::>", imgNumbers, imgNames, filteredImgNames);
  
                  const [imagetext, fileExtensionss] = imgDelTitle.split(".");
                  let filePath = '';
                  let pqr = selectedImageID.toString() + roomid.toString() + "." + fileExtensionss;
                  console.log("pqr: ", pqr);
  
                  let index = "";
                  filteredImgNames.forEach((item) => {
                      const [id, text] = item.split("-");
                      if (text === pqr) {

                        if(ite === "PM00001") {
                          filePath = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, item);
                        }else {
                          filePath = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, item);
                        }
                          
                          index = imgNames.indexOf(item);
                      }
                  });

                  console.log("FilePathhh:::>>>",filePath)

                  if(filePath === "") {

                  }else {
                    await deleteFile(filePath);
                  
  

                  const filesAfterTarget = imgNames.slice(index + 1);
                  console.log("DAtassss:::", filesAfterTarget, img_checks_del);
  
                  await Promise.all(
                      filesAfterTarget.map(async (fileName, index) => {
                          const [prefix, suffix] = fileName.split('.');
                          const fileNumber = parseInt(prefix);
  
                          if (!isNaN(fileNumber)) {
                              const newFileName = `${fileNumber - 1}.${suffix}`;

                              let imgDirectoryOld;

                              if(ite === "PM00001") {
                                imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, fileName);
                              }else {
                                imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, fileName);
                              }
                              
                              let imgDirectoryNew = '';
  
                              if (fileName.includes("-")) {
                                  const [prefix, suffixx] = fileName.split('-');
                                  console.log(prefix, suffixx);
                                  const newFileNamee = `${fileNumber - 1}${"-"}${suffixx}`;

                                  if(ite === "PM00001") {
                                    imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, newFileNamee);
                                  }else{
                                    imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, newFileNamee);
                                  }
                                  
                              } else {

                                if(ite === "PM00001") {
                                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, "Property Main" + "-" + ite, newFileName);
                                }else {
                                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + ite, newFileName);
                                }
                                  
                              }
  
                              console.log("fileItems4: ", imgDirectoryOld, imgDirectoryNew);
                              await renameFile(imgDirectoryOld, imgDirectoryNew);
                              console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                          } else {
                              console.error(`Invalid file name: ${fileName}`);
                          }
                      })
                  );

                }
              })
          );
  
          let filePathh = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, imgDelTitle);
          console.log("FilePAthhh: ",filePathh)
          await deleteFile(filePathh);

          if(imgDelTitle.includes("-")) {
            const [id, text] = imgDelTitle.split("-")
            const [sec, ext] = text.split(".")
            let extension = "." + ext;

            const separateParts = (input) => {

              const index = input.search(/\D/);

              const numberPart = index === -1 ? input : input.slice(0, index);
              const alphanumericPart = input.slice(index);
              
              return { numberPart, alphanumericPart };
            };
          
      
            const { numberPart, alphanumericPart } = separateParts(sec);

            console.log("Found: ",id, alphanumericPart, extension)

            await Pms_Propertymaster_Roomphotomanage.updateOne({Hotel_Id: parseInt(hotelidd), selected_room: alphanumericPart.toString(),img_id: parseInt(numberPart)}, {include_in_main: false});
            
          }
  
          // let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
          // let imgNames = fs.readdirSync(imgDirectory);
          // const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedImageID.toString()));
          // let imgNumbers = imgNames.map(name => parseInt(name));
          // imgNumbers.sort((a, b) => a - b);
  
          // console.log("Img num last:::>", imgNumbers, imgNames, filteredImgNames);
  
          // let index = parseInt(imgDelTitle);
          // filteredImgNames.forEach((item) => {
          //     const [id, text] = item.split("-");
          //     if (text === pqr) {
          //         index = imgNames.indexOf(item);
          //     }
          // });
  
          // const filesAfterTarget = imgNames.slice(index - 1);
          // console.log("DAtassss:::last", filesAfterTarget);
  
          // await Promise.all(
          //     filesAfterTarget.map(async (fileName, index) => {
          //         const [prefix, suffix] = fileName.split('.');
          //         const fileNumber = parseInt(prefix);
  
          //         if (!isNaN(fileNumber)) {
          //             const newFileName = `${fileNumber - 1}.${suffix}`;
          //             let fileId = parseInt(fileName);
          //             const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, fileName);
          //             let imgDirectoryNew = '';
  
          //             if (fileName.includes("-")) {
          //                 const [prefix, suffixx] = fileName.split('-');
          //                 console.log(prefix, suffixx);
          //                 const newFileNamee = `${fileNumber - 1}${"-"}${suffixx}`;
          //                 imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileNamee);
          //             } else {
          //                 imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileName);

          //                 const pqrttt = async() => {

          //                   console.log("file.title1sdfsd: ",fileId, fileName)
        
          //                   let  [hoteltext, hotelid] = hotel_Name.split("-");
          //                   let  [roomtext, roomid] = room_Name.split("-");

          //                   const extensionIndex = fileName.lastIndexOf(".");
          //                   const fileExtensions = fileName.substring(extensionIndex);
        
          //                   let data = await Pms_Propertymaster_Roomphotomanage.findOne({
          //                     Hotel_Id: hotelid,
          //                     selected_room: { $regex: new RegExp(roomid, 'i'), },
          //                     img_id: parseInt(fileId),
          //         });
        
          //                 if(data) {
          //                   if(data.img_id === parseInt(fileId)) {
        
          //                     await Pms_Propertymaster_Roomphotomanage.updateOne({
          //                       id: data.id,
          //                       Hotel_Id: hotelid,
          //                       selected_room: roomid.toString(),
          //                       img_id: parseInt(fileId),
          //                     },{img_id: parseInt((fileId - 1)), img_title: (fileId - 1).toString() + fileExtensions})
          //                   }
                            
          
          //                   console.log("Data Actisdfsdfve::::::::>", data, fileId)
        
          //                   data.img_checks.map((item) => {
        
          //                     const ltt = async () => {
          
          //                       let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
          //                       console.log("Datasss78dsfsdf9:::::::>", resss)
          
          //                       let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                  
          //                       let imgNames = await fs.readdirSync(imgDirectory);
          
          //                       console.log("imgNamesimsdfsdfgNames: ",imgNames)
          
          //                       renamePromisesss = imgNames.map((itemm) => {
          //                         console.log("Itemmsdfmmm: ",itemm, `${fileId}${roomid}`)
          //                         if(itemm.includes(`${fileId}${roomid}`)) {
          //                           console.log("imgNamsdfestttt: ", itemm)
          
          //                           function renameFile(oldPath, newPath) {
          //                             return new Promise((resolve, reject) => {
          //                               fs.rename(oldPath, newPath, (err) => {
          //                                 if (err) {
          //                                   reject(err);
          //                                 } else {
          //                                   console.log('Rensdfame complete!');
          //                                   resolve();
          //                                 }
          //                               });
          //                             });
          //                           }
          
          //                           const regex = /-(\d+)(?=[a-zA-Z])/;
          //                           //const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1)}`);
        
          //                           const modifiedStr = itemm.replace(regex, `-${fileId + "_" + (parseInt(fileId) - 1) + "_" + fileId}`);
          
          //                           let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
          //                           let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
          //                           console.log("imgDirectsdforyOld: ", imgDirectoryOld,
          //                           imgDirectoryNew)
          
          //                           renameFile(imgDirectoryOld, imgDirectoryNew)
          //                             .then(() => {
          //                                 console.log(`Renasdfmed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);

          //                                 const xyz = async () => {
  
          //                                   console.log("XYZ Called::::::::>")
  
          //                                   function transformFilename(filename) {
                                              
          //                                     let parts = filename.split('_')
        
          //                                     if(parts.length === 2) {
          //                                       console.log("Partsll: ",parts)
        
          //                                       let thirdPart = parts[1];
          
          //                                       console.log("thirdPartll: ",thirdPart)
          
          //                                       let part2 = parts[0].split("-")
        
                                                
          //                                       let finalres =  part2[0] + "-" + parts[1]; 
          
          //                                       console.log("finalresll: ",finalres)
          
          //                                     return finalres;
        
          //                                     }else {
          //                                       console.log("Parts: ",parts)
        
          //                                       let fileid = filename.split("-")
        
          //                                       let thirdPart = parts[2];
          
          //                                       console.log("thirdPart: ",thirdPart)
          
          //                                       let result = thirdPart.replace(/^\d+/, '');
          
          //                                       console.log("result: ",result)
                                                
          //                                       let finalres = fileid[0] + "-" +parts[1] + result; 
          
          //                                       console.log("finalres: ",finalres)
          
          //                                     return finalres;
          //                                     }
        
                                             
          //                                 }
        
          //                                   let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
          //                                   let imgNames = await fs.readdirSync(imgDirectory);
                        
          //                                   console.log("imgNames654: ", imgNames, activeId ,overId)
        
          //                                   imgNames.map((item) => {
          //                                     if(item.includes("_")) {
        
          //                                       console.log("Final item: ",item)
                                                
          //                                       const regex = /-(\d+)_/;
          //                                       let modifiedStrrr = transformFilename(item);
          
        
          //                                       // const regex = /-(\d+)_/;
          //                                       // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
          //                                     let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
          //                                     let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
          //                                     console.log("imgDirectoryOld35: ", imgDirectoryOld,
          //                                     imgDirectoryNew)
                        
          //                                     renameFile(imgDirectoryOld, imgDirectoryNew)
          //                                       .then(() => {
          //                                           console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          //                                       })
          //                                       .catch(error => {
          //                                           console.error(`Error renaming ${imgDirectoryOld}:`, error);
          //                                       });
          //                                     }
          //                                   })
        
                                            
                                          
                                         
        
                             
                                              
          //                             }
          //                             xyz()
                          
                          
          //                  })
          //                             .catch(error => {
          //                                 console.error(`Errorsdf renaming ${imgDirectoryOld}:`, error);
          //                             });
          
          
          //                         }
          //                       })
        
          
                                
          //                     }
          
          //                     ltt()
                             
          //                   })
          //                 }
        
        
        
            
        
          //                 }
        
          //                 pqrttt()
          //             }
  
          //             console.log("fileItems4: ", imgDirectoryOld, imgDirectoryNew);
          //             await renameFile(imgDirectoryOld, imgDirectoryNew);
          //             console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
          //         } else {
          //             console.error(`Invalid file name: ${fileName}`);
          //         }
          //     })
          // );
  
          const deletefromdb = async () => {
              let result = await Pms_Propertymaster_Roomphotomanage.deleteOne({ Hotel_Id: parseInt(hotelidd), selected_room: roomid.toString(), img_id: parseInt(imgDelId) });
              let imgDirectoryy = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
              imgNamessss = fs.readdirSync(imgDirectoryy);
              console.log("Result: ", result, imgNamessss);
          };
  
          await deletefromdb();
      };
  
      deleteAndRenameImages().then(() => {
          console.log("Result2: ", imgNamessss);
  
      }).catch(error => {
          console.error("Error in deleteAndRenameImages: ", error);
  
      });
      }

      return NextResponse.json({ Message: "Success", status: 200 });

    }else if( operation === "renameAfterMultipleDelete") {

      console.log("renameAfterMultipleDelete", selectedCheckboxesfordelete)

      function renameFile(oldPath, newPath) {
        return new Promise((resolve, reject) => {
          fs.rename(oldPath, newPath, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('Rensdfame complete!');
              resolve();
            }
          });
        });
      }

          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
          let imgNames = fs.readdirSync(imgDirectory);
          const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedCheckboxesfordelete[0].toString()));
          let imgNumbers = imgNames.map(name => parseInt(name));
          imgNumbers.sort((a, b) => a - b);
  
          console.log("Img num last:::>", imgNumbers, imgNames, filteredImgNames);
  
          let index = 0;
          filteredImgNames.forEach((item) => {
              const [id, text] = item.split("-");
              if (text === pqr) {
                  index = imgNames.indexOf(item);
              }
          });
  
          const filesAfterTarget = imgNames;
          console.log("DAtassss:::last", filesAfterTarget);

            await Promise.all(
              filesAfterTarget.map(async (fileName, index) => {
                  const [prefix, suffix] = fileName.split('.');
                  const fileNumber = parseInt(prefix);
  
                  if (!isNaN(fileNumber)) {
                      const newFileName = `${index + 1}.${suffix}`;
                      let fileId = parseInt(fileName);
                      const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, fileName);
                      let imgDirectoryNew = '';
  
                      if (fileName.includes("-")) {
                          const [prefix, suffixx] = fileName.split('-');
                          console.log(prefix, suffixx);
                          const newFileNamee = `${index + 1}${"-"}${suffixx}`;
                          imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileNamee);
                      } else {
                          imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, newFileName);

                          const pqrttt = async() => {
                            

                            console.log("file.title1sdfsd: ",fileId, fileName)
        
                            let  [hoteltext, hotelid] = hotel_Name.split("-");
                            let  [roomtext, roomid] = room_Name.split("-");

                            const extensionIndex = fileName.lastIndexOf(".");
                            const fileExtensions = fileName.substring(extensionIndex);
        
                            let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                              Hotel_Id: hotelid,
                              selected_room: { $regex: new RegExp(roomid, 'i'), },
                              img_id: parseInt(fileId),
                  });
                  
                  console.log("without room: ",data)
                  
        
                          if(data) {
                            let renamePromisesss = '';
                            if(data.img_id === parseInt(fileId)) {
        
                              await Pms_Propertymaster_Roomphotomanage.updateOne({
                                id: data.id,
                                Hotel_Id: hotelid,
                                selected_room: roomid.toString(),
                                img_id: parseInt(fileId),
                              },{img_id: parseInt((fileId - 1)), img_title: (fileId - 1).toString() + fileExtensions})
                            }
                            
          
                            console.log("Data Actisdfsdfve::::::::>", data, fileId)
        
                            data.img_checks.map((item) => {
        
                              const ltt = async () => {
          
                                let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                                console.log("Datasss78dsfsdf9:::::::>", resss)
          
                                let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                  
                                let imgNames = await fs.readdirSync(imgDirectory);
          
                                console.log("imgNamesimsdfsdfgNames: ",imgNames)
                                
                                renamePromisesss = imgNames.map((itemm) => {
                                  console.log("Itemmsdfmmm: ",itemm, `${fileId}${roomid}`)
                                  if(itemm.includes(`${fileId}${roomid}`)) {
                                    console.log("imgNamsdfestttt: ", itemm)
          
                                    function renameFile(oldPath, newPath) {
                                      return new Promise((resolve, reject) => {
                                        fs.rename(oldPath, newPath, (err) => {
                                          if (err) {
                                            reject(err);
                                          } else {
                                            console.log('Rensdfame complete!');
                                            resolve();
                                          }
                                        });
                                      });
                                    }
          
                                    const regex = /-(\d+)(?=[a-zA-Z])/;
                                    //const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1)}`);
        
                                    const modifiedStr = itemm.replace(regex, `-${fileId + "_" + (parseInt(fileId) - 1) + "_" + fileId}`);
          
                                    let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                    let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                    console.log("imgDirectsdforyOld: ", imgDirectoryOld,
                                    imgDirectoryNew)
          
                                    renameFile(imgDirectoryOld, imgDirectoryNew)
                                      .then(() => {
                                          console.log(`Renasdfmed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);

                                          const xyz = async () => {
  
                                            console.log("XYZ Called::::::::>")
  
                                            function transformFilename(filename) {
                                              
                                              let parts = filename.split('_')
        
                                              if(parts.length === 2) {
                                                console.log("Partsll: ",parts)
        
                                                let thirdPart = parts[1];
          
                                                console.log("thirdPartll: ",thirdPart)
          
                                                let part2 = parts[0].split("-")
        
                                                
                                                let finalres =  part2[0] + "-" + parts[1]; 
          
                                                console.log("finalresll: ",finalres)
          
                                              return finalres;
        
                                              }else {
                                                console.log("Parts: ",parts)
        
                                                let fileid = filename.split("-")
        
                                                let thirdPart = parts[2];
          
                                                console.log("thirdPart: ",thirdPart)
          
                                                let result = thirdPart.replace(/^\d+/, '');
          
                                                console.log("result: ",result)
                                                
                                                let finalres = fileid[0] + "-" +parts[1] + result; 
          
                                                console.log("finalres: ",finalres)
          
                                              return finalres;
                                              }
        
                                             
                                          }
        
                                            let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                                            let imgNames = await fs.readdirSync(imgDirectory);
                        
                                            console.log("imgNames654: ", imgNames, activeId ,overId)
        
                                            imgNames.map((item) => {
                                              if(item.includes("_")) {
        
                                                console.log("Final item: ",item)
                                                
                                                const regex = /-(\d+)_/;
                                                let modifiedStrrr = transformFilename(item);
          
        
                                                // const regex = /-(\d+)_/;
                                                // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
                                              let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                              let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
                                              console.log("imgDirectoryOld35: ", imgDirectoryOld,
                                              imgDirectoryNew)
                        
                                              renameFile(imgDirectoryOld, imgDirectoryNew)
                                                .then(() => {
                                                    console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                })
                                                .catch(error => {
                                                    console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                });
                                              }
                                            })
        
                                            
                                          
                                         
        
                             
                                              
                                      }
                                      xyz()
                          
                          
                           })
                                      .catch(error => {
                                          console.error(`Errorsdf renaming ${imgDirectoryOld}:`, error);
                                      });
          
          
                                  }
                                })
        
          
                                
                              }
          
                              ltt()
                             
                            })
                          }
        
        
        
            
        
                          }
        
                          pqrttt()


                      }
  
                      console.log("fileItems4: ", imgDirectoryOld, imgDirectoryNew);
                      await renameFile(imgDirectoryOld, imgDirectoryNew);
                      console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                  } else {
                      console.error(`Invalid file name: ${fileName}`);
                  }
              })
          );

      return NextResponse.json({ Message: "Success", status: 200 });

    }else if(action === "deleteFile") {

        filteredChecks?.map(async(ite) => {
          console.log("Ite::::::>",ite, selectedImageID)

          let resss = await Pms_Propertymaster_Roomdetails.findOne({id: ite})
          console.log("Datasss:::::::>", resss)
          let imgDirectory;

          if(ite === "PM00001"){
            imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_name, "Property Main" + "-" + ite);
          }else{
            imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_name, resss.room_name + "-" + ite);
          }
  
          
    
          let imgNames = fs.readdirSync(imgDirectory);

          const filteredImgNames = imgNames.filter(file => file.includes('-' + selectedImageID.toString()));
    
          let imgNumbers = imgNames.map(name => parseInt(name));
    
          imgNumbers.sort((a, b) => a - b);
    
          console.log("Img num:::>",imgNumbers, imgNames, filteredImgNames)

          const [roomtext, roomid] = selectedRoom.split("-");

          const [imagetext, fileExtensionss] = selectedImageTitle.split(".");

          

          let filePath = '';

          let pqr = selectedImageID.toString() + roomid.toString() + "." + fileExtensionss;

          console.log("pqr: ",pqr)

          let index = "";

          filteredImgNames.map((item) => {
            const [id,text] = item.split("-")
            if(text === pqr) {

              if(ite === "PM00001") {
                filePath = path.join(process.cwd(), 'public', 'img', hotel_name, "Property Main" + "-" + ite, item);
              }else{
                filePath = path.join(process.cwd(), 'public', 'img', hotel_name, resss.room_name + "-" + ite, item);
              }
              

              index = imgNames.indexOf(item);
            }
          })

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
              return;
            }
            console.log('File deleted successfully');

            function renameFile(oldPath, newPath) {
              return new Promise((resolve, reject) => {
                fs.rename(oldPath, newPath, (err) => {
                  if (err) {
                    reject(err);
                  } else {
                    console.log('Rename complete!');
                    resolve();
                  }
                });
              });
            }

           

            const filesAfterTarget = imgNames.slice(index + 1);

            filteredChecks?.map(async(ite) => {

              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: ite})

                //console.log("Datasssss:::::::>", resss.room_name)

                filesAfterTarget.map((fileName, index) => {



                  const [prefix, suffix] = fileName.split('.');
    
                  const fileNumber = parseInt(prefix); 
    
                  if (!isNaN(fileNumber)) {
    
                    const newFileName = `${fileNumber - 1}.${suffix}`;
                    let imgDirectoryOld;

                    if(ite === "PM00001") {
                      imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_name, "Property Main" + "-" + ite, fileName);
                    }else{
                      imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_name, resss.room_name + "-" + ite, fileName);
                    }
    
                    
                    let imgDirectoryNew = '';
                    if(fileName.includes("-")) {
                      const [prefix, suffixx] = fileName.split('-');
                      console.log(prefix, suffixx)

                      const newFileNamee = `${fileNumber - 1}${"-"}${suffixx}`;
                      if(ite === "PM00001") {
                        imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_name, "Property Main" + "-" + ite, newFileNamee);
                      }else{
                        imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_name, resss.room_name + "-" + ite, newFileNamee);
                      }
                      
                     
                    }else{
                      if(ite === "PM00001") {
                        imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_name, "Property Main" + "-" + ite, newFileName);
                      }else{
                        imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_name, resss.room_name + "-" + ite, newFileName);
                      }
                      
                    }
                    
    
                    console.log("fileItems4: ",imgDirectoryOld, imgDirectoryNew)
                    
                    return renameFile(imgDirectoryOld, imgDirectoryNew)
                        .then(() => {
                            console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                        })
                        .catch(error => {
                            console.error(`Error renaming ${fileName}:`, error);
                        });
    
                  } else {
                      console.error(`Invalid file name: ${fileName}`);
                  }
              });



            })


          

            


          });
        })

        return NextResponse.json({ Message: "Success", status: 200 });

      }else  if(operation === "rename_File") {
        console.log("Rename::::::",hotel_Name,
        room_Name,
        activeId,
        overId
      )
  
          function renameFile(oldPath, newPath) {
            return new Promise((resolve, reject) => {
              fs.rename(oldPath, newPath, (err) => {
                if (err) {
                  reject(err);
                } else {
                  console.log('Rename complete!');
                  resolve();
                }
              });
            });
          }
  
          if(activeId > overId) {
            for(let i = overId; i <= activeId; i++) {
              console.log("Over Id: ",i)
  
              formattedFilesNew?.map((file) => {
  
                if(file.id === parseInt(i)) {
                  
                  console.log("File:::::>",file)
  
                  const extensionIndex = file.title.lastIndexOf(".");
                  const fileExtensions = file.title.substring(extensionIndex);
  
                  const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, file.title);
                  const imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, file.id.toString()+ '_' + file.title);
  
                  renameFile(imgDirectoryOld, imgDirectoryNew)
                    .then(() => {
                             
                      console.log("Renamed Successfully!");
  
                    })
                }
  
              })
  
            }
          }
  
          if(activeId < overId) {
            for(let i = activeId; i <= overId; i++) {
              console.log("Active Id: ",i)
  
              formattedFilesNew?.map((file) => {
  
                if(file.id === parseInt(i)) {
                  
                  console.log("File:::::>",file)
  
                  const extensionIndex = file.title.lastIndexOf(".");
                  const fileExtensions = file.title.substring(extensionIndex);
  
                  const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, file.title);
                  const imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, file.id.toString()+ '_' + file.title);
  
                  renameFile(imgDirectoryOld, imgDirectoryNew)
                    .then(() => {
                             
                      console.log("Renamed Successfully!");
  
                    })
                }
  
              })
  
  
  
  
            }
          }
  
     
          
  
  
  
  
        return NextResponse.json({ Message: "Success", status: 200 });
      }else if(operation === "final_rename") {
  
        console.log("Rename::::::",hotel_Name,
        room_Name,
        activeId,
        overId,)
  
  
  
        function renameFile(oldPath, newPath) {
          return new Promise((resolve, reject) => {
            fs.rename(oldPath, newPath, (err) => {
              if (err) {
                reject(err);
              } else {
                console.log('Rename complete!');
                resolve();
              }
            });
          });
        }
  
        if(activeId > overId) {

          let renamePromisesss = '';
          let renamePromises = [];
  
          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
        
          let imgNames = await fs.readdirSync(imgDirectory);
  
          const formattedFilesFinal = imgNames?.map((fileName, index) => {
  
            const idAndTitle = fileName.split('_');

            const id = parseInt(idAndTitle[0], 10);

            return { id: id, title: fileName };
  
          });
          
          console.log("Image Nameeeeeee:::::::>",imgNames, formattedFilesFinal)



          let  [hoteltext, hotelidd] = hotel_Name.split("-");
          let  [roomtext, roomidd] = room_Name.split("-");

          let data11 = await Pms_Propertymaster_Roomphotomanage.findOne({
            Hotel_Id: parseInt(hotelidd),
            selected_room: { $regex: new RegExp(roomidd, 'i'), },
            img_id: parseInt(activeId),
          });

          let data22 = await Pms_Propertymaster_Roomphotomanage.findOne({
            Hotel_Id: parseInt(hotelidd),
            selected_room: { $regex: new RegExp(roomidd, 'i'), },
            img_id: parseInt(overId),
          });

          console.log("Main Data:::::::>", data11, data22)

          let data11imgchecklength = data11 ? data11.img_checks.length : null;
          let data22imgchecklength = data22 ? data22.img_checks.length : null;






  
          for(let i = overId; i < activeId; i++) {
            console.log("Over Id: ",i)
  
            formattedFilesFinal?.map((file, index) => {
  
              if(file.id === parseInt(i)) {
                
                console.log("File:::::>",file)
  
                const extensionIndex = file.title.lastIndexOf(".");
                const fileExtensions = file.title.substring(extensionIndex);
  
                const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, file.title);
                // const imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, (file.id + 1).toString() + fileExtensions);
                let imgDirectoryNew = "";
                if(file.title.includes("-")) {
                  const [prefix,suffix] = file.title.split("-");
                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, (file.id + 1).toString() + "-" + suffix);

                  

                }else {
                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, (file.id + 1).toString() + fileExtensions);
                  console.log("file.title0: ",file.title, file.id, imgDirectoryOld,
                  imgDirectoryNew)
                  const pqr = async() => {

                    console.log("file.title1: ",file.title, file.id)

                    let  [hoteltext, hotelid] = hotel_Name.split("-");
                    let  [roomtext, roomid] = room_Name.split("-");

                    let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                      Hotel_Id: hotelid,
                      selected_room: { $regex: new RegExp(roomid, 'i'), },
                      img_id: parseInt(file.id),
                  });

                  if(data && (parseInt(activeId) - parseInt(overId)) !== 1) {
                    if(data.img_id === parseInt(file.id)) {

                      await Pms_Propertymaster_Roomphotomanage.updateOne({
                        id: data.id,
                        Hotel_Id: hotelid,
                        selected_room: roomid.toString(),
                        img_id: parseInt(file.id),
                      },{img_id: parseInt((file.id + 1)), img_title: (file.id + 1).toString() + fileExtensions})
                    }
                    
  
                    console.log("Data Active::::::::>", data, file.id)

                    data.img_checks.map((item) => {

                      const ltt = async () => {
  
                        let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
  
                        console.log("Datasss789:::::::>", resss)
  
                        let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                        let imgNames = await fs.readdirSync(imgDirectory);
  
                        console.log("imgNamesimgNames: ",imgNames)
  
                        renamePromisesss = imgNames.map((itemm) => {
                          console.log("Itemmmmm: ",itemm, `${file.id}${roomid}`)
                          if(itemm.includes(`${file.id}${roomid}`)) {
                            console.log("imgNamestttt: ", itemm)
  
                            function renameFile(oldPath, newPath) {
                              return new Promise((resolve, reject) => {
                                fs.rename(oldPath, newPath, (err) => {
                                  if (err) {
                                    reject(err);
                                  } else {
                                    console.log('Rename complete!');
                                    resolve();
                                  }
                                });
                              });
                            }
  
                            const regex = /-(\d+)(?=[a-zA-Z])/;
                            //const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1)}`);

                            const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1) + "_" + file.id}`);
  
                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
  
                            console.log("imgDirectoryOld: ", imgDirectoryOld,
                            imgDirectoryNew)
  
                            renameFile(imgDirectoryOld, imgDirectoryNew)
                              .then(() => {
                                  console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);



//ILL
                                  if((data11 === null && data22 === null) || (data11imgchecklength === 0 && data22imgchecklength === 0)) {
                                    console.log("True ILL")


                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                }


                                  }else if((data11 !== null && data22 !== null) && (data11imgchecklength === 0 && data22imgchecklength === 0)) {

                                    console.log("Testttttttttt")

                                  }else if((data11 !== null && data22 !== null) && (data11imgchecklength > 0 && data22imgchecklength === 0)) {
                                    console.log("Between ILL")
                                  }else if((data11 !== null && data22 === null) && (data11imgchecklength === 0 && (data22imgchecklength === 0 || data22imgchecklength === null))) {
                                    console.log("Both Zero between")


                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                      }



                                  }else if((data11 !== null && data22 !== null) && ((data11imgchecklength === 0 || data11imgchecklength === null) && data22imgchecklength > 0)) {
                                    console.log("One is zero ther not 123")
                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                }
                                  }else if((data11 !== null && data22 === null) && (data11imgchecklength > 0 && data22imgchecklength === null)) {
                                    console.log("Right place")
                                  }else if((data11 !== null && data22 !== null) || (data11imgchecklength > 0 && data22imgchecklength > 0)) {
                                    console.log("Right place New")
                                  }else if((data11 === null && data22 !== null) && (data11imgchecklength === null && data22imgchecklength > 0)) {
                                    console.log("Right place 0002")
                                  }else{
                                    console.log("False ILL", modifiedStr)



                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                }



                                  }


                              
                            })
                              .catch(error => {
                                  console.error(`Error renaming ${imgDirectoryOld}:`, error);
                              });
  
  
                          }
                        })

  
                        
                      }
  
                      ltt()
                     
                    })
                  }



    

                  }

                  pqr()


                }

                renamePromises.push(renameFile(imgDirectoryOld, imgDirectoryNew)
                  .then(() => {
                           
                    console.log("Renamed Successfully!", imgDirectoryOld, imgDirectoryNew);


  
                  }))
              }
  
            })
          }
  
          Promise.all(renamePromises)
          .then(() => {
              console.log("All files renamed successfully!", formattedFilesFinal, activeId,
              overId);
  
              let activeTitle;
              let fileExtensions;
  
              if (formattedFilesFinal && formattedFilesFinal.length > 0) {
  
                formattedFilesFinal.forEach((file, index) => {
  
                    if (file.id === parseInt(activeId)) {
                        console.log("Active:::::>", file);
  
                        activeTitle = file.title;
  
                        const extensionIndex = activeTitle.lastIndexOf(".");
                        fileExtensions = activeTitle.substring(extensionIndex);
                    }
  
                    // if (file.id === parseInt(overId)) {
                    //     console.log("Over:::::>", file);
                    // }
                });
            } else {
                console.log("formattedFilesFinal is undefined or empty.");
            }
  
            const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, activeTitle);
            let imgDirectoryNew = "";

            if(activeTitle.includes("-")) {

              const [prefix,suffix] = activeTitle.split("-")

              imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, overId.toString() + "-" +suffix);

            }else {
              imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, overId.toString() + fileExtensions);
            }
            console.log("Rename last file: ",imgDirectoryOld, imgDirectoryNew)
  
            renameFile(imgDirectoryOld, imgDirectoryNew)
                .then(() => {
                          
                  console.log("Renamed Successfullyyyyyyyyyy!");

                  console.log("Main Data new: ",data11,data22,data11imgchecklength,data22imgchecklength)
                 
                  if((data11 !== null && data22 === null) || (data11 !== null && data22 !== null)) {

                    if(data11imgchecklength > 0 && (data22imgchecklength === 0 || data22imgchecklength === null)) {

                      console.log("True data1")

                      const ghi = async() => {

                        let  [hoteltext, hotelid] = hotel_Name.split("-");
                        let  [roomtext, roomid] = room_Name.split("-");
    
                        let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(activeId),
                        });
    
                        // let data = dataaaa[dataaaa.length - 1];
    
                        let res = await Promise.all(dataaaa.map(async (item, index) => {
                          if (index === dataaaa.length - 1) {
                            item.img_id = parseInt(overId) + 1234;
                            item.img_title = overId.toString() + fileExtensions;
                            await item.save();
                          }
                        }));
    
                        let data1 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(overId),
                        });
    
                    console.log("Data Active mulkkkkkk::::::::>", dataaaa, data1, res, activeId, overId)
    
    
                    // if(data) {
                    //   if(data.img_id === parseInt(activeId)) {
                    //     console.log("True 1")
                    //     await Pms_Propertymaster_Roomphotomanage.updateOne({
                    //       Hotel_Id: hotelid,
                    //       selected_room: roomid.toString(),
                    //       img_id: parseInt(activeId),
                    //     },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                    //   }
                    // }
    
                    if(data1) {
                      if(data1.img_id === parseInt(overId)) {
                        console.log("True 2")
                        await Pms_Propertymaster_Roomphotomanage.updateOne({
                          Hotel_Id: hotelid,
                          selected_room: roomid.toString(),
                          img_id: parseInt(overId),
                        },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                      }
                    }
    
                    let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                      Hotel_Id: hotelid,
                      selected_room: { $regex: new RegExp(roomid, 'i'), },
                      img_id: parseInt(overId) + 1234,
                  });
    
             
                  
                  
                 
                    let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                      Hotel_Id: hotelid,
                      selected_room: { $regex: new RegExp(roomid, 'i'), },
                      img_id: parseInt(activeId) + 1234,
                  });
                  
       
    
              console.log("Data Active mul 2::::::::>", data3, data4)
    
    
                  if(data3) {
                    if(data3.img_id === parseInt(overId) + 1234) {
                      await Pms_Propertymaster_Roomphotomanage.updateOne({
                        Hotel_Id: hotelid,
                        selected_room: roomid.toString(),
                        img_id: parseInt(overId) + 1234,
                      },{img_id: (parseInt(overId) + 1234) - 1234})
                    }
                  }
              
                  if(data4) {
                    if(data4.img_id === parseInt(activeId) + 1234) {
                      await Pms_Propertymaster_Roomphotomanage.updateOne({
                        Hotel_Id: hotelid,
                        selected_room: roomid.toString(),
                        img_id: parseInt(activeId) + 1234,
                      },{img_id: (parseInt(activeId) + 1234) - 1234})
                    }
                  }
    
                  let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                    Hotel_Id: parseInt(hotelid),
                    selected_room: { $regex: new RegExp(roomid, 'i'), },
                    img_id: parseInt(overId),
                  });

                  console.log("DAta:::::>",data)

                  let dataaaa1 = await Pms_Propertymaster_Roomphotomanage.find({
                    Hotel_Id: parseInt(hotelid),
                    selected_room: { $regex: new RegExp(roomid, 'i'), },
                  });

                  console.log("dataaaa154:",dataaaa1)


                  const imgChecksArrays = dataaaa1.map(item => item.img_checks);


                  const mergedImgChecks = [].concat(...imgChecksArrays);


                  const uniqueImgChecks = [...new Set(mergedImgChecks)];

                  console.log("uniqueImgChecks: ", uniqueImgChecks);
    
    
                  if(uniqueImgChecks) {
                    uniqueImgChecks.map((item) => {
    
                      const ltt = async () => {
    
                        let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
    
                        console.log("Datasss789rtyert:::::::>", resss)
    
                        let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                        let imgNames = await fs.readdirSync(imgDirectory);
    
                        console.log("imgNamesimgNamesdfhdfgh6574: ", imgNames, activeId ,overId)
    
                        
                        function renameFile(oldPath, newPath) {
                          return new Promise((resolve, reject) => {
                            fs.rename(oldPath, newPath, (err) => {
                              if (err) {
                                reject(err);
                              } else {
                                console.log('Rename completedfhdfgh!');
                                resolve();
                              }
                            });
                          });
                        }
    
                        imgNames.map((itemm) => {
                          console.log("Itemmmmm: ",itemm, `${activeId}${roomid}`)
                          if(itemm.includes(`${activeId}${roomid}`)) {
                            console.log("imgNamesttttdfghdfgh: ", itemm)
    
    
                            const regex = /-(\d+)(?=[a-zA-Z])/;
                            // let modifiedStr = '';
    
                            
    
                            let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                            let modifiedStrrr = itemm.replace(regex, `-${overId}`);
    
                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
    
                            console.log("imgDirectoryOlddfghdfgh54654: ", imgDirectoryOld,
                            imgDirectoryNew)
    
                            renameFile(imgDirectoryOld, imgDirectoryNew)
                              .then(() => {
                                  console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                  if(!itemm.includes(`${overId}${roomid}`)) {
                                    let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                    let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
    
    
              
                                    console.log("imgDirectoryOlddfghdfghdfghrr: ", imgDirectoryOld,
                                    imgDirectoryNew)
              
                                    renameFile(imgDirectoryOld, imgDirectoryNew)
                                      .then(() => {
                                          console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                        
    
                                        
    
                                      
                                        })
                                      }
    
    
                                      const xyz = async () => {
    
                                        function transformFilename(filename) {
                                          
                                          let parts = filename.split('_')
    
                                          if(parts.length === 2) {
                                            console.log("Partsll: ",parts)
    
                                            let thirdPart = parts[1];
      
                                            console.log("thirdPartll: ",thirdPart)
      
                                            let part2 = parts[0].split("-")
    
                                            
                                            let finalres =  part2[0] + "-" + parts[1]; 
      
                                            console.log("finalresll: ",finalres)
      
                                          return finalres;
    
                                          }else {
                                            console.log("Parts: ",parts)
    
                                            let fileid = filename.split("-")
    
                                            let thirdPart = parts[2];
      
                                            console.log("thirdPart: ",thirdPart)
      
                                            let result = thirdPart.replace(/^\d+/, '');
      
                                            console.log("result: ",result)
                                            
                                            let finalres = fileid[0] + "-" +parts[1] + result; 
      
                                            console.log("finalres: ",finalres)
      
                                          return finalres;
                                          }
    
                                         
                                      }
    
                                        let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                                        let imgNames = await fs.readdirSync(imgDirectory);
                    
                                        console.log("imgNamesimgNamesdfhdfghwertwer1: ", imgNames, activeId ,overId)
    
                                        imgNames.map((item) => {
                                          if(item.includes("_")) {
    
                                            console.log("Final item: ",item)
                                            
                                            const regex = /-(\d+)_/;
                                            let modifiedStrrr = transformFilename(item);
      
    
                                            // const regex = /-(\d+)_/;
                                            // let modifiedStrrr = modifiedStr.replace(regex, '-');
                    
                                          let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                          let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
      
      
                    
                                          console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                          imgDirectoryNew)
                    
                                          renameFile(imgDirectoryOld, imgDirectoryNew)
                                            .then(() => {
                                                console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                            })
                                            .catch(error => {
                                                console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                            });
                                          }
                                        })
    
                                        
                                      
                                     
    
                         
                                          
                                  }
                                  xyz()
                              })
                              .catch(error => {
                                  console.error(`Error renaming ${imgDirectoryOld}:`, error);
                              });
    
    
                          }
                          
                          if(itemm.includes(`${overId}${roomid}`)) {
                            console.log("imgNamesttttoverdfghdfghdfh: ", itemm)
    
    
                            const regex = /-(\d+)(?=[a-zA-Z])/;
                            const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
    
                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
    
                            console.log("imgDirectoryOlddfghdfgh: ", imgDirectoryOld,
                            imgDirectoryNew)
    
                            renameFile(imgDirectoryOld, imgDirectoryNew)
                              .then(() => {
                                  console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                  if(modifiedStr.includes("_")) {
    
                     
                                    const regex = /-(\d+)_/;
                                    let modifiedStrrr = modifiedStr.replace(regex, '-');
            
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
    
    
            
                                  console.log("imgDirectoryOlddfghdfghrtyr: ", imgDirectoryOld,
                                  imgDirectoryNew)
            
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                        const hii = async () => {
                                          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                                          let imgNames = await fs.readdirSync(imgDirectory);
                    
                                          console.log("imgNamesimrtyfghgNames: ",imgNames)
    
                                          imgNames.map((itemm) => {
                                            console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomid}`)
                                            if(itemm.includes(`${"_"}${overId}${roomid}`)) {
                                              const regex = /-(\d+)_/;
                                              let modifiedStrrr = itemm.replace(regex, '-');
                      
                                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                      
                                            console.log("imgDiredfghctoryOldsameer: ", imgDirectoryOld,
                                            imgDirectoryNew)
                      
                                            renameFile(imgDirectoryOld, imgDirectoryNew)
                                            }
                                        })
    
                                        }
    
                                        hii()
    
                                    })
                                    .catch(error => {
                                        console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                    });
                            }
                              })
                              .catch(error => {
                                  console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                              });
                          }

                          if(!itemm.includes(`${overId}${roomid}`) && !itemm.includes(`${activeId}${roomid}`)) {
                            const xyz = async () => {
    
                              function transformFilename(filename) {
                                
                                let parts = filename.split('_')

                                if(parts.length === 2) {
                                  console.log("Partsll: ",parts)

                                  let thirdPart = parts[1];

                                  console.log("thirdPartll: ",thirdPart)

                                  let part2 = parts[0].split("-")

                                  
                                  let finalres =  part2[0] + "-" + parts[1]; 

                                  console.log("finalresll: ",finalres)

                                return finalres;

                                }else {
                                  console.log("Parts: ",parts)

                                  let fileid = filename.split("-")

                                  let thirdPart = parts[2];

                                  console.log("thirdPart: ",thirdPart)

                                  let result = thirdPart.replace(/^\d+/, '');

                                  console.log("result: ",result)
                                  
                                  let finalres = fileid[0] + "-" +parts[1] + result; 

                                  console.log("finalres: ",finalres)

                                return finalres;
                                }

                               
                            }

                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);

                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNamesimgNamesdfhdfghwertwer1: ", imgNames, activeId ,overId)

                              imgNames.map((item) => {
                                if(item.includes("_")) {

                                  console.log("Final item: ",item)
                                  
                                  const regex = /-(\d+)_/;
                                  let modifiedStrrr = transformFilename(item);


                                  // const regex = /-(\d+)_/;
                                  // let modifiedStrrr = modifiedStr.replace(regex, '-');
          
                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);


          
                                console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                imgDirectoryNew)
          
                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                  .then(() => {
                                      console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                  })
                                  .catch(error => {
                                      console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                  });
                                }
                              })

                              
                            
                           

               
                                
                        }
                        xyz()
                          }
                        })
    
                        
                      }
    
                      ltt()
                     
                    })
                  }
    
                   
                        // if(data.img_id === parseInt(activeId)) {
                        //   await Pms_Propertymaster_Roomphotomanage.updateOne({
                        //     Hotel_Id: hotelid,
                        //     selected_room: roomid.toString(),
                        //     img_id: activeId,
                        //   },{img_id: overId, img_title: overId.toString() + fileExtensions})
                        // }
    
    
                    
    
                        // data.img_checks.map((item) => {
    
                        //   const ltt = async () => {
      
                        //     let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
      
                        //     console.log("Datasss789:::::::>", resss)
      
                        //     let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                        //     let imgNames = await fs.readdirSync(imgDirectory);
      
                        //     console.log("imgNamesimgNames33333: ",imgNames)
      
                        //     imgNames.map((itemm) => {
                        //       console.log("Itemmmmm: ",itemm, `${activeId}${roomid}`)
                        //       if(itemm.includes(`${activeId}${roomid}`)) {
                        //         console.log("imgNamestttt: ", itemm)
      
                        //         function renameFile(oldPath, newPath) {
                        //           return new Promise((resolve, reject) => {
                        //             fs.rename(oldPath, newPath, (err) => {
                        //               if (err) {
                        //                 reject(err);
                        //               } else {
                        //                 console.log('Rename complete!');
                        //                 resolve();
                        //               }
                        //             });
                        //           });
                        //         }
      
                        //         const regex = /-(\d+)(?=[a-zA-Z])/;
                        //         const modifiedStr = itemm.replace(regex, `-${overId}`);
      
                        //         let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                        //         let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
      
                        //         console.log("imgDirectoryOld3333: ", imgDirectoryOld,
                        //         imgDirectoryNew)
      
                        //         renameFile(imgDirectoryOld, imgDirectoryNew)
                        //           .then(() => {
                        //               console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                        //           })
                        //           .catch(error => {
                        //               console.error(`Error renaming ${fileName}:`, error);
                        //           });
      
      
                        //       }
                        //     })
      
                            
                        //   }
      
                        //   ltt()
                         
                        // })
                      
                      
    
                      }


                      ghi()

                    }else if(data11imgchecklength > 0 && data22imgchecklength > 0 && (parseInt(activeId) - parseInt(overId) !== 1)) {
                      console.log("Not Zero")


                      const notZeroFxn = async () => {
                            let  [hoteltext, hotelid] = hotel_Name.split("-");
                            let  [roomtext, roomid] = room_Name.split("-");
        
                            let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                              Hotel_Id: parseInt(hotelid),
                              selected_room: { $regex: new RegExp(roomid, 'i'), },
                              img_id: parseInt(activeId),
                            });
        
                            // let data = dataaaa[dataaaa.length - 1];
        
                            let res = await Promise.all(dataaaa.map(async (item, index) => {
                              if (index === dataaaa.length - 1) {
                                item.img_id = parseInt(overId) + 1234;
                                item.img_title = overId.toString() + fileExtensions;
                                await item.save();
                              }
                            }));
        
                            let data1 = await Pms_Propertymaster_Roomphotomanage.findOne({
                              Hotel_Id: parseInt(hotelid),
                              selected_room: { $regex: new RegExp(roomid, 'i'), },
                              img_id: parseInt(overId),
                            });
        
                        console.log("Data Active mulkkkkkk789::::::::>", dataaaa, data1, res, activeId, overId)
        
        
                        // if(data) {
                        //   if(data.img_id === parseInt(activeId)) {
                        //     console.log("True 1")
                        //     await Pms_Propertymaster_Roomphotomanage.updateOne({
                        //       Hotel_Id: hotelid,
                        //       selected_room: roomid.toString(),
                        //       img_id: parseInt(activeId),
                        //     },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                        //   }
                        // }
        
                        if(data1) {
                          if(data1.img_id === parseInt(overId)) {
                            console.log("True 2")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelid,
                              selected_room: roomid.toString(),
                              img_id: parseInt(overId),
                            },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                          }
                        }
        
                        let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelid,
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(overId) + 1234,
                      });
        
                
                      
                      
                    
                        let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelid,
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(activeId) + 1234,
                      });
                      
          
        
                    console.log("Data Active mul 2::::::::>", data3, data4)
          
          
                        if(data3) {
                          if(data3.img_id === parseInt(overId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelid,
                              selected_room: roomid.toString(),
                              img_id: parseInt(overId) + 1234,
                            },{img_id: (parseInt(overId) + 1234) - 1234})
                          }
                        }
                    
                        if(data4) {
                          if(data4.img_id === parseInt(activeId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelid,
                              selected_room: roomid.toString(),
                              img_id: parseInt(activeId) + 1234,
                            },{img_id: (parseInt(activeId) + 1234) - 1234})
                          }
                        }
          
                        let dataaaa1 = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                        });
      
                        console.log("dataaaa154:",dataaaa1)
      
      
                        const imgChecksArrays = dataaaa1.map(item => item.img_checks);
      
      
                        const mergedImgChecks = [].concat(...imgChecksArrays);
      
      
                        const uniqueImgChecks = [...new Set(mergedImgChecks)];
      
                        console.log("uniqueImgChecks: ", uniqueImgChecks);

                        if(uniqueImgChecks) {
                          uniqueImgChecks.map((item) => {
    
                            const ltt = async () => {
          
                              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                              console.log("Datasss789rtyert:::::::>", resss)
          
                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNamesimgNamesdfhdfgh: ", imgNames, activeId ,overId)
          
                              
                              function renameFile(oldPath, newPath) {
                                return new Promise((resolve, reject) => {
                                  fs.rename(oldPath, newPath, (err) => {
                                    if (err) {
                                      reject(err);
                                    } else {
                                      console.log('Rename completedfhdfgh!');
                                      resolve();
                                    }
                                  });
                                });
                              }
          
                              imgNames.map((itemm) => {
                                console.log("Itemmmmm: ",itemm, `${activeId}${roomid}`)
                                if(itemm.includes(`${activeId}${roomid}`)) {
                                  console.log("imgNamesttttdfghdfgh: ", itemm)
          
          
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
                                  // let modifiedStr = '';
          
                                  
          
                                  let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                                  let modifiedStrrr = itemm.replace(regex, `-${overId}`);
          
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                  console.log("imgDirectoryOlddfghdfgh: ", imgDirectoryOld,
                                  imgDirectoryNew)
          
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                        if(!itemm.includes(`${overId}${roomid}`)) {

                                          console.log("Itemsss123: ",itemm, `${overId}${roomid}`, modifiedStr, modifiedStrrr)
                                          let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                          let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                    
                                          console.log("imgDirectoryOlddfghdfghdfghrr: ", imgDirectoryOld,
                                          imgDirectoryNew)
                    
                                          renameFile(imgDirectoryOld, imgDirectoryNew)
                                            .then(() => {
                                                console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                              
          
                                              
          
                                            
                                              })
                                            }
          
          
                                            const xyz = async () => {
          
                                              function transformFilename(filename) {
                                                
                                                let parts = filename.split('_')
          
                                                if(parts.length === 2) {
                                                  console.log("Partsll: ",parts)
          
                                                  let thirdPart = parts[1];
            
                                                  console.log("thirdPartll: ",thirdPart)
            
                                                  let part2 = parts[0].split("-")
          
                                                  
                                                  let finalres =  part2[0] + "-" + parts[1]; 
            
                                                  console.log("finalresll: ",finalres)
            
                                                return finalres;
          
                                                }else {
                                                  console.log("Parts: ",parts)
          
                                                  let fileid = filename.split("-")
          
                                                  let thirdPart = parts[2];
            
                                                  console.log("thirdPart: ",thirdPart)
            
                                                  let result = thirdPart.replace(/^\d+/, '');
            
                                                  console.log("result: ",result)
                                                  
                                                  let finalres = fileid[0] + "-" +parts[1] + result; 
            
                                                  console.log("finalres: ",finalres)
            
                                                return finalres;
                                                }
          
                                               
                                            }
          
                                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                                              let imgNames = await fs.readdirSync(imgDirectory);
                          
                                              console.log("imgNamesimgNamesdfhdfghwertwer: ", imgNames, activeId ,overId)
          
                                              imgNames.map((item) => {
                                                if(item.includes("_")) {
          
                                                  console.log("Final item: ",item)
                                                  
                                                  const regex = /-(\d+)_/;
                                                  let modifiedStrrr = transformFilename(item);
            
          
                                                  // const regex = /-(\d+)_/;
                                                  // let modifiedStrrr = modifiedStr.replace(regex, '-');
                          
                                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
            
            
                          
                                                console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                                imgDirectoryNew)
                          
                                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                                  .then(() => {
                                                      console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                  })
                                                  .catch(error => {
                                                      console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                  });
                                                }
                                              })
          
                                              
                                            
                                           
          
                               
                                                
                                        }
                                        xyz()
                                    })
                                    .catch(error => {
                                        console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                    });
          
          
                                }
                                
                                if((!itemm.includes(`${overId}${roomid}`) && !itemm.includes(`${activeId}${roomid}`)) || itemm.includes(`${overId}${roomid}`)) {
                                  const xyz = async () => {
          
                                    function transformFilename(filename) {
                                      
                                      let parts = filename.split('_')
      
                                      if(parts.length === 2) {
                                        console.log("Partsll: ",parts)
      
                                        let thirdPart = parts[1];
      
                                        console.log("thirdPartll: ",thirdPart)
      
                                        let part2 = parts[0].split("-")
      
                                        
                                        let finalres =  part2[0] + "-" + parts[1]; 
      
                                        console.log("finalresll: ",finalres)
      
                                      return finalres;
      
                                      }else {
                                        console.log("Parts: ",parts)
      
                                        let fileid = filename.split("-")
      
                                        let thirdPart = parts[2];
      
                                        console.log("thirdPart: ",thirdPart)
      
                                        let result = thirdPart.replace(/^\d+/, '');
      
                                        console.log("result: ",result)
                                        
                                        let finalres = fileid[0] + "-" +parts[1] + result; 
      
                                        console.log("finalres: ",finalres)
      
                                      return finalres;
                                      }
      
                                     
                                  }
      
                                    let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
      
                                    let imgNames = await fs.readdirSync(imgDirectory);
                
                                    console.log("imgNamesimgNamesdfhdfghwertwer1: ", imgNames, activeId ,overId)
      
                                    imgNames.map((item) => {
                                      if(item.includes("_")) {
      
                                        console.log("Final item: ",item)
                                        
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(item);
      
      
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
      
      
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                      }
                                    })
      
                                    
                                  
                                 
      
                     
                                      
                              }
                              xyz()
                                }
                                
                                // if(itemm.includes(`${overId}${roomid}`)) {
                                //   console.log("imgNamesttttoverdfghdfghdfh: ", itemm)
          
          
                                //   const regex = /-(\d+)(?=[a-zA-Z])/;
                                //   const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
          
                                //   let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                //   let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                //   console.log("imgDirectoryOlddfghdfgh: ", imgDirectoryOld,
                                //   imgDirectoryNew)
          
                                //   renameFile(imgDirectoryOld, imgDirectoryNew)
                                //     .then(() => {
                                //         console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                //         if(modifiedStr.includes("_")) {
          
                           
                                //           const regex = /-(\d+)_/;
                                //           let modifiedStrrr = modifiedStr.replace(regex, '-');
                  
                                //         let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                //         let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                  
                                //         console.log("imgDirectoryOlddfghdfghrtyr: ", imgDirectoryOld,
                                //         imgDirectoryNew)
                  
                                //         renameFile(imgDirectoryOld, imgDirectoryNew)
                                //           .then(() => {
                                //               console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                //               const hii = async () => {
                                //                 let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                                //                 let imgNames = await fs.readdirSync(imgDirectory);
                          
                                //                 console.log("imgNamesimrtyfghgNames: ",imgNames)
          
                                //                 imgNames.map((itemm) => {
                                //                   console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomid}`)
                                //                   if(itemm.includes(`${"_"}${overId}${roomid}`)) {
                                //                     const regex = /-(\d+)_/;
                                //                     let modifiedStrrr = itemm.replace(regex, '-');
                            
                                //                   let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                //                   let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
                
                
                            
                                //                   console.log("imgDiredfghctoryOldsameer: ", imgDirectoryOld,
                                //                   imgDirectoryNew)
                            
                                //                   renameFile(imgDirectoryOld, imgDirectoryNew)
                                //                   }
                                //               })
          
                                //               }
          
                                //               hii()
          
                                //           })
                                //           .catch(error => {
                                //               console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                //           });
                                //   }
                                //     })
                                //     .catch(error => {
                                //         console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                                //     });
                                // }
                              })
          
                              
                            }
          
                            ltt()
                           
                          })
                        }
                      }

                      notZeroFxn()

                    }else if((data11imgchecklength === 0 || data11imgchecklength === null) && (data22imgchecklength > 0 || data22imgchecklength !== null)) {
                        console.log("One Zero and other not")

                        const sarrr = async () => {

                          let  [hoteltext, hotelid] = hotel_Name.split("-");
                          let  [roomtext, roomid] = room_Name.split("-");
      
                          let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                            Hotel_Id: parseInt(hotelid),
                            selected_room: { $regex: new RegExp(roomid, 'i'), },
                            img_id: parseInt(activeId),
                          });
      
                          let res = await Promise.all(dataaaa.map(async (item, index) => {
                            if (index === dataaaa.length - 1 && item.img_checks.length === 0) {
                              item.img_id = parseInt(overId);
                              item.img_title = overId.toString() + fileExtensions;
                              await item.save();
                            }
                          }));
  
                        }
  
                        sarrr()


                    } else if((data11imgchecklength === 0 || data11imgchecklength === null) && (data22imgchecklength === 0 || data22imgchecklength === null)) {
                      console.log("both Zero")

                      const sar = async () => {

                        let  [hoteltext, hotelid] = hotel_Name.split("-");
                        let  [roomtext, roomid] = room_Name.split("-");
    
                        let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(activeId),
                        });
    
                        let res = await Promise.all(dataaaa.map(async (item, index) => {
                          if (index === dataaaa.length - 1) {
                            item.img_id = parseInt(overId);
                            item.img_title = overId.toString() + fileExtensions;
                            await item.save();
                          }
                        }));

                      }

                      sar()
                  }
                  }else {
                    console.log("False data2")
                  }

                  if(data11 === null && data22 !== null) {
                    if((data11imgchecklength === 0 || data11imgchecklength === null) && data22imgchecklength !== 0) {
                      console.log("One Zero")

                      const oneZeroFxn = async () => {
                        let  [hoteltext, hotelid] = hotel_Name.split("-");
                            let  [roomtext, roomid] = room_Name.split("-");
        

          
                        let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(overId),
                        });

                        console.log("data546: ",data, data22)

                        let dataaaa1 = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                        });
      
                        console.log("dataaaa154:",dataaaa1)
      
      
                        const imgChecksArrays = dataaaa1.map(item => item.img_checks);
      
      
                        const mergedImgChecks = [].concat(...imgChecksArrays);
      
      
                        const uniqueImgChecks = [...new Set(mergedImgChecks)];
      
                        console.log("uniqueImgChecks: ", uniqueImgChecks);

                        if(uniqueImgChecks) {
                          uniqueImgChecks.map((item) => {
                            const ffxn = async() => {
                              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})


                              console.log("REsssss::::::>",resss)
                              function transformFilename(filename) {
                                
                                let parts = filename.split('_')
    
                                if(parts.length === 2) {
                                  console.log("Partsll: ",parts)
    
                                  let thirdPart = parts[1];
    
                                  console.log("thirdPartll: ",thirdPart)
    
                                  let part2 = parts[0].split("-")
    
                                  
                                  let finalres =  part2[0] + "-" + parts[1]; 
    
                                  console.log("finalresll: ",finalres)
    
                                return finalres;
    
                                }else {
                                  console.log("Parts: ",parts)
    
                                  let fileid = filename.split("-")
    
                                  let thirdPart = parts[2];
    
                                  console.log("thirdPart: ",thirdPart)
    
                                  let result = thirdPart.replace(/^\d+/, '');
    
                                  console.log("result: ",result)
                                  
                                  let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                  console.log("finalres: ",finalres)
    
                                return finalres;
                                }
    
                               
                            }
    
                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
    
                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNamesimgNamesdfhdfghwertwer: ", imgNames, activeId ,overId)
    
                              imgNames.map((item) => {
                                if(item === "PM00001") {

                                }else {
                                  if(item.includes("_")) {
    
                                    console.log("Final item: ",item)
                                    
                                    const regex = /-(\d+)_/;
                                    let modifiedStrrr = transformFilename(item);
      
      
                                    // const regex = /-(\d+)_/;
                                    // let modifiedStrrr = modifiedStr.replace(regex, '-');
            
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
      
      
            
                                  console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                  imgDirectoryNew)
            
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                    })
                                    .catch(error => {
                                        console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                    });
                                  }
                                }
                                
                              })

                              
                            }
                            ffxn()
                          })
                        }

         
        
           
        
                

                          
                        

                      }
                      
                      oneZeroFxn()
                    } 
                  }


                  if(parseInt(activeId) - parseInt(overId) === 1) {
                    if((data11 !== null && data22 !== null) || (data11imgchecklength > 0 && data22imgchecklength > 0)) {
                      
                      const adjacentFxn = async () => {

                        if(data11) {
                          if(data11.img_id === parseInt(activeId)) {
                            console.log("True 1")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(activeId),
                            },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                          }
                        }

                        if(data22) {
                          if(data22.img_id === parseInt(overId)) {
                            console.log("True 2")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(overId),
                            },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                          }
                        }

                        let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(overId) + 1234,
                      });

                      let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(activeId) + 1234,
                      });

                     console.log("Data Active mul 2::::::::>", data3, data4)
        
                      if(data3) {
                        if(data3.img_id === parseInt(overId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(overId) + 1234,
                          },{img_id: (parseInt(overId) + 1234) - 1234})
                        }
                      }
                  
                      if(data4) {
                        if(data4.img_id === parseInt(activeId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(activeId) + 1234,
                          },{img_id: (parseInt(activeId) + 1234) - 1234})
                        }
                      }


                      let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                        Hotel_Id: parseInt(hotelidd),
                        selected_room: { $regex: new RegExp(roomidd, 'i'), },
                        img_id: parseInt(activeId),
                      });

                      let data456 = await Pms_Propertymaster_Roomphotomanage.findOne({
                        Hotel_Id: parseInt(hotelidd),
                        selected_room: { $regex: new RegExp(roomidd, 'i'), },
                        img_id: parseInt(overId),
                      });

                      let newData1 = data.img_checks;
                      let newData2 = data456.img_checks;

                      let combinedData = Array.from(new Set(newData1.concat(newData2)));
                      console.log(combinedData);

                      console.log("imp data222: ",data,data456)

                      if(combinedData) {

                        if(combinedData) {
                          combinedData.map((item) => {
        
                            const ltt = async () => {
          
                              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                              console.log("Datasss789rtyert:::::::>", resss)
          
                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNames: ", imgNames, activeId ,overId)
          
                              
                              function renameFile(oldPath, newPath) {
                                return new Promise((resolve, reject) => {
                                  fs.rename(oldPath, newPath, (err) => {
                                    if (err) {
                                      reject(err);
                                    } else {
                                      console.log('Rename completedfhdfgh!');
                                      resolve();
                                    }
                                  });
                                });
                              }
          
                              imgNames.map((itemm) => {
                                console.log("Itemmmmm: ",itemm, `${activeId}${roomidd}`)
                                if(itemm.includes(`${activeId}${roomidd}`)) {
                                  console.log("Itemmsssss: ", itemm)
  
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
  
                                  let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                                  let modifiedStrrr = itemm.replace(regex, `-${overId}`);
  
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
  
                                  console.log("imgDirectoryOld45: ", imgDirectoryOld, imgDirectoryNew)
  
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        
                                        if(!itemm.includes(`${overId}${roomidd}`)) {
                                          console.log("Itemmsssss: ", itemm)
                                          let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                          let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                    
                                          console.log("imgDirectoryOld98: ", imgDirectoryOld, imgDirectoryNew)
                    
                                          renameFile(imgDirectoryOld, imgDirectoryNew)
                                            .then(() => {
                                                console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                              })
                                          }
  
  
                                          const xyz = async () => {
  
                                            console.log("XYZ Called::::::::>")
  
                                            function transformFilename(filename) {
                                              
                                              let parts = filename.split('_')
        
                                              if(parts.length === 2) {
                                                console.log("Partsll: ",parts)
        
                                                let thirdPart = parts[1];
          
                                                console.log("thirdPartll: ",thirdPart)
          
                                                let part2 = parts[0].split("-")
        
                                                
                                                let finalres =  part2[0] + "-" + parts[1]; 
          
                                                console.log("finalresll: ",finalres)
          
                                              return finalres;
        
                                              }else {
                                                console.log("Parts: ",parts)
        
                                                let fileid = filename.split("-")
        
                                                let thirdPart = parts[2];
          
                                                console.log("thirdPart: ",thirdPart)
          
                                                let result = thirdPart.replace(/^\d+/, '');
          
                                                console.log("result: ",result)
                                                
                                                let finalres = fileid[0] + "-" +parts[1] + result; 
          
                                                console.log("finalres: ",finalres)
          
                                              return finalres;
                                              }
        
                                             
                                          }
        
                                            let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                                            let imgNames = await fs.readdirSync(imgDirectory);
                        
                                            console.log("imgNames654: ", imgNames, activeId ,overId)
        
                                            imgNames.map((item) => {
                                              if(item.includes("_")) {
        
                                                console.log("Final item: ",item)
                                                
                                                const regex = /-(\d+)_/;
                                                let modifiedStrrr = transformFilename(item);
          
        
                                                // const regex = /-(\d+)_/;
                                                // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
                                              let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                              let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
                                              console.log("imgDirectoryOld35: ", imgDirectoryOld,
                                              imgDirectoryNew)
                        
                                              renameFile(imgDirectoryOld, imgDirectoryNew)
                                                .then(() => {
                                                    console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                })
                                                .catch(error => {
                                                    console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                });
                                              }
                                            })
        
                                            
                                          
                                         
        
                             
                                              
                                      }
                                      xyz()
                                    })
                                }
                              
                              
                                if(itemm.includes(`${overId}${roomidd}`)) {
                                  console.log("itemm456: ", itemm)
          
          
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
                                  const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
          
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                  console.log("imgDirectoryOld123: ", imgDirectoryOld, imgDirectoryNew)
          
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                        if(modifiedStr.includes("_")) {
          
                           
                                          const regex = /-(\d+)_/;
                                          let modifiedStrrr = modifiedStr.replace(regex, '-');
                  
                                        let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                        let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                  
                                        console.log("imgDirectoryOld965: ", imgDirectoryOld,
                                        imgDirectoryNew)
                  
                                        renameFile(imgDirectoryOld, imgDirectoryNew)
                                          .then(() => {
                                              console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                              const hii = async () => {
                                                let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                                                let imgNames = await fs.readdirSync(imgDirectory);
                          
                                                console.log("imgNamesimrtyfghgNames: ",imgNames)
          
                                                imgNames.map((itemm) => {
                                                  console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomidd}`)
                                                  if(itemm.includes(`${"_"}${overId}${roomidd}`)) {
                                                    const regex = /-(\d+)_/;
                                                    let modifiedStrrr = itemm.replace(regex, '-');
                            
                                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
                
                
                            
                                                  console.log("imgDirectoryOld4752: ", imgDirectoryOld,
                                                  imgDirectoryNew)
                            
                                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                                  }
                                              })
          
                                              }
          
                                              hii()
          
                                          })
                                          .catch(error => {
                                              console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                          });
                                  }
                                    })
                                    .catch(error => {
                                        console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                                    });
                                }
  
                              
                              })
                              }
  
                          ltt()
                        })
                        }

                      }

             


                    }

                      adjacentFxn()

                      }else if((data11 === null && data22 !== null) && (data11imgchecklength === null && data22imgchecklength > 0)) {
                        const adjacentFxnNew = async () => {

                          if(data11) {
                            if(data11.img_id === parseInt(activeId)) {
                              console.log("True 1asdf")
                              await Pms_Propertymaster_Roomphotomanage.updateOne({
                                Hotel_Id: hotelidd,
                                selected_room: roomidd.toString(),
                                img_id: parseInt(activeId),
                              },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                            }
                          }
  
                          if(data22) {
                            if(data22.img_id === parseInt(overId)) {
                              console.log("True 2asdf")
                              await Pms_Propertymaster_Roomphotomanage.updateOne({
                                Hotel_Id: hotelidd,
                                selected_room: roomidd.toString(),
                                img_id: parseInt(overId),
                              },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                            }
                          }
  
                          let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                            Hotel_Id: hotelidd,
                            selected_room: { $regex: new RegExp(roomidd, 'i'), },
                            img_id: parseInt(overId) + 1234,
                        });
  
                        let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                            Hotel_Id: hotelidd,
                            selected_room: { $regex: new RegExp(roomidd, 'i'), },
                            img_id: parseInt(activeId) + 1234,
                        });
  
                       console.log("Data Activeasdf mul 2::::::::>", data3, data4)
          
                        if(data3) {
                          if(data3.img_id === parseInt(overId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(overId) + 1234,
                            },{img_id: (parseInt(overId) + 1234) - 1234})
                          }
                        }
                    
                        if(data4) {
                          if(data4.img_id === parseInt(activeId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(activeId) + 1234,
                            },{img_id: (parseInt(activeId) + 1234) - 1234})
                          }
                        }
  
  
                        let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: parseInt(hotelidd),
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(activeId),
                        });
  
                        if(data) {
                          data.img_checks.map((item) => {
        
                            const ltt = async () => {
          
                              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                              console.log("Datasss789rtyert:::::::>", resss)
          
                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNames: ", imgNames, activeId ,overId)
          
                              
                              function renameFile(oldPath, newPath) {
                                return new Promise((resolve, reject) => {
                                  fs.rename(oldPath, newPath, (err) => {
                                    if (err) {
                                      reject(err);
                                    } else {
                                      console.log('Rename completedfhdfgh!');
                                      resolve();
                                    }
                                  });
                                });
                              }
          
                              imgNames.map((itemm) => {
                                console.log("Itemmmmm: ",itemm, `${activeId}${roomidd}`)
                                if(itemm.includes(`${activeId}${roomidd}`)) {
                                  console.log("Itemmsssss: ", itemm)
  
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
  
                                  let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                                  let modifiedStrrr = itemm.replace(regex, `-${overId}`);
  
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
  
                                  console.log("imgDirectoryOld45: ", imgDirectoryOld, imgDirectoryNew)
  
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        
                                        if(!itemm.includes(`${overId}${roomidd}`)) {
                                          console.log("Itemmsssss: ", itemm)
                                          let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                          let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                    
                                          console.log("imgDirectoryOld98: ", imgDirectoryOld, imgDirectoryNew)
                    
                                          renameFile(imgDirectoryOld, imgDirectoryNew)
                                            .then(() => {
                                                console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                              })
                                          }
  
  
                                          const xyz = async () => {
  
                                            console.log("XYZ Called::::::::>")
  
                                            function transformFilename(filename) {
                                              
                                              let parts = filename.split('_')
        
                                              if(parts.length === 2) {
                                                console.log("Partsll: ",parts)
        
                                                let thirdPart = parts[1];
          
                                                console.log("thirdPartll: ",thirdPart)
          
                                                let part2 = parts[0].split("-")
        
                                                
                                                let finalres =  part2[0] + "-" + parts[1]; 
          
                                                console.log("finalresll: ",finalres)
          
                                              return finalres;
        
                                              }else {
                                                console.log("Parts: ",parts)
        
                                                let fileid = filename.split("-")
        
                                                let thirdPart = parts[2];
          
                                                console.log("thirdPart: ",thirdPart)
          
                                                let result = thirdPart.replace(/^\d+/, '');
          
                                                console.log("result: ",result)
                                                
                                                let finalres = fileid[0] + "-" +parts[1] + result; 
          
                                                console.log("finalres: ",finalres)
          
                                              return finalres;
                                              }
        
                                             
                                          }
        
                                            let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                                            let imgNames = await fs.readdirSync(imgDirectory);
                        
                                            console.log("imgNames654: ", imgNames, activeId ,overId)
        
                                            imgNames.map((item) => {
                                              if(item.includes("_")) {
        
                                                console.log("Final item: ",item)
                                                
                                                const regex = /-(\d+)_/;
                                                let modifiedStrrr = transformFilename(item);
          
        
                                                // const regex = /-(\d+)_/;
                                                // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
                                              let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                              let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
                                              console.log("imgDirectoryOld35: ", imgDirectoryOld,
                                              imgDirectoryNew)
                        
                                              renameFile(imgDirectoryOld, imgDirectoryNew)
                                                .then(() => {
                                                    console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                })
                                                .catch(error => {
                                                    console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                });
                                              }
                                            })
        
                                            
                                          
                                         
        
                             
                                              
                                      }
                                      xyz()
                                    })
                                }
                              
                              
                                if(itemm.includes(`${overId}${roomidd}`)) {
                                  console.log("itemm456: ", itemm)
          
          
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
                                  const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
          
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                  console.log("imgDirectoryOld123: ", imgDirectoryOld, imgDirectoryNew)
          
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                        if(modifiedStr.includes("_")) {
          
                           
                                          const regex = /-(\d+)_/;
                                          let modifiedStrrr = modifiedStr.replace(regex, '-');
                  
                                        let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                        let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                  
                                        console.log("imgDirectoryOld965: ", imgDirectoryOld,
                                        imgDirectoryNew)
                  
                                        renameFile(imgDirectoryOld, imgDirectoryNew)
                                          .then(() => {
                                              console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                              const hii = async () => {
                                                let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                                                let imgNames = await fs.readdirSync(imgDirectory);
                          
                                                console.log("imgNamesimrtyfghgNames: ",imgNames)
          
                                                imgNames.map((itemm) => {
                                                  console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomidd}`)
                                                  if(itemm.includes(`${"_"}${overId}${roomidd}`)) {
                                                    const regex = /-(\d+)_/;
                                                    let modifiedStrrr = itemm.replace(regex, '-');
                            
                                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
                
                
                            
                                                  console.log("imgDirectoryOld4752: ", imgDirectoryOld,
                                                  imgDirectoryNew)
                            
                                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                                  }
                                              })
          
                                              }
          
                                              hii()
          
                                          })
                                          .catch(error => {
                                              console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                          });
                                  }
                                    })
                                    .catch(error => {
                                        console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                                    });
                                }
  
                              
                              })
                              }
  
                          ltt()
                        })
                        }
                        
                      }

                      adjacentFxnNew()
                      }else if((data11 === null && data22 !== null) && (data11imgchecklength === null && data22imgchecklength === 0)) {

                        const abc = async () => {if(data11) {
                          if(data11.img_id === parseInt(activeId)) {
                            console.log("True 1asdf")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(activeId),
                            },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                          }
                        }

                        if(data22) {
                          if(data22.img_id === parseInt(overId)) {
                            console.log("True 2asdf")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(overId),
                            },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                          }
                        }

                        let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(overId) + 1234,
                      });

                      let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(activeId) + 1234,
                      });

                     console.log("Data Activeasdf mul 2::::::::>", data3, data4)
        
                      if(data3) {
                        if(data3.img_id === parseInt(overId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(overId) + 1234,
                          },{img_id: (parseInt(overId) + 1234) - 1234})
                        }
                      }
                  
                      if(data4) {
                        if(data4.img_id === parseInt(activeId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(activeId) + 1234,
                          },{img_id: (parseInt(activeId) + 1234) - 1234})
                        }
                      }}

                      abc()

                      }
                      

                  }

  
                })
  
          })
          .catch((err) => {
              console.error("Error renaming files:", err);
          });




          const finalFxn = async () => {

            console.log("final Fxn")

            let  [hoteltext, hotelid] = hotel_Name.split("-");
            let  [roomtext, roomid] = room_Name.split("-");

            let data_finalFxn = await Pms_Propertymaster_Roomphotomanage.find({
              Hotel_Id: parseInt(hotelid),
              selected_room: { $regex: new RegExp(roomid, 'i'), },
            }); 

            console.log("final Fxn data_finalFxn", data_finalFxn)

          }

          finalFxn();
  
        }
  
  
  
  
  
  
  
  
  
        if(activeId < overId) {

          let renamePromisesss = '';
          let renamePromises = [];
  
          console.log("Smaller than",activeId, overId)
  
          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name);
        
          let imgNames = await fs.readdirSync(imgDirectory);
  
          const formattedFilesFinal = imgNames?.map((fileName, index) => {
  
            const idAndTitle = fileName.split('_');
            const id = parseInt(idAndTitle[0], 10);
            return { id: id, title: fileName };
  
          });
          
          console.log("Image Name:::::::>",formattedFilesFinal)


          let  [hoteltext, hotelidd] = hotel_Name.split("-");
          let  [roomtext, roomidd] = room_Name.split("-");

          let data11 = await Pms_Propertymaster_Roomphotomanage.findOne({
            Hotel_Id: parseInt(hotelidd),
            selected_room: { $regex: new RegExp(roomidd, 'i'), },
            img_id: parseInt(activeId),
          });

          let data22 = await Pms_Propertymaster_Roomphotomanage.findOne({
            Hotel_Id: parseInt(hotelidd),
            selected_room: { $regex: new RegExp(roomidd, 'i'), },
            img_id: parseInt(overId),
          });

          console.log("Main Data:::::::>", data11, data22)

          let data11imgchecklength = data11 ? data11.img_checks.length : null;
          let data22imgchecklength = data22 ? data22.img_checks.length : null;


  
          for(let i = (parseInt(activeId) + parseInt(1)); i <= parseInt(overId); i++) {
            console.log("Over Id: ",i)
  
            formattedFilesFinal?.map((file, index) => {
  
              if(file.id === parseInt(i)) {
                
                console.log("File:::::>",file)
  
                const extensionIndex = file.title.lastIndexOf(".");
                const fileExtensions = file.title.substring(extensionIndex);
  
                const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, file.title);
                let imgDirectoryNew = "";
                if(file.title.includes("-")) {
                  const [prefix,suffix] = file.title.split("-");
                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, (file.id - 1).toString() + "-" + suffix);
                }else {
                  imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, (file.id - 1).toString() + fileExtensions);


                  ///////////////////////////////Over Fxn ///////////////////////////////////////////////

                  const pqrttt = async() => {

                    console.log("file.title1: ",file.title, file.id)

                    let  [hoteltext, hotelid] = hotel_Name.split("-");
                    let  [roomtext, roomid] = room_Name.split("-");

                    let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                      Hotel_Id: hotelid,
                      selected_room: { $regex: new RegExp(roomid, 'i'), },
                      img_id: parseInt(file.id),
                  });

                  if(data && (parseInt(overId) - parseInt(activeId)) !== 1) {
                    if(data.img_id === parseInt(file.id)) {

                      await Pms_Propertymaster_Roomphotomanage.updateOne({
                        id: data.id,
                        Hotel_Id: hotelid,
                        selected_room: roomid.toString(),
                        img_id: parseInt(file.id),
                      },{img_id: parseInt((file.id - 1)), img_title: (file.id - 1).toString() + fileExtensions})
                    }
                    
  
                    console.log("Data Active::::::::>", data, file.id)

                    data.img_checks.map((item) => {

                      const ltt = async () => {
  
                        let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
  
                        console.log("Datasss789:::::::>", resss)
  
                        let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                        let imgNames = await fs.readdirSync(imgDirectory);
  
                        console.log("imgNamesimgNames: ",imgNames)
  
                        renamePromisesss = imgNames.map((itemm) => {
                          console.log("Itemmmmm: ",itemm, `${file.id}${roomid}`)
                          if(itemm.includes(`${file.id}${roomid}`)) {
                            console.log("imgNamestttt: ", itemm)
  
                            function renameFile(oldPath, newPath) {
                              return new Promise((resolve, reject) => {
                                fs.rename(oldPath, newPath, (err) => {
                                  if (err) {
                                    reject(err);
                                  } else {
                                    console.log('Rename complete!');
                                    resolve();
                                  }
                                });
                              });
                            }
  
                            const regex = /-(\d+)(?=[a-zA-Z])/;
                            //const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) + 1)}`);

                            const modifiedStr = itemm.replace(regex, `-${file.id + "_" + (parseInt(file.id) - 1) + "_" + file.id}`);
  
                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
  
                            console.log("imgDirectoryOld: ", imgDirectoryOld,
                            imgDirectoryNew)
  
                            renameFile(imgDirectoryOld, imgDirectoryNew)
                              .then(() => {
                                  console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);



//ILL
                                  if((data11 === null && data22 === null) && (data11imgchecklength === null && data22imgchecklength === null)) {
                                    console.log("True ILL")


                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                }


                                  }else if((data11 !== null && data22 !== null) && (data11imgchecklength === 0 && data22imgchecklength === 0)) {

                                    console.log("Testttttttttt")


                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                }



                                  }else if((data11 !== null && data22 !== null) && (data11imgchecklength > 0 && data22imgchecklength === 0)) {
                                    console.log("Between ILL")
                                  }else if((data11 !== null && data22 === null) && (data11imgchecklength === 0 && (data22imgchecklength === 0 || data22imgchecklength === null))) {
                                    console.log("Both Zero between")


                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                      }



                                  }else if((data11 !== null && data22 !== null) && ((data11imgchecklength === 0 || data11imgchecklength === null) && data22imgchecklength > 0)) {
                                    console.log("One is zero ther not 123")
                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                }
                                  }else if((data11 !== null && data22 === null) && (data11imgchecklength > 0 && data22imgchecklength === null)) {
                                    console.log("Right place")
                                  }else if((data11 !== null && data22 !== null) && (data11imgchecklength > 0 && data22imgchecklength > 0)) {
                                    console.log("Right place 01")
                                  }else{
                                    console.log("False ILL",data11,
                                    data22,
                                    data11imgchecklength,
                                    data22imgchecklength)



                                    if(modifiedStr.includes("_")) {

                                      function transformFilename(filename) {
                                        
                                        let parts = filename.split('_')
  
                                        if(parts.length === 2) {
                                          console.log("Partsll: ",parts)
  
                                          let thirdPart = parts[1];
    
                                          console.log("thirdPartll: ",thirdPart)
    
                                          let part2 = parts[0].split("-")
  
                                          
                                          let finalres =  part2[0] + "-" + parts[1]; 
    
                                          console.log("finalresll: ",finalres)
    
                                        return finalres;
  
                                        }else {
                                          console.log("Parts: ",parts)
  
                                          let fileid = filename.split("-")
  
                                          let thirdPart = parts[2];
    
                                          console.log("thirdPart: ",thirdPart)
    
                                          let result = thirdPart.replace(/^\d+/, '');
    
                                          console.log("result: ",result)
                                          
                                          let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                          console.log("finalres: ",finalres)
    
                                        return finalres;
                                        }
  
                                       
                                    }
  
                       
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(modifiedStr);
  
                       
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
  
  
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                }



                                  }


                              
                            })
                              .catch(error => {
                                  console.error(`Error renaming ${imgDirectoryOld}:`, error);
                              });
  
  
                          }
                        })

  
                        
                      }
  
                      ltt()
                     
                    })
                  }



    

                  }

                  pqrttt()


                  //////////////////////////////////////////////////////////////////////////////////////////




                }
                
  
                renamePromises.push(renameFile(imgDirectoryOld, imgDirectoryNew)
                  .then(() => {
                           
                    console.log("Renamed Successfully!");
  
                  }))
              }
  
            })
          }
  
          Promise.all(renamePromises)
          .then(() => {
              console.log("All files renamed successfully!", formattedFilesFinal, activeId,
              overId);
  
              let activeTitle;
              let fileExtensions;
  
              if (formattedFilesFinal && formattedFilesFinal.length > 0) {
  
                formattedFilesFinal.forEach((file, index) => {
  
                    if (file.id === parseInt(activeId)) {
                        console.log("Active:::::>", file);
  
                        activeTitle = file.title;
  
                        const extensionIndex = activeTitle.lastIndexOf(".");
                        fileExtensions = activeTitle.substring(extensionIndex);
                    }
  
                });
            } else {
                console.log("formattedFilesFinal is undefined or empty.");
            }
  
            const imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, activeTitle);


            let imgDirectoryNew = "";

            if(activeTitle.includes("-")) {
              const [prefix,suffix] = activeTitle.split("-")
              imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, overId.toString() + "-" +suffix);
            }else {
              imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, room_Name, overId.toString() + fileExtensions);
            }
            console.log("Rename last file: ",imgDirectoryOld, imgDirectoryNew)
  
            renameFile(imgDirectoryOld, imgDirectoryNew)
                .then(() => {
                          
                  console.log("Renamed Successfully!", overId);

//////Promp

console.log("Main Data new: ",data11,data22,data11imgchecklength,data22imgchecklength)
                 
                  if((data11 !== null && data22 === null) || (data11 !== null && data22 !== null)) {

                    if(data11imgchecklength > 0 && (data22imgchecklength === 0 || data22imgchecklength === null)) {

                      console.log("True data1")

                      const ghi = async() => {

                        let  [hoteltext, hotelid] = hotel_Name.split("-");
                        let  [roomtext, roomid] = room_Name.split("-");
    
                        let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(activeId),
                        });

       

                        
    
                        // let data = dataaaa[dataaaa.length - 1];
    
                        let res = await Promise.all(dataaaa.map(async (item, index) => {
                          if (index === dataaaa.length - 1) {
                            item.img_id = parseInt(overId) + 1234;
                            item.img_title = overId.toString() + fileExtensions;
                            await item.save();
                          }
                        }));
    
                        let data1 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(overId),
                        });
    
                    console.log("Data Active mulkkkkkk::::::::>", dataaaa, data1, res, activeId, overId)
    
    
                    // if(data) {
                    //   if(data.img_id === parseInt(activeId)) {
                    //     console.log("True 1")
                    //     await Pms_Propertymaster_Roomphotomanage.updateOne({
                    //       Hotel_Id: hotelid,
                    //       selected_room: roomid.toString(),
                    //       img_id: parseInt(activeId),
                    //     },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                    //   }
                    // }
    
                    if(data1) {
                      if(data1.img_id === parseInt(overId)) {
                        console.log("True 2")
                        await Pms_Propertymaster_Roomphotomanage.updateOne({
                          Hotel_Id: hotelid,
                          selected_room: roomid.toString(),
                          img_id: parseInt(overId),
                        },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                      }
                    }
    
                    let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                      Hotel_Id: hotelid,
                      selected_room: { $regex: new RegExp(roomid, 'i'), },
                      img_id: parseInt(overId) + 1234,
                  });
    
             
                  
                  
                 
                    let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                      Hotel_Id: hotelid,
                      selected_room: { $regex: new RegExp(roomid, 'i'), },
                      img_id: parseInt(activeId) + 1234,
                  });
                  
       
    
              console.log("Data Active mul 2::::::::>", data3, data4)
    
    
                  if(data3) {
                    if(data3.img_id === parseInt(overId) + 1234) {
                      await Pms_Propertymaster_Roomphotomanage.updateOne({
                        Hotel_Id: hotelid,
                        selected_room: roomid.toString(),
                        img_id: parseInt(overId) + 1234,
                      },{img_id: (parseInt(overId) + 1234) - 1234})
                    }
                  }
              
                  if(data4) {
                    if(data4.img_id === parseInt(activeId) + 1234) {
                      await Pms_Propertymaster_Roomphotomanage.updateOne({
                        Hotel_Id: hotelid,
                        selected_room: roomid.toString(),
                        img_id: parseInt(activeId) + 1234,
                      },{img_id: (parseInt(activeId) + 1234) - 1234})
                    }
                  }
    
                  let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                    Hotel_Id: parseInt(hotelid),
                    selected_room: { $regex: new RegExp(roomid, 'i'), },
                    img_id: parseInt(overId),
                  });

                  console.log("DAta:::::>",data)

                  let dataaaa1 = await Pms_Propertymaster_Roomphotomanage.find({
                    Hotel_Id: parseInt(hotelid),
                    selected_room: { $regex: new RegExp(roomid, 'i'), },
                  });

                  console.log("dataaaa154:",dataaaa1)


                  const imgChecksArrays = dataaaa1.map(item => item.img_checks);


                  const mergedImgChecks = [].concat(...imgChecksArrays);


                  const uniqueImgChecks = [...new Set(mergedImgChecks)];

                  console.log("uniqueImgChecks: ", uniqueImgChecks);
    
    
                  if(uniqueImgChecks) {
                    uniqueImgChecks.map((item) => {
    
                      const ltt = async () => {
    
                        let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
    
                        console.log("Datasss789rtyert:::::::>", resss)
    
                        let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                        let imgNames = await fs.readdirSync(imgDirectory);
    
                        console.log("imgNamesimgNamesdfhdfgh6574: ", imgNames, activeId ,overId)
    
                        
                        function renameFile(oldPath, newPath) {
                          return new Promise((resolve, reject) => {
                            fs.rename(oldPath, newPath, (err) => {
                              if (err) {
                                reject(err);
                              } else {
                                console.log('Rename completedfhdfgh!');
                                resolve();
                              }
                            });
                          });
                        }
    
                        imgNames.map((itemm) => {
                          console.log("Itemmmmm: ",itemm, `${activeId}${roomid}`)
                          if(itemm.includes(`${activeId}${roomid}`)) {
                            console.log("imgNamesttttdfghdfgh: ", itemm)
    
    
                            const regex = /-(\d+)(?=[a-zA-Z])/;
                            // let modifiedStr = '';
    
                            
    
                            let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                            let modifiedStrrr = itemm.replace(regex, `-${overId}`);
    
                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
    
                            console.log("imgDirectoryOlddfghdfgh54654: ", imgDirectoryOld,
                            imgDirectoryNew)
    
                            renameFile(imgDirectoryOld, imgDirectoryNew)
                              .then(() => {
                                  console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                  if(!itemm.includes(`${overId}${roomid}`)) {
                                    let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                    let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
    
    
              
                                    console.log("imgDirectoryOlddfghdfghdfghrr: ", imgDirectoryOld,
                                    imgDirectoryNew)
              
                                    renameFile(imgDirectoryOld, imgDirectoryNew)
                                      .then(() => {
                                          console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                        
    
                                        
    
                                      
                                        })
                                      }
    
    
                                      const xyz = async () => {
    
                                        function transformFilename(filename) {
                                          
                                          let parts = filename.split('_')
    
                                          if(parts.length === 2) {
                                            console.log("Partsll: ",parts)
    
                                            let thirdPart = parts[1];
      
                                            console.log("thirdPartll: ",thirdPart)
      
                                            let part2 = parts[0].split("-")
    
                                            
                                            let finalres =  part2[0] + "-" + parts[1]; 
      
                                            console.log("finalresll: ",finalres)
      
                                          return finalres;
    
                                          }else {
                                            console.log("Parts: ",parts)
    
                                            let fileid = filename.split("-")
    
                                            let thirdPart = parts[2];
      
                                            console.log("thirdPart: ",thirdPart)
      
                                            let result = thirdPart.replace(/^\d+/, '');
      
                                            console.log("result: ",result)
                                            
                                            let finalres = fileid[0] + "-" +parts[1] + result; 
      
                                            console.log("finalres: ",finalres)
      
                                          return finalres;
                                          }
    
                                         
                                      }
    
                                        let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                                        let imgNames = await fs.readdirSync(imgDirectory);
                    
                                        console.log("imgNamesimgNamesdfhdfghwertwer1: ", imgNames, activeId ,overId)
    
                                        imgNames.map((item) => {
                                          if(item.includes("_")) {
    
                                            console.log("Final item: ",item)
                                            
                                            const regex = /-(\d+)_/;
                                            let modifiedStrrr = transformFilename(item);
      
    
                                            // const regex = /-(\d+)_/;
                                            // let modifiedStrrr = modifiedStr.replace(regex, '-');
                    
                                          let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                          let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
      
      
                    
                                          console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                          imgDirectoryNew)
                    
                                          renameFile(imgDirectoryOld, imgDirectoryNew)
                                            .then(() => {
                                                console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                            })
                                            .catch(error => {
                                                console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                            });
                                          }
                                        })
    
                                        
                                      
                                     
    
                         
                                          
                                  }
                                  xyz()
                              })
                              .catch(error => {
                                  console.error(`Error renaming ${imgDirectoryOld}:`, error);
                              });
    
    
                          }
                          
                          if(itemm.includes(`${overId}${roomid}`)) {
                            console.log("imgNamesttttoverdfghdfghdfh: ", itemm)
    
    
                            const regex = /-(\d+)(?=[a-zA-Z])/;
                            const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
    
                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
    
                            console.log("imgDirectoryOlddfghdfgh: ", imgDirectoryOld,
                            imgDirectoryNew)
    
                            renameFile(imgDirectoryOld, imgDirectoryNew)
                              .then(() => {
                                  console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                  if(modifiedStr.includes("_")) {
    
                     
                                    const regex = /-(\d+)_/;
                                    let modifiedStrrr = modifiedStr.replace(regex, '-');
            
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
    
    
            
                                  console.log("imgDirectoryOlddfghdfghrtyr: ", imgDirectoryOld,
                                  imgDirectoryNew)
            
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
    
                                        const hii = async () => {
                                          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
          
                                          let imgNames = await fs.readdirSync(imgDirectory);
                    
                                          console.log("imgNamesimrtyfghgNames: ",imgNames)
    
                                          imgNames.map((itemm) => {
                                            console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomid}`)
                                            if(itemm.includes(`${"_"}${overId}${roomid}`)) {
                                              const regex = /-(\d+)_/;
                                              let modifiedStrrr = itemm.replace(regex, '-');
                      
                                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                      
                                            console.log("imgDiredfghctoryOldsameer: ", imgDirectoryOld,
                                            imgDirectoryNew)
                      
                                            renameFile(imgDirectoryOld, imgDirectoryNew)
                                            }
                                        })
    
                                        }
    
                                        hii()
    
                                    })
                                    .catch(error => {
                                        console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                    });
                            }
                              })
                              .catch(error => {
                                  console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                              });
                          }

                          if(!itemm.includes(`${overId}${roomid}`) && !itemm.includes(`${activeId}${roomid}`)) {
                            const xyz = async () => {
    
                              function transformFilename(filename) {
                                
                                let parts = filename.split('_')

                                if(parts.length === 2) {
                                  console.log("Partsll: ",parts)

                                  let thirdPart = parts[1];

                                  console.log("thirdPartll: ",thirdPart)

                                  let part2 = parts[0].split("-")

                                  
                                  let finalres =  part2[0] + "-" + parts[1]; 

                                  console.log("finalresll: ",finalres)

                                return finalres;

                                }else {
                                  console.log("Parts: ",parts)

                                  let fileid = filename.split("-")

                                  let thirdPart = parts[2];

                                  console.log("thirdPart: ",thirdPart)

                                  let result = thirdPart.replace(/^\d+/, '');

                                  console.log("result: ",result)
                                  
                                  let finalres = fileid[0] + "-" +parts[1] + result; 

                                  console.log("finalres: ",finalres)

                                return finalres;
                                }

                               
                            }

                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);

                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNamesimgNamesdfhdfghwertwer1: ", imgNames, activeId ,overId)

                              imgNames.map((item) => {
                                if(item.includes("_")) {

                                  console.log("Final item: ",item)
                                  
                                  const regex = /-(\d+)_/;
                                  let modifiedStrrr = transformFilename(item);


                                  // const regex = /-(\d+)_/;
                                  // let modifiedStrrr = modifiedStr.replace(regex, '-');
          
                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);


          
                                console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                imgDirectoryNew)
          
                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                  .then(() => {
                                      console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                  })
                                  .catch(error => {
                                      console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                  });
                                }
                              })

                              
                            
                           

               
                                
                        }
                        xyz()
                          }
                        })
    
                        
                      }
    
                      ltt()
                     
                    })
                  }
    
                   
                        // if(data.img_id === parseInt(activeId)) {
                        //   await Pms_Propertymaster_Roomphotomanage.updateOne({
                        //     Hotel_Id: hotelid,
                        //     selected_room: roomid.toString(),
                        //     img_id: activeId,
                        //   },{img_id: overId, img_title: overId.toString() + fileExtensions})
                        // }
    
    
                    
    
                        // data.img_checks.map((item) => {
    
                        //   const ltt = async () => {
      
                        //     let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
      
                        //     console.log("Datasss789:::::::>", resss)
      
                        //     let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                        //     let imgNames = await fs.readdirSync(imgDirectory);
      
                        //     console.log("imgNamesimgNames33333: ",imgNames)
      
                        //     imgNames.map((itemm) => {
                        //       console.log("Itemmmmm: ",itemm, `${activeId}${roomid}`)
                        //       if(itemm.includes(`${activeId}${roomid}`)) {
                        //         console.log("imgNamestttt: ", itemm)
      
                        //         function renameFile(oldPath, newPath) {
                        //           return new Promise((resolve, reject) => {
                        //             fs.rename(oldPath, newPath, (err) => {
                        //               if (err) {
                        //                 reject(err);
                        //               } else {
                        //                 console.log('Rename complete!');
                        //                 resolve();
                        //               }
                        //             });
                        //           });
                        //         }
      
                        //         const regex = /-(\d+)(?=[a-zA-Z])/;
                        //         const modifiedStr = itemm.replace(regex, `-${overId}`);
      
                        //         let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                        //         let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
      
                        //         console.log("imgDirectoryOld3333: ", imgDirectoryOld,
                        //         imgDirectoryNew)
      
                        //         renameFile(imgDirectoryOld, imgDirectoryNew)
                        //           .then(() => {
                        //               console.log(`Renamed ${fileName} to ${newFileName} Successfully!`);
                        //           })
                        //           .catch(error => {
                        //               console.error(`Error renaming ${fileName}:`, error);
                        //           });
      
      
                        //       }
                        //     })
      
                            
                        //   }
      
                        //   ltt()
                         
                        // })
                      
                      
    
                      }


                      ghi()

                    }else if(data11imgchecklength > 0 && data22imgchecklength > 0 && (parseInt(overId) - parseInt(activeId) !== 1)) {
                      console.log("Not Zero")


                      const notZeroFxn = async () => {
                            let  [hoteltext, hotelid] = hotel_Name.split("-");
                            let  [roomtext, roomid] = room_Name.split("-");
        
                            let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                              Hotel_Id: parseInt(hotelid),
                              selected_room: { $regex: new RegExp(roomid, 'i'), },
                              img_id: parseInt(activeId),
                            });
        
                            // let data = dataaaa[dataaaa.length - 1];
        
                            let res = await Promise.all(dataaaa.map(async (item, index) => {
                              if (index === dataaaa.length - 1) {
                                item.img_id = parseInt(overId) + 1234;
                                item.img_title = overId.toString() + fileExtensions;
                                await item.save();
                              }
                            }));
        
                            let data1 = await Pms_Propertymaster_Roomphotomanage.findOne({
                              Hotel_Id: parseInt(hotelid),
                              selected_room: { $regex: new RegExp(roomid, 'i'), },
                              img_id: parseInt(overId),
                            });
        
                        console.log("Data Active mulkkkkkk789::::::::>", dataaaa, data1, res, activeId, overId)
        
        
                        // if(data) {
                        //   if(data.img_id === parseInt(activeId)) {
                        //     console.log("True 1")
                        //     await Pms_Propertymaster_Roomphotomanage.updateOne({
                        //       Hotel_Id: hotelid,
                        //       selected_room: roomid.toString(),
                        //       img_id: parseInt(activeId),
                        //     },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                        //   }
                        // }
        
                        if(data1) {
                          if(data1.img_id === parseInt(overId)) {
                            console.log("True 2")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelid,
                              selected_room: roomid.toString(),
                              img_id: parseInt(overId),
                            },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                          }
                        }
        
                        let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelid,
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(overId) + 1234,
                      });
        
                
                      
                      
                    
                        let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelid,
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(activeId) + 1234,
                      });
                      
          
        
                    console.log("Data Active mul 2::::::::>", data3, data4)
          
          
                        if(data3) {
                          if(data3.img_id === parseInt(overId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelid,
                              selected_room: roomid.toString(),
                              img_id: parseInt(overId) + 1234,
                            },{img_id: (parseInt(overId) + 1234) - 1234})
                          }
                        }
                    
                        if(data4) {
                          if(data4.img_id === parseInt(activeId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelid,
                              selected_room: roomid.toString(),
                              img_id: parseInt(activeId) + 1234,
                            },{img_id: (parseInt(activeId) + 1234) - 1234})
                          }
                        }
          
                        let dataaaa1 = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                        });
      
                        console.log("dataaaa154:",dataaaa1)
      
      
                        const imgChecksArrays = dataaaa1.map(item => item.img_checks);
      
      
                        const mergedImgChecks = [].concat(...imgChecksArrays);
      
      
                        const uniqueImgChecks = [...new Set(mergedImgChecks)];
      
                        console.log("uniqueImgChecks: ", uniqueImgChecks);

                        if(uniqueImgChecks) {
                          uniqueImgChecks.map((item) => {
    
                            const ltt = async () => {
          
                              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                              console.log("Datasss789rtyert:::::::>", resss)
          
                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNamesimgNamesdfhdfgh: ", imgNames, activeId ,overId)
          
                              
                              function renameFile(oldPath, newPath) {
                                return new Promise((resolve, reject) => {
                                  fs.rename(oldPath, newPath, (err) => {
                                    if (err) {
                                      reject(err);
                                    } else {
                                      console.log('Rename completedfhdfgh!');
                                      resolve();
                                    }
                                  });
                                });
                              }
          
                              imgNames.map((itemm) => {
                                console.log("Itemmmmm: ",itemm, `${activeId}${roomid}`)
                                if(itemm.includes(`${activeId}${roomid}`)) {
                                  console.log("imgNamesttttdfghdfgh: ", itemm)
          
          
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
                                  // let modifiedStr = '';
          
                                  
          
                                  let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                                  let modifiedStrrr = itemm.replace(regex, `-${overId}`);
          
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                  console.log("imgDirectoryOlddfghdfgh: ", imgDirectoryOld,
                                  imgDirectoryNew)
          
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                        if(!itemm.includes(`${overId}${roomid}`)) {

                                          console.log("Itemsss123: ",itemm, `${overId}${roomid}`, modifiedStr, modifiedStrrr)
                                          let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                          let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                    
                                          console.log("imgDirectoryOlddfghdfghdfghrr: ", imgDirectoryOld,
                                          imgDirectoryNew)
                    
                                          renameFile(imgDirectoryOld, imgDirectoryNew)
                                            .then(() => {
                                                console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                              
          
                                              
          
                                            
                                              })
                                            }
          
          
                                            const xyz = async () => {
          
                                              function transformFilename(filename) {
                                                
                                                let parts = filename.split('_')
          
                                                if(parts.length === 2) {
                                                  console.log("Partsll: ",parts)
          
                                                  let thirdPart = parts[1];
            
                                                  console.log("thirdPartll: ",thirdPart)
            
                                                  let part2 = parts[0].split("-")
          
                                                  
                                                  let finalres =  part2[0] + "-" + parts[1]; 
            
                                                  console.log("finalresll: ",finalres)
            
                                                return finalres;
          
                                                }else {
                                                  console.log("Parts: ",parts)
          
                                                  let fileid = filename.split("-")
          
                                                  let thirdPart = parts[2];
            
                                                  console.log("thirdPart: ",thirdPart)
            
                                                  let result = thirdPart.replace(/^\d+/, '');
            
                                                  console.log("result: ",result)
                                                  
                                                  let finalres = fileid[0] + "-" +parts[1] + result; 
            
                                                  console.log("finalres: ",finalres)
            
                                                return finalres;
                                                }
          
                                               
                                            }
          
                                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                                              let imgNames = await fs.readdirSync(imgDirectory);
                          
                                              console.log("imgNamesimgNamesdfhdfghwertwer: ", imgNames, activeId ,overId)
          
                                              imgNames.map((item) => {
                                                if(item.includes("_")) {
          
                                                  console.log("Final item: ",item)
                                                  
                                                  const regex = /-(\d+)_/;
                                                  let modifiedStrrr = transformFilename(item);
            
          
                                                  // const regex = /-(\d+)_/;
                                                  // let modifiedStrrr = modifiedStr.replace(regex, '-');
                          
                                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
            
            
                          
                                                console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                                imgDirectoryNew)
                          
                                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                                  .then(() => {
                                                      console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                  })
                                                  .catch(error => {
                                                      console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                  });
                                                }
                                              })
          
                                              
                                            
                                           
          
                               
                                                
                                        }
                                        xyz()
                                    })
                                    .catch(error => {
                                        console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                    });
          
          
                                }

                                if((!itemm.includes(`${overId}${roomid}`) && !itemm.includes(`${activeId}${roomid}`) || itemm.includes(`${overId}${roomid}`))) {
                                  const xyz = async () => {
          
                                    function transformFilename(filename) {
                                      
                                      let parts = filename.split('_')
      
                                      if(parts.length === 2) {
                                        console.log("Partsll: ",parts)
      
                                        let thirdPart = parts[1];
      
                                        console.log("thirdPartll: ",thirdPart)
      
                                        let part2 = parts[0].split("-")
      
                                        
                                        let finalres =  part2[0] + "-" + parts[1]; 
      
                                        console.log("finalresll: ",finalres)
      
                                      return finalres;
      
                                      }else {
                                        console.log("Parts: ",parts)
      
                                        let fileid = filename.split("-")
      
                                        let thirdPart = parts[2];
      
                                        console.log("thirdPart: ",thirdPart)
      
                                        let result = thirdPart.replace(/^\d+/, '');
      
                                        console.log("result: ",result)
                                        
                                        let finalres = fileid[0] + "-" +parts[1] + result; 
      
                                        console.log("finalres: ",finalres)
      
                                      return finalres;
                                      }
      
                                     
                                  }
      
                                    let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
      
                                    let imgNames = await fs.readdirSync(imgDirectory);
                
                                    console.log("imgNamesimgNamesdfhdfghwertwer1: ", imgNames, activeId ,overId)
      
                                    imgNames.map((item) => {
                                      if(item.includes("_")) {
      
                                        console.log("Final item: ",item)
                                        
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = transformFilename(item);
      
      
                                        // const regex = /-(\d+)_/;
                                        // let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
      
      
                
                                      console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        })
                                        .catch(error => {
                                            console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                        });
                                      }
                                    })
      
                                    
                                  
                                 
      
                     
                                      
                              }
                              xyz()
                                }
                                
                                // if(itemm.includes(`${overId}${roomid}`)) {
                                //   console.log("imgNamesttttoverdfghdfghdfh: ", itemm)
          
          
                                //   const regex = /-(\d+)(?=[a-zA-Z])/;
                                //   const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
          
                                //   let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                //   let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                //   console.log("imgDirectoryOlddfghdfgh: ", imgDirectoryOld,
                                //   imgDirectoryNew)
          
                                //   renameFile(imgDirectoryOld, imgDirectoryNew)
                                //     .then(() => {
                                //         console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                //         if(modifiedStr.includes("_")) {
          
                           
                                //           const regex = /-(\d+)_/;
                                //           let modifiedStrrr = modifiedStr.replace(regex, '-');
                  
                                //         let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                //         let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                  
                                //         console.log("imgDirectoryOlddfghdfghrtyr: ", imgDirectoryOld,
                                //         imgDirectoryNew)
                  
                                //         renameFile(imgDirectoryOld, imgDirectoryNew)
                                //           .then(() => {
                                //               console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                //               const hii = async () => {
                                //                 let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                                //                 let imgNames = await fs.readdirSync(imgDirectory);
                          
                                //                 console.log("imgNamesimrtyfghgNames: ",imgNames)
          
                                //                 imgNames.map((itemm) => {
                                //                   console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomid}`)
                                //                   if(itemm.includes(`${"_"}${overId}${roomid}`)) {
                                //                     const regex = /-(\d+)_/;
                                //                     let modifiedStrrr = itemm.replace(regex, '-');
                            
                                //                   let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                //                   let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
                
                
                            
                                //                   console.log("imgDiredfghctoryOldsameer: ", imgDirectoryOld,
                                //                   imgDirectoryNew)
                            
                                //                   renameFile(imgDirectoryOld, imgDirectoryNew)
                                //                   }
                                //               })
          
                                //               }
          
                                //               hii()
          
                                //           })
                                //           .catch(error => {
                                //               console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                //           });
                                //   }
                                //     })
                                //     .catch(error => {
                                //         console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                                //     });
                                // }
                              })
          
                              
                            }
          
                            ltt()
                           
                          })
                        }
                      }

                      notZeroFxn()

                    }else if((data11imgchecklength === 0 || data11imgchecklength === null) && (data22imgchecklength > 0 || data22imgchecklength !== null)) {
                        console.log("One Zero and other not")

                        const sarrr = async () => {

                          let  [hoteltext, hotelid] = hotel_Name.split("-");
                          let  [roomtext, roomid] = room_Name.split("-");
      
                          let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                            Hotel_Id: parseInt(hotelid),
                            selected_room: { $regex: new RegExp(roomid, 'i'), },
                            img_id: parseInt(activeId),
                          });
      
                          let res = await Promise.all(dataaaa.map(async (item, index) => {
                            if (index === dataaaa.length - 1 && item.img_checks.length === 0) {
                              item.img_id = parseInt(overId);
                              item.img_title = overId.toString() + fileExtensions;
                              await item.save();
                            }
                          }));
  
                        }
  
                        sarrr()


                    } else if((data11imgchecklength === 0 || data11imgchecklength === null) && (data22imgchecklength === 0 || data22imgchecklength === null)) {
                      console.log("both Zero")

                      const sar = async () => {

                        let  [hoteltext, hotelid] = hotel_Name.split("-");
                        let  [roomtext, roomid] = room_Name.split("-");
    
                        let dataaaa = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(activeId),
                        });
    
                        let res = await Promise.all(dataaaa.map(async (item, index) => {
                          if (index === dataaaa.length - 1) {
                            item.img_id = parseInt(overId);
                            item.img_title = overId.toString() + fileExtensions;
                            await item.save();
                          }
                        }));

                      }

                      sar()
                  }
                  }else {
                    console.log("False data2")
                  }

                  if(data11 === null && data22 !== null) {
                    if((data11imgchecklength === 0 || data11imgchecklength === null) && data22imgchecklength !== 0) {
                      console.log("One Zero")

                      const oneZeroFxn = async () => {
                        let  [hoteltext, hotelid] = hotel_Name.split("-");
                            let  [roomtext, roomid] = room_Name.split("-");
        

          
                        let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                          img_id: parseInt(overId),
                        });

                        console.log("data546: ",data, data22)

                        let dataaaa1 = await Pms_Propertymaster_Roomphotomanage.find({
                          Hotel_Id: parseInt(hotelid),
                          selected_room: { $regex: new RegExp(roomid, 'i'), },
                        });
      
                        console.log("dataaaa154:",dataaaa1)
      
      
                        const imgChecksArrays = dataaaa1.map(item => item.img_checks);
      
      
                        const mergedImgChecks = [].concat(...imgChecksArrays);
      
      
                        const uniqueImgChecks = [...new Set(mergedImgChecks)];
      
                        console.log("uniqueImgChecks: ", uniqueImgChecks);

                        if(uniqueImgChecks) {
                          uniqueImgChecks.map((item) => {
                            const ffxn = async() => {
                              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})


                              console.log("REsssss::::::>",resss)
                              function transformFilename(filename) {
                                
                                let parts = filename.split('_')
    
                                if(parts.length === 2) {
                                  console.log("Partsll: ",parts)
    
                                  let thirdPart = parts[1];
    
                                  console.log("thirdPartll: ",thirdPart)
    
                                  let part2 = parts[0].split("-")
    
                                  
                                  let finalres =  part2[0] + "-" + parts[1]; 
    
                                  console.log("finalresll: ",finalres)
    
                                return finalres;
    
                                }else {
                                  console.log("Parts: ",parts)
    
                                  let fileid = filename.split("-")
    
                                  let thirdPart = parts[2];
    
                                  console.log("thirdPart: ",thirdPart)
    
                                  let result = thirdPart.replace(/^\d+/, '');
    
                                  console.log("result: ",result)
                                  
                                  let finalres = fileid[0] + "-" +parts[1] + result; 
    
                                  console.log("finalres: ",finalres)
    
                                return finalres;
                                }
    
                               
                            }
    
                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
    
                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNamesimgNamesdfhdfghwertwer: ", imgNames, activeId ,overId)
    
                              imgNames.map((item) => {
                                if(item.includes("_")) {
    
                                  console.log("Final item: ",item)
                                  
                                  const regex = /-(\d+)_/;
                                  let modifiedStrrr = transformFilename(item);
    
    
                                  // const regex = /-(\d+)_/;
                                  // let modifiedStrrr = modifiedStr.replace(regex, '-');
          
                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
    
    
          
                                console.log("imgDirectoryOldsameer: ", imgDirectoryOld,
                                imgDirectoryNew)
          
                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                  .then(() => {
                                      console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                  })
                                  .catch(error => {
                                      console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                  });
                                }
                              })

                              
                            }
                            ffxn()
                          })
                        }

         
        
           
        
                

                          
                        

                      }
                      
                      oneZeroFxn()
                    } 
                  }


                  if(parseInt(overId) - parseInt(activeId) === 1) {
                    if((data11 !== null && data22 !== null) && (data11imgchecklength > 0 && data22imgchecklength > 0)) {
                      
                      const adjacentFxn = async () => {

                        if(data11) {
                          if(data11.img_id === parseInt(activeId)) {
                            console.log("True 1")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(activeId),
                            },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                          }
                        }

                        if(data22) {
                          if(data22.img_id === parseInt(overId)) {
                            console.log("True 2")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(overId),
                            },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                          }
                        }

                        let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(overId) + 1234,
                      });

                      let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(activeId) + 1234,
                      });

                     console.log("Data Active mul 2::::::::>", data3, data4)
        
                      if(data3) {
                        if(data3.img_id === parseInt(overId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(overId) + 1234,
                          },{img_id: (parseInt(overId) + 1234) - 1234})
                        }
                      }
                  
                      if(data4) {
                        if(data4.img_id === parseInt(activeId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(activeId) + 1234,
                          },{img_id: (parseInt(activeId) + 1234) - 1234})
                        }
                      }


                      let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                        Hotel_Id: parseInt(hotelidd),
                        selected_room: { $regex: new RegExp(roomidd, 'i'), },
                        img_id: parseInt(activeId),
                      });

                      let data456 = await Pms_Propertymaster_Roomphotomanage.findOne({
                        Hotel_Id: parseInt(hotelidd),
                        selected_room: { $regex: new RegExp(roomidd, 'i'), },
                        img_id: parseInt(overId),
                      });

                      let newData1 = data.img_checks;
                      let newData2 = data456.img_checks;

                      let combinedData = Array.from(new Set(newData1.concat(newData2)));
                      console.log(combinedData);

                      console.log("imp data222: ",data,data456)


                      if(combinedData) {
                        combinedData.map((item) => {
        
                          const ltt = async () => {
        
                            let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
        
                            console.log("Datasss789rtyert:::::::>", resss)
        
                            let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                            let imgNames = await fs.readdirSync(imgDirectory);
        
                            console.log("imgNames: ", imgNames, activeId ,overId)
        
                            
                            function renameFile(oldPath, newPath) {
                              return new Promise((resolve, reject) => {
                                fs.rename(oldPath, newPath, (err) => {
                                  if (err) {
                                    reject(err);
                                  } else {
                                    console.log('Rename completedfhdfgh!');
                                    resolve();
                                  }
                                });
                              });
                            }
        
                            imgNames.map((itemm) => {
                              console.log("Itemmmmm: ",itemm, `${activeId}${roomidd}`)
                              if(itemm.includes(`${activeId}${roomidd}`)) {
                                console.log("Itemmsssss: ", itemm)

                                const regex = /-(\d+)(?=[a-zA-Z])/;

                                let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                                let modifiedStrrr = itemm.replace(regex, `-${overId}`);

                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);

                                console.log("imgDirectoryOld45: ", imgDirectoryOld, imgDirectoryNew)

                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                  .then(() => {
                                      console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                      
                                      if(!itemm.includes(`${overId}${roomidd}`)) {
                                        console.log("Itemmsssss: ", itemm)
                                        let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                        let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
        
        
                  
                                        console.log("imgDirectoryOld98: ", imgDirectoryOld, imgDirectoryNew)
                  
                                        renameFile(imgDirectoryOld, imgDirectoryNew)
                                          .then(() => {
                                              console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                            })
                                        }


                                        const xyz = async () => {

                                          console.log("XYZ Called::::::::>")

                                          function transformFilename(filename) {
                                            
                                            let parts = filename.split('_')
      
                                            if(parts.length === 2) {
                                              console.log("Partsll: ",parts)
      
                                              let thirdPart = parts[1];
        
                                              console.log("thirdPartll: ",thirdPart)
        
                                              let part2 = parts[0].split("-")
      
                                              
                                              let finalres =  part2[0] + "-" + parts[1]; 
        
                                              console.log("finalresll: ",finalres)
        
                                            return finalres;
      
                                            }else {
                                              console.log("Parts: ",parts)
      
                                              let fileid = filename.split("-")
      
                                              let thirdPart = parts[2];
        
                                              console.log("thirdPart: ",thirdPart)
        
                                              let result = thirdPart.replace(/^\d+/, '');
        
                                              console.log("result: ",result)
                                              
                                              let finalres = fileid[0] + "-" +parts[1] + result; 
        
                                              console.log("finalres: ",finalres)
        
                                            return finalres;
                                            }
      
                                           
                                        }
      
                                          let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
            
                                          let imgNames = await fs.readdirSync(imgDirectory);
                      
                                          console.log("imgNames654: ", imgNames, activeId ,overId)
      
                                          imgNames.map((item) => {
                                            if(item.includes("_")) {
      
                                              console.log("Final item: ",item)
                                              
                                              const regex = /-(\d+)_/;
                                              let modifiedStrrr = transformFilename(item);
        
      
                                              // const regex = /-(\d+)_/;
                                              // let modifiedStrrr = modifiedStr.replace(regex, '-');
                      
                                            let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                            let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
        
        
                      
                                            console.log("imgDirectoryOld35: ", imgDirectoryOld,
                                            imgDirectoryNew)
                      
                                            renameFile(imgDirectoryOld, imgDirectoryNew)
                                              .then(() => {
                                                  console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                              })
                                              .catch(error => {
                                                  console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                              });
                                            }
                                          })
      
                                          
                                        
                                       
      
                           
                                            
                                    }
                                    xyz()
                                  })
                              }
                            
                            
                              if(itemm.includes(`${overId}${roomidd}`)) {
                                console.log("itemm456: ", itemm)
        
        
                                const regex = /-(\d+)(?=[a-zA-Z])/;
                                const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
        
                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
        
                                console.log("imgDirectoryOld123: ", imgDirectoryOld, imgDirectoryNew)
        
                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                  .then(() => {
                                      console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
        
                                      if(modifiedStr.includes("_")) {
        
                         
                                        const regex = /-(\d+)_/;
                                        let modifiedStrrr = modifiedStr.replace(regex, '-');
                
                                      let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                      let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
        
        
                
                                      console.log("imgDirectoryOld965: ", imgDirectoryOld,
                                      imgDirectoryNew)
                
                                      renameFile(imgDirectoryOld, imgDirectoryNew)
                                        .then(() => {
                                            console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
        
                                            const hii = async () => {
                                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                                              let imgNames = await fs.readdirSync(imgDirectory);
                        
                                              console.log("imgNamesimrtyfghgNames: ",imgNames)
        
                                              imgNames.map((itemm) => {
                                                console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomidd}`)
                                                if(itemm.includes(`${"_"}${overId}${roomidd}`)) {
                                                  const regex = /-(\d+)_/;
                                                  let modifiedStrrr = itemm.replace(regex, '-');
                          
                                                let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                                let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
              
              
                          
                                                console.log("imgDirectoryOld4752: ", imgDirectoryOld,
                                                imgDirectoryNew)
                          
                                                renameFile(imgDirectoryOld, imgDirectoryNew)
                                                }
                                            })
        
                                            }
        
                                            hii()
        
                                        })
                                        .catch(error => {
                                            console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                        });
                                }
                                  })
                                  .catch(error => {
                                      console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                                  });
                              }

                            
                            })
                            }

                        ltt()
                      })
                      }


                    }

                     adjacentFxn()

                      }else if((data11 === null && data22 !== null) && (data11imgchecklength === null && data22imgchecklength > 0)) {
                        const adjacentFxnNew = async () => {

                          if(data11) {
                            if(data11.img_id === parseInt(activeId)) {
                              console.log("True 1asdf")
                              await Pms_Propertymaster_Roomphotomanage.updateOne({
                                Hotel_Id: hotelidd,
                                selected_room: roomidd.toString(),
                                img_id: parseInt(activeId),
                              },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                            }
                          }
  
                          if(data22) {
                            if(data22.img_id === parseInt(overId)) {
                              console.log("True 2asdf")
                              await Pms_Propertymaster_Roomphotomanage.updateOne({
                                Hotel_Id: hotelidd,
                                selected_room: roomidd.toString(),
                                img_id: parseInt(overId),
                              },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                            }
                          }
  
                          let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                            Hotel_Id: hotelidd,
                            selected_room: { $regex: new RegExp(roomidd, 'i'), },
                            img_id: parseInt(overId) + 1234,
                        });
  
                        let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                            Hotel_Id: hotelidd,
                            selected_room: { $regex: new RegExp(roomidd, 'i'), },
                            img_id: parseInt(activeId) + 1234,
                        });
  
                       console.log("Data Activeasdf mul 2::::::::>", data3, data4)
          
                        if(data3) {
                          if(data3.img_id === parseInt(overId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(overId) + 1234,
                            },{img_id: (parseInt(overId) + 1234) - 1234})
                          }
                        }
                    
                        if(data4) {
                          if(data4.img_id === parseInt(activeId) + 1234) {
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(activeId) + 1234,
                            },{img_id: (parseInt(activeId) + 1234) - 1234})
                          }
                        }
  
  
                        let data = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: parseInt(hotelidd),
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(activeId),
                        });
  
                        if(data) {
                          data.img_checks.map((item) => {
        
                            const ltt = async () => {
          
                              let resss = await Pms_Propertymaster_Roomdetails.findOne({id: item})
          
                              console.log("Datasss789rtyert:::::::>", resss)
          
                              let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                              let imgNames = await fs.readdirSync(imgDirectory);
          
                              console.log("imgNames: ", imgNames, activeId ,overId)
          
                              
                              function renameFile(oldPath, newPath) {
                                return new Promise((resolve, reject) => {
                                  fs.rename(oldPath, newPath, (err) => {
                                    if (err) {
                                      reject(err);
                                    } else {
                                      console.log('Rename completedfhdfgh!');
                                      resolve();
                                    }
                                  });
                                });
                              }
          
                              imgNames.map((itemm) => {
                                console.log("Itemmmmm: ",itemm, `${activeId}${roomidd}`)
                                if(itemm.includes(`${activeId}${roomidd}`)) {
                                  console.log("Itemmsssss: ", itemm)
  
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
  
                                  let modifiedStr = itemm.replace(regex, `-${overId}${"_"}${overId}`);
                                  let modifiedStrrr = itemm.replace(regex, `-${overId}`);
  
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
  
                                  console.log("imgDirectoryOld45: ", imgDirectoryOld, imgDirectoryNew)
  
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                        
                                        if(!itemm.includes(`${overId}${roomidd}`)) {
                                          console.log("Itemmsssss: ", itemm)
                                          let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                          let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                    
                                          console.log("imgDirectoryOld98: ", imgDirectoryOld, imgDirectoryNew)
                    
                                          renameFile(imgDirectoryOld, imgDirectoryNew)
                                            .then(() => {
                                                console.log(`Renamed Newdfghdfgh ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                              })
                                          }
  
  
                                          const xyz = async () => {
  
                                            console.log("XYZ Called::::::::>")
  
                                            function transformFilename(filename) {
                                              
                                              let parts = filename.split('_')
        
                                              if(parts.length === 2) {
                                                console.log("Partsll: ",parts)
        
                                                let thirdPart = parts[1];
          
                                                console.log("thirdPartll: ",thirdPart)
          
                                                let part2 = parts[0].split("-")
        
                                                
                                                let finalres =  part2[0] + "-" + parts[1]; 
          
                                                console.log("finalresll: ",finalres)
          
                                              return finalres;
        
                                              }else {
                                                console.log("Parts: ",parts)
        
                                                let fileid = filename.split("-")
        
                                                let thirdPart = parts[2];
          
                                                console.log("thirdPart: ",thirdPart)
          
                                                let result = thirdPart.replace(/^\d+/, '');
          
                                                console.log("result: ",result)
                                                
                                                let finalres = fileid[0] + "-" +parts[1] + result; 
          
                                                console.log("finalres: ",finalres)
          
                                              return finalres;
                                              }
        
                                             
                                          }
        
                                            let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
              
                                            let imgNames = await fs.readdirSync(imgDirectory);
                        
                                            console.log("imgNames654: ", imgNames, activeId ,overId)
        
                                            imgNames.map((item) => {
                                              if(item.includes("_")) {
        
                                                console.log("Final item: ",item)
                                                
                                                const regex = /-(\d+)_/;
                                                let modifiedStrrr = transformFilename(item);
          
        
                                                // const regex = /-(\d+)_/;
                                                // let modifiedStrrr = modifiedStr.replace(regex, '-');
                        
                                              let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, item);
                                              let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                        
                                              console.log("imgDirectoryOld35: ", imgDirectoryOld,
                                              imgDirectoryNew)
                        
                                              renameFile(imgDirectoryOld, imgDirectoryNew)
                                                .then(() => {
                                                    console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
                                                })
                                                .catch(error => {
                                                    console.error(`Error renaming ${imgDirectoryOld}:`, error);
                                                });
                                              }
                                            })
        
                                            
                                          
                                         
        
                             
                                              
                                      }
                                      xyz()
                                    })
                                }
                              
                              
                                if(itemm.includes(`${overId}${roomidd}`)) {
                                  console.log("itemm456: ", itemm)
          
          
                                  const regex = /-(\d+)(?=[a-zA-Z])/;
                                  const modifiedStr = itemm.replace(regex, `-${activeId}${"_"}${activeId}`);
          
                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
          
                                  console.log("imgDirectoryOld123: ", imgDirectoryOld, imgDirectoryNew)
          
                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                    .then(() => {
                                        console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                        if(modifiedStr.includes("_")) {
          
                           
                                          const regex = /-(\d+)_/;
                                          let modifiedStrrr = modifiedStr.replace(regex, '-');
                  
                                        let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStr);
                                        let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
          
          
                  
                                        console.log("imgDirectoryOld965: ", imgDirectoryOld,
                                        imgDirectoryNew)
                  
                                        renameFile(imgDirectoryOld, imgDirectoryNew)
                                          .then(() => {
                                              console.log(`Renamed ${imgDirectoryOld} to ${imgDirectoryNew} Successfully!`);
          
                                              const hii = async () => {
                                                let imgDirectory = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id);
                
                                                let imgNames = await fs.readdirSync(imgDirectory);
                          
                                                console.log("imgNamesimrtyfghgNames: ",imgNames)
          
                                                imgNames.map((itemm) => {
                                                  console.log("Itemmmmfcghdfgm: ",itemm, `${overId}${roomidd}`)
                                                  if(itemm.includes(`${"_"}${overId}${roomidd}`)) {
                                                    const regex = /-(\d+)_/;
                                                    let modifiedStrrr = itemm.replace(regex, '-');
                            
                                                  let imgDirectoryOld = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, itemm);
                                                  let imgDirectoryNew = path.join(process.cwd(), 'public', 'img', hotel_Name, resss.room_name + "-" + resss.id, modifiedStrrr);
                
                
                            
                                                  console.log("imgDirectoryOld4752: ", imgDirectoryOld,
                                                  imgDirectoryNew)
                            
                                                  renameFile(imgDirectoryOld, imgDirectoryNew)
                                                  }
                                              })
          
                                              }
          
                                              hii()
          
                                          })
                                          .catch(error => {
                                              console.error(`Error resrtynaming ${imgDirectoryOld}:`, error);
                                          });
                                  }
                                    })
                                    .catch(error => {
                                        console.error(`Errordfgh renaming ${imgDirectoryOld}:`, error);
                                    });
                                }
  
                              
                              })
                              }
  
                          ltt()
                        })
                        }
                        
                      }

                      adjacentFxnNew()
                      }else if((data11 === null && data22 !== null) && (data11imgchecklength === null && data22imgchecklength === 0)) {

                        const abc = async () => {if(data11) {
                          if(data11.img_id === parseInt(activeId)) {
                            console.log("True 1asdf")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(activeId),
                            },{img_id: parseInt(overId) + 1234, img_title: overId.toString() + fileExtensions})
                          }
                        }

                        if(data22) {
                          if(data22.img_id === parseInt(overId)) {
                            console.log("True 2asdf")
                            await Pms_Propertymaster_Roomphotomanage.updateOne({
                              Hotel_Id: hotelidd,
                              selected_room: roomidd.toString(),
                              img_id: parseInt(overId),
                            },{img_id: parseInt(activeId) + 1234, img_title: activeId.toString() + fileExtensions})
                          }
                        }

                        let data3 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(overId) + 1234,
                      });

                      let data4 = await Pms_Propertymaster_Roomphotomanage.findOne({
                          Hotel_Id: hotelidd,
                          selected_room: { $regex: new RegExp(roomidd, 'i'), },
                          img_id: parseInt(activeId) + 1234,
                      });

                     console.log("Data Activeasdf mul 2::::::::>", data3, data4)
        
                      if(data3) {
                        if(data3.img_id === parseInt(overId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(overId) + 1234,
                          },{img_id: (parseInt(overId) + 1234) - 1234})
                        }
                      }
                  
                      if(data4) {
                        if(data4.img_id === parseInt(activeId) + 1234) {
                          await Pms_Propertymaster_Roomphotomanage.updateOne({
                            Hotel_Id: hotelidd,
                            selected_room: roomidd.toString(),
                            img_id: parseInt(activeId) + 1234,
                          },{img_id: (parseInt(activeId) + 1234) - 1234})
                        }
                      }}

                      abc()

                      }
                      

                  }

  
                
  
                })
  
          })
          .catch((err) => {
              console.error("Error renaming files:", err);
          });
  
        }
  
        return NextResponse.json({ Message: "Success", status: 200 });
  
      }else {
        if (!files) {
          return NextResponse.json({ error: "No files received." }, { status: 400 });
        }
    
        let hotelName = capitalize_each_word(hotel_name) + "-" + hotel_id.toString();
        let roomName = selectedRoom.replace(/"/g, '') + "-" + selectedRoomId.replace(/"/g, '');
    
        initialCreateFunction(hotelName, roomName, room_result)
    
    
        let imgDirectory = path.join(process.cwd(), 'public', 'img', hotelName, roomName);
        
        let imgNames = await fs.readdirSync(imgDirectory);
    
        let imgNumbers = imgNames.map(name => parseInt(name));

        imgNumbers.sort((a, b) => a - b);
    
        let last_num = 1;
    
        console.log("Image Names:::>",imgNumbers,files.length)
    
        if(imgNumbers.length === 0) {
    
          last_num = 1;
    
        }else {
    
          last_num = imgNumbers[imgNumbers.length - 1] + 1;
     
        }
    
        await Promise.all(files.map(async (file, index) => {
    
          await imgwriter(file, hotelName, roomName, last_num, index);
    
        }));
    
    
      let imgDirectoryy = path.join(process.cwd(), 'public', 'img', hotelName, roomName);
    
      let imgNamess = fs.readdirSync(imgDirectoryy);
    
      let imgNumberss = imgNamess.map(name => parseInt(name));
    
      console.log("Images Name POST::::::>", imgNumbers)
    
      return NextResponse.json({ Message: "Success", imgNames: imgNamess, imgNumbers: imgNumberss, status: 200 });
      }
    }
    
  }else {

        console.log("Add Image Tag")
        const payload = await req.json();
        console.log("Payload: ", payload);
    
        let search = await Pms_Propertymaster_Roomphotomanage.find({
          Hotel_Id: payload.Hotel_Id,
          selected_room: { $regex: new RegExp(payload.selected_room, 'i'), },
          img_id: payload.img_id,
      });
    
      if(search.length === 0) {
        const property_area = await Pms_Propertymaster_Roomphotomanage.create(payload);
        return NextResponse.json({ Message: "Success", status: 200 });
      }else{
        const imageeeee = await Pms_Propertymaster_Roomphotomanage.findOne({Hotel_Id: payload.Hotel_Id, selected_room:payload.selected_room,img_id: payload.img_id});
        imageeeee.img_tags.push(payload.img_tags[0])
        const result = await imageeeee.save();
        //const property_area = await Pms_Propertymaster_Roomphotomanage.updateOne({ Hotel_Id: payload.Hotel_Id, selected_room:payload.selected_room,img_id: payload.img_id  }, {img_tags: img_tags.push(payload.img_tags[0])});
        return NextResponse.json({ Message: "Success", status: 200 });
      }
      

        
      
    }


    

    

}

export async function GET(req, res) {

  try {

    let hotelName = req.nextUrl.searchParams.get('hotelName');

    let roomName = req.nextUrl.searchParams.get('roomName');

    let imgDirectory = path.join(process.cwd(), 'public', 'img', hotelName, roomName);

    let imgNames = fs.readdirSync(imgDirectory);

    let imgNumbers = imgNames.map(name => parseInt(name));

    console.log("Images Name7888::::::>", imgNumbers)

    let imageeeTag = await Pms_Propertymaster_Roomphotomanage.find();

    console.log("imageeeTag::::::>", imageeeTag)

    return NextResponse.json({ Message: "Success", imgNames: imgNames, imgNumbers: imgNumbers, imageeeTag: imageeeTag, status: 201 });

  } catch(error) {
    console.error(error)
    return NextResponse.json({ Message: "Failed", status: 500 });

  }
    
}


function capitalize_each_word(val) {

    if (val === undefined || val === null) {
      return ''; 
    }
  
    const words = val.toString().split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    var str = words.join("");
    var replacedStr = '';

    for (var i = 0; i < str.length; i++) {
      if (str[i] === ',') {
        replacedStr += '';
      } else {
        replacedStr += str[i];
      }
    }

    return replacedStr;
  }
